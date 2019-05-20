const {map} = require('../fun');

describe('map', () => {
  it('should transform the value', () => {
    expect(
      map(x => x + ', World!')(['Hello', null])
    ).toMatchObject(['Hello, World!', null])
  });

  it('should not call the mapping function if the input contains an error', () => {
    expect(
      map(x => x + ', World!')([null, new Error('Failed to provide inpuut')])
    ).toMatchObject([null, new Error('Failed to provide inpuut')])
  });
});
