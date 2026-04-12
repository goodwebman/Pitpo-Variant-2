import { countPermutations } from '../src/countPermutations'


describe("countPermutations", () => {
  test("Example 1", () => {
    expect(countPermutations(10, 4, 4)).toBe(90720);
  });

  test("Example 2", () => {
    expect(countPermutations(11, 3, 1)).toBe(1026576);
  });

  test("Example 3", () => {
    expect(countPermutations(3, 1, 2)).toBe(1);
  });

  test("Single element", () => {
    expect(countPermutations(1, 1, 1)).toBe(1);
  });

  test("n=2 basic", () => {
    expect(countPermutations(2, 2, 1)).toBe(1);
  });

  test("n=2 reverse", () => {
    expect(countPermutations(2, 1, 2)).toBe(1);
  });

  test("n=3 all visible", () => {
    expect(countPermutations(3, 3, 1)).toBe(1);
  });

  test("n=3 symmetric case", () => {
    expect(countPermutations(3, 2, 2)).toBe(2);
  });

  test("impossible case", () => {
    expect(countPermutations(5, 5, 5)).toBe(0);
  });

  test("another case", () => {
    expect(countPermutations(5, 2, 3)).toBeGreaterThan(0);
  });
});