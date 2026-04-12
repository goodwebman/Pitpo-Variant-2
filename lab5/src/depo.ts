class MinHeap {
  private data: [number, number][] = [];

  push(item: [number, number]) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): [number, number] | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p][0] <= this.data[i][0]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private bubbleDown(i: number) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = i * 2 + 1;
      const r = i * 2 + 2;

      if (l < n && this.data[l][0] < this.data[smallest][0]) smallest = l;
      if (r < n && this.data[r][0] < this.data[smallest][0]) smallest = r;

      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

function dijkstra(
  n: number,
  graph: number[][][],
  sources: number[]
): number[] {
  const dist = Array(n + 1).fill(Infinity);
  const heap = new MinHeap();

  for (const s of sources) {
    dist[s] = 0;
    heap.push([0, s]);
  }

  while (!heap.isEmpty()) {
    const cur = heap.pop()!;
    const [d, u] = cur;

    if (d !== dist[u]) continue;

    for (const [v, w] of graph[u]) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        heap.push([nd, v]);
      }
    }
  }

  return dist;
}

export function depo(input: string): string {
  const lines = input.trim().split(/\r?\n/);
  let idx = 0;

  let T = Number(lines[idx++]);
  const out: string[] = [];

  while (T--) {
    while (idx < lines.length && lines[idx]?.trim() === "") idx++;

    const [f, n] = lines[idx++].split(" ").map(Number);

    const stations: number[] = [];
    for (let i = 0; i < f; i++) {
      stations.push(Number(lines[idx++]));
    }

    const graph: number[][][] = Array.from({ length: n + 1 }, () => []);

    while (idx < lines.length && lines[idx]?.trim() !== "") {
      const [u, v, w] = lines[idx++].split(" ").map(Number);
      graph[u].push([v, w]);
      graph[v].push([u, w]);
    }

    let bestNode = 1;
    let bestScore = Infinity;

    for (let candidate = 1; candidate <= n; candidate++) {
      const dist = dijkstra(n, graph, [...stations, candidate]);

      let worst = 0;
      for (let i = 1; i <= n; i++) {
        if (dist[i] > worst) worst = dist[i];
      }

      if (
        worst < bestScore ||
        (worst === bestScore && candidate < bestNode)
      ) {
        bestScore = worst;
        bestNode = candidate;
      }
    }

    out.push(String(bestNode));

    if (T > 0) out.push("");
  }

  return out.join("\n").trim();
}

const input = `
1

1 6
2
1 2 10
2 3 10
3 4 10
4 5 10
5 6 10
6 1 10
`;

console.log(depo(input));