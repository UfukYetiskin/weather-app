import './App.css';
import {fetchWeatherThunk, fetchIstWeatherThunk} from './redux/weatherSlice'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'


function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weather.items)
  const istWeatherData = useSelector(state => state.weather.istData)
  useEffect(() => {
    dispatch(fetchIstWeatherThunk())
  }, [dispatch])
  console.log(istWeatherData)
  return (
    <div className="App">
      <div className="App-header">
        <h1>City : {istWeatherData.name}</h1>
        {istWeatherData.main.temp / 10}°
        Filizciğim  
      </div>
      
    </div>
  );
}

export default App;
