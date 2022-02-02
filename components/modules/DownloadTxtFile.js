const DownloadTxtFile = ( string, fileName, classes, label ) => {
    const downloadFile = () => {
        const textData = document.createElement("a");
        const file = new Blob([string], {type: 'text/plain'});
        textData.href = URL.createObjectURL(file);
        textData.download = fileName;
        document.body.appendChild(textData); // Required for this to work in FireFox
        textData.click();
    }
    return (
        <div className={classes?classes:"download-txt-file"} id='download-txt-file' onClick={downloadFile()}>{label}</div>

    )
}

export default DownloadTxtFile;