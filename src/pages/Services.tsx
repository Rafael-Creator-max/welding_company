import '../styles/Services.css'
import {supabase} from '../lib/supabase'
import type { Service } from '../types/database'
import { useEffect, useState } from 'react'

const Services = () => {
  const [services,setServices] = useState<Service[]>([])
  const [error,setError] = useState<string | null>(null)

  useEffect(()=>{
    const fetchServices = async () =>{
      try {
        const {data,error} = await supabase
          .from('services')
          .select('*')
          .order('name',{ascending:true})
        
        if (error) {
          throw error;
        }
        
        setServices(data || []);
        setError(null);
      } catch (err) {
        if (!navigator.onLine) {
          setError('You are currently offline. Please check your internet connection and try again.');
        } else if (err instanceof Error) {
          setError('Failed to load services. ' + err.message);
        } else {
          setError('An unknown error occurred while loading services.');
        }
        setServices([]);
      }
    }
    
    fetchServices();
  }, [])
  return (
    <div className="services">
      <h1>Our Services</h1>
      <p>We provide a full range of welding and fabrication services.</p>
      {error && (
        <div className="error-message" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '1rem',
          borderRadius: '4px',
          margin: '1rem 0',
          borderLeft: '4px solid #c62828'
        }}>
          {error}
        </div>
      )}

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
