import { useState, useEffect } from 'react'

export default (key) => {
  const storageString = JSON.parse(localStorage.getItem(key))
  const [value, setValue] = useState(storageString)

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
