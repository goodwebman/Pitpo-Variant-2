import { describe, it, expect } from "vitest";

describe("MyDel average tests", () => {
  const avg: MyDel = (arr) => {
    if (arr.length === 0) return 0;
    return arr.reduce((s, x) => s + x, 0) / arr.length;
  };

  it("1. average of [1,2,3]", () => {
    expect(avg([1, 2, 3])).toBe(2);
  });

  it("2. single element", () => {
    expect(avg([10])).toBe(10);
  });

  it("3. empty array", () => {
    expect(avg([])).toBe(0);
  });

  it("4. negative numbers", () => {
    expect(avg([-1, -2, -3])).toBe(-2);
  });

  it("5. mixed numbers", () => {
    expect(avg([-2, 2])).toBe(0);
  });

  it("6. large numbers", () => {
    expect(avg([1000, 2000, 3000])).toBe(2000);
  });

  it("7. decimals", () => {
    expect(avg([1.5, 2.5])).toBe(2);
  });

  it("8. zeros", () => {
    expect(avg([0, 0, 0])).toBe(0);
  });

  it("9. one zero one number", () => {
    expect(avg([0, 10])).toBe(5);
  });

  it("10. big array", () => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(avg(arr)).toBe(50.5);
  });
});