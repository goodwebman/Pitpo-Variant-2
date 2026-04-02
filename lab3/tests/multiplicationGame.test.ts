import { multiplicationGame } from '../src/multiplicationGame'


describe("multiplicationGame", () => {
  test("example 162 → Stan wins", () => {
    expect(multiplicationGame(162)).toBe("Stan wins");
  });

  test("example 17 → Ollie wins", () => {
    expect(multiplicationGame(17)).toBe("Ollie wins");
  });

  test("example 34012226 → Stan wins", () => {
    expect(multiplicationGame(34012226)).toBe("Stan wins");
  });

  test("n = 2 → Stan wins", () => {
    expect(multiplicationGame(2)).toBe("Stan wins");
  });

  test("n = 9 → Stan wins", () => {
    expect(multiplicationGame(9)).toBe("Stan wins");
  });

  test("n = 10 → Ollie wins", () => {
    expect(multiplicationGame(10)).toBe("Ollie wins");
  });

  test("n = 18 → Ollie wins", () => {
    expect(multiplicationGame(18)).toBe("Ollie wins");
  });

  test("n = 19 → Stan wins", () => {
    expect(multiplicationGame(19)).toBe("Stan wins");
  });

  test("n = 1000 → Stan wins", () => {
    expect(multiplicationGame(1000)).toBe("Stan wins");
  });

  test("large number → correctness", () => {
    expect(multiplicationGame(4294967294)).toBeDefined();
  });
});