import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 1. Ambil data user dari Supabase resmi
  const { data } = await supabase.auth.getClaims()
  let user = data?.claims

  // 2. JIKA KOSONG, coba baca cookie JWT manual yang di-set oleh port 3001
  if (!user) {
    const manualToken = request.cookies.get('sb-access-token')?.value || request.cookies.get('supabase-auth-token')?.value
    if (manualToken) {
      // Jika token manual ada, anggap ada user yang login (biarkan layout.tsx client-side yang memvalidasi detailnya nanti)
      user = { sub: 'manual-token-user' } as any 
    }
  }

  const { pathname } = request.nextUrl

  // Redirect ke login kalau benar-benar belum ada indikasi login sama sekali
  if (!user && (pathname.startsWith('/member') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Cek role admin via proxy JIKA menggunakan session resmi (lewati jika pakai manual token karena layout akan menghandle)
  if (user && user.sub !== 'manual-token-user' && pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.sub)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/member/dashboard', request.url))
    }
  }

  // Jangan lakukan force-redirect ke dashboard jika user sedang di halaman login/register 
  // BIARKAN client-side login mengatur perpindahannya agar API port 3001 tidak bertabrakan dengan proxy ini.

  return supabaseResponse
}