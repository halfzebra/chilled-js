// XXX: This module is purely experimental and not ready to be used.
const { chill, fail } = require('./chill');

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
  return function(m) {
    return isError(m) ? m : chill(fn)(snd(m));
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

module.exports = {
  map,
  mapError,
  flatMap,
  withDefault,
  pipe,
  log
};
