module.exports = {
  args: '[lang]',

  description: 'Get all properties of the target Wikibase instance',

  examples: [
    { args: 'es' , comment: 'Get all properties from your default Wikibase instance, with labels, descriptions, and aliases in Spanish' },
    { args: '--sparql-endpoint https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql' , comment: 'Get all properties from a Wikibase instance (in this example, from https://wikibase-registry.wmflabs.org)' },
  ],

  template: (lang = 'en') => {
  const language = lang === 'en' ? 'en' : `${lang},en`

  return `SELECT ?property ?propertyLabel ?propertyType ?propertyDescription ?propertyAltLabel WHERE {
  ?property wikibase:propertyType ?propertyType .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${language}". }
}`
  }
}
