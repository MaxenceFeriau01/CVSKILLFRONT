// eslint-disable-next-line import/prefer-default-export
export const exportItem = (item: any, fileName: string) => {
	const data = `data:application/json;charset=UTF-8,${encodeURIComponent(
		JSON.stringify(item)
	)}`
	const link = document.createElement("a")
	link.setAttribute("href", data)
	link.setAttribute("download", `${fileName}.json`)
	link.click()
	link.remove()
}
