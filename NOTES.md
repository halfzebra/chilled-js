# pipe vs compose

For some reason I've thought I needed a function for doing function composition.
My real intention was to use something to pipe results from one computation to another as composition passes the value from right to left.

This article about [Pipe Function in JavaScript](https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e) has provided help in remembering what I wanted to achieve.

In fact I have seen this many times before in [staltz/callbag-pipe](https://github.com/staltz/callbag-pipe) and RxJS.

## API considerations

To enable the option to compose pipelines out of smaller parts with async code, all functional helpers would need to be able to work with Promises.

```js
const fetchUser = id =>
  fetch('/user/' + id)
    .then(res => res.json())

const fn = pipe(
  fromPromise(fetchUser),
  map(x => x + 1),
  withDefault(10)
)

const id = await fn(10023)
```

# AST Analysis

- [eslint/generator-eslint](https://github.com/eslint/generator-eslint) Yeoman generator ofr ESLint plugins and rules.
- [Writing Custom Lint Rules for Your Picky Developers](https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803) article about writing a simple ESLint rule.
- [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules) official ESLint docs about writing rules.
