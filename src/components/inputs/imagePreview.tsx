import Swal from "sweetalert2"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"

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

		if (file && file.size < 5242880) {
			setImg({
				file: e.target.files[0],
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
			})
		} else {
			Swal.fire({
				title: `Erreur !`,
				text: "Veuillez télécharger un fichier de moins de 5 Mo",
				icon: "error",
				confirmButtonText: "Ok",
			})
		}
	}

	return (
		<label htmlFor="image" className="image-preview-upload">
			{img!.src ? (
				<img src={img.src} alt={img.alt} />
			) : (
				<InsertPhotoIcon />
			)}

			<input
				{...register("logo")}
				type="file"
				id="image"
				name="image"
				accept="image/*"
				className="d-none"
				onChange={onLogoChange}
			/>
		</label>
	)
}
export default ImagePreview
