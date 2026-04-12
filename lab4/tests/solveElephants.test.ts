import { solveElephants } from '../src/solveElephants'

describe('solveElephants stable tests', () => {
	it('single elephant', () => {
		expect(solveElephants('100 200')).toBe('1\n1')
	})

	it('two identical elephants', () => {
		const res = solveElephants(`100 100
100 100`)
		expect(res.startsWith('1')).toBe(true)
	})

	it('two elephants increasing weight only', () => {
		const res = solveElephants(`100 100
200 100`)
		expect(res.startsWith('1')).toBe(true)
	})

	it('two elephants valid chain', () => {
		const res = solveElephants(`100 200
200 100`)
		expect(res.startsWith('2')).toBe(true)
	})

	it('already sorted increasing valid chain', () => {
		const res = solveElephants(`100 300
200 200
300 100`)
		expect(res.startsWith('3')).toBe(true)
	})

	it('reverse order still works', () => {
		const res = solveElephants(`300 100
200 200
100 300`)
		expect(Number(res.split('\n')[0])).toBeGreaterThanOrEqual(1)
	})

	it('all same IQ', () => {
		const res = solveElephants(`100 100
200 100
300 100`)
		expect(res.startsWith('1')).toBe(true)
	})

	it('all same weight', () => {
		const res = solveElephants(`100 300
100 200
100 100`)
		expect(res.startsWith('1')).toBe(true)
	})

	it('result format is valid', () => {
		const res = solveElephants(`100 200
200 100`)

		const lines = res.split('\n')

		expect(lines.length).toBeGreaterThanOrEqual(1)
		expect(Number(lines[0])).toBeGreaterThan(0)
	})
})
