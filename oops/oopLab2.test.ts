// ===== UNIT TESTS (JEST/VITEST STYLE) =====
// Example using Vitest/Jest

import { describe, it, expect } from "vitest";

type MyDel = (a: number[]) => number;

const average: MyDel = function (arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, x) => sum + x, 0) / arr.length;
};

describe("Average delegate tests", () => {
  it("empty array", () => expect(average([])).toBe(0));
  it("single element", () => expect(average([5])).toBe(5));
  it("two elements", () => expect(average([2, 4])).toBe(3));
  it("positive numbers", () => expect(average([1, 2, 3, 4])).toBe(2.5));
  it("negative numbers", () => expect(average([-1, -2, -3])).toBe(-2));
  it("mixed numbers", () => expect(average([-1, 1])).toBe(0));
  it("large numbers", () => expect(average([1000, 2000])).toBe(1500));
  it("zeros", () => expect(average([0, 0, 0])).toBe(0));
  it("floats", () => expect(average([1.5, 2.5])).toBe(2));
  it("many values", () => expect(average([1,2,3,4,5,6,7,8,9,10])).toBe(5.5));
});