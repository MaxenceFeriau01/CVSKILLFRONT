import FileUploadIcon from "@mui/icons-material/FileUpload"

interface FileUploadProps {
	accept: string
	text: string
	register: any
	value: FileList
	id: string
}

function FileUpload({ accept, text, id, register, value }: FileUploadProps) {
	return (
		<label className="file-upload" htmlFor={id}>
			<FileUploadIcon />
			{value?.length > 0 ? <i>{value[0].name}</i> : text}
			<input {...register} id={id} type="file" accept={accept} hidden />
		</label>
	)
}
export default FileUpload
