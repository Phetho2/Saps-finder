import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/About.css';
import axios from 'axios';

function About() {

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=8c96d930')
        .catch((err) => {
            console.log("Err ", err);
        })
        const dataToString = response.data;
        console.log(dataToString)
    
     };
        
    fetchData();
 }, [])

  return (
    <div className='about-wrapper' id='about'>
        <h2>About the Application</h2>
        <p>My SAPS(South Africa Police Service) Finder is 
            application that is developed to help and rise awareness
            around our communities. It uses real time data from the 
            official SAPS database to display most wanted criminals in South Africa.
            This people are dangerous in our society and they need to be 
            arrested, so we can all play our part in identifying those individual
            and report them directly to the police.By clicking see more details,
            it will direct you to official SAPS website where you can have more details 
            about the suspect/wanted personall and be able to report them if it happens 
            that you recognise any of them.
        </p>
        <h5>Developed by Daniel Phalane</h5>
        <br />
        <hr />
        <Link to='/'>
            <button>Go Back</button>
        </Link>
    </div>
  )
}

export default About