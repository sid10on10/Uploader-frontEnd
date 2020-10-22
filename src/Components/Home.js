import React,{useState} from "react"
import axios from "axios"

const Home = ()=>{

  const [file,setFile] = useState()
  const [islink,setIslink] = useState(false)
  const [link,setLink] = useState("")
  

  const upload = event => {
    event.preventDefault()
    const data = new FormData();
    data.append("file", file);

    axios.post("https://onetimeupload.herokuapp.com/upload", data)
      .then(res => {
          console.log(res.data)
          alert(res.data.message)
          setIslink(true)
          setLink(res.data.shorturl)
          setFile()
        }
      )
      .catch(err => console.log(err));
  };

  const again = ()=>{
    window.location.reload()
  }

    return (
        <>
      <form onSubmit={upload}>
        <div> 
            <label>Select your file:</label> 
            <input onChange={event=>{
                const file =  event.target.files[0];
                setFile(file)
            }} type="file" name="file"/>
        </div>
        <div>
          <button className="btn btn-primary mt-2" type="submit" name="file_upload" value="Upload">
            Upload
          </button>
        </div>
      </form>
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