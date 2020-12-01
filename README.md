# wikibase-cli template collection

A collection of [wikibase-cli](https://github.com/maxlath/wikibase-cli) templates.

## Install

If wikibase-cli isn't already installed and configured:
```sh
npm install --global wikibase-cli

# Set the default Wikibase instance
wb config instance https://www.wikidata.org
# Get credentials prompt for that instance
wb config credentials https://www.wikidata.org
```

Get a copy of those templates
```sh
git clone https://github.com/maxlath/wikibase-cli-templates
```

## Demo
And now let's get started!

### Create
*Documentation: [wb create-entity](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-create-entity)*

```sh
cd wikibase-cli-templates/create

# Display the help menu of a template
wb create-entity ./latin_script_female_given_name.js --help

# Get a preview of the generated edit
wb create-entity ./latin_script_female_given_name.js "Clarenza" --dry

# Actually make the edit
wb create-entity ./latin_script_female_given_name.js "Clarenza"
```

### Edit
*Documentation: [wb edit-entity](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-edit-entity)*


```sh
cd wikibase-cli-templates/edit

# Display the help menu of a template
wb edit-entity ./clear_language_terms.js --help

# Get a preview of the generated edit
wb edit-entity ./clear_language_terms.js Q4115189 fr --dry

# Actually make the edit
wb edit-entity ./clear_language_terms.js Q4115189 fr
```

### Batch
*Documentation: [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode)*

Adapting the **edit** example above for batch mode:
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

## See also
* [wikidata-scripting](https://github.com/maxlath/wikidata-scripting): examples of scripts to edit Wikidata
* [wikidata-misc](https://github.com/generalist/wikidata-misc): various Wikidata maintenance/upload scripts
