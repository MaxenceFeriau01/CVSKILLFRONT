import { InputLabel } from "@mui/material"
import imageUpload from "../../resources/images/image-upload.svg"

interface Image {
	src: string
	alt: string
}

interface ImagePreviewProps {
	img: Image
	setImg: Function
	register: any
}

function ImagePreview({ img, setImg, register }: ImagePreviewProps) {
	const onLogoChange = (e: any) => {
		const file = e.target.files[0]
		if (file) {
			setImg({
				file: e.target.files[0],
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
			})
		}
	}

	return (
		<label htmlFor="image" className="image-preview-upload">
			{img!.src ? (
				<img src={img.src} alt={img.alt} />
			) : (
				<img src={imageUpload} alt="Default" />
			)}
			<InputLabel>Logo</InputLabel>
			<input
				{...register("logo")}
				type="file"
				id="image"
				name="image"
				accept="image/png, image/jpeg"
				className="hidden"
				onChange={onLogoChange}
			/>
		</label>
	)
}
export default ImagePreview
