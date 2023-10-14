import { useState } from 'react'
import axios from 'axios'

export const useGetData = () => {

    const [ data, setData ] = useState()
    const [ error, setError ] = useState( false )
    const [ loading, setLoading ] = useState( false )

    const getData = ( url, headers = null, params = null ) => {
        setLoading( true )

        axios.get(url, { headers: headers, params: params } )
            .then(res => {
                console.log(res.data)
                setData(res.data)
                setError(false)
            })
            .catch(err => {
                setError(true)
                setData()
            })
            .finally(() => {
                setLoading(false)
            })
    }
  return { getData, error, loading, data }
}