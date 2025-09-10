import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ServiceCategoryCard from '../components/ServiceCategory'
import '../styles/ServicesIndex.css'

type Category = {
  slug: string
  title: string
  description: string
  hero_image_path: string | null
  sort_order: number
}

export default function ServicesIndex() {
  const [cats, setCats] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('categories')                 // or 'services' if that’s your table
          .select('*')
          .order('sort_order', { ascending: true })
        if (error) throw error
        setCats(data ?? [])
      } catch (err: any) {
        setError(err.message ?? 'Failed to load categories.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="servicesIndex"><p>Loading…</p></div>
  if (error)   return <div className="servicesIndex"><p style={{ color: 'red' }}>{error}</p></div>

  return (
    <div className="servicesIndex">
      <h1>Our Services</h1>
      <div className="servicesIndex__grid">
        {cats.map(c => (
          <ServiceCategoryCard
            key={c.slug}
            slug={c.slug}
            title={c.title}
            image_path={c.hero_image_path ?? null}
          />
        ))}
      </div>
    </div>
  )
}
