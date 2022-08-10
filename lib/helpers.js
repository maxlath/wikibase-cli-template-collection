const fetch = require('node-fetch')
const { getEntityIdFromGuid } = require('wikidata-sdk')
const { getEntities } = require('wikibase-sdk')({
  instance: 'https://www.wikidata.org'
})
const { name, homepage } = require('../package.json')
const headers = {
  'user-agent': `${name} (${homepage.split('#')[0]})`
}

const getJSON = async url => {
  const res = await fetch(url, { headers })
  const { statusCode } = res
  const resText = await res.text()
  if (statusCode >= 400) throw new Error(`${statusCode}: ${resText}`)
  if (resText[0] !== '{') throw new Error(`invalid json: ${resText}`)
  return JSON.parse(resText)
}

const getEntity = async (id, props = 'claims') => {
  const url = getEntities({ ids: id, props })
  const { entities } = await getJSON(url)
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

const cloneObject = obj => JSON.parse(JSON.stringify(obj))

module.exports = {
  getClaim,
  getEntity,
  cloneObject,
}
