import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        setPhotos(await res.json())
      } catch (err) {
        if (err.name === 'AbortError') return // component unmounted: do nothing
        setError('Could not load photos. Please try again.')
      }
      setLoading(false)
    }

    load()
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}