'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [userName, setUserName] = useState('')
  const [mounted, setMounted] = useState(false)
  const [debugError, setDebugError] = useState('')

  useEffect(() => {
    setMounted(true)

    // 1. Coba ambil token dari LocalStorage dulu
    let token = localStorage.getItem('sb-access-token')
    
    // 2. JIKA KOSONG, cari token cadangan yang kita simpan di Cookie!
    if (!token) {
      const cookieStr = document.cookie.split('; ').find(row => row.startsWith('sb-access-token='))
      if (cookieStr) {
        token = cookieStr.split('=')[1]
        // Selamatkan kembali tokennya ke dalam LocalStorage
        localStorage.setItem('sb-access-token', token)
      }
    }

    if (!token) {
      setDebugError('GAGAL 1: Token benar-benar lenyap! Tidak ada di LocalStorage maupun di Cookie browser. Berarti API Login gagal mengirim token.')
      return
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

    fetch(`${baseUrl}/api/auth`, { headers })
      .then(res => {
        if (!res.ok) throw new Error(`Server membalas dengan status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        const currentRole = data.role || data.profile?.role || data.user?.role || data.user?.user_metadata?.role

        if (currentRole !== 'admin') {
          setDebugError(`GAGAL 2: Token valid, tapi role kamu bukan admin. Role saat ini terbaca sebagai: ${currentRole}`)
          return
        }
        
        setUserName(data.profile?.full_name || data.user?.user_metadata?.full_name || 'Admin GymBook')
      })
      .catch((err) => {
        setDebugError(`GAGAL 3: Komunikasi ke backend port 3001 terputus/error. Pesan: ${err.message}`)
      })
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-gray-950 text-gray-500 p-8">Memuat sistem...</div>
  }

  // KOTAK MERAH DEBUGGING
  if (debugError) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-red-500 text-white p-8 rounded-xl max-w-2xl border-4 border-red-700">
          <h1 className="text-3xl font-black mb-4">🚨 HALTE DEBUGGING 🚨</h1>
          <p className="text-lg mb-2">Aplikasi sengaja ditahan agar tidak memantul ke /login.</p>
          <p className="text-lg font-mono bg-red-900 p-4 rounded text-yellow-300">
            {debugError}
          </p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="mt-6 bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-gray-200"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    )
  }

  if (!userName) {
    return <div className="min-h-screen bg-gray-950 text-gray-500 p-8">Memverifikasi hak akses admin...</div>
  }

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/admin/schedule', label: 'Jadwal Slots', icon: '⚡' },
    { href: '/admin/bookings', label: 'Booking Member', icon: '🗓️' },
    { href: '/admin/members', label: 'Kelola Member', icon: '👥' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-bold text-orange-500">GymBook</h1>
          <p className="text-xs text-orange-400 mt-1 font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <button
                key={link.href}
                onClick={() => window.location.href = link.href}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-5 border-t border-gray-800">
          <p className="text-sm text-white font-medium truncate mb-3">{userName}</p>
          <button
            onClick={() => {
              localStorage.removeItem('sb-access-token')
              document.cookie = "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
              window.location.href = '/login'
            }}
            className="w-full text-sm text-gray-400 hover:text-red-400 transition text-left"
          >
            Keluar Panel →
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}