// Run:
//   wd ee --dry diff_enwiki_officeholder_infobox_and_wikidata_P39.js https://en.wikipedia.org/wiki/Jaak_Aab

const wtfwp = require('wtf_wikipedia')
const { getSitelinkData, getEntitiesFromSitelinks, simplify } = require('wikidata-sdk')
const fetch = require('node-fetch')

module.exports = {
  commands: [
    'edit-entity'
  ],

  args: '<url>',

  template: async url => {
    const entity = await getWikidataItemFromArticleUrl(url)
    const doc = await wtfwp.fetch(url)
    const officeholderInfobox = parseInfoboxesData(doc)
      .find(infobox => infobox.office != null || infobox.office1 != null)

    // console.log('officeholderInfobox data', officeholderInfobox)

    const offices = Object.keys(officeholderInfobox)
        .filter(key => key.startsWith('office'))
        .map(key => officeholderInfobox[key].links.find(link => link.type === 'internal'))

    await Promise.all(offices.map(addWikidataId))

    const wikidataP39Ids = simplify.propertyClaims(entity.claims.P39)
    const wikipediaOfficesInfoboxIds = offices.map(({ wikidata }) => wikidata)

    console.log(`${entity.id} wikidata offices`, wikidataP39Ids)
    console.log(`${url} wikipedia offices`, wikipediaOfficesInfoboxIds)

    const missingInWikipedia = wikidataP39Ids.filter(id => !wikipediaOfficesInfoboxIds.includes(id))
    const missingInWikidata = wikipediaOfficesInfoboxIds.filter(id => !wikidataP39Ids.includes(id))

    console.log({ missingInWikipedia, missingInWikidata })
  }
}

const parseInfoboxesData = doc => {
  const { sections } = doc.json()
  const sectionsInfoboxes = sections.map(section => section.infoboxes)
  return compactFlatten(sectionsInfoboxes)
}

const compactFlatten = arrayOfArrays => [].concat(...arrayOfArrays).filter(obj => obj != null)

const getWikidataItemFromArticleUrl = async articleUrl => {
  const { key, title } = getSitelinkData(articleUrl)
  return getWikidataItemFromTitle({ site: key, title, props: [ 'info', 'claims' ] })
}

const getWikidataItemFromTitle = async ({ site, title, props }) => {
  const url = getEntitiesFromSitelinks({ sites: site, titles: title, props })
  const { entities } = await fetch(url).then(res => res.json())
  return Object.values(entities)[0]
}

const addWikidataId = async office => {
  const { id } = await getWikidataItemFromTitle({ site: 'enwiki', title: office.page, props: 'info' })
  office.wikidata = id
}
