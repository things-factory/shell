const puppeteer = require('puppeteer')
const { record } = require('puppeteer-recorder')
import { headless } from './headless'

const protocol = 'http'
const host = 'localhost'
const path = 'headless-board-view'

export const screencast = async ({ id = '', model = null, width: w = 0, height: h = 0 } = {}) => {
  model = await headless({ id, model })

  let { width, height } = model

  width = Number(width)
  height = Number(height)

  if (!w) {
    w = width
  }
  if (!h) {
    h = height
  }

  let ratio = Math.min(w / width, h / height)

  width *= ratio
  height *= ratio

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--hide-scrollbars', '--mute-audio', '--headless', '--no-sandbox']
  })

  const page = await browser.newPage()
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

  await record({
    browser,
    page,
    output: 'output.webm',
    logEachFrame: true,
    fps: 10,
    frames: 10 * 1, // 1 seconds at 60 fps
    prepare: function(browser, page) {
      /* executed before first capture */
    },
    render: function(browser, page, frame) {
      /* executed before each capture */
    }
  })

  console.log('record done.')

  await browser.close()
}
