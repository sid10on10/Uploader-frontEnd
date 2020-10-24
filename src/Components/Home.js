import React,{useState} from "react"
import axios from "axios"
import { Progress } from 'reactstrap';
import Link from "./Link"

const Home = ()=>{

  const [files,setFiles] = useState()
  const [links,setLinks] = useState()

  const [message,setMessage] = useState()

  const [uploadProgress, updateUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  

  const config = {
    onUploadProgress: progressEvent => {
      //console.log(progressEvent.loaded)
      const progress = progressEvent.loaded / progressEvent.total * 100;
      updateUploadProgress(Math.round(progress));
    }
  
  }


  const upload = event => {
    event.preventDefault()
    setUploading(true);
    const data = new FormData();
    data.append("files", files);
    for (let i = 0; i < files.length; i++) {
      data.append(`files`, files[i])
    }

    axios.post("https://onetimeupload.herokuapp.com/upload", data,config)
      .then(res => {
          //console.log(res.data)
          setUploading(false);
          //alert(res.data.message)
          setMessage(res.data.message)
          setLinks(res.data.url_list)
          setFiles()
        }
      )
      .catch(err => console.log(err));
  };

  const uploadHandler = (event)=>{
    const upload_files  = event.target.files
    let files_size = 0
    for (let i = 0; i < upload_files.length; i++) {
        files_size+=upload_files[i].size
    }
    if(files_size>20971520){
      alert("Files Size should be below 20 MB")
      event.target.value = null
    }else{
      setFiles(upload_files)
    }
    //console.log(upload_files)
  }

  const again = ()=>{
    window.location.reload()
  }

    return (
        <>
        <h3>Select multiple files upto 20 MB</h3>
      <form onSubmit={upload}>
        <div> 
            <label >Select your files :   </label> 
            <input style={{marginLeft:"10px"}}onChange={uploadHandler} type="file" name="file" multiple/>
        </div>
        <div>
          <button className="btn btn-primary mt-2" type="submit" name="file_upload" value="Upload">
            Upload
          </button>
        </div>
      </form>
      {(uploading)
          ?
          <div>
            <div className="text-center">{uploadProgress}%</div>
            <Progress value={uploadProgress} />
          </div>
          : null
        }
        {message ? <div>
                    <p>{message}</p>
                </div> 
          : <div></div>}
      {links ? 
        <>
        {links.map((link, index) => {

                  return (
                      <div>
                          <Link
                              key={index}
                              name={link.file_name}
                              short_link={link.shortURL}
                          />
                      </div>
                  );
          })}
        <button onClick={again} className="btn btn-success">Upload Another</button>
        </>
          : <div></div>}
      </>
    )
  }

export default Home;