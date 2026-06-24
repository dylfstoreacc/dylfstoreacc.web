'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function tambahUlasanAction(formData) {
  const nama = formData.get('nama')
  const rating = parseInt(formData.get('rating') || '5')
  const text = formData.get('text')

  if (!nama || !text) return { success: false, error: 'Data tidak lengkap' }

  const { error } = await supabase
    .from('ulasan')
    .insert([
      { 
        nama: nama, 
        rating: rating, 
        text: text, 
        status: 'pending' // Default pending, harus di-approve admin dari dashboard
      }
    ])

  if (error) {
    console.error(error)
    return { success: false, error: error.message }
  }

  return { success: true }
}