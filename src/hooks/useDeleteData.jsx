import { useState } from 'react'
import axios from 'axios'

export const useDeleteData = () => {

    const [ data, setData ] = useState()
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const deleteData = ( url, header = null, params = null ) => 
    {
        setLoading( true )
        setData()

        axios.delete(url, {headers: header, params: params})
            .then(res => 
            {
                setData(res.data)
                setError( false )
            })
            .catch(error => 
            {
                console.log('FEJL')
                setError(true)
                setData()
            })
            .finally(() => 
            {
                setLoading(false)
            })
    }

  return { deleteData, error, loading, data }
}