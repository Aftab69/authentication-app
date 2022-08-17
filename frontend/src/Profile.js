import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [ visibility, setVisibility ] = useState({display:"none"})
  const [ data, setData] = useState({})
  const [ maininterfacestyle, setMaininterfacestyle ] = useState({display:"none"})
  const [ displayinterfacecolor, setDisplayinterfacecolor ] = useState({background:"white"})
  const [ quote, setQuote ] = useState("")
  const [ authorinput, setAuthorinput] = useState("")
  const [ fontstyle, setFontstyle ] = useState({fontFamily:"'Josefin Sans', sans-serif"}) 

  const getData = async() =>{
      try{
        const res = await fetch("/profile",{
                    method:"GET",
                    headers:{
                      "Content-Type":"application/json"
                    },
                    credentials:"include"
                  })
        if(res.status===200){
            const data = await res.json();
            setData(data); //data of the user
            setVisibility({display:"block"})
        } else if(res.status===400) {
            navigate("/login")
        }
      } catch(error){
            navigate("/login")
      }
  }
  useEffect(()=>{
    getData()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCustomizeButton = () =>{
    setMaininterfacestyle({display:"flex"})
  }
  const handleColorChange = (e) =>{
    e.preventDefault();
    setDisplayinterfacecolor({background:e.target.name})
  }
  const handleFontChange = (e) =>{
    e.preventDefault();
    setFontstyle({fontFamily:e.target.name})
  }
  const handleQuote = (e) =>{
    const val = e.target.value;
    setQuote(()=>{
      if(val.length>0){
        return `"${val}"`
      } else {
        return val
      }
    })
  }
  const handleAuthorInput = (e) =>{
    const val = e.target.value;
    setAuthorinput(()=>{
      if(val.length>0){
        return `~ ${val}`
      } else {
        return val
      }
    })
  }
  return (
    <>
      <div style={visibility}>
        <div className='profilepageContainer'>
          <div className='profilepageheadingContainer'>
            <div className='profilepageheadingText'><p>Welcome, {data.name}</p></div>
            <div className='profilepageheadingButton'><button onClick={handleCustomizeButton}>Upload your quote</button></div>
          </div>
          <div className='mainInterfaceContainer' style={maininterfacestyle}>
              <div className='displayInterfaceContainer'>
                <div className='displayInterface' style={displayinterfacecolor}>
                  <p style={fontstyle}>{quote}</p>
                  <p style={fontstyle}>{authorinput}</p>
                </div>
              </div>
              <div className='customizeInterfaceContainer'>
                <div className='colorContainer'>
                  <div className='colorContainerBox'>
                    <div><p>Choose color:</p></div>
                    <div className='colorContainerButtons'>
                      <button name='#3498db' onClick={handleColorChange}></button>
                      <button name='#e67e22' onClick={handleColorChange}></button>
                      <button name='#9b59b6' onClick={handleColorChange}></button>
                      <button name='#f1c40f' onClick={handleColorChange}></button>
                      <button name='#95a5a6' onClick={handleColorChange}></button>
                      <button name='#1abc9c' onClick={handleColorChange}></button>
                    </div>
                  </div>
                  
                </div>
                <div className='fontContainer'>
                  <div className='fontContainerBox'>
                    <div><p>Choose font family:</p></div>
                    <div className='fontContainerButtons'>
                      <button name="'Josefin Sans', sans-serif" onClick={handleFontChange}>Click to try me</button>
                      <button name="'Dancing Script', cursive" onClick={handleFontChange}>Click to try me</button>
                      <button name="'Cormorant Garamond', serif" onClick={handleFontChange}>Click to try me</button>
                    </div>
                  </div>
                </div>
                <div className='inputContainer'>
                  <div className='inputContainerSemicontainer1'>
                    <div><p>Write your quote:</p></div>
                    <div className='inputContainerTextarea'><textarea maxlength="360" onChange={handleQuote} /></div>
                  </div>
                  <div className='inputContainerSemicontainer2'>
                    <div><p>Quote by:</p></div>
                    <div className='inputContainerInputarea'><input maxlength="30" onChange={handleAuthorInput} /></div>
                  </div> 
                </div>
              </div>
          </div>
          <div>
            <p>After main interface container</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile