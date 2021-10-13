const { getEntity } = require('../lib/helpers')
const { simplify } = require('wikibase-sdk')

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<entity id> <property id> <value>',

  description: "Add a statement if it doesn't already exist",

  examples: [
    { args: [ 'Q4115189', 'P370', 'foo' ], comment: "Add P370=foo, only if no statement with that property and value already exist" },
  ],

  template: async (id, property, value) => {
    const existingClaim = await findExistingClaim(id, property, value)
    if (existingClaim != null) {
      console.warn('a statement with that value already exist:', existingClaim.id)
      // Return an empty list of edits
      return []
    } else {
      // Return a single edit object, with the desired claim value
      return {
        id,
        claims: {
          [property]: value
        }
      }
    }
  }
}

const findExistingClaim = async (id, property, value) => {
  const entity = await getEntity(id)
  const propertyClaims = entity.claims[property]
  if (!propertyClaims) return
  const existingClaim = propertyClaims.find(claim => {
    return simplify.claim(claim) === value
  })
  return existingClaim
}
