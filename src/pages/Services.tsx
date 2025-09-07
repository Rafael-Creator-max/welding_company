import '../styles/Services.css'
import {supabase} from '../lib/supabase'
import type { Service } from '../types/database'
import { useEffect, useState } from 'react'

const Services = () => {
  const [services,setServices] = useState<Service[]>([])
  const [error,setError] = useState<string | null>(null)

  useEffect(()=>{
    const fetchServices = async () =>{
      const {data,error} = await supabase
      .from('services')
      .select('*')
      .order('name',{ascending:true})
      if (error){
        setError(error.message)
      } else {
        setServices(data || [])
      }
    }
    fetchServices()

  },[])
  return (
    <div className="services">
      <h1>Our Services</h1>
      <p>We provide a full range of welding and fabrication services.</p>
      {error && <p style={{color: 'red'}}>{error}</p>}

      <ul className="services__list">
        {services.map((s) =>(
          <li key={s.id}>
            {s.image_path && (
              <img src={s.image_path} alt={s.name} className="services__list-image" />
              
            )}

            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </li>

        ))

        }
        
          
      </ul>
    </div>
  )
}

export default Services
