function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function success(x) {
  return [x, null];
}

function fail(err) {
  return [null, err];
}

function call(fn, args) {
  try {
    const result = fn.apply(null, args);
    return isPromise(result) ? result.then(success).catch(fail) : success(result);
  } catch (err) {
    return fail(err);
  }
}

function chill(fn) {
  return function chilled(...args) {
    return call(fn, args);
  }
}

module.exports = {
  chill
};
