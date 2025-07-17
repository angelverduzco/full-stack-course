import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

const apiKey = import.meta.env.VITE_SOME_KEY

export const Country = ({ country }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`)
      .then(response => response.data)
      .then(data => setWeather(data))
      .catch(error => console.log(error))
  }, [country.latlng])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lan) => <li key={lan}>{lan}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather && (
        <>
          <h3>Weather in {country.name.common}</h3>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}