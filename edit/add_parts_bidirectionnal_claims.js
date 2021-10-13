// Requires wikibase-cli >= v15.10.0

const { isItemId } = require('wikibase-sdk')

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<hasPartItem> <partOfItem>',

  description: "Add 'has part' (P527) / 'part of' (P361) claims to a pair of items",

  examples: [
    {
      args: [ 'Q1', 'Q3' ],
      comment: 'Create 2 claims: Q1-P527->Q3 and Q3-P361->Q1'
    },
  ],

  template: function (hasPartItem, partOfItem) {
    if (!isItemId(hasPartItem)) throw new Error(`invalid item id: ${hasPartItem}`)
    if (!isItemId(partOfItem)) throw new Error(`invalid item id: ${partOfItem}`)

    return [
      { id: hasPartItem, claims: { P527: partOfItem } },
      { id: partOfItem, claims: { P361: hasPartItem } },
    ]
  }
}
