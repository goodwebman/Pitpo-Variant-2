import {
  decodeChromosome,
  fitness,
  crossover,
  mutate,
  runGeneticAlgorithm,
  Chromosome,
  MockRandom,
} from "../src/geneticAlgorithm";

// -------------------- decodeChromosome --------------------

describe("decodeChromosome", () => {
  test("декодирует бинарный массив в число", () => {
    const a = [1, 0, 1];
    const b = [1, 1, 1];

    const r1 = decodeChromosome(a);
    const r2 = decodeChromosome(b);

    console.log("\n=== DECODE TEST ===");
    console.log(`${JSON.stringify(a)} -> ${r1}`);
    console.log(`${JSON.stringify(b)} -> ${r2}`);

    expect(r1).toBe(5);
    expect(r2).toBe(7);
  });
});

// -------------------- fitness --------------------

describe("fitness", () => {
  test("корректно считает x^2", () => {
    const chromosome: Chromosome = [1, 1];

    const x = decodeChromosome(chromosome);
    const result = fitness(chromosome);

    console.log("\n=== FITNESS TEST ===");
    console.log(`chromosome: ${JSON.stringify(chromosome)}`);
    console.log(`x = ${x}`);
    console.log(`f(x) = x^2 = ${result}`);

    expect(result).toBe(9);
  });
});

// -------------------- crossover --------------------

describe("crossover", () => {
  test("выполняет одноточечное скрещивание", () => {
    const rand = new MockRandom([0.1, 0.5]);

    const [c1, c2] = crossover(
      [1, 1, 1],
      [0, 0, 0],
      rand,
      1
    );

    console.log("\n=== CROSSOVER TEST ===");
    console.log("parent1:", [1, 1, 1]);
    console.log("parent2:", [0, 0, 0]);
    console.log("child1 :", c1);
    console.log("child2 :", c2);

    expect(c1).toEqual([1, 0, 0]);
    expect(c2).toEqual([0, 1, 1]);
  });

  test("не выполняет скрещивание при low rate", () => {
    const rand = new MockRandom([0.9]);

    const [c1, c2] = crossover(
      [1, 1],
      [0, 0],
      rand,
      0.5
    );

    console.log("\n=== CROSSOVER LOW RATE ===");
    console.log("parent1:", [1, 1]);
    console.log("parent2:", [0, 0]);
    console.log("result1:", c1);
    console.log("result2:", c2);

    expect(c1).toEqual([1, 1]);
    expect(c2).toEqual([0, 0]);
  });
});

// -------------------- mutation --------------------

describe("mutate", () => {
  test("инвертирует биты с заданной вероятностью", () => {
    const rand = new MockRandom([0.01, 0.99, 0.01]);

    const input = [1, 1, 1];
    const result = mutate(input, rand, 0.5);

    console.log("\n=== MUTATION TEST ===");
    console.log("before:", input);
    console.log("after :", result);

    expect(result).toEqual([0, 1, 0]);
  });

  test("не мутирует при 0 rate", () => {
    const rand = new MockRandom([0.1, 0.1, 0.1]);

    const input = [1, 0, 1];
    const result = mutate(input, rand, 0);

    console.log("\n=== MUTATION ZERO RATE ===");
    console.log("before:", input);
    console.log("after :", result);

    expect(result).toEqual([1, 0, 1]);
  });
});

// -------------------- GA --------------------

describe("runGeneticAlgorithm", () => {
  test("находит близкое к оптимальному решение", () => {
    const config = {
      populationSize: 20,
      chromosomeLength: 5,
      mutationRate: 0.1,
      crossoverRate: 0.7,
      generations: 50,
    };

    const result = runGeneticAlgorithm(config);
    const x = decodeChromosome(result);
    const fit = fitness(result);

    console.log("\n==============================");
    console.log("GENETIC ALGORITHM RESULT");
    console.log("==============================");
    console.log("chromosome:", result);
    console.log("x         :", x);
    console.log("fitness   :", fit);
    console.log("max x     :", 31);
    console.log("quality % :", ((x / 31) * 100).toFixed(2));

    expect(x).toBeGreaterThan(20);
  });

  test("возвращает валидную хромосому", () => {
    const config = {
      populationSize: 10,
      chromosomeLength: 4,
      mutationRate: 0.1,
      crossoverRate: 0.7,
      generations: 10,
    };

    const result = runGeneticAlgorithm(config);

    console.log("\n=== VALIDATION TEST ===");
    console.log("chromosome:", result);
    console.log("length    :", result.length);
    console.log("valid bits:", result.every(b => b === 0 || b === 1));

    expect(result).toHaveLength(4);
    result.forEach((bit) => {
      expect([0, 1]).toContain(bit);
    });
  });
});