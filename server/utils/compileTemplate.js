const handlebars = require('handlebars')

const compileTemplate = (fileContent, data) => handlebars.compile(fileContent)(data)

module.exports = compileTemplate
