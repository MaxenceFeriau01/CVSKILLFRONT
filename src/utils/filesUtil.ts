// eslint-disable-next-line import/prefer-default-export
export const base64toBlob = (data: string) => {
	const bytes = atob(data)
	let { length } = bytes
	const out = new Uint8Array(length)

	// eslint-disable-next-line no-plusplus
	while (length--) {
		out[length] = bytes.charCodeAt(length)
	}

	const url = URL.createObjectURL(
		new Blob([out], { type: "application/pdf" })
	)

	return url
}
