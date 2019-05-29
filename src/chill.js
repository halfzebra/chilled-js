/**
 * @param obj {?}
 * @returns {boolean}
 */
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function' &&
    typeof obj.catch === 'function'
  );
}

/**
 * @template T
 * @param x {T}
 * @returns {[null, T]}
 */
function success(x) {
  return [null, x];
}

/**
 * @template T
 * @param err {T}
 * @returns {[null, T]}
 */
function fail(err) {
  return [err, null];
}

function fromPromise(p) {
  return p.then(success).catch(fail);
}

function apply(fn, args) {
  try {
    const result = fn.apply(null, args);
    return isPromise(result) ? fromPromise(result) : success(result);
  } catch (err) {
    return fail(err);
  }
}

function chill(fn) {
  return function chilled(...args) {
    return apply(fn, args);
  };
}

module.exports = {
  chill,
  success,
  fail,
  fromPromise
};
