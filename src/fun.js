const { chill } = require('./chill');

function isSuccess(res) {
  const [ ok ] = res;
  if (ok) {
    return true;
  }
  return false;
}

function fst([ fst ]) {
  return fst
}

function map(fn) {
  return m => isSuccess(m) ? chill(fn)(fst(m)) : m
}

module.exports = {
  map
};

