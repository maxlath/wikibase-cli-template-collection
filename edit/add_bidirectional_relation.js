// Requires wikibase-cli >= v15.10.0

const { isEntityId, isPropertyId } = require('wikibase-sdk')

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<relation-property-id> <entity-id-a> <entity-id-b>',

  description: 'Add a bidirection relation',

  examples: [
    { args: [ 'P1889', 'Q1', 'Q2' ], comment: 'Create 2 claims: Q1-P1889->Q2 and Q2-P1889->Q1' },
  ],

  template: function (property, entityA, entityB) {
    if (!isPropertyId(property)) throw new Error(`invalid property id: ${property}`)
    if (!isEntityId(entityA)) throw new Error(`invalid entity id: ${entityA}`)
    if (!isEntityId(entityB)) throw new Error(`invalid entity id: ${entityB}`)

    return [
      { id: entityA, claims: { [property]: entityB } },
      { id: entityB, claims: { [property]: entityA } },
    ]
  }
}
