// api.openweathermap.org/data/2.5/weather?q=puna&appid=e12ed5c28d4092378b19ba48793e56a5
import React, { useEffect, useState } from 'react'
import "./Styleee.css";
import WeatherCard from './WeatherCard';
const Temp = () => {
    const [searchValue, setSearchValue] = useState("Chandigarh");
    const [tempInfo, setTempInfo] = useState({})
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=de210ce92b8ca5e8d0f2d1989ab0eeaa`;

            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset, sunrise } = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                sunrise,

            };
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" autoFocus id="search" placeholder='Search....'
                        className='searchTerm' onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
                    />
                    <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <WeatherCard tempInfo={tempInfo} />
        </>
    )
}

export default Temp
