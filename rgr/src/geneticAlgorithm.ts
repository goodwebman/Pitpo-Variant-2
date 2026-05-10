export type Chromosome = number[]; // бинарный массив

export interface GAConfig {
  populationSize: number;
  chromosomeLength: number;
  mutationRate: number;
  crossoverRate: number;
  generations: number;
}

export interface Random {
  next(): number; // 0..1
}

export class DefaultRandom implements Random {
  next(): number {
    return Math.random();
  }
}

// --- Utils

export const createRandomChromosome = (
  length: number,
  random: Random
): Chromosome => {
  return Array.from({ length }, () => (random.next() > 0.5 ? 1 : 0));
};

export const decodeChromosome = (chromosome: Chromosome): number => {
  return chromosome.reduce((acc, bit) => (acc << 1) | bit, 0);
};

export const fitness = (chromosome: Chromosome): number => {
  const x = decodeChromosome(chromosome);
  return x * x;
};

// --- Selection (roulette)

export const select = (
  population: Chromosome[],
  random: Random
): Chromosome => {
  const fitnessSum = population.reduce(
    (sum, ch) => sum + fitness(ch),
    0
  );

  const pick = random.next() * fitnessSum;

  let current = 0;
  for (const ch of population) {
    current += fitness(ch);
    if (current >= pick) {
      return ch;
    }
  }

  return population[population.length - 1];
};

// --- Crossover

export const crossover = (
  parent1: Chromosome,
  parent2: Chromosome,
  random: Random,
  rate: number
): [Chromosome, Chromosome] => {
  if (random.next() > rate) {
    return [parent1.slice(), parent2.slice()];
  }

  const point = Math.floor(random.next() * parent1.length);

  const child1 = [
    ...parent1.slice(0, point),
    ...parent2.slice(point),
  ];

  const child2 = [
    ...parent2.slice(0, point),
    ...parent1.slice(point),
  ];

  return [child1, child2];
};

// --- Mutation

export const mutate = (
  chromosome: Chromosome,
  random: Random,
  rate: number
): Chromosome => {
  return chromosome.map((bit) =>
    random.next() < rate ? (bit === 1 ? 0 : 1) : bit
  );
};

// --- Main GA

export const runGeneticAlgorithm = (
  config: GAConfig,
  random: Random = new DefaultRandom()
): Chromosome => {
  let population: Chromosome[] = Array.from(
    { length: config.populationSize },
    () => createRandomChromosome(config.chromosomeLength, random)
  );

  for (let gen = 0; gen < config.generations; gen++) {
    const newPopulation: Chromosome[] = [];

    while (newPopulation.length < config.populationSize) {
      const parent1 = select(population, random);
      const parent2 = select(population, random);

      const [child1, child2] = crossover(
        parent1,
        parent2,
        random,
        config.crossoverRate
      );

      newPopulation.push(
        mutate(child1, random, config.mutationRate)
      );

      if (newPopulation.length < config.populationSize) {
        newPopulation.push(
          mutate(child2, random, config.mutationRate)
        );
      }
    }

    population = newPopulation;
  }

  return population.reduce((best, current) =>
    fitness(current) > fitness(best) ? current : best
  );
};

export class MockRandom implements Random {
  private values: number[];
  private index = 0;

  constructor(values: number[]) {
    this.values = values;
  }

  next(): number {
    const value = this.values[this.index % this.values.length];
    this.index++;
    return value;
  }
}

const config = {
  populationSize: 20,
  chromosomeLength: 5,
  mutationRate: 0.1,
  crossoverRate: 0.7,
  generations: 50,
};

const random = new MockRandom([
  0.1, 0.9, 0.2, 0.8, 0.3, 0.7
]);

const result = runGeneticAlgorithm(config, random);

const x = decodeChromosome(result);
const fit = fitness(result);

console.log("=== РЕЗУЛЬТАТ ГЕНЕТИЧЕСКОГО АЛГОРИТМА ===");
console.log("Найденная хромосома:", result);
console.log("Декодированное значение x:", x);
console.log("Значение функции f(x) = x²:", fit);

console.log("\n=== ИНТЕРПРЕТАЦИЯ ===");
console.log(
  `Алгоритм нашёл решение x = ${x}, ` +
  `для которого значение целевой функции f(x) = ${fit}.`
);

console.log(
  `При длине хромосомы ${config.chromosomeLength} бит ` +
  `максимально возможное значение x = ${Math.pow(2, config.chromosomeLength) - 1}, ` +
  `что даёт f(x) = ${Math.pow(2, config.chromosomeLength) - 1 ** 2}.`
);