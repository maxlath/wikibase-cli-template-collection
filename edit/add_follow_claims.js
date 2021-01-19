// Requires wikibase-cli >= v15.10.0

const { isItemId } = require('wikibase-sdk')

module.exports = {
  args: '<ordered items ids...>',

  description: 'Add follows (P155) / followed by (P156) claims to a serie of items',

  examples: [
    {
      args: [ 'Q1', 'Q2', 'Q3' ],
      comment: 'Create 4 claims in 3 edits'
    },
  ],

  template: function (...orderedItemsIds) {
    orderedItemsIds.forEach(itemId => {
      if (!isItemId(itemId)) throw new Error(`invalid item id: ${itemId}`)
    })

    const edits = orderedItemsIds.map((itemId, index) => {
      const edit = { id: itemId, claims: {} }
      if (orderedItemsIds[index - 1]) edit.claims.P155 = orderedItemsIds[index - 1]
      if (orderedItemsIds[index + 1]) edit.claims.P156 = orderedItemsIds[index + 1]
      return edit
    })

    return edits
  }
}
