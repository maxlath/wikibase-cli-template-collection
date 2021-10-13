// Requires wikibase-cli >= v15.8.2

// Customize to fit your needs
const languages = [ 'en', 'de', 'fr', 'it', 'es' ]

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<id> <alias>',

  description: `Add the same alias in many languages at once: ${languages.join(', ')}\nEdit this template to customize language list`,

  examples: [
    { args: [ 'Q4115189', '"sandbox box box box"' ], comment: `Add 'sandbox box box box' to Q4115189 aliases in ${languages.join(', ')}` },
  ],

  template: function (id, alias) {
    const editObj = {
      id,
      aliases: {},
      summary: `Add '${alias}' to aliases in ${languages.join(', ')}`,
    }

    for (const lang of languages) {
      editObj.aliases[lang] = { value: alias, add: true }
    }

    return editObj
  }
}
