# wikibase-cli template collection

A collection of [wikibase-cli](https://github.com/maxlath/wikibase-cli) templates:
* [templates to create entities](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/create)
* [templates to edit entities](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/edit)
* [templates to generate and run SPARQL requests](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/request)

The aim of this collection is to
* document best practices
* offer general purpose templates
* offer more niche templates as examples of what's possible

Some (if not most) templates might be targeting a specific Wikibase instance (most likely Wikidata).

Contributions and [template requests](https://github.com/maxlath/wikibase-cli-template-collection/issues/new) welcome!

## Install

First, you need to have [NodeJS >= v8](https://nodejs.org/), which should come with the npm package manager.

If [wikibase-cli](https://github.com/maxlath/wikibase-cli) isn't already installed and configured:
```sh
npm install --global wikibase-cli

# Set the default Wikibase instance
wb config instance https://www.wikidata.org
# If you want to use templates to create/edit entities, you need to setup credentials
# Get the credential prompt for the desired target instance
wb config credentials https://www.wikidata.org
```

Get a copy of those templates
```sh
git clone https://github.com/maxlath/wikibase-cli-templates
cd wikibase-cli-templates
# Required for templates that `require` dependencies, see the list in package.json
npm install
```

And now let's get started!

## Create / Edit entities

```sh
cd wikibase-cli-templates/edit

# Display the help menu of a template
wb edit-entity ./clear_language_terms.js --help

# Get a preview of the generated edit
wb edit-entity ./clear_language_terms.js Q4115189 fr --dry

# Actually make the edit
wb edit-entity ./clear_language_terms.js Q4115189 fr
```

Adapting the example above for batch mode:
```sh
# Make a batch of arguments for the template
echo '
Q4115189 fr
Q4115189 en
Q4115189 de
Q13406268 fr
Q13406268 en
Q13406268 de
' > ids_and_langs_to_clear

# Get a preview of the generated edits
cat ids_and_langs_to_clear | wb edit-entity ./clear_language_terms.js --batch --dry
# Actually run the edit batch
cat ids_and_langs_to_clear | wb edit-entity ./clear_language_terms.js --batch --summary 'clear all those undesired terms'
```

Templates:
* [templates to create entities](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/create)
* [templates to edit entities](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/edit)

Learn more:
* [wb create-entity](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-create-entity)
* [wb edit-entity](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-edit-entity), specifically [Generate an edit object from a JS template function](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#generate-an-edit-object-from-a-js-template-function)
* [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode)
* [wb generate-template](https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#wd-generate-template)

## Request

```sh
cd wikibase-cli-templates/request

# Display the help menu of a template
wb sparql ./all_instances.js Q34770 --help

# Get a preview of the generated SPARQL request
wb sparql ./all_instances.js Q34770 --dry

# See that request on the Query Service webpage
wb sparql ./all_instances.js Q34770 --open

# Save the generated SPARQL request
wb sparql ./all_instances.js Q34770 --dry > Q34770_instances.rq

# Run the query and save as a list of ids
wb sparql ./all_instances.js Q34770 > Q34770_instances

# Same but with a JSON output. Available formats: json, xml, tsv, csv, binrdf, table
wb sparql ./all_instances.js Q34770 --format json > Q34770_instances.json
```

Templates:
* [request template collection](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/request)

Learn more:
* [wb sparql](https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#wb-sparql), specifically [dynamic request from a JS template](https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#dynamic-request-from-a-js-template)


## See also
* [wikidata-scripting](https://github.com/maxlath/wikidata-scripting): examples of scripts to edit Wikidata
* [wikidata-misc](https://github.com/generalist/wikidata-misc): various Wikidata maintenance/upload scripts
