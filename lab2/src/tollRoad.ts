type TripRecord = {
  plate: string
  time: string
  action: 'enter' | 'exit'
  km: number
}

export function tollRoadBilling(input: string): string {
  const lines = input.trim().split('\n').map(l => l.trim())
  const blocksCount = parseInt(lines[0])
  let lineIndex = 1
  const results: string[] = []

  for (let b = 0; b < blocksCount; b++) {
    while (lines[lineIndex] === '') lineIndex++

    const rates = lines[lineIndex].split(/\s+/).map(Number)
    lineIndex++

    const records: TripRecord[] = []
    while (lineIndex < lines.length && lines[lineIndex] !== '') {
      const [plate, mmddhhmm, action, kmStr] = lines[lineIndex].split(/\s+/)
      const [mm, dd, hh, mm2] = mmddhhmm.split(':').map(Number)
      records.push({
        plate,
        time: `${mm}:${dd}:${hh}:${mm2}`,
        action: action as 'enter' | 'exit',
        km: parseInt(kmStr),
      })
      lineIndex++
    }

    const cars: Record<string, TripRecord[]> = {}
    for (const r of records) {
      if (!cars[r.plate]) cars[r.plate] = []
      cars[r.plate].push(r)
    }

    const bills: { plate: string; total: number }[] = []

    for (const plate in cars) {
      const recs = cars[plate].sort((a: TripRecord, b: TripRecord) => a.time.localeCompare(b.time))
      let total = 0
      for (let i = 0; i < recs.length - 1; i++) {
        const enter = recs[i], exit = recs[i + 1]
        if (enter.action === 'enter' && exit.action === 'exit') {
          const hour = parseInt(enter.time.split(':')[2])
          const rate = rates[hour]
          total += Math.abs(exit.km - enter.km) * rate + 300
          i++
        }
      }
      bills.push({ plate, total })
    }

    bills.sort((a, b) => a.plate.localeCompare(b.plate))
    for (const b of bills) {
      results.push(`${b.plate} $${(b.total / 100).toFixed(2)}`)
    }

    if (b < blocksCount - 1) results.push('')
    lineIndex++
  }

  return results.join('\n')
}