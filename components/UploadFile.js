import { useEffect } from "react";

const UploadFile = ( data, success, instructions, instructionsClasses, containerClasses, inputClasses, labelClasses, fileNameClasses ) => {

  let active = false;
  let fileName = "No file chosen";
  let fileNameElement;
  let buttonElement
  useEffect(() => {
    fileNameElement = document.getElementById('file-name');
    buttonElement = document.getElementById('upload-label');
  })
  const uploadStyle = () => {
    buttonElement.classList.add('active');
    fileNameElement.classList.add('active');
  }
  const handleFileUpload = (fileName) => {
    active=true;
    fileNameElement.textContent = fileName;
    uploadStyle();
  }
  if (active) {
    uploadStyle();
  }
  const upload = async (e) => { // Get Seed Phrase from User Files
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => { 
      success = true;
      data = (e.target.result);
      console.log(data);
      useEffect(() => {
        localStorage.setItem('upload_data', data);
      })
    };
    if (e.target.files[0]){
      reader.readAsText(e.target.files[0]);
      fileName = e.target.files[0].name;
      handleFileUpload(fileName);
    } else {
      data = '';
    }
  }
  return (
    <>
    <div className={containerClasses?"upload-file-container container center sm "+containerClasses:"upload-file-container container center sm"}>
    <input className={inputClasses?"upload-file-input "+inputClasses:"upload-file-input"} type="file" onChange={upload} id="upload" hidden />
    <span className="upload-btn-container">
    <label className={labelClasses?"upload-file-label "+labelClasses:"upload-file-label"} for="upload" id="upload-label"></label>
    </span>
    <span className={fileNameClasses?"upload-file-name "+fileNameClasses:"upload-file-name"} id="file-name">{fileName}</span>
    </div>
  </>
  )
}

export default UploadFile;