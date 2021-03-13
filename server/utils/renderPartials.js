const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

function renderPartials(dirPath) {
  fs.readdir(dirPath, (error, files) => {
    if (error) {
      throw new Error(`an error occured: ${error}`)
    }

    files.forEach(file => {
      const partial = handlebars.compile(fs.readFileSync(path.join(dirPath, file), 'utf8'))
        
      handlebars.registerPartial('body', partial)
    })
  })
}

module.exports = renderPartials
