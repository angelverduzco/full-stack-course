import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const apiUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${name}`)
        console.log(response.data)
        setCountry({found: true, data: response.data})
      } catch (e) {
        setCountry({found: false, data: null})
      }
    }

    if (name) {
      fetchCountry() 
    }
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}