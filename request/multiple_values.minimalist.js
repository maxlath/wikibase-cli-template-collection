// Same as ./multiple_values.js but without the validation and --help menu

module.exports = (property, ...values) => {
  values = values
    .map(value => `(wd:${value})`)
    .join(' ')

  return `SELECT ?item WHERE {
    VALUES (?value) { ${values} }
    ?item wdt:${property} ?value .
  }`
}
