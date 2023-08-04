import { useState } from "react"

function usePagination(defaultSize: number) {
	const [pageSize, setPageSize] = useState<number>(defaultSize)

	const onChangePageSize = (newSize: number) => {
		setPageSize(newSize)
	}

	return {
		pageSize,
		onChangePageSize,
	}
}

export default usePagination
