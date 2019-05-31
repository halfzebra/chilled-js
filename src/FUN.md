# Fun

What if we represent a result of every computation that can fail as a tuple `[ err, ok ]`?

```js
function parseJson(raw) {
  try {
    return [ null, JSON.parse(raw) ]
  } catch (err) {
    return [ err, null ]
  }
}

function parseInt(i) {
  const result = Number.parseInt(i)
  if (Number.isNaN(result)) {
    return [ null, result ]
  }
  return [ new Error(`parseInt: Sorry, couldn't parse the number from ${i}`), null ]
}
```

We could define a function for transforming the value inside the tuple when the computation was successful:

```js
function map(fn, [ err, ok ]) {
  return !err ? fn(ok) : [ err, ok ]
}

const [ err, ok ] = map(obj => obj.user === 'Max', parseJson(rawJson)) // true | false
```

What if computation we want to apply to value also produces a tuple with error or result?
We would need a function for flattening the result, so we don't get an inconvenient nested structure like `[ err1, [ err2, ok ] ]`.

Let's define `flatMap` function for checking if our cupcake shop can sell the requested amount of cupcakes:

```js
flatMap(
  x => x > 2
    ? [ new Error(`Sorry, we don not have more cupcakes`), null ]
    : [ null, x + 1 ],
  [ null, 3 ]
) // Error: Sorry, we don't have more cupcakes
```

The last use-case is the one where we don't really care about the error, because we have a good default value for replacing faulty input.
Let's define a `withDefault` function, which can take a tuple and return a default value if the tuple contained an error.

```js
function withDefault(defaultValue, [ err, ok ]) {
  if (err) {
    return defaultValue
  }
  return ok
}

withDefault(5, parseInt('Hello :)') // 5
```

This is all great, but what if we want to combine those functions and build pipelines that can take a tuple and perform many operations on it.
This is where `pipe` comes into play!

## Async

Adding the support for seamless promise handling is complicating the library.

This is how async code might look with `chill`'ed functions.

```
const fetchUser = id => fetch(...)

const v = await pipe(
  chill(fetchUser),
  map(x => x + 1),
  mapError(e => new Error('Fetch pipe: ' + error.message)),
  log,
  withDefault(3),
)(1)
```
