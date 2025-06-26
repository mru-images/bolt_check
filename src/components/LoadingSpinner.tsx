import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="flex space-x-1">
        <div className={`${sizeClasses[size]} bg-primary-500 rounded-full loading-dot`}></div>
        <div className={`${sizeClasses[size]} bg-primary-600 rounded-full loading-dot`}></div>
        <div className={`${sizeClasses[size]} bg-primary-700 rounded-full loading-dot`}></div>
      </div>
    </div>
  )
}

export default LoadingSpinner