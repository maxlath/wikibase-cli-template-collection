// Inspired by https://github.com/generalist/wikidata-misc/blob/e7688cc/labelcleaner.sh
// Requires wikibase-cli >= v15.6.0

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<id> <lang>',

  description: 'Clear labels, descriptions, and aliases in a given language',

  examples: [
    { args: [ 'Q4115189', 'fr' ], comment: 'Clear Q4115189 French labels, descriptions, and aliases' },
  ],

  template: function (id, lang) {
    return {
      id,
      summary: `clear ${lang} terms`,
      labels: {
        [lang]: null
      },
      descriptions: {
        [lang]: null
      },
      aliases: {
        [lang]: null
      },
    }
  }
}
