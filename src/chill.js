function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function success(x) {
  return [null, x];
}

function fail(err) {
  return [err, null];
}

function apply(fn, args) {
  try {
    const result = fn.apply(null, args);
    return isPromise(result) ? result.then(success).catch(fail) : success(result);
  } catch (err) {
    return fail(err);
  }
}

function chill(fn) {
  return function chilled(...args) {
    return apply(fn, args);
  }
}

module.exports = {
  chill,
  success,
  fail
};
