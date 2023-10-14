import { useState } from 'react'
import axios from 'axios'

export const usePatchData = () => {

  const [data, setData] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const patchData = (url, headers = null, params = null, payload = null) => 
  {
    setLoading(true)
    setData()

    axios.patch(url, payload, {headers: headers, params: params})
      .then(res => 
        {
          setData(res.data)
          setError(false)
        })
      .catch(error => 
        {
          console.log('fejl', error)
          setError(true)
          setData()
        })
      .finally(() => 
      {
        setLoading(false)
      })
  }

  return { patchData, error, loading, data }
}