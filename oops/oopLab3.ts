// В TS делегаты = type function signature

type MyDel = (a: number[]) => number

// Анонимный метод (среднее значение)

const average: MyDel = arr => {
	if (arr.length === 0) return 0
	return arr.reduce((sum, x) => sum + x, 0) / arr.length
}

// ===== ComputerWithEvents =====
