# Migration

## 5.4.2 → 6.0.0

We've dropped support for Node.js 12.
The project probably still works on it, because we have not changed anything in the code. But be careful.

We removed one-letter definitions for the next CLI flags: `-S (--strict)`, `-c (--css)`, `-f (--favicon)`, `-l (--locale)`.
If you've been using any of the above-mentioned options, you should replace `-S` with `--strict`, `-c` with `--css` and so on.


## 4.17.1 → 5.0.0

Nothing changed. We just moved the package to the new scope — `@funboxteam`.


## 3.53.0 → 4.0.0

Complete refactoring of imports. If some data structure to be used in a file, you now need to import it explicitly in that file.

Changes in attributes example description. If an example should contain multiple values, don't add backticks:

```
+ Attributes
  + foo: 1,2,3 (array[number]) - no bacticks around multiple values
  + bar: `single value` (string) - backticks around single example value
```

## 3.38.0 → 3.39.0

`+ Parameters` must be defined at the same level as `+ Request`.

`+ Attributes` section doesn't need attribute `required` now.

## 3.34.0 → 3.35.0

If a documentation contains a section with the name _Default_ (for example, default Resource Prototype), it must be renamed,
because Crafter uses _Default_ title to set default value of a named type starting with version 1.65.0.
