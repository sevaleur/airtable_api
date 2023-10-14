import React, { useEffect, useState } from 'react'
import { useGetData } from '../../hooks/useGetData.jsx'
import { useDeleteData } from '../../hooks/useDeleteData'
import { usePostData } from '../../hooks/usePostData.jsx'
import Title from '../../components/Title'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

function Indkøbsliste() {

    const { error, loading, data, getData } = useGetData()
    const { error: errorDelete, loading: loadingDelete, data: dataDelete, deleteData } = useDeleteData()
    const { error: postError, loading: postLoading, data: dataPost, postData } = usePostData()

    const [ varer, setNewIndkøb ] = useState()

    const handleSubmit = (e) => 
    {
        e.preventDefault()

        let t = {
            "fields": {
                "Varer": varer
            }
        }

        postData('https://api.airtable.com/v0/appGt6Lyxa1N3UB0d/Shopping', t,
        {
            'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API}`,
            "Content-Type": 'application/json'
        })
    }

    useEffect(() => 
    {
        getData(`https://api.airtable.com/v0/appGt6Lyxa1N3UB0d/Shopping`, 
        {
            'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API}`
        })
    }, [dataPost, dataDelete])

    const handleDelete = ( id ) => 
    {
        if(window.confirm('Vil du slette? Kan ikke fortrydes') === true)
        {
            deleteData('https://api.airtable.com/v0/appGt6Lyxa1N3UB0d/Shopping/' + id, 
            {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API}`
            })
        }
    }

  return (
    <section className='liste'>

        <div className='indkøbCreate container'>
            <Title headline="Opret nyt indkøb" />

            { postError && <Error /> }
            { postLoading && <Loader /> }

            <form onSubmit={ handleSubmit }>
                <label className='form-label me-3'>Indtast indkøb:
                     <input type="text" onInput={e => setNewIndkøb(e.target.value)} className='form-control'/>
                </label>
                <button type="submit" className='btn btn-primary'>Opret</button>
            </form>

        </div>
        
        <Title headline="Liste" />

        {(error || errorDelete) && <Error /> }
        {(loading || loadingDelete) && <Loader /> }

        { data && data.records.map( d => 
            {
                return (

                <div key={d.id}>
                    <h4>
                        {d.fields.Varer}
                    </h4>
                    <p>
                        {d.createdTime}
                    </p>
                    <button onClick={() => handleDelete(d.id)}>SLET</button>
                </div>
                )
            })}

    </section>
  )
}

export default Indkøbsliste