import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { publicUrl } from '../lib/storage'
import '../styles/ServiceCategory.css'

type Category = {
  slug: string
  title: string
  description: string
  hero_image_path: string | null
}

type GalleryImage = {
  id: string
  category_slug: string
  title: string | null
  caption: string | null
  image_path: string
  sort_order: number
}

export default function ServiceCategory() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [cat, setCat] = useState<Category | null>(null)
  const [imgs, setImgs] = useState<GalleryImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    (async () => {
      try {
        setLoading(true)
        const [{ data: c, error: ce }, { data: g, error: ge }] = await Promise.all([
          supabase.from('categories').select('*').eq('slug', slug).maybeSingle(),
          supabase.from('gallery_images').select('*').eq('category_slug', slug).order('sort_order', { ascending: true })
        ])
        if (ce) throw ce
        if (!c) throw new Error('Category not found.')
        if (ge) throw ge
        setCat(c)
        setImgs(g ?? [])
      } catch (err: any) {
        setError(err.message ?? 'Failed to load category.')
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  if (loading) return <div className="svcCat"><p>Loading…</p></div>
  if (error)   return <div className="svcCat"><p style={{ color: 'red' }}>{error}</p></div>
  if (!cat)    return <div className="svcCat"><p>Not found.</p></div>

  return (
    <div className="svcCat">
      <div className="svcCat__header">
        <button className="svcCat__back" onClick={() => navigate('/services')}>← Back</button>
        <h1>{cat.title}</h1>
      </div>

      {cat.hero_image_path && (
        <div className="svcCat__hero" style={{ backgroundImage: `url(${publicUrl(cat.hero_image_path)})` }} />
      )}

      <p className="svcCat__desc">{cat.description}</p>

      <ul className="svcCat__grid">
        {imgs.map(img => (
          <li key={img.id} className="svcCat__card">
            <div className="svcCat__imgWrap">
              <img src={publicUrl(img.image_path)} alt={img.title ?? cat.title} loading="lazy" />
              <div className="svcCat__hover">
                {img.title && <h4>{img.title}</h4>}
                {img.caption && <p>{img.caption}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
