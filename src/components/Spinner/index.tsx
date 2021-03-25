import React from 'react'

const Spinner: React.FC = () => {
  return (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner