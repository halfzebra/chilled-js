const { map, flatMap, withDefault, mapError, pipe, log } = require('../fun');

describe('map', () => {
  it('should transform the value', () => {
    expect(map(x => x + ', World!')([null, 'Hello'])).toMatchObject([
      null,
      'Hello, World!'
    ]);
  });

  it('should return the error if the input contained the error', () => {
    expect(
      map(x => x + ', World!')([new Error('Failed to provide input'), null])
    ).toMatchObject([new Error('Failed to provide input'), null]);
  });

  it('should return the error if the mapping fn throws', () => {
    expect(
      map(x => {
        throw new Error('Booho!');
      })([null, true])
    ).toMatchObject([new Error('Booho!'), null]);
  });
});

describe('flatMap', () => {
  it('should transform the value', () => {
    expect(flatMap(x => [null, x + ', World!'])([null, 'Hello'])).toMatchObject(
      [null, 'Hello, World!']
    );
  });

  it('should return the error if the input contained the error', () => {
    expect(
      flatMap(x => [null, 'This worked!'])([
        new Error('Sorry! Got an error.'),
        null
      ])
    ).toMatchObject([new Error('Sorry! Got an error.'), null]);
  });

  it('should return the error if the map fn returned an error tuple', () => {
    expect(
      flatMap(x => [new Error('Sorry! Got an error.'), null])([null, 'Hello'])
    ).toMatchObject([new Error('Sorry! Got an error.'), null]);
  });
});

describe('withDefault', () => {
  it('should return the original value if it did not contain the error', () => {
    expect(withDefault(2)([null, 1])).toBe(1);
  });

  it('should return the default value if the input contained error', () => {
    expect(withDefault(1)([new Error('No number!'), null])).toBe(1);
  });
});

describe('mapError', () => {
  it('should not modify the input if it did not contain the error', () => {
    expect(mapError(() => new Error('New error!'))([null, 1])).toStrictEqual([
      null,
      1
    ]);
  });

  it('should update the error if it was passed as an argument', () => {
    expect(
      mapError(() => new Error('New error!'))([new Error('Boom!'), null])
    ).toStrictEqual([new Error('New error!'), null]);
  });

  it('throw if no function provided', () => {
    expect(() => mapError()).toThrow(
      'mapError: needs a function to transform the error.'
    );
  });
});

describe('pipe', () => {
  it('should pipe the value through', () => {
    const p = pipe(
      map(x => parseInt(x)),
      map(x => x + 1),
      withDefault(5)
    );

    expect(p([null, '10'])).toBe(11);
  });

  it('throw if no function provided', () => {
    expect(() => pipe()).toThrow(
      'pipe: please pass at least one function to pipe the value through.'
    );
  });

  it('should call functions from left to right', () => {

  });
});
