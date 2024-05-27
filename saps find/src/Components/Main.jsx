import React, { useEffect, useState } from 'react'
import data from '../data/data';


function Main() {
    const [stringData, setStringData] = useState();

    useEffect(() => {
        setStringData(data);
    }, [])

  return (
    <div>
          {stringData.map((person, index) => (
        <div key={index}>
          <p>Name: {person.name}</p>
          <p>Image: {person.image}</p>
          <p>Link: {person.link}</p>
          <p>Crime: {person.crime}</p>
          <p>Status: {person.status}</p>
        </div>
      ))}
    </div>
  )
}

export default Main;