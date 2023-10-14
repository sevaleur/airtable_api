import React from 'react'

import "./pagination.scss"

const Pagination = ({currentPage, setCurrentPage, itemsPerPage, itemsTotal}) => {

  let numberOfPage = Math.ceil(itemsTotal / itemsPerPage)

    return (

    <div>

        <button disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)} className='btn btn-success'>Prev</button>

        {
            [...Array(numberOfPage)].map((x, i) =>

            <button onClick={() => setCurrentPage(i)} key={i} className={i === currentPage ? "btn btn-primary active" : null}>{i + 1}</button>

            )
        }

        <button disabled={currentPage >= numberOfPage - 1} onClick={() => setCurrentPage(currentPage + 1)} className='btn btn-success'>Next</button>

    </div>
  )
}

export default Pagination