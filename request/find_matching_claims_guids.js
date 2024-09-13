const { isPropertyId } = require('wikibase-sdk')

module.exports = {
  commands: [
    'sparql'
  ],

  args: '<property> <value>',

  description: 'Find all claim GUIDs for claims matching this property and value',

  examples: [
    { args: 'P212 978-0-306-47537-5' , comment: 'Find all claims with P212="978-0-306-47537-5"' },
  ],

  template: (property, value) => {
    if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
    if (value == null) throw new Error('missing value')

    return `SELECT ?statement WHERE {
  ?item p:${property} ?statement .
  ?statement ps:${property} "${value}" .
}`
  }
}
