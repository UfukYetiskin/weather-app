import './App.css';
import styled from "styled-components";
import {fetchWeatherThunk, fetchItemWeatherThunk} from './redux/weatherSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WeatherList from './components/WeatherList';

//Icons
import {AiOutlineCloud} from '@react-icons/all-files/ai/AiOutlineCloud'
import {RiRainyLine} from "@react-icons/all-files/ri/RiRainyLine"
import {FaTemperatureLow} from "@react-icons/all-files/fa/FaTemperatureLow"
import {TiWeatherPartlySunny} from "@react-icons/all-files/ti/TiWeatherPartlySunny"
import {GiNightSky} from "@react-icons/all-files/gi/GiNightSky"


function App() {
  const [city, setCity] = useState("istanbul")


  const dispatch = useDispatch();

  const items = useSelector(state => state.weather.items)
  const item = useSelector(state => state.weather.item)
  
  

  useEffect(() => {
    dispatch(fetchWeatherThunk(city))
    dispatch(fetchItemWeatherThunk(city))
    console.log(items)    
  }, [])

    //Styles
  const City = styled.h1`
    font-size : 1.5em;
    text-align: center;
    color : smokewhite;
    margin-top : 0;
  `;
  const CityInfo = styled.div`
    margin : 1%;
    padding : 1%
  `;
  const Symbol = styled.h1`
    font-size : 6em;
    text-align: center;
    color : smokewhite;
    margin : 0
  `
  const Infos = styled.h6`
  font-size : 0.8em;
  text-align: center;
  color : smokewhite;
  `
  const ButtonStyle = styled.button`
    background-color : #282c34;
    border  : 1px solid #282c34;
    font-size : 2em;
  `
  const handleClick = async (e) => {
    const sehir = e.target.value
    setCity(sehir)
    await dispatch(fetchWeatherThunk(sehir))
    await dispatch(fetchItemWeatherThunk(sehir))
    console.log(city)
    console.log(items)
    console.log(item)
  }

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <ButtonStyle><button value="izmir" onClick={handleClick}>İzmir</button></ButtonStyle>
          <ButtonStyle><button value="istanbul" onClick={handleClick}>İstanbul</button></ButtonStyle>
          <ButtonStyle><button value="ankara" onClick={handleClick}>Ankara</button></ButtonStyle>
          <ButtonStyle><button value="erzurum" onClick={handleClick}>Erzurum</button></ButtonStyle>
          <ButtonStyle><button value="antalya" onClick={handleClick}>Antalya</button></ButtonStyle>
          <ButtonStyle><button value="van" onClick={handleClick}>Van</button></ButtonStyle>
          <ButtonStyle><button value="edirne" onClick={handleClick}>Edirne</button></ButtonStyle>
          <ButtonStyle><button value="diyarbakır" onClick={handleClick}>Diyarbakır</button></ButtonStyle>
        </div>
         {items && <div>
          {items?.map((weather) => (
            <li>{weather.main.temp / 10}</li>
          ))}
        
        </div>} 

        {item.name}

      </div>  
    </div>
  );
}

export default App;
