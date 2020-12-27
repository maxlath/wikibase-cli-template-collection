// Requires wikibase-cli >= v15.10.0

const { isItemId, isPropertyId } = require('wikibase-sdk')

module.exports = {
  args: '<relation-property-id> <item-id-a> <item-id-b>',

  description: 'Add a bidirection relation',

  examples: [
    { args: [ 'P1889', 'Q1', 'Q2' ], comment: 'Create 2 claims: Q1-P1889->Q2 and Q2-P1889->Q1' },
  ],

  template: function (property, itemA, itemB) {
    if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
    if (!isItemId(itemA)) throw new Error(`invalid item id: ${itemA}`)
    if (!isItemId(itemB)) throw new Error(`invalid item id: ${itemB}`)

    return [
        { id: itemA, claims: { [property]: itemB } },
        { id: itemB, claims: { [property]: itemA } },
    ]
  }
}
