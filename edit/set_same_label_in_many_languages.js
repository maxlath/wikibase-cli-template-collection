// Sort of the template version of this user script: https://www.wikidata.org/wiki/User:Jitrixis/nameGuzzler.js

// Customize to fit your needs
const languages = [ 'en', 'de', 'fr', 'it', 'es' ]

module.exports = {
  args: '<id> <label>',

  description: `Set the same label in many languages at once: ${languages.join(', ')}\nEdit this template to customize language list`,

  examples: [
    { args: [ 'Q4115189', '"sandbox box box box"' ], comment: `Set Q4115189 ${languages.join(', ')} labels to 'sandbox box box box'` },
  ],

  template: function (id, label) {
    const editObj = {
      id,
      labels: {},
      summary: `Set ${languages.join(', ')} labels to '${label}'`,
    }

    for (const lang of languages) {
      editObj.labels[lang] = label
    }

    return editObj
  }
}
