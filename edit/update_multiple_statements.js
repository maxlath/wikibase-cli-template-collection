// See https://github.com/maxlath/wikibase-cli/issues/165
const { simplify } = require('wikibase-sdk')
const { getEntityClaims } = require('../lib/helpers')

module.exports = async (json) => {
  const { item, s1, s2 } = JSON.parse(json)
  const claimsByGuid = await getEntityClaims([ s1, s2 ])

  if (!claimsByGuid[s1]) throw new Error(`claim s1 not found: ${s1}`)
  if (!claimsByGuid[s2]) throw new Error(`claim s2 not found: ${s2}`)
  const s1Claim = claimsByGuid[s1]
  const s2Claim = claimsByGuid[s2]
  const s1ClaimFormatted = simplify.claim(s1Claim, { keepAll: true })
  const s2ClaimFormatted = simplify.claim(s2Claim, { keepAll: true })

  s1ClaimFormatted.rank = 'preferred'
  s1ClaimFormatted.qualifiers.P585[0].value = '2021-03-26'

  s2ClaimFormatted.rank = 'normal'

  return {
    id: item,
    claims: {
      P1082: [
        s1ClaimFormatted,
        s2ClaimFormatted,
      ]
    }
  }
}
