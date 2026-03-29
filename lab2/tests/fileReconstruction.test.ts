import { reconstructFiles } from '../src/fileReconstruction'

test('File reconstruction basic', () => {
	const input = `
1

1010
0101
`
	const output = '10101'
	expect(reconstructFiles(input)).toBe(output)
})
