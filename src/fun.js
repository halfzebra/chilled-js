const {chill} = require('./chill');

function isError([err]) {
  return !!err;
}

function snd([_, y]) {
  return y
}

function map(fn) {
  return m => isError(m) ? m : chill(fn)(snd(m))
}

function flatMap(fn) {
  return function (m) {
    if (isError(m)) {
      return m
    }
    const r = chill(fn)(snd(m));
    return isError(r) ? r : snd(r);
  }
}

module.exports = {
  map,
  flatMap
};
