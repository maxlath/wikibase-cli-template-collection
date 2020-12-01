// Inspired by https://github.com/generalist/wikidata-misc/blob/e7688cc/labelcleaner.sh

module.exports = function (id, lang) {
  return {
    id,
    labels: {
      [lang]: null
    },
    descriptions: {
      [lang]: null
    },
    aliases: {
      [lang]: null
    },
    summary: `clear ${lang} terms`,
  }
}

module.exports.args = [ '<id>', '<lang>' ]
module.exports.description = 'Clear labels, descriptions, and aliases in a given language'
module.exports.examples = [
  { args: [ 'Q4115189', 'fr' ], comment: 'Clear Q4115189 French labels, descriptions, and aliases' },
]
