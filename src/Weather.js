import React,{useState} from 'react';
import axios from 'axios';
import './App.css';
import loading from './loading.gif';
import weather_logo from './weather_logo.png'
function Weather(){
    const [city,setCity] = useState();
    const [weather,setWeather] = useState({
        loading:false,
        data : {},
        error:false,
        logo:true
    });
    const todayDate = () =>{
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const currDate = new Date();
        const date = `${days[currDate.getDay()]}, ${currDate.getDate()} ${months[currDate.getMonth()]} ${currDate.getYear() + 1900}`;
        return date;
    }
    const search = async(event) =>{
        if(event.key === 'Enter'){
            event.preventDefault();
            setCity('');
            setWeather({...weather,loading:true});
            const link = 'https://api.openweathermap.org/data/2.5/weather';
            const AppID = 'fe4feefa8543e06d4f3c66d92c61b69c';

            await axios.get(link,{
                params :{
                    q:city,
                    units:'metric',
                    appid : AppID
                }
            })
            .then((res) =>{
                setWeather({data:res.data,loading:false, error:false, logo:false});
            })
            .catch((error) => {
                setWeather({...weather, data :{}, error:true, logo:false});
                setCity('');
            })
        }
    };
    return (
        <div>
            <h1 className="wthr"> WEATHER REPORT </h1>
            <div className="srch">
                <input 
                    type="text"
                    className="searchCity"
                    placeholder="Enter City"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    onKeyPress={search}
                    autoFocus
                />
            </div>
            
            {!weather.loading && weather.logo && (
                <>
                <br/>
                <div className="logo">
                <img src={weather_logo} alt="dk"/>
                <br/>
                <span className="myname">Durgesh Suthar</span>
                </div>
                </>
            )} 
            {weather.loading && (
                <>
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="spin">
                        <img src={loading} alt="Loading..."/>
                  </div>
                </>
            )}
            {!weather.logo && !weather.loading && weather.error && (
                <>
                    <br/>
                    <br/>
                    <span className="error-msg">☹ City not found</span>
                </>
            )}
            {!weather.logo && !weather.loading && weather && weather.data && weather.data.main && (
                <div>
                    <div className="city-name">
                        <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
                    </div>

                    <div className="date"> {todayDate()} </div>

                    <div className="temperature">
                        <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                        alt={weather.data.weather[0].description}/>
                        {Math.round(weather.data.main.temp)}
                        <sup className="d">&deg;C</sup>
                    </div>

                    <div className="desc">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed} m/s</p>
                        <p>Humidity: {weather.data.main.humidity}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
