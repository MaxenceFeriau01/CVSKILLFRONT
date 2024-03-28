class ReactSelectOption {
	value!: number | string | any

	label!: string

	periods?: string[] = []

	constructor(value: number | string | any, label: string) {
		this.value = value
		this.label = label
	}
}

export default ReactSelectOption
