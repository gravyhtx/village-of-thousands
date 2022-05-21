import { useEffect, useState } from "react";
import { isLoaded } from "../utils/siteFunctions";

const UploadFile = ( data, success, instructions, instructionsClasses, containerClasses, inputClasses, labelClasses, fileNameClasses ) => {

  const [loaded, setLoaded] = useState(false);
  let active = false;
  let fileName = "No file chosen";
  let fileNameElement;
  let buttonElement;

  useEffect(() => {
    if(!loaded){
      localStorage.removeItem('upload_data')
      setLoaded(true);
    }
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

  const [uploadData, setUploadData] = useState();
  
  useEffect(() => {
    localStorage.setItem('upload_data', uploadData);
  })

  const upload = async (e) => { // Get Seed Phrase from User Files
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => { 
      success = true;
      data = (e.target.result);
      setUploadData(data);
    };
    if (e.target.files[0]){
      reader.readAsText(e.target.files[0]);
      fileName = e.target.files[0].name;
      handleFileUpload(fileName);
    } else {
      data = '';
    }
    data = uploadData;
  }
  return (
    <>
    <div className={containerClasses?"upload-file-container container center sm "+containerClasses:"upload-file-container container center sm"}>
    <input className={inputClasses?"upload-file-input "+inputClasses:"upload-file-input"} type="file" onChange={upload} id="upload" hidden />
    <span className="upload-btn-container">
    <label className={labelClasses?"upload-file-label "+labelClasses:"upload-file-label"} htmlFor="upload" id="upload-label"></label>
    </span>
    <span className={fileNameClasses?"upload-file-name "+fileNameClasses:"upload-file-name"} id="file-name">{fileName}</span>
    </div>
  </>
  )
}

export default UploadFile;