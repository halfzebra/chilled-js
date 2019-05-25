const { chill } = require('../chill.js');

describe('chill', () => {
	it('should pass the arguments to the function', () => {
		const fn = jest.fn();
		const chilled = chill(fn);

		chilled('hello', null, 4);

		expect(fn).toHaveBeenCalledWith('hello', null, 4);
	});

	it('should return the result as a first element of a tuple', () => {
		const parse = chill(JSON.parse);

		expect(parse('{ "id": 1 }')).toMatchObject([ null, { id: 1 } ]);
	});

	it('should return the error as a second element of a tuple', () => {
		const parse = chill(JSON.parse);

		expect(parse('{ "id": 1')).toMatchObject([ new SyntaxError('Unexpected end of JSON input'), null ]);
	});

	it('should return the result from async function as a first element of a tuple', async () => {
		const asyncWork = () =>
			new Promise((resolve, reject) => {
				setTimeout(() => resolve('done'), 100);
			});
		const chilled = chill(asyncWork);

		expect(await chilled()).toMatchObject([ null, 'done' ]);
	});

	it('should return the error from async function as a second element of a tuple', async () => {
		const asyncError = () =>
			new Promise((resolve, reject) => {
				setTimeout(() => reject(new Error('boom')), 100);
			});
		const chilled = chill(asyncError);

		expect(await chilled()).toMatchObject([ new Error('boom'), null ]);
	});

	it('should return the error in async function if the function itself throws', async () => {
		const asyncError = () => {
			throw new Error('boom');
		};
		const chilled = chill(asyncError);

		expect(await chilled()).toMatchObject([ new Error('boom'), null ]);
	});
});
