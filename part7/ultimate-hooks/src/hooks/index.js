import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => res.data)
      .then(data => setResources(data))
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(res => res.data)
      .then(returnedResource => setResources(resources.concat(returnedResource)))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}