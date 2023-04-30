import '../App.css';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CryptoJS from 'crypto-js';

const base64url = (source) => {
  // Encode in classical base64
  var encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}


const makeJWT = (email) => {
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  };

  const data = {
    "email": email
  }

  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encodedData = base64url(stringifiedData);

  const unsignedToken = encodedHeader + "." + encodedData;

  const signature = CryptoJS.HmacSHA256(unsignedToken, "jwtsecret");
  const encodedSignature = base64url(signature);
  const signedToken = unsignedToken + "." + encodedSignature;

  return signedToken;
}

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState([]);
  const {user} = useAuth0();
  const jwt = makeJWT(user.email);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleUpload = async () => {
    if(!isFilePicked){
      console.log('No file selected');
      return;
    }
    else{
      console.log(selectedFile.name);
    }
    console.log('5');
    let formData = new FormData();
    formData.append('file', selectedFile);
    try{
      const response = await fetch(
        `http://localhost:8000/upload`,{
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`
          },
          body: formData
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/query?query=${query}`,{
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${jwt}`
          }
        }
      );
      const data = await response.json();
      console.log(data.results)
      setResponse(data.results);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    handleSearchClick()
  }, []);

  const foundInstances = response.map((instance)=>{
    return <li>
      <div>
        <span className='resultText'>Heading: </span> {instance[2]} <br/>
        <span className='resultText'>Description:</span> {instance[3]}
      </div>
      </li>;
    });


    return (
        <div>
            <header>
            <Header />
            <div className="parent">
            <div className="uploadPosition">
              <input type="file" name="file" onChange={changeHandler} />
              <button onClick={handleUpload}>Upload Document</button>
            </div>
            <div className = "logOutposition">
            <LogoutButton />
            </div>
            </div>
            <main className="main">
              <div className='queryBox'>
                <input type="text" value={query} onChange={handleQueryChange} placeholder = "Type Query" className="query-input" />
                <button onClick={handleSearchClick} className="search-button">Search</button>
                </div>
                {response && (
                <div>
                    <h2 className='APIresponse'>Top 5 Results:</h2>
                    {/* <p>{response}</p> */}
                    <p>
                        <ul className = 'results'>
                            {foundInstances[0]}
                            <br/>
                            {foundInstances[1]}
                            <br/>
                            {foundInstances[2]}
                            <br/>
                            {foundInstances[3]}
                            <br/>
                            {foundInstances[4]}
                            <br/>
                        </ul>
                    </p>
                </div>
                )}
            </main>

            <Footer/>
            </header>
        </div>
    );
};
export default Home;



