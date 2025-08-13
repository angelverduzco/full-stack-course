import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

export default function AnecdoteFilter() {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const filter = e.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div>
      filter <input type="text" onChange={handleChange}/>
    </div>
  )
}