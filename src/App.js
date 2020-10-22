import React,{useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios"

function App() {

  const [file,setFile] = useState()

  const fileChangedHandler = (event) => {
    let upload_file = event.target.files[0];
    console.log(upload_file)
    
    
    
  };
  console.log(file)

  const uploadFile = (event) =>{
      event.preventDefault()
      const data = new FormData()
      data.append("file",file)
      axios.post("http://localhost:5000/upload",data)
      .then((res)=>res.json())
      .then((data)=>console.log(data))
      .catch((error)=>console.log(error))

  }

  const Home = ()=>{
    return (
      <form method="POST" action="http://localhost:5000/upload" encType="multipart/form-data">
        <div> 
            <label>Select your file:</label> 
            <input onChange={fileChangedHandler} type="file" name="file"/>
        </div>
        <div>
          <button className="btn btn-primary mt-2" type="submit" name="file_upload" value="Upload">
            Upload
          </button>
        </div>
      </form>
    )
  }

  

  
  return (
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>React</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;