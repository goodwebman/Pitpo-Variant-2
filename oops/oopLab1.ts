// ===== INTERFACES =====
interface IComputer {
	processor: ProcessorType
	manufacturer: ManufacturerType
	os: OSType
	clockSpeed: number
	ram: number
	software: string[]
	users: string[]
}

interface IOverclock {
	overclockTheComputer(): void
}

// ===== COMPUTER CLASS =====
class Computer implements IComputer, IOverclock {
	processor: ProcessorType
	manufacturer: ManufacturerType
	os: OSType
	clockSpeed: number
	ram: number
	software: string[]
	users: string[]

	private isOverclocked: boolean = false

	constructor(
		processor: ProcessorType = ProcessorType.Intel,
		manufacturer: ManufacturerType = ManufacturerType.Dell,
		os: OSType = OSType.Windows,
		clockSpeed: number = 3000,
		ram: number = 8,
		software: string[] = [],
		users: string[] = [],
	) {
		this.processor = processor
		this.manufacturer = manufacturer
		this.os = os
		this.clockSpeed = clockSpeed
		this.ram = ram
		this.software = software
		this.users = users
	}

	overclockTheComputer(): void {
		if (this.isOverclocked) {
			console.log('Already overclocked!')
			return
		}

		switch (this.processor) {
			case ProcessorType.Intel:
				this.clockSpeed *= 1.2
				break
			case ProcessorType.AMD:
				this.clockSpeed *= 1.3
				break
			case ProcessorType.AppleSilicon:
				console.log('Overclock not supported!')
				return
		}

		this.isOverclocked = true
	}

	static generate(): Computer {
		const processors = Object.values(ProcessorType)
		const manufacturers = Object.values(ManufacturerType)
		const osList = Object.values(OSType)

		const random = <T>(arr: T[]): T =>
			arr[Math.floor(Math.random() * arr.length)]

		return new Computer(
			random(processors),
			random(manufacturers),
			random(osList),
			Math.floor(Math.random() * 2000) + 2000,
			[4, 8, 16, 32][Math.floor(Math.random() * 4)],
			['Chrome', 'VSCode', 'Docker'].slice(
				0,
				Math.floor(Math.random() * 3) + 1,
			),
			['user1', 'user2', 'admin'].slice(0, Math.floor(Math.random() * 3) + 1),
		)
	}

	static generate100(): Computer[] {
		return Array.from({ length: 100 }, () => Computer.generate())
	}
}

// ===== TASK 2 FILTERING =====
const computers1 = Computer.generate100()

const byProcessor = computers1.filter(c => c.processor === ProcessorType.Intel)

const byProcessorAndManufacturer = computers1.filter(
	c =>
		c.processor === ProcessorType.AMD && c.manufacturer === ManufacturerType.HP,
)

const byUsersAndRam = computers1.filter(
	c => c.users.includes('admin') && c.ram >= 16,
)

// ===== TASK 3 SORTING =====
const computers2 = Computer.generate100()

const sortedByProcessor = [...computers2].sort((a, b) =>
	a.processor.localeCompare(b.processor),
)

const sortedByProcessorAndManufacturer = [...computers2].sort((a, b) => {
	const procCompare = a.processor.localeCompare(b.processor)
	if (procCompare !== 0) return procCompare
	return a.manufacturer.localeCompare(b.manufacturer)
})

// ===== TASK 4 SELECT =====
const computers3 = Computer.generate100()

const selected = computers3.map(c => ({
	clockSpeed: c.clockSpeed,
	ram: c.ram,
	software: c.software,
}))

// ===== MANUFACTURER =====
interface IManufacturer {
	name: string
	country: Country
	employees: number
}

class Manufacturer implements IManufacturer {
	constructor(
		public name: string = '',
		public country: Country = Country.USA,
		public employees: number = 0,
	) {}
}

const manufacturers: Manufacturer[] = [
	new Manufacturer('Dell', Country.USA, 100000),
	new Manufacturer('HP', Country.USA, 120000),
	new Manufacturer('Lenovo', Country.China, 90000),
]

// INNER JOIN
const joined = computers1
	.map(c => ({
		computer: c,
		manufacturer: manufacturers.find(m => m.name === c.manufacturer),
	}))
	.filter(x => x.manufacturer !== undefined)

// ===== STRING EXTENSION =====
declare global {
	interface String {
		removeRussian(): string
	}
}

String.prototype.removeRussian = function (): string {
	return this.replace(/[А-Яа-яЁё]/g, '')
}

// ===== TASK 7 (LINQ STYLE SAME CODE) =====
// (In TS, filter/map/sort already act like LINQ)

export {}
