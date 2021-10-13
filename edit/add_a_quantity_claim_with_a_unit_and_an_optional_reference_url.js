// Requires wikibase-cli >= v15.8.3

const { isItemId, isPropertyId } = require('wikibase-sdk')

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: [ '<id>', '<property>', '<quantity>', '<unit>', '[reference url]' ],

  description: 'Add a quantity claim with a unit and an optional reference URL',

  examples: [
    { args: [ 'Q4115189', 'P2583', 123, 'Q531' ], comment: "add a statement that Q4115189's distance from Earth is 123 light-years" },
    { args: [ 'Q4115189', 'P2583', 123, 'Q531', 'https://html5zombo.com/' ], comment: 'same but with a reference URL and a retrived date set to today' },
  ],

  template: (id, property, quantity, unit, refUrl) => {
    if (!isItemId(id)) throw new Error(`invalid item id: ${id}`)
    if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
    if (!isItemId(unit)) throw new Error(`invalid unit item id: ${unit}`)

    const claim = {
      value: {
        amount: parseFloat(quantity),
        unit: unit
      }
    }
    if (refUrl) {
      claim.references = {
        // reference URL
        P854: refUrl,
        // retrieved: today
        P813: new Date().toISOString().split('T')[0]
      }
    }
    return {
      id,
      summary: `Add ${property} quantity claim: ${quantity} (unit=${unit})`,
      claims: {
        [property]: claim
      }
    }
  }
}
