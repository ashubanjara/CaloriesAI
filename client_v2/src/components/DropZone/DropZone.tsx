import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropZone.css'
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';

export default function DropZone({
  acceptedFileTypes = "image/jpg, image/jpeg, image/png, image/gif",
  maxSize = 2000000,
  onFileDrop = () => {},
  onFileRemove = () => {},
  onSubmit = (file) => {},
  isLoading = false,
  messages = {
    dragDrop: 'Drag and drop your file here, or click to select files',
    fileTooLarge: 'File is too large',
    fileInvalidType: 'Invalid file type',
    dropFile: 'Drop file here ...',
    removeImage: 'Remove image',
    saveImage: 'Upload Image',
  }
}) {
  const [files, setFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: maxSize,
    onDrop: (acceptedFiles, rejectedFiles) => {
      const mappedFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setFiles(mappedFiles);
      setFileErrors(rejectedFiles.length > 0 ? rejectedFiles[0].errors : []);
      onFileDrop(mappedFiles, rejectedFiles);
    },
    onDragEnter: () => {
      setFiles([]);
      setFileErrors([]);
    },
  });

  useEffect(() => {
    return () => {
      revokeDataUri(files);
    };
  }, [files]);

  const revokeDataUri = (files) => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  };

  const onClickHandler = () => {
    revokeDataUri(files);
    setFiles([]);
    setFileErrors([]);
    onFileRemove();
  };

  const getErrorMessage = () => {
    switch (fileErrors[0]?.code) {
      case 'file-invalid-type':
        return <p className="error">{messages.fileInvalidType}</p>;
      case 'file-too-large':
        return <p className="error">{messages.fileTooLarge}</p>;
      default:
        return <p className="error">File error</p>;
    }
  };

  let classes = "dropzone";
  let additionalClass = isDragAccept
    ? `${classes} accept`
    : isDragReject
    ? `${classes} reject`
    : classes;

  return (
    <section className="container">
      <div {...getRootProps({ className: additionalClass })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          isDragReject ? (
            <p>{messages.fileInvalidType}</p>
          ) : (
            <p>{messages.dropFile}</p>
          )
        ) : files.length === 0 ? (
          fileErrors.length > 0 ? (
            getErrorMessage()
          ) : (
            <p>Drag and Drop or Click Here to Upload Image</p>
          )
        ) : null}
        {files.map(file => (
        <div
            className='flex justify-center'
        >
            <Image
                alt="Preview"
                key={file.preview}
                src={file.preview}
                radius='none'
                className="block max-w-sm max-h-72 object-contain"
                // style={previewStyle}
                isBlurred
            />
          </div>
        ))}
      </div>
      <Button isDisabled={files.length <= 0} className="remove" onClick={onClickHandler}>
        {messages.removeImage}
      </Button>
      <Button isLoading={isLoading} isDisabled={files.length <= 0} onClick={() => onSubmit(files[0])}>{messages.saveImage}</Button>
    </section>
  );
}