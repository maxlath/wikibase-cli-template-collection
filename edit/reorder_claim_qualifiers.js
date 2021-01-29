// /!\ WIP: doesn't work, triggers "nochange" responses
// You can try it with:
//
//     wd edit-entity ./edit/reorder_claim_qualifiers.js Q4115189#P39 P580 P582
//

const fetch = require('node-fetch')
const { isItemId, isPropertyId, getEntities } = require('wikibase-sdk')({
  instance: 'https://www.wikidata.org'
})

module.exports = {
  args: '<property claims id> <qualifiers properties ids...>',

  description: 'Reorder qualifiers',

  examples: [
    { args: [ 'Q4115189#P39', 'P580', 'P582' ], comment: 'Reorder qualifiers to have P580 first (if set), P582 next (if set)' },
  ],

  template: async (...args) => {
    const { itemId, claimsPropertyId, qualifiersPropertiesIds } = sanitize(...args)

    const entity = await getEntity(itemId, claimsPropertyId)

    entity.claims[claimsPropertyId] = entity.claims[claimsPropertyId]
      .map(reorderClaimQualifiers(qualifiersPropertiesIds))

    entity.rawMode = true

    return entity
  }
}

const sanitize = (propertyClaimsId, ...qualifiersPropertiesIds) => {
  const [ itemId, claimsPropertyId ] = propertyClaimsId.split('#')
  if (!isItemId(itemId)) throw new Error(`invalid item id: ${itemId}`)
  if (!isPropertyId(claimsPropertyId)) throw new Error(`invalid claims property id: ${claimsPropertyId}`)
  if (qualifiersPropertiesIds.length === 0) throw new Error('missing qualifiers properties ids')
  qualifiersPropertiesIds.forEach(propertyId => {
    if (!isPropertyId(propertyId)) throw new Error(`invalid property id: ${propertyId}`)
  })
  return { itemId, claimsPropertyId, qualifiersPropertiesIds }
}

const getEntity = async (itemId, claimsPropertyId) => {
  const url = getEntities({ ids: itemId, props: 'claims' })
  const { entities } = await fetch(url).then(res => res.json())
  const entity = entities[itemId]
  if (entity == null) throw new Error('entity not found')
  const propertyClaims = entity.claims[claimsPropertyId]
  if (propertyClaims == null) throw new Error(`property claims not found on ${entity.id}`)
  // Keep only the claims from the property we want to edit
  entity.claims = {
    [claimsPropertyId]: propertyClaims
  }
  return entity
}

// Trying to modifying boy 'qualifiers-order' and the qualifier object, but fails
const reorderClaimQualifiers = qualifiersPropertiesIds => claim => {
  const { qualifiers } = claim
  const orderedQualifiers = {}
  qualifiersPropertiesIds.forEach(propertyId => {
    if (qualifiers[propertyId] != null) {
      orderedQualifiers[propertyId] = qualifiers[propertyId]
      delete qualifiers[propertyId]
    }
  })
  claim.qualifiers = { ...orderedQualifiers, ...qualifiers }

  const currentOrder = claim['qualifiers-order']
  const newOrder = qualifiersPropertiesIds.filter(propertyId => currentOrder.includes(propertyId))
  currentOrder.forEach(propertyId => {
    if (!newOrder.includes(propertyId)) newOrder.push(propertyId)
  })
  claim['qualifiers-order'] = newOrder

  return claim
}
