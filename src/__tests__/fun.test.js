const {map,flatMap} = require('../fun');

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
