

export function countPermutations(n: number, L: number, R: number): number {
  const dp: number[][][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Array(n + 1).fill(0))
  );

  dp[1][1][1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let l = 1; l <= i; l++) {
      for (let r = 1; r <= i; r++) {
        dp[i][l][r] =
          (dp[i - 1][l - 1]?.[r] || 0) +
          (dp[i - 1][l]?.[r - 1] || 0) +
          (i - 2) * (dp[i - 1][l][r] || 0);
      }
    }
  }

  return dp[n][L][R] || 0;
}





export function solve(input: string): string {
  const lines = input.trim().split("\n");
  const t = Number(lines[0]);

  const results: number[] = [];

  for (let i = 1; i <= t; i++) {
    const [n, l, r] = lines[i].trim().split(/\s+/).map(Number);
    results.push(countPermutations(n, l, r));
  }

  return results.join("\n");
}



const input = `3
10 4 4
11 3 1
3 1 2`;

console.log(solve(input));