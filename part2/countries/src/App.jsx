import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Country } from './Country'

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios
      .get(apiUrl)
      .then(response => response.data)
      .then(data => {
        setCountries(data)
      })
  }, [])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  const showCountry = (country) => {
    setCountry(country)
  }

  const filtered = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  let content = null

  if (country) {
    if (filtered.length > 10) {
      content = <p>Too many matches, be more pecific</p>
    } else if (filtered.length > 1) {
      content = <ul>
        {filtered.map(c => {
          return (
            <li key={c.cca3}>
            {c.name.common}
            <button onClick={() => showCountry(c.name.common)}>Show</button>
            </li>
          )
        })}
      </ul>
    } else if (filtered.length === 1) {
      const c = filtered[0]
      content = <Country country={c}/>
    }
  }

  return (
    <>
      <label htmlFor="searchCountry">find countries</label>
      <input id='searchCountry' value={country} onChange={handleChange} />
      {content}
    </>
  )
}

export default App
