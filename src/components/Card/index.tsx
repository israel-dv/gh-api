import React from 'react'

interface CardProps {
  children: React.ReactNode
  onClick?(): void
}

export const Card: React.FC<CardProps> = ({ children, onClick }: CardProps) => {
  return (
    <div
      className="card mx-3 bg-transparent border-light card-medium"
      role={onClick ? 'button' : ''}
      onClick={onClick}
    >
      <div className="card-body">{children}</div>
    </div>
  )
}
