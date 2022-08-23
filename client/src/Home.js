import React, { useState, useEffect } from 'react';
import "./Home.css";

const Home = () => {
  const [ pictures, setPictures ] = useState([])
  const getData = async() =>{
    try{
      const response = await fetch("/home",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      setPictures(data)
    }catch(error){ 
      console.log(error)
    }
  } 
  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <div>
    {pictures && pictures.map((elem)=>(
      <div key={elem.valinput} className='homeDisplayInterfaceContainerForView'>
        <div className='homeDisplayInterfaceForView' style={{background:elem.background}}>
                  <p style={{fontFamily:elem.fontFamily}}>{elem.valquote}</p>
                  <p style={{fontFamily:elem.fontFamily}}>{elem.valinput}</p>
                </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default Home