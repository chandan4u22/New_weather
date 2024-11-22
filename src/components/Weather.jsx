import React, { useState } from "react";
import cloud from "../images/Clouds.png"
import clear from "../images/Clear.png"
import rain from "../images/Rain.png"
import err from "../images/error2.png"
import smoke from "../images/smoke.png"

      
 const Weather = (city) => {
 const [data,setData] = useState("")
 const [search,setSearch] = useState()
 const [error,setError] = useState()

 const API_KEY="6d83156e4e40ca97d0c6924b832fe00c"

 const handleInput = (event) =>{
   setSearch(event.target.value)
  }
      const myFun = async () =>{
      const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
      const jsonData =await get.json()
      console.log(jsonData);
      console.log(search);
      setData(jsonData);
      setSearch("");

      if(search === ""){
        alert("Enter City Name")
        setError("Enter City Name")
      }
      else if(jsonData.cod === "404"){
        setError("invalid name, city Not found")
      }
      else{
        setError("")
      }
  }
console.log(error);   
return (
  <>
    <div className="container">
      <div className="inputs">
        <input type="text" placeholder="Search" value={search} onChange={handleInput}/>
        <button onClick={myFun}><i class="fa fa-search"></i></button>
      </div>
      <div className="data">
       {
         error ? 
         <div className="errorPage">
          <h2 className="head">Opps...</h2>
          <p>{error}</p>
          <img src={err} alt="" />
         </div> :  "" 
       }
       {data && data.weather ?
        <div className="weathers">
          <h2 className="cityName">{data.name}</h2>
          {data.weather[0].main === "Clouds" ? <img src={cloud} alt=""/> :"" }
          {data.weather[0].main === "Clear" ? <img src={clear} alt=""/> :"" }
          {data.weather[0].main === "Rain" ? <img src={rain} alt=""/> : ""}
          {data.weather[0].main === "Smoke" ? <img src={smoke} alt=""/> : ""}
          {data.weather[0].main === "Haze" ? <img src={smoke} alt=""/> : ""}
          <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
          <p className="climate">{data.weather[0].description}</p>
        </div> :""
       }
      </div>
    </div>
  </>
);
};

export default Weather;