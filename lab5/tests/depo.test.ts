import { depo } from '../src/depo'

describe('Fire station problem tests', () => {
	test('1. линейный граф 4 узла', () => {
		const input = `
1

1 4
1
1 2 1
2 3 1
3 4 1
`
		expect(depo(input)).toBe('3')
	})

	test('2. центр оптимален в цепочке 5 узлов', () => {
		const input = `
1

1 5
3
1 2 1
2 3 1
3 4 1
4 5 1
`

		expect(depo(input)).toBe('1')
	})

	test('5. звезда — центр уже лучший', () => {
		const input = `
1

1 5
1
1 2 2
1 3 2
1 4 2
1 5 2
`
		expect(depo(input)).toBe('1')
	})

	test('6. уже есть идеальное покрытие', () => {
		const input = `
1

1 3
2
1 2 1
2 3 1
`
		expect(depo(input)).toBe('1')
	})
})
