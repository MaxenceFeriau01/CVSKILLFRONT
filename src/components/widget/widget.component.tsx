function Widget(props: any) {
	const { img } = props
	return (
		<a href={img.url} target="_blank" rel="noopener noreferrer">
			<img src={img.src} alt="saba7o" />
		</a>
	)
}

export default Widget
