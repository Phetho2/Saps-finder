import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../Components/Content.css';

function Content() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

 useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('https://tut-puppeteer.onrender.com/wantedPersonell')
        .catch((err) => {
            console.log("Err ", err);
        })
        const dataToString = response.data;
        setData(dataToString);
   
    
     };
        
    fetchData();
 }, [])

 const handleSearchChange = (event) => {
    setSearch(event.target.value);
 }

 const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
 }

 const filteredOptionData = selectedOption
  ? data.filter((item) => item.crime === selectedOption) : data; 

 const handleButtonClick = (url) => {
    window.location.href = url;
 }
 

  return (
    <div className="cards-container">
        <div className='search'>
            <span>Search</span>
            <input 
            type="text"
            placeholder='search...'
            value={search}
            onChange={handleSearchChange}
            />
            <button>Search</button>
            <span htmlFor="crime">Filter By crime Nature</span>
            <select name="" id="crime" value={selectedOption} onChange={handleOptionChange}>
                <option value="">All</option>
                <option value="(Rape)">Rape</option>
                <option value="(Theft)">Theft</option>
                <option value="(Murder)">Murder</option>
                <option value="(Fraud)">Fraud</option>
                <option value="(Robbery)">Robbery</option>
                <option value="(Assault)">Assault</option>
            </select>
        </div>
        <div className="cards">
        {filteredOptionData.filter((item) => {
        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
     }).map((person, index) => (
        <div className='card' key={index}>
            <img src={`https://www.saps.gov.za/crimestop/wanted/${person.image}`}/>
          <h3><span className='strong'>Name: </span> {person.name}</h3> 
          <p>Crime: {person.crime}</p>
          <p>Status: {person.status}</p>
          <button onClick={() => handleButtonClick(`https://www.saps.gov.za/crimestop/wanted/${person.link}`)}>See More Details</button>
        </div>
      ))}
        </div>
    </div>
  )
}

export default Content