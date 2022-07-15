class ReactSelectOption {
	value!: number | string

	label!: string

	periods?: string[] = []

	constructor(value: number | string, label: string) {
		this.value = value
		this.label = label
	}
}

export default ReactSelectOption
