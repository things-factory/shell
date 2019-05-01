const puppeteer = require('puppeteer')
import { headless } from './headless'

const protocol = 'http'
const host = 'localhost'
const path = 'headless-board-view'

export const pdf = async ({
  id = '',
  model = null,
  data = null,
  width: w = 0,
  height: h = 0,
  options = { format: 'A4' } as any
} = {}) => {
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

  width = Math.floor(width * ratio)
  height = Math.floor(height * ratio)

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

  await page.evaluate(async data => {
    if (data) {
      // @ts-ignore
      s.data = data
    }

    // data 주입 후 강제 지연시킴.
    return new Promise(resolve => {
      setTimeout(
        () => {
          // @ts-ignore
          resolve()
        },
        data ? 500 : 0
      )
    })
  }, data)

  const pdf = await page.pdf(options)

  await browser.close()

  return pdf
}
