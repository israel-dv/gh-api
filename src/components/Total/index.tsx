import React from 'react'

interface TotalProps {
  text: string
  total: number
}

const Total: React.FC<TotalProps> = ({ text, total }: TotalProps) => {
  return (
    <span className="total">
      {`${text}: `}
      <span className="result">{total}</span>
    </span>
  )
}

export default Total
