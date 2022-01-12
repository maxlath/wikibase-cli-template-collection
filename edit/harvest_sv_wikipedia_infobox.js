// Based on https://github.com/maxlath/wikidata-scripting/tree/master/harvest_infobox

const wtfwp = require('wtf_wikipedia')
const { getSitelinkData, getEntitiesFromSitelinks } = require('wikidata-sdk')
const fetch = require('node-fetch')
// Make console.log output the full log objects
require('util').inspect.defaultOptions.depth = 20

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<url>',

  description: 'This template aims to demonstrate how to harvest Wikipedia infoboxes',

  examples: [
    { args: [ 'https://sv.wikipedia.org/wiki/Gulan_Avci' ], comment: 'Clear Q4115189 French labels, descriptions, and aliases' },
  ],

  template: async url => {
    const id = await getWikidataId(url)
    const doc = await wtfwp.fetch(url)
    const infoboxes = parseInfoboxesData(doc)

    console.log('infoboxes data', infoboxes)

    // Customize to select the desired attributes
    // which you desire to map to attributes of the Wikidata item
    const namn = getFirstInfoboxValue(infoboxes, 'namn')
    const bild = getFirstInfoboxValue(infoboxes, 'bild')

    console.log({ id, namn, bild })

    // Return empty if we didn't find the expected data
    // to prevent a junk edit
    if (!namn || !bild) return

    return {
      id,
      labels: {
        sv: namn
      },
      claims: {
        P18: bild
      }
    }
  }
}

const parseInfoboxesData = doc => {
  const { sections } = doc.json()
  const sectionsInfoboxes = sections.map(section => section.infoboxes)
  return compactFlatten(sectionsInfoboxes)
}

const compactFlatten = arrayOfArrays => [].concat(...arrayOfArrays).filter(obj => obj != null)

const getFirstInfoboxValue = (infoboxes, attribute) => {
  for (const infobox of infoboxes) {
    if (infobox[attribute]) return infobox[attribute].text
  }
}

const getWikidataId = async articleUrl => {
  const { key, title } = getSitelinkData(articleUrl)
  const url = getEntitiesFromSitelinks({ sites: key, titles: title, props: 'info'  })
  const { entities } = await fetch(url).then(res => res.json())
  const id = Object.keys(entities)[0]
  return id
}
