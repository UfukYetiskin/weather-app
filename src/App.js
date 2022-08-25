import './App.css';
import styled from "styled-components";
import {fetchWeatherThunk} from './redux/weatherSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WeatherList from './components/WeatherList';
import {AiOutlineCloud} from '@react-icons/all-files/ai/AiOutlineCloud'
import {RiRainyLine} from "@react-icons/all-files/ri/RiRainyLine"
import {FaTemperatureLow} from "@react-icons/all-files/fa/FaTemperatureLow"
import {TiWeatherPartlySunny} from "@react-icons/all-files/ti/TiWeatherPartlySunny"
import {GiNightSky} from "@react-icons/all-files/gi/GiNightSky"


function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weather.items)
  const [city, setCity] = useState("istanbul")
  const [moment, setMoment] = useState({})
  useEffect(() => {
      dispatch(fetchWeatherThunk())
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e8b2c4e5a41d2b3b81897c77b9e4d88`)
    	  .then(res => res.json())
        .then(data => setMoment(data))
        .catch(err => console.log(err))
  }, [dispatch, city])


  console.log(moment)


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
  const Input = styled.div`
    padding : 1%;
    font-size 0.4em;
    border-radius : 50%;

  `
  const ButtonStyle = styled.button`
    background-color : #282c34;
    border  : 1px solid #282c34;
    font-size : 2em;
  `
  const handleClick = (e) => {
    const sehir = e.target.value
    setCity(sehir)
    dispatch(fetchWeatherThunk(sehir))
    console.log(sehir)
    console.log(weatherData)
    console.log(city)
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
        <div className="main-div"> 
          <CityInfo>
          <div>
            <div>
              <City>
                {moment.name}
              </City>
            </div>
              <div>
                <Infos>{new Date().toLocaleDateString()}</Infos>
              </div>
            <div>
            <Infos><FaTemperatureLow/>{moment.main.temp / 10}</Infos>
            </div>
            <div>
              <Infos>{moment.main.feels_like / 10}°</Infos>
            </div>
          </div>
          </CityInfo>
          <div>
            <div>
              <Symbol>{moment.weather[0].main === "Clear" && <GiNightSky/>}</Symbol>
              <Symbol>{moment.weather[0].main === "Clouds" && <AiOutlineCloud/> }</Symbol>
              <Symbol>{moment.weather[0].main === "Rain" && <RiRainyLine/>}</Symbol>
              <Symbol>{moment.weather[0].main === "Sunny" && <TiWeatherPartlySunny/>}</Symbol>
            </div>
            <div>
              <Infos>{moment.weather[0].description}</Infos>
            </div>
          </div>
          <div>
            <div><Infos>Wind Degree : {moment.wind.deg}</Infos></div>
            <div><Infos>Wind Speed : {moment.wind.speed}</Infos></div>
            <div><Infos>Visibility : {moment.visibility}</Infos></div>
            <div><Infos>Max Temp : {moment.main.temp_max /10}°</Infos></div>
            <div><Infos>Min Temp : {moment.main.temp_min /10}°</Infos></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
