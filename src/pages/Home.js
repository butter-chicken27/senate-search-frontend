import logo from '../logo.svg';
import '../App.css';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';



const Home = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState([]);

    const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };


const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://34.93.191.58/query?query=${query}`);
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
            <div className = "logOutposition">
            <LogoutButton />
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



