const fetch = require('node-fetch')
const { getEntityIdFromGuid } = require('wikidata-sdk')
const { getEntities } = require('wikibase-sdk')({
  instance: 'https://www.wikidata.org'
})

const getEntity = async (id, props = 'claims') => {
  const url = getEntities({ ids: id, props })
  const { entities } = await fetch(url).then(res => res.json())
  const entity = entities[id]
  if (entity != null) return entity
  else throw new Error('entity not found')
}

const getClaim = async guid => {
  normalizedGuid = normalizeGuid(guid)
  const id = getEntityIdFromGuid(guid)
  const entity = await getEntity(id)
  for (const propertyClaims of Object.values(entity.claims)) {
    for (const claim of propertyClaims) {
      if (normalizeGuid(claim.id) === normalizedGuid) return claim
    }
  }
}

const normalizeGuid = guid => guid.replace(/\$/g, '-').toLowerCase()

module.exports = {
  getClaim,
  getEntity,
}
