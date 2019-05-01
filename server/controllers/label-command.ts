/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import uuid from 'uuid/v4'
const puppeteer = require('puppeteer')

const protocol = 'http'
const host = 'localhost'
const path = 'headless-board-view'

import { headless } from './headless'

const HISTOGRAM_LENGH = 256
const R = 0
const G = 1
const B = 2
const A = 3

function toGrays(width, height, data) {
  var grays = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = 4 * (width * y + x)
      let luminance = data[idx + R] * 0.21 + data[idx + G] * 0.71 + data[idx + B] * 0.07

      // Alpha 값이 낮을 수록 luminance가 높아지는 것으로 본다.
      luminance = luminance + ((255 - data[idx + A]) * (255 - luminance)) / 255

      grays[idx + R] = luminance
      grays[idx + G] = luminance
      grays[idx + B] = luminance
      grays[idx + A] = data[idx + A]
    }
  }

  return grays
}

function getHistogram(width, height, data) {
  var histogram = []

  for (let i = 0; i < HISTOGRAM_LENGH; i++) histogram[i] = 0

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      let idx = 4 * (width * y + x)
      let red = Math.round(data[idx + R])
      histogram[red]++
    }

  return histogram
}

function getThreshold(width, height, data) {
  var histogram = getHistogram(width, height, data)

  var sum = 0
  for (let i = 0; i < HISTOGRAM_LENGH; i++) sum += i * histogram[i]

  var sumB = 0
  var wB = 0
  var wF = 0

  var max = 0
  var threshold = 0
  var total = width * height

  for (let i = 0; i < HISTOGRAM_LENGH; i++) {
    wB += histogram[i]
    if (wB == 0) continue

    wF = total - wB

    if (wF == 0) break

    sumB += i * histogram[i]
    let mB = sumB / wB
    let mF = (sum - sumB) / wF

    let between = wB * wF * (mB - mF) * (mB - mF)
    if (between > max) {
      max = between
      threshold = i
    }
  }

  return threshold
}

function binarize(width, height, data) {
  var grays = toGrays(width, height, data)
  var threshold = getThreshold(width, height, grays)

  var binarized = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = 4 * (y * width + x)

      if (grays[idx] > threshold) {
        binarized[idx + R] = 255
        binarized[idx + G] = 255
        binarized[idx + B] = 255
      } else {
        binarized[idx + R] = 0
        binarized[idx + G] = 0
        binarized[idx + B] = 0
      }

      binarized[idx + A] = grays[idx + A]
    }
  }

  return binarized
}

function binToHex(nibble) {
  return (
    parseInt(nibble, 2)
      .toString(16)
      .toUpperCase() || ''
  )
}

function buildImageGrf(width, height, data) {
  var grfData = ''
  var bytesPerLine = Math.ceil(width / 8)

  for (let y = 0; y < height; y++) {
    let nibble = ''
    let bytes = 0

    for (let x = 0; x < width; x++) {
      nibble += data[4 * (width * y + x) + 1] == 0 ? '1' : '0'

      if (nibble.length > 7) {
        grfData += binToHex(nibble.substring(0, 4)) + binToHex(nibble.substring(4, 8))
        nibble = ''
        bytes++
      }
    }

    if (nibble.length > 0) {
      while (nibble.length < 8) nibble += '0'
      grfData += binToHex(nibble.substring(0, 4)) + binToHex(nibble.substring(4, 8))
      nibble = ''
      bytes++
    }

    while (bytes++ < bytesPerLine) grfData += binToHex('0000') + binToHex('0000')

    grfData += '\n'
  }

  return bytesPerLine * height + ',' + bytesPerLine + ',' + grfData
}

export const labelcommand = async (id, data) => {
  var model = await headless({ id })
  let { width, height } = model

  width = Number(width)
  height = Number(height)

  width = Math.floor(width)
  height = Math.floor(height)

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--hide-scrollbars', '--mute-audio', '--headless', '--no-sandbox']
  })

  const page = await browser.newPage()

  /* @remember-me setViewport의 width, height는 정수여야 한다. */
  await page.setViewport({
    width,
    height
  })

  const port = process.env.PORT
  const url = `${protocol}://${host}:${port}/${path}`

  await page.setRequestInterception(true)

  page.on('console', msg => {
    console.log(`[browser ${msg._type}] ${msg._text}`)
    for (let i = 0; i < msg.args().length; ++i) console.log(`${i}: ${msg.args()[i]}`)
  })

  page.on('request', request => {
    if (request.url() === url) {
      request.continue({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        postData: JSON.stringify(model)
      })
    } else {
      request.continue()
    }
  })

  await page.goto(url)

  const { data: image } = await page.evaluate(
    async (width, height, data) => {
      if (data) {
        // @ts-ignore
        s.data = data
      }

      // data 주입 후 강제 지연시킴.
      return new Promise(resolve => {
        setTimeout(
          () => {
            // s 는 views/headless-board-view.html 의 scene 객체의 변수명임.
            // @ts-ignore
            let context = s._container.model_layer.canvas.getContext('2d')
            resolve(context.getImageData(0, 0, width, height))
          },
          data ? 500 : 0
          /* TODO data 반영 이후에 이미지를 캡쳐할 수 있는 확실한 방법을 구현해야 한다. */
        )
      })
    },
    width,
    height,
    data
  )

  await browser.close()

  var grf = buildImageGrf(width, height, binarize(width, height, image))
  var guid = uuid()

  return `
^XA

~DG${guid},${grf}
^FO0,0
^XGR:${guid},1,1
^PQ1
^FS

^XZ
`
}
