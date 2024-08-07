import React, { useRef, useState } from 'react';
import './uploadPhoto.scss';




function UploadPhoto() {

    
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileReader = new FileReader();
            fileReader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && typeof e.target.result === 'string') {
                    setPreviewUrl(e.target.result);
                }
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = () => {
        if (file) {
            // Ici, vous implémenteriez la logique pour envoyer le fichier au serveur
            console.log('Uploading file:', file);
            // Exemple :
            // const formData = new FormData();
            // formData.append('profilePhoto', file);
            // fetch('/api/upload', { method: 'POST', body: formData });
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.error("fileInputRef is null or undefined");}
        }
    return (
        <div className="profile-photo-upload">
            <div className="preview-container" onClick={handleClick}>
                {previewUrl ? (
                    <img src={previewUrl} alt="Prévisualisation" className="preview-image" />
                ) : (
                    <div className="placeholder">Cliquez pour choisir une photo</div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <button onClick={handleUpload} disabled={!file}>
                Sauvegarder la photo
            </button>
        </div>
    );
}

export default UploadPhoto;