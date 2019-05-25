// This module is purely experimental and not ready to be used.
const { chill, fail } = require('./chill');

function isError([ err ]) {
	return !!err;
}

function fst([ x ]) {
	return x;
}

function snd([ _, y ]) {
	return y;
}

function map(fn) {
	return (m) => (isError(m) ? m : chill(fn)(snd(m)));
}

// TODO:
// function compose() {
//
// }

function mapError(fn) {
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

// TODO:
// const chilledFn = compose(
//   chill,
//   map(x => x + 1),
//   flatMap(x => x > 5 ? success(x) : fail(new Error(`${x} is out of range!`))),
//   withDeafault(5),
// )(fn)

// chilledFn(15) // 5

function flatMap(fn) {
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
	withDefault
};
