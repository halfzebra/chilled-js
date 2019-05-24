# chilled-js

What if JavaScript could chill a little bit with all the errors being thrown here and there?

## TL;DR

```js
function parse(raw) {
  try {
    return [ null, JSON.parse(raw) ]
  } catch (err) {
    return [ err, null ]
  }
}

let [ err, ok ] = parse(...)
```

## Comparing to other kinds of error handling

| | Nullable | try..catch and throw | Callback | Promise | chilled |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Sync  | :heavy_check_mark: | :heavy_check_mark: | | | :heavy_check_mark: |
| Async |  | | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Error Context | | :confused: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Composability | :heavy_check_mark: | | | :heavy_check_mark: | :heavy_check_mark: |

<img src="https://media.giphy.com/media/SGY6C4he2z8T6/giphy.gif" alt='Dr. Freeze saying "Everybody Chill!"'>

## Usage

### Sync

Helps to capture the error close to the context when working with functions which throw exceptions.

```js
const parse = chill(JSON.parse)

let [ err, ok ] = parse('{ "id": 1 }')

if (err) {
  // Handle the error.
}

console.log(ok)
```

### Async

Removes exception bubbling when using Async Await.

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1'

async function () {
  let [ err, ok ] = await chill(
    () => fetch(url).then(response => response.json())
  )()

  if (err) {
    // Handle the error.
  }

  // Celebrate the success at async programming!
  console.log(ok)
}()
```

## Inspiration

- [Error handling and Go](https://blog.golang.org/error-handling-and-go)
- [Result](https://package.elm-lang.org/packages/elm/core/latest/Result) type from Elm
- [Data.Either](http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Either.html) type from Haskell
- [scopsy/await-to-js](https://github.com/scopsy/await-to-js) a JavaScript library exploring a similar concept
