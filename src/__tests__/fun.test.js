const { map, flatMap, withDefault } = require("../fun");

describe('map', () => {
  it('should transform the value', () => {
    expect(
      map(x => x + ', World!')([null, 'Hello'])
    ).toMatchObject([null, 'Hello, World!'])
  });

  it('should return the error if the input contained the error', () => {
    expect(
      map(x => x + ', World!')([new Error('Failed to provide input'), null])
    ).toMatchObject([new Error('Failed to provide input'), null])
  });

  it('should return the error if the mapping fn throws', () => {
    expect(
      map(x => {
        throw new Error('Booho!')
      })([null, true])
    ).toMatchObject([new Error('Booho!'), null])
  });
});

describe('flatMap', () => {
  it('should transform the value', () => {
    expect(
      flatMap(x => [null, x + ', World!'])([null, 'Hello' ])
    ).toMatchObject([null, 'Hello, World!'])
  });

  it('should return the error if the input contained the error', () => {
    expect(
      flatMap(x => [null, 'This worked!'])([new Error('Sorry! Got an error.'), null ])
    ).toMatchObject([new Error('Sorry! Got an error.'), null])
  });

  it('should return the error if the map fn returned an error tuple', () => {
    expect(
      flatMap(x => [new Error('Sorry! Got an error.'), null])([null, 'Hello' ])
    ).toMatchObject([new Error('Sorry! Got an error.'), null])
  });
});

describe('withDefault', () => {
  it('should return the original value if it did not contain the error', () => {
    expect(withDefault(2)([null, 1])).toBe(1);
  })

  it('should return the default value if the input contained error', () => {
    expect(withDefault(1)([new Error('No number!'), null])).toBe(1);
  })
});
