const { isItemId } = require('wikibase-sdk')

module.exports = {
  args: '<id>',

  description: 'Find all items are instance of, or subclass of an item that is instance of, the passed entity',

  examples: [
    { args: 'Q34770' , comment: 'Find all instances of languages' },
  ],

  template: id => {
    if (!isItemId(id)) throw new Error(`invalid item id: ${id}`)

    return `SELECT ?item WHERE {
  ?item wdt:P31/wdt:P279* wd:${id} .
}`
  }
}
