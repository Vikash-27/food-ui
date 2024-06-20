import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError();
  return (
    <div>Error
        <h1>{err.message}</h1>
        <h1>{err.status}</h1>
        <h1>{err.statusText}</h1>
        <h1>{err.url}</h1>
    </div>
  )
}

export default Error