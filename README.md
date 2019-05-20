# chilled-js

What if JavaScritp could chill a little bit with all the errors being thrown here and there?

<img src="https://media.giphy.com/media/SGY6C4he2z8T6/giphy.gif" alt='Dr. Freeze saying "Everybody Chill!"'>

## Sync

```js
const parse = chilled(JSON.parse)

let [ ok, err ] = parse('{ "id": 1 }')

if (!err) {
  // Celebrate the success!
} else {
  // Handle the error.
}
```


## Async/Await

```js
async function() {
  let [ ok, err ] = await chilled(fetchUsers)
  
  if (!err) {
    // Celebrate the success at async programming!
  } else {
    // Handle the error.
  }
}
```

## Inspiration

- https://blog.golang.org/error-handling-and-go
- https://package.elm-lang.org/packages/elm/core/latest/Result

## Worth Checking

- [scopsy/await-to-js](https://github.com/scopsy/await-to-js)
- [Data.Either](http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Either.html)
