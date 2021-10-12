// Requires wikibase-cli >= v15.14.0

const { getClaim } = require('../lib/helpers')

module.exports = {
  commands: [
    'remove-qualifier'
  ],

  args: '<claim-guid> <property-id>',

  description: 'Remove all qualifiers of a given property on a claim',

  examples: [
    {
      args: [ 'Q4115189-522E7907-0158-47CA-B76A-884E9F06E5A4', 'P370' ],
      comment: 'Remove all P370 qualifiers from the Q4115189$522E7907-0158-47CA-B76A-884E9F06E5A4 claim',
      dryRun: false,
    },
  ],

  template: async function (guid, property) {
    const claim = await getClaim(guid)
    if (!claim) throw new Error(`${guid} claim not found`)
    claim.qualifiers[property] = claim.qualifiers[property] || []
    return claim.qualifiers[property].map(qualifier => {
      return {
        guid,
        hash: qualifier.hash
      }
    })
  }
}
