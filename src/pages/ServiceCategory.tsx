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
    console.log('Fetching data for slug:', slug)
    ;(async () => {
      try {
        setLoading(true)
        console.log('Making database requests...')
        const [{ data: c, error: ce }, { data: g, error: ge }] = await Promise.all([
          supabase.from('categories').select('*').eq('slug', slug).maybeSingle(),
          supabase.from('gallery_images').select('*').eq('category_slug', slug).order('sort_order', { ascending: true })
        ])
        console.log('Category data:', c)
        console.log('Gallery images:', g)
        console.log('Category error:', ce)
        console.log('Gallery error:', ge)
        
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

  console.log('Current state:', { loading, error, cat, slug, imgs });

  if (loading) return <div className="svcCat"><p>Loading…</p></div>
  if (error)   return <div className="svcCat"><p style={{ color: 'red' }}>{error}</p></div>
  if (!cat)    return <div className="svcCat"><p>Not found.</p></div>

  return (
    <div className="svcCat">
      <div className="svcCat__header">
        <button className="svcCat__back" onClick={() => navigate('/services')}>← Back</button>
        <h1>{cat.title}</h1>
      </div>

      {/* {cat.hero_image_path && (
        <div className="svcCat__hero" style={{ backgroundImage: `url(${publicUrl(cat.hero_image_path)})` }} />
      )} */}

      <p className="svcCat__desc">{cat.description}</p>

      {/* Content Sections */}
      {slug === 'inox-constructions' && (
        <div className="svcCat__content">
          <div className="svcCat__section">
            <h2>Our Capabilities</h2>
            <ul className="svcCat__list">
              <li>Corrosion-resistant stainless steel fabrication</li>
              <li>Custom architectural metalwork</li>
              <li>Industrial equipment manufacturing</li>
              <li>Food-grade stainless steel installations</li>
              <li>Precision welding and finishing</li>
              <li>Quality certification and testing</li>
            </ul>
          </div>

          <div className="svcCat__section">
            <h2>Applications</h2>
            <ul className="svcCat__list">
              <li>Commercial kitchen equipment</li>
              <li>Pharmaceutical facilities</li>
              <li>Chemical processing plants</li>
              <li>Architectural handrails and structures</li>
              <li>Marine and offshore installations</li>
              <li>Clean room environments</li>
            </ul>
          </div>
        </div>
      )}

      {slug === 'architectural' && (
        <div className="svcCat__content">
          <div className="svcCat__section">
            <h2>Architectural Metalwork</h2>
            <p>Our architectural metalwork services combine aesthetic design with structural integrity, creating stunning metal features for both residential and commercial spaces.</p>
            <h3>Our Services</h3>
            <ul className="svcCat__list">
              <li>Custom staircases and railings</li>
              <li>Decorative metal screens and facades</li>
              <li>Structural steel framing</li>
              <li>Metal roofing and cladding</li>
              <li>Bespoke metal furniture</li>
              <li>Restoration of historic metalwork</li>
            </ul>
          </div>

          <div className="svcCat__section">
            <h2>Materials We Work With</h2>
            <ul className="svcCat__list">
              <li>Stainless Steel</li>
              <li>INOX</li>
              <li>Wrought Iron</li>
              <li>Corten Steel</li>
              <li>Aluminum</li>
            </ul>
          </div>
        </div>
      )}

      {/* Gallery Section - Always show if there are images */}
      {imgs.length > 0 && (
        <div className="svcCat__gallery">
          <h2>Our Work</h2>
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
      )}
    </div>
  )
}
