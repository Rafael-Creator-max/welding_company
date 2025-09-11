import { Link } from 'react-router-dom'
import { publicUrl } from '../lib/storage'
import '../styles/ServiceCategoryCard.css'

type Props = {
  slug: 'industrial' | 'architectural' | string
  title: string
  image_path?: string | null
}

export default function ServiceCategoryCard({ slug, title, image_path }: Props) {
  const bg = image_path ? publicUrl(image_path) : undefined
  return (
    <Link to={`/services/${slug}`} className="catCard" style={{ backgroundImage: bg ? `url(${bg})` : undefined }}>
      <div className="catCard__overlay">
        <h3>{title}</h3>
      </div>
    </Link>
  )
}
