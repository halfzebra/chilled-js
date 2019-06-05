# Partial

Brings supercharged partial application to JavaScript.

## TL;DR

```js
partial(fn, _, _, _)

// vs

x => y => z => fn(x, y, z)
(x, y) => z => fn(x, y, z)
x => (y, z) => fn(x, y, z)
(x, y, z) => fn(x, y, z)
```

## Example

`_` sign denotes a hole, which is a spot for future argument.

```js
const { _, partial } = require('party')

function triplet(x, y, z) {
  return [ x, y, z ]
}

const tripletP = partial(triplet, _, _, _)

tripletP(1)       // partial(triplet, 1, _, _)
tripletP(1)(2, 3) // [ 1, 2, 3 ]

tripletP(1, 2)    // partial(triplet, 1, 2, _)
tripletP(1, 2, 3) // [ 1, 2, 3 ]
```
