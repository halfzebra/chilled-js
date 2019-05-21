const { chill } = require('./chill');

function isError([ _, err ]) {
  if (err) {
    return true;
  }
  return false;
}

function fst([ fst ]) {
  return fst
}

function map(fn) {
  return m => isError(m) ? m :  chill(fn)(fst(m))
}

module.exports = {
  map
};
