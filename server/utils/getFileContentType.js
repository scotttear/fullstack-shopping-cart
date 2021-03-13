function getAssetContentType(fileExt) {
  let contentType = ''

  switch (fileExt) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
    case '.ico':
      contentType = 'image/x-icon'
      break
    default:
      contentType = 'text/plain'
  }

  return contentType
}

module.exports = getAssetContentType
