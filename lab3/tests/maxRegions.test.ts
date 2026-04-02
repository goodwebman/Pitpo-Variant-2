import { maxRegionsBatch } from '../src/maxRegions'

describe("maxRegionsBatch", () => {
  test("example case", () => {
    expect(maxRegionsBatch(4, 1, 2, 3, 4)).toEqual([
      "1",
      "2",
      "4",
      "8",
    ]);
  });

  test("single value", () => {
    expect(maxRegionsBatch(1, 5)).toEqual(["16"]);
  });

  test("n = 0", () => {
    expect(maxRegionsBatch(1, 0)).toEqual(["1"]);
  });

  test("n = 6", () => {
    expect(maxRegionsBatch(1, 6)).toEqual(["31"]);
  });

  test("multiple values", () => {
    expect(maxRegionsBatch(3, 7, 8, 9)).toEqual([
      "57",
      "99",
      "163",
    ]);
  });

  test("large n", () => {
    const res = maxRegionsBatch(1, 231);
    expect(res[0]).toBeDefined();
  });

  test("empty values", () => {
    expect(maxRegionsBatch(0)).toEqual([]);
  });

  test("mismatch s (ignore extra)", () => {
    expect(maxRegionsBatch(2, 1, 2, 3)).toEqual(["1", "2"]);
  });

  test("all small values", () => {
    expect(maxRegionsBatch(4, 0, 1, 2, 3)).toEqual([
      "1",
      "1",
      "2",
      "4",
    ]);
  });

  test("edge n=4", () => {
    expect(maxRegionsBatch(1, 4)).toEqual(["8"]);
  });
});