const _ = Symbol('Hole')

function apply(fn, ex, n) {
  return function(...args) {
    if (args.length < n) {
      return apply(fn, [...ex, ...args],  n - args.length)
    }
    return fn(...ex, ...args)
  }
}

function partial(fn, ...args) {
  const { length } = args;

  if (length === 1) {
    return fn
  }

  let seen = false

  args.forEach((arg) => {
    if (seen && arg !== _) {
      throw new Error(`Holes can be placed only after args`);
    }

    if (!seen && arg === _) {
      seen = true;
    }
  });

  const passed = args.filter(x => x !== _);

  return apply(fn, passed, length - passed.length);
}

module.exports = {
  _,
  partial
}
