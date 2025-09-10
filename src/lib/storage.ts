import { supabase } from './supabase'

export function publicUrl(path: string) {
  return supabase.storage.from('assets').getPublicUrl(path).data.publicUrl
}

// If you later make the bucket private, switch to this:
// export async function signedUrl(path: string, expires = 300) {
//   const { data, error } = await supabase.storage.from('assets').createSignedUrl(path, expires)
//   if (error) throw error
//   return data.signedUrl
// }
