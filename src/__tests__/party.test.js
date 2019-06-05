const { _, partial } = require('../party');

describe('partial', () => {
  it('should throw if args are passed after a hole', () => {
    expect(() => partial(jest.fn(), _, 1)).toThrow(`Holes can be placed only after args`);
  });

  it('should return the original function if there is only one argument', () => {
    const fn = jest.fn();
    expect(partial(fn, _)).toBe(fn);
  });

  it('should return a function which can be applied normally', () => {
    const fn = partial((x, y) => x + y, _, _);
    expect(fn(1, 2)).toBe(3);
  });

  it('should return a function which can be applied partially', () => {
    const fn = partial((a, b, c, d) => [a, b, c, d], _, _, _, _);
    expect(fn(1)(2, 3)(4)).toStrictEqual([1, 2, 3, 4]);
  });

  it('can apply some arguments upon initialization', () => {
    const fn = partial((a, b, c, d) => [a, b, c, d], 1, 2, _, _);
    expect(fn(3, 4)).toStrictEqual([1, 2, 3, 4]);
  });

  it('can accept variadic arguments', () => {
    const fn = partial((...args) => args.reduce((acc, curr) => acc + curr, 0), _, _);
    expect(fn(1, 2, 3, 4, 5)).toBe(15);
  });
});
