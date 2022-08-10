const { getEntityIdFromGuid, simplify } = require('wikidata-sdk')
const { getClaim, cloneObject } = require('../lib/helpers')


// HOW-TO:
//
// with ./data a file with one entry per line, with each line on the pattern <guid> <changeDay> <newP4100>:
//
//   Q515478-BE3CD634-C187-4A1E-86E9-4DCB12B1EB3B 2021-12-14 Q11744714
//
//   cat ./data | wd ee ./update_P39.js -b
//
//

module.exports = async function (guid, changeDay, newP4100) {
  const itemId = getEntityIdFromGuid(guid)
  let claim = await getClaim(guid)
  if (!claim) throw new Error(`${guid} claim not found`)
  claim = simplify.claim(claim, { keepAll: true })
  // Bug in wikibase-edit that doesn't accept a type on the simplified claim object,
  // will be fix in next release
  delete claim.type
  const newClaim = cloneObject(claim)
  delete newClaim.id
  delete newClaim.references
  claim.qualifiers.P582 = changeDay
  newClaim.qualifiers.P580 = changeDay
  newClaim.qualifiers.P4100 = newP4100
  return {
    id: itemId,
    claims: {
      P39: [
        claim,
        newClaim,
      ]
    }
  }
}
