import React from 'react'

export const useLocalStorage = (
  key: string,
  initialValue: string
): Array<any> => {
  const [storage, setStorage] = React.useState(() => {
    try {
      const keyStorage = localStorage.getItem(key)
      return keyStorage ? keyStorage : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStorage(value)
      localStorage.setItem(key, value)
    } catch (error) {
      console.log('storageError', error)
    }
  }

  return [storage, setValue]
}
