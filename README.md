# @funboxteam/blueprinter

[![npm (scoped)](https://img.shields.io/npm/v/@funboxteam/blueprinter)](https://www.npmjs.com/package/@funboxteam/blueprinter)
[![Coverage Status](https://coveralls.io/repos/github/funbox/blueprinter/badge.svg?branch=master)](https://coveralls.io/github/funbox/blueprinter?branch=master)

<img align="right" width="160" height="160"
     alt="Blueprinter avatar"
     src="./logo.png">

**Blueprinter** is an [API Blueprint](https://apiblueprint.org/) renderer. It uses API AST in the form of
[API Elements](https://apielements.org/) and generates an HTML page with documentation.

[По-русски](./README.ru.md)

## Rationale

API Blueprint standard is mostly maintained by [Apiary](https://apiary.io/), which owns the official parser
[Drafter](https://github.com/apiaryio/drafter). Other enthusiasts help to develop some [tools](https://apiblueprint.org/tools.html)
to work with API Blueprint, including renderers.

For a long time, our company had been using Drafter and [aglio](https://github.com/danielgtaylor/aglio) renderer as
a standard set to work with APIB documentation. But we gradually started to understand that functionalities of these tools
weren't enough for us.

**Blueprinter** appeared as a replacement for aglio, since its source code is difficult to read and maintain and used
technologies are obsolete. The author of the project has abandoned it and does not accept new change requests.
We also replaced Drafter with our own parser [Crafter](https://github.com/funbox/crafter).

Our implementations are written in JavaScript and they are easy to maintain and develop by front-end developers.

## Features

- **Modern design.** Dark theme included!
- **Search in documentation.** You can use part of URL or a title to find groups, resources or actions, and quickly access them.
- **Print version.** This version removes all unnecessary content and leaves obligatory content in adapted mode.
- **One Of options selector.** Our tool allows you to select different options of
[One Of](https://apiblueprint.org/documentation/mson/specification.html#52-one-of-type) element and generate response body dynamically.
- **Manual search page.** You may found that the search field is not enough when it comes to finding a part of a description
or a particular attribute. Manual search page allows you to use standard browser finder to search through text.
- **Information about parsing warnings and errors.** Parsing warnings pop up as a notification. Parsing error which blocks
page rendering shows up as a separate page with detailed information.

## Installation

```shell
npm install --save @funboxteam/blueprinter
```

## Usage

Add the next commands in `package.json`:

```json
{
  "scripts": {
    "dev": "blueprinter -i doc.apib -s -p 3000",
    "doc": "blueprinter -i doc.apib -o index.html"
  }
}
```

`dev` script will run a live server with rendered docs at port 3000 and watch changes in source documentation.
`doc` script will generate resulting HTML file with documentation and save it as `index.html`.

## CLI options

- `-i, --input <file>` — sets the source APIB file to render.
- `-o, --output <file>` — sets the name of the output HTML file.
- `-s, --server` — activates live server mode.
- `-h, --host <host>` — sets live server host. Default value is `127.0.0.1`.
- `-p, --port <port>` — sets live server port. Default value is `3000`.
- `--strict` — enables parsing "strict" mode in which any warning will cause build error.
- `--css <file>` — allows to specify path to a custom CSS file. Styles from this files will be attached to page.
Any possible compatibility issues between relevant Blueprinter version and a custom CSS file remain on the conscience of the file developer.
- `--locale <locale>` — sets a locale to be used as UI language. Default value is `en`. Available locales are `en`, `ru`.
- `--favicon <file>` — allows to specify path to a custom favicon. Applicable only in build mode, not in dev mode. Accepts only PNG files.

## Run in Docker

To run Blueprinter as a Docker container execute the next command in the directory with documentation:

```shell
docker run \
  --rm \
  -v $(pwd):/app \
  funbox/blueprinter -i doc.apib -o index.html
```

`--rm` option will automatically clean up and remove created container after render completion, and `-v` option will
mount current host directory with documentation to some directory in the container.

The default working directory of the image is set to `/app`, therefore it is easier to mount
a host directory into the `/app` as in the example above. In that case just the name `you-doc-file.apib` will work fine.
Otherwise, you should specify path to the APIB file relative to the created in the container path.

### Docker and dev server mode

To run Blueprinter in Docker as a dev server execute the next command in the directory with documentation:

```shell
docker run \
  --rm \
  -v $(pwd):/app \
  -p 3000:3000 \
  funbox/blueprinter -i doc.apib -s -p 3000
```

If you specify `-p` parameter for Blueprint which differs from `3000`, don't forget to open access to this port
from your host system and modify Docker option `-p port:port`.

**Attention!** When you stop a dev server process via `Ctrl/Cmd + C`, the process just detaches from a terminal
but the container itself still stays running.

To stop container use the next commands:

```shell
docker ps # get ID of the running container
docker stop <container> # stop container with specific ID
```

### Docker container in Windows

To run a container in Windows, add a slash (`/`) before `pwd`:

```shell
docker run \
  --rm \
  -v /$(pwd):/app \
  funbox/blueprinter -i doc.apib -o index.html
```

There is a chance that the mounted directory is empty. In this case, check that your hard drive is marked as shared.
This setting can be found in the settings of Docker Desktop for Windows, Shared Drives section.
If the disk is not shared, mark it as `shared`, apply changes, and restart Docker Desktop.

## Functional capabilities

### Quick access to groups, resources and actions

HTML page with rendered documentation has a field to search certain resources. You can set focus on the search field with `/` key.

The search is performed on the following entities:

- Titles and descriptions of groups, resources and actions.
- href of actions.

Search result appear in the next order:

1. Matching of href of actions.
2. Matching of titles of groups, resources and actions.
3. Matching of descriptions of groups, resources and actions.

If a simple search query as `empl` of `/list` is not enough, you can apply search modifiers (filters).
The general form of a query is `modType:modValue query` where `query` is the desired search query. You can filter results
by resource type and by HTTP method.

- To filter by type use `type:action query`. Available values are `type:group query`,
`type:resource query`, `type:action query`.
- To filter by method use `method:METHOD query` where `METHOD` is one of HTTP methods (GET, POST, DELETE, and so on).
Both lowercase and uppercase will do.

So, to list only GET requests with href containing `employ`, type in the search field:

```text
method:get employ
```

To apply modifier, search query should start with `modType`. It means that if you need to find in doc the phrase
`method:get - filter example`, you can use whitespace as the first symbol of the query (` method:get - filter example`).
In this case no modifiers will be applied, leading whitespace won't be considered, and search will be performed
exactly on the phrase `method:get - filter example`.

### Search via `Ctrl/Cmd + F`

APIB documentation can contain a lot of diverse entities, so the search field probably won't be helpful in some cases
where you need to find an attribute value or a URI parameter. To find something manually we added a separate page with
sequential list of all content of a documentation. To access this page, press icon button right to the search field.

The page contains all groups, resources, requests, and responses outputted consequently. All attributes in Attributes
sections are expanded. Therefore, you can search through documentation by browser means, e.g. using `Ctrl + F` key combination.

### Save as PDF

PDF-version of a documentation is optimized for easy viewing. List of content at the beginning of a doc provides easy
access to the selected section. All blocks with JSON schemas are hidden.

To save documentation as PDF in Chrome browsers, follow the next steps:

- navigate to the manual search page via icon button next to the search field;
- in browser context menu select print option;
- in the print dialog select destination "Save as PDF" and layout mode "Portrait";
- save documentation with selected settings.

## Development

### Dependency installation

```shell
npm install
```

### Run in dev mode

```shell
npm start
```

Default dev server address is http://localhost:8080.

### Build

To build project locally run

```shell
npm run build
```

### i18n support

This project supports multiple locales for UI texts (for now, English and Russian languages are provided).

To mark text as translated, use `t` or `Trans` from [@lingui/macro](https://lingui.js.org/ref/macro.html#overview).
To make translation appear in the actual interface, the next steps should be done:

- run `npm run extract` to update JSON translations catalogs (see `src/locales/{locale}/messages`);
- fill in missed translations for new texts;
- run `npm run compile` to compile translation catalogs to JavaScript files;
- commit all changes.

## Why API Blueprint

We use JSON API widely in the company, so each day our developers face such issues as describing and approving API documentation,
tracking changes, distributing documentation among partners, and so on. That is why we felt a strong need for convenient tools
to work with documentation.

Historically, the battle was between [API Blueprint](https://apiblueprint.org/) and [Swagger](https://swagger.io/).
We chose API Blueprint for two reasons. Firstly, the source code of documentation that is described using API Blueprint is more readable to humans.
Secondly, at the time of research conducted, Swagger lacked several important features, as `One Of` support.

## Credits

Awesome logo for the project was made by [Igor Garybaldi](https://pandabanda.com/).

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
