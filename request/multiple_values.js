const { isPropertyId, isItemId } = require('wikibase-sdk')

module.exports = {
  args: '<property> <values...>',

  description: 'Find all items for which a given property links to a set of values',

  examples: [
    { args: 'P135 Q3071 Q11365 Q38848' , comment: 'Find all items with a P135 claim with value Q3071, Q11365, or Q38848' },
  ],

  template: (property, ...values) => {
    if (!isPropertyId(property)) throw new Error(`invalid item id: ${property}`)

    if (values.length === 0)  throw new Error(`no value passed`)

    values.forEach(value => {
      if (!isItemId(value)) throw new Error(`invalid item id: ${value}`)
    })

    values = values
      .map(value => `(wd:${value})`)
      .join(' ')

    return `SELECT ?item WHERE {
  VALUES (?value) { ${values} }
  ?item wdt:${property} ?value .
}`
  }
}
