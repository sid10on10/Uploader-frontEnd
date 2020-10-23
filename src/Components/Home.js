import React,{useState} from "react"
import axios from "axios"
import { Progress } from 'reactstrap';

const Home = ()=>{

  const [file,setFile] = useState()
  const [islink,setIslink] = useState(false)
  const [link,setLink] = useState("")

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
    data.append("file", file);

    axios.post("https://onetimeupload.herokuapp.com/upload", data,config)
      .then(res => {
          //console.log(res.data)
          setUploading(false);
          //alert(res.data.message)
          setMessage(res.data.message)
          setIslink(true)
          setLink(res.data.shorturl)
          setFile()
        }
      )
      .catch(err => console.log(err));
  };

  const uploadHandler = (event)=>{
    const file  = event.target.files[0]
    if(file.size>20971520){
      alert("File Size above 20 MB")
      event.target.value = null
    }else{
      setFile(file)
    }
  }

  const again = ()=>{
    window.location.reload()
  }

    return (
        <>
      <form onSubmit={upload}>
        <div> 
            <label>Select your file :   </label> 
            <input onChange={uploadHandler} type="file" name="file"/>
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
      {islink ? <div>
                <p>Your One time Link :</p>
                    <h4>{link}</h4>
                <button onClick={again} className="btn btn-success">Upload Another</button>
                </div> 
          : <div></div>}
      </>
    )
  }

export default Home;