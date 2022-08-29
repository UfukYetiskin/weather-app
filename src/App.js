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
    border  : 1px solid black;
    font-size : 0.5em;
    color : white;
    margin : 5px
  `
  const List = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;

  `
  const Ul = styled.div`
    width : 70%;
    display: flex;
    flex-direction:  row;
    justify-content : space-around;
    border : 1px solid white;
    padding  : 2%;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhoHjYyZ1DxTgomyLM9SQDz5j-gYaYjQrEmA&usqp=CAU");
    border-radius : 0 0 10px 10px;
    background-repeat: no-repeat;
    background-size: 100%;
    box-shadow: 5px white, 5px white;
  `
  const Li = styled.li`
    list-style-type : none;
    border-radius : 10px;
    border : 1px solid grey;
    font-size : 0.5em;
    text-align : center;
    margin : 1%
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
          <ButtonStyle value="izmir" onClick={handleClick}>İzmir</ButtonStyle>
          <ButtonStyle value="istanbul" onClick={handleClick}>İstanbul</ButtonStyle>
          <ButtonStyle value="ankara" onClick={handleClick}>Ankara</ButtonStyle>
          <ButtonStyle value="erzurum" onClick={handleClick}>Erzurum</ButtonStyle>
          <ButtonStyle value="antalya" onClick={handleClick}>Antalya</ButtonStyle>
          <ButtonStyle value="van" onClick={handleClick}>Van</ButtonStyle>
          <ButtonStyle value="edirne" onClick={handleClick}>Edirne</ButtonStyle>
          <ButtonStyle value="diyarbakır" onClick={handleClick}>Diyarbakır</ButtonStyle>
        </div>
        <div className='main-div'>
          <div>
              <Symbol>{item?.weather[0]?.main === "Clear" && <GiNightSky/>}</Symbol>
              <Symbol>{item?.weather[0]?.main === "Clouds" && <AiOutlineCloud/> }</Symbol>
              <Symbol>{item?.weather[0]?.main === "Rain" && <RiRainyLine/>}</Symbol>
              <Symbol>{item?.weather[0]?.main === "Sunny" && <TiWeatherPartlySunny/>}</Symbol>
              <div>{item?.weather[0]?.description}</div>
          </div>
          <div>
            <City>{item?.name}</City>
            <Infos>{item?.main?.temp / 10}<FaTemperatureLow/></Infos>
            <Infos>{item?.main?.feels_like / 10}</Infos>
          </div>
        </div>
        <Ul>
        {items && <List>
          {items?.map((weather) => (
            <Li>
              <div>{weather.dt_txt}</div>
              <Symbol>{item?.weather[0]?.main === "Clear" && <GiNightSky/>}</Symbol>
              <Symbol>{item?.weather[0]?.main === "Clouds" && <AiOutlineCloud/> }</Symbol>
              <Symbol>{item?.weather[0]?.main === "Rain" && <RiRainyLine/>}</Symbol>
              <Symbol>{item?.weather[0]?.main === "Sunny" && <TiWeatherPartlySunny/>}</Symbol>
              <div>{item?.weather[0]?.main}</div>
              <div>{weather.main.temp / 10}°</div>
            </Li>
          ))}
        
        </List>}
        </Ul>

        
          

        

      </div>  
    </div>
  );
}

export default App;
