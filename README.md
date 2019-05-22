# chilled-js

What if JavaScript could chill a little bit with all the errors being thrown here and there?

<img src="https://media.giphy.com/media/SGY6C4he2z8T6/giphy.gif" alt='Dr. Freeze saying "Everybody Chill!"'>

| | null/undefined/NaN | try..catch and throw | Nodeback | Promise | chilled
| :--- | :---: | :---: | :---: | :---: | :---: |
| Sync  | :heavy_check_mark: | :heavy_check_mark: | | | :heavy_check_mark: |
| Async |  | | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Error Context | :confused:  | :confused: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## Sync

Helps to capture the error close to the context when working with functions which throw exceptions.

```js
const parse = chill(JSON.parse)

let [ ok, err ] = parse('{ "id": 1 }')

if (err) {
  // Handle the error.
}

console.log(ok)
```

## Async

Removes exception bubbling when using Async Await.

```js
async function() {
  let [ ok, err ] = await chill(fetchUsers)
  
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
- [scopsy/await-to-js](https://github.com/scopsy/await-to-js) a JavaScript library expliring a similar concept
