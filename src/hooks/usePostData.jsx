import { useState } from 'react'
import axios from 'axios'

export const usePostData = () => {

    const [ data, setData ] = useState()
    const [ error, setError ] = useState( false )
    const [ loading, setLoading ] = useState( false )

    const postData = ( url, payload = null, headers = null, params = null ) => {
        setLoading( true )

        axios.post(url, payload, { headers: headers, params: params } )
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
  return { postData, error, loading, data }
}

