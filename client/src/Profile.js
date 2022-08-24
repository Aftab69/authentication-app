import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [ visibility, setVisibility ] = useState({display:"none"})
  const [ userdata, setUserdata] = useState({})
  const [ maininterfacestyle, setMaininterfacestyle ] = useState({display:"none"})
  const [ displayinterfacecolor, setDisplayinterfacecolor ] = useState({background:"white"})
  const [ quote, setQuote ] = useState("")
  const [ authorinput, setAuthorinput] = useState("")
  const [ fontstyle, setFontstyle ] = useState({fontFamily:"'Josefin Sans', sans-serif"})

  const getData = async() =>{
      try{
        const res = await fetch("/api/profile",{
                    method:"GET",
                    headers:{
                      "Content-Type":"application/json"
                    },
                    credentials:"include"
                  })
        if(res.status===200){
            const data = await res.json();
            setUserdata(data); //data of the user
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
  const uploadFile = async() =>{
    try{
      const res = await fetch("/upload",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          date: Date.now(),
          background:displayinterfacecolor.background,
          fontFamily:fontstyle.fontFamily,
          valquote:quote,
          valinput:authorinput
        })
      })
      if(res.status===200){
        const receivedUserData = await res.json();
        setUserdata(receivedUserData)
        setQuote("")
        setAuthorinput("")
        setDisplayinterfacecolor({background:"white"})
        setFontstyle({fontFamily:"'Josefin Sans', sans-serif"})
        document.getElementById('textArea').value = ''
        document.getElementById('inputArea').value = ''
        alert("picture uploaded")
        setMaininterfacestyle({display:"none"})
      } else {
        console.log("error in uploading picture")
      }
    }catch(error){
      console.log(error)
    }
  }
  const handleFinalUpload = (e) =>{
    e.preventDefault();
    uploadFile();
  }

  return (
    <>
      <div style={visibility}>
        <div className='profilepageContainer'>
          <div className='profilepageheadingContainer'>
            <div className='profilepageheadingText'><p>Welcome, {userdata.name}</p></div>
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
                    <div className='subheadingContainer'><p>Choose color:</p></div>
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
                    <div className='subheadingContainer'><p>Choose font family:</p></div>
                    <div className='fontContainerButtons'>
                      <button name="'Josefin Sans', sans-serif" onClick={handleFontChange}>Click to try me</button>
                      <button name="'Dancing Script', cursive" onClick={handleFontChange}>Click to try me</button>
                      <button name="'Cormorant Garamond', serif" onClick={handleFontChange}>Click to try me</button>
                    </div>
                  </div>
                </div>
                <div className='inputContainer'>
                  <div className='inputContainerSemicontainer1'>
                    <div className='subheadingContainer'><p>Write your quote:</p></div>
                    <div className='inputContainerTextarea'><textarea id='textArea' maxLength="360" onChange={handleQuote} /></div>
                  </div>
                  <div className='inputContainerSemicontainer2'>
                    <div className='inputContainerSemicontainer2a'>
                      <div className='subheadingContainer'><p>Quote by:</p></div>
                      <div className='inputContainerInputarea'><input id='inputArea' maxLength="30" onChange={handleAuthorInput} /></div>
                    </div>
                    <div className='inputContainerSemicontainer2b'>
                      <button onClick={handleFinalUpload}>Upload</button>
                    </div>
                  </div> 
                </div>
              </div>
          </div>
          {userdata.pictures && userdata.pictures.map((elem)=>(
            <div key={elem.valinput} className='displayInterfaceContainerForView'>
                <div className='displayInterfaceForView' style={{background:elem.background}}>
                  <p style={{fontFamily:elem.fontFamily}}>{elem.valquote}</p>
                  <p style={{fontFamily:elem.fontFamily}}>{elem.valinput}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Profile