// Requires wikibase-cli >= v15.16.0

module.exports = {
  commands: [
    'add-claim'
  ],

  args: '<entity id> <property id> <value>',

  description: "Add a statement if it doesn't already exist",

  examples: [
    { args: [ 'Q4115189', 'P370', 'foo' ], comment: "Add P370=foo, only if no statement with that property and value already exist" },
  ],

  template: async (id, property, value) => {
    return {
      id,
      reconciliation: {
        mode: 'skip-on-value-match'
      },
      property,
      value,
    }
  }
}
