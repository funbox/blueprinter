# Changelog

## 2.15.5 (15.08.2019)

* Fix rendering of enum elements in Attributes section.

## 2.15.4 (07.08.2019)

* Fix null values rendering when "minimum" parameter is used.

## 2.15.3 (30.07.2019)

* Fix generation of URI parameters description.

## 2.15.2 (29.07.2019)

* Correctly require @funbox/free-port-finder lib.

## 2.15.1 (29.07.2019)

* Update version of @funbox/free-port-finder.

## 2.15.0 (23.07.2019)

* Create a directory for the output file.

## 2.14.1 (08.07.2019)

* Render URI parameters with star modifier in the resulting url.

## 2.14.0 (17.06.2019)

* Add attributes `non-nullable` and `optional` to object fields.

## 2.13.0 (14.06.2019)

* Display JSON schema of Message sections.

## 2.12.0 (11.06.2019)

* Display errors and warnings from Crafter.

## 2.11.2 (08.06.2019)

* Generate correct body for a primitive type that lacks sample.

## 2.11.1 (06.06.2019)

* Fix rendering of menu with resources which contain only a description.

## 2.11.0 (04.06.2019)

* Display SubGroup and Message sections.

## 2.10.3 (04.06.2019)

* Fix parsing of an empty response body in Crafter.

## 2.10.2 (29.05.2019)

* Fix parsing of attributes of named types.

## 2.10.1 (25.05.2019)

* Fix missing indentation of code block.

## 2.10.0 (23.05.2019)

* Add installation and usage info to readme.

## 2.9.2 (20.05.2019)

* Fix parsing of a URI parameter with star (*) operator.

## 2.9.1 (14.05.2019)

* Fix negative margins applied to Action and Transition cards.

## 2.9.0 (13.05.2019)

* Convert values of untyped elements of an array.
* Fix JSON schema generated for fixed and fixed-type elements.
* Fix parsing of code block in a block description.

## 2.8.0 (07.05.2019)

* Display `:::note` and `:::warning` sections in documentation.

## 2.7.1 (02.05.2019)

* Fix rendering of long URLs.

## 2.7.0 (02.05.2019)

* Update sandbox.

## 2.6.0 (29.04.2019)

* Improve ResourcePrototype section processing.
* Improve check for identical attributes during inheritance resolving.
* Improve attributes check during attributes comparison.
* Improve passing `fixed-type` attribute to nested elements.
* Display blocks in description.
* Convert nested elements of an enum.

## 2.5.0 (17.04.2019)

* Optimize page first render.

## 2.4.0 (16.04.2019)

* Improve parameter name display.

## 2.3.2 (11.04.2019)

* Fix generation of a set of enumerable values of an array.

## 2.3.1 (11.04.2019)

* Fix inheritance from enumerables.
* Fix inheritance from named types.

## 2.3.0 (08.04.2019)

* Delete `fixed-type` keyword from array definition.

## 2.2.0 (06.04.2019)

* Display parameterized attributes in the right column.

## 2.1.7 (18.03.2019)

* Render request schema.

## 2.1.6 (13.03.2019)

* Use default values in body and JSON schema.

## 2.1.5 (07.03.2019)

* Improve Default section and allow to include Default and Sample into primitives.
* Fix attributes parsing.
* Show a warning if action has no responses.
* Fix processing of named primitive types.

## 2.1.4 (01.03.2019)

* Fix rendering a documentation without any resource group.

## 2.1.3 (01.03.2019)

* Fix rendering of an empty action.

## 2.1.2 (01.03.2019)

* Fix parsing of named endpoints.

## 2.1.1 (27.02.2019)

* Process an enumerable URI parameter with missing `+ Members` keyword.

## 2.1.0 (27.02.2019)

* Improve rendering parameters with enum values.

## 2.0.3 (27.02.2019)

* Extract value of a URI parameter in case of a complex type.

## 2.0.2 (26.02.2019)

* Fix import processing.

## 2.0.1 (26.02.2019)

* Process nested elements of a href parameter as a description.

## 2.0.0 (22.02.2019)

* Replace drafter with crafter.

## 1.6.0 (21.02.2019)

* Highlight `required` attributes.

## 1.5.1 (16.02.2019)

* Fix error of a missing script.

## 1.5.0 (09.01.2019)

* Add node.js 10 support.

## 1.4.1 (28.12.2018)

* Process markdown markup in description of URI parameters.

## 1.4.0 (27.12.2018)

* Use commonmarkjs instead of showdown to render HTML.

## 1.3.5 (06.12.2018)

* Change the way hash links are built.

## 1.3.4 (26.11.2018)

* Fix linter warnings.

## 1.3.3 (15.11.2018)

* Fix rendering of a url parameter with curly braces.

## 1.3.2 (13.11.2018)

* Fix line break within href parameters.
* Fix href parameters containing enum elements.
* Increase spacing of a menu element containing a method label.
* Pass a title of a resource to the nested unnamed transaction.
* Merge menu elements containing a resource and its only transaction.
* Fix inheritance resolving of a member node with some content.
* Set correct type of a structure during inheritance resolving.
* Fix processing of an enum attribute content.

## 1.3.1 (10.10.2018)

* Update @funbox/sass-lint to version 1.10.2-fb-2.0.1.
* Update @funbox/protagonist to version 1.6.8-fb-2.0.0.

## 1.3.0 (17.09.2018)

* Optimize sections repaint during manipulations with menu

## 1.2.2 (17.09.2018)

* Exclude redundant files from the published package

## 1.2.1 (11.09.2018)

* Fix render errors in React components

## 1.2.0 (10.09.2018)

* Update build process of static HTML
* Exclude React from mandatory dependencies to build documentation

## 1.1.0 (09.09.2018)

* Use headers from description as elements of navigation

## 1.0.0 (04.09.2018)

* Initial version
