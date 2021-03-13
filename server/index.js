const http = require('http')
const path = require('path')
const fs = require('fs')
const renderPartials = require('./utils/renderPartials')
const getFileContentType = require('./utils/getFileContentType')
const compileTemplate = require('./utils/compileTemplate')
const port = process.env.PORT || 8080
const apiBaseurl = 'api/v1/'

// Pre render hbs partials
renderPartials(path.join(__dirname, 'views', 'partials'))

const server = http.createServer((req, res) => {
  const { url } = req
  const contentTypeHtml = 'text/html'
  const contentTypeJson = 'application/json'

  // @TODO Create reusable function to send response
  // @TODO Put routes in own file

  // Routes
  if (url === '/') {
    return fs.readFile(
      path.join(__dirname, 'views', 'layout.hbs'),
      'utf8',
      (error, content) => {
        if (error) {
          throw new Error(`an error occured: ${error}`)
        }

        const layoutData = { pageTitle: 'Homepage', testKey: 'home value' }
        const layoutHtml = compileTemplate(content, layoutData)

        res.writeHead(200, { 'Content-Type': contentTypeHtml })
        res.end(layoutHtml)
      }
    )
  }

  if (url === '/cart') {
    return fs.readFile(
      path.join(__dirname, 'views', 'layout.hbs'),
      'utf8',
      (error, content) => {
        if (error) {
          throw new Error(`an error occured: ${error}`)
        }

        const layoutData = { pageTitle: 'My cart', testKey: 'cart value' }
        const layoutHtml = compileTemplate(content, layoutData)

        res.writeHead(200, { 'Content-Type': contentTypeHtml })
        res.end(layoutHtml)
      }
    )
  }

  if (url === `${apiBaseurl}getCart`) {
    res.writeHead(200, { 'Content-Type': contentTypeJson })
    res.end(JSON.stringify({ key: 'value' }))

    return
  }

  // Handle static assets
  const favIconReq = url === '/favicon.ico'
  const staticAssetReq = url.includes('public')
  const assetPath = favIconReq
    ? path.join(__dirname, '..', 'public', 'favicon.ico')
    : path.join(__dirname, '..', url)

  if (favIconReq || staticAssetReq) {
    return fs.readFile(assetPath, (error, content) => {
      if (error) {
        throw new Error(`an error occured: ${error}`)
      }

      res.writeHead(200, {
        'Content-Type': getFileContentType(path.extname(url)),
      })
      res.end(content)
    })
  }

  // If we get to here we show 404 page
  res.writeHead(200, { 'Content-Type': contentTypeHtml })
  res.end('404 page not found')
})

server.listen(port, () => {
  console.log(`⚡ Server is running on port ${port}.`)
})

function handleResponse(filePath, contentType) {
  console.log(filePath, contentType)
}
