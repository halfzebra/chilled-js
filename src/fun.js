// XXX: This module is purely experimental and not ready for usage.

const { chill, fail, isPromiseLike } = require('./chill');

function isFunction(fn) {
  return typeof fn === 'function';
}

function isError([err]) {
  return !!err;
}

function fst([x]) {
  return x;
}

function snd([_, y]) {
  return y;
}

function log(label, x) {
  if (!x) {
    console.log(label);
    return label;
  }
  console.log(label, x);
  return x;
}

// XXX: maybe this not needed.
// Similar to it.skip in test runners, allows for quick disabling of logging.
log.off = function off(label, x) {
  if (!x) {
    return label;
  }
  return x;
};

function map(fn) {
  if (!isFunction(fn)) {
    throw new Error('map: needs a function to transform the value.');
  }

  function apply(m) {
    return isError(m) ? m : chill(fn)(snd(m));
  }

  return v => (isPromiseLike(v) ? v.then(apply) : apply.call(null, v));
}

function mapError(fn) {
  if (!isFunction(fn)) {
    throw new Error('mapError: needs a function to transform the error.');
  }
  return function(m) {
    if (isError(m)) {
      const res = chill(fn)(fst(m));

      if (isError(res)) {
        return res;
      }

      return fail(snd(res));
    }

    return m;
  };
}

function flatMap(fn) {
  if (!isFunction(fn)) {
    throw new Error(
      'flatMap: please pass a function for creating a new tuple for flattening.'
    );
  }
  return function(m) {
    if (isError(m)) {
      return m;
    }
    const r = chill(fn)(snd(m));
    return isError(r) ? r : snd(r);
  };
}

function withDefault(v) {
  return function(m) {
    return isError(m) ? v : snd(m);
  };
}

function pipe(...fns) {
  if (fns.length === 0) {
    throw new Error(
      'pipe: please pass at least one function to pipe the value through.'
    );
  }
  return function(arg) {
    return fns.reduce((acc, curr) => curr.call(null, log.off('acc', acc)), arg);
  };
}

function id(x) {
  return x;
}

function branch(predicate, left = id, right = id) {
  if (!isFunction(predicate)) {
    throw new Error('branch: needs at least a predicate to work')
  }
  return function(x) {
    return predicate(x) ? left(x) : right(x);
  };
}

module.exports = {
  map,
  mapError,
  flatMap,
  withDefault,
  pipe,
  log
};
