'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { tambahUlasanAction } from './actions'

// Inisialisasi koneksi Supabase di sisi client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  // State navigasi utama web
  const [activePage, setActivePage] = useState('home')
  const [activeTab, setActiveTab] = useState('stok')
  const [showSplash, setShowSplash] = useState(true)
  const [showAbout, setShowAbout] = useState(false)
  
  // State untuk data database
  const [daftarUlasan, setDaftarUlasan] = useState([])
  const [statusMsg, setStatusMsg] = useState('')

  // Efek durasi Splash Screen loading awal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  // Fungsi mengambil ulasan yang statusnya "approved" langsung dari Supabase
  const fetchUlasan = async () => {
    try {
      const { data, error } = await supabase
        .from('ulasan')
        .select('*')
        .eq('status', 'approved')
        .order('id', { ascending: false }) // Otomatis descending (terbaru di atas)
        
      if (!error && data) {
        setDaftarUlasan(data)
      }
    } catch (err) {
      console.error('Gagal memuat data supabase:', err)
    }
  }

  // Muat data saat web pertama kali terbuka
  useEffect(() => {
    fetchUlasan()
  }, [])

  // Fungsi mengirim form ulasan tanpa bikin web reload patah-patah
  const handleSubmitUlasan = async (e) => {
    e.preventDefault()
    setStatusMsg('Sedang mengirim...')
    
    const formData = new FormData(e.currentTarget)
    const result = await tambahUlasanAction(formData)
    
    if (result.success) {
      setStatusMsg('Ulasan terkirim! Menunggu persetujuan saringan admin Dileppp 🌱')
      e.target.reset()
      // Refresh data jika diperlukan
      fetchUlasan()
    } else {
      setStatusMsg('Gagal mengirim ulasan, silakan coba lagi.')
    }
  }

  return (
    <>
      {/* 1. CYBER LOADING SPLASH SCREEN */}
      {showSplash && (
        <div style={styles.splashScreen}>
          <div style={styles.loaderWrapper}>
            <div style={styles.glowRing}></div>
            <img 
              src="/dfstoreacc.png" 
              style={styles.loadLogo} 
              alt="DYLF Logo"
              onError={(e) => { e.target.src = 'https://placehold.co/115x115/0a2463/00ffff?text=DYLF+LOGO' }}
            />
          </div>
        </div>
      )}

      {/* 2. ABOUT STORE POP-UP MODAL */}
      {showAbout && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>About Us</div>
            <div style={styles.modalBodyText}>
              <strong>DYLF STOREacc</strong> adalah platform penyedia layanan Jual-Beli Akun Game/Sosmed serta Jasa Rekber berbasis digital terpercaya yang didirikan oleh <strong>Dileppp</strong> sejak akhir tahun 2020.
            </div>
            <div style={styles.modalBodyText}>
              Kini sistem kami terintegrasi penuh dengan infrastruktur cloud Next.js + Supabase Database di tahun 2026, diproteksi ketat oleh <strong>Difibot</strong> demi menjaga keamanan transaksi konsumen secara real-time.
            </div>
            <button style={styles.modalCloseBtn} onClick={() => setShowAbout(false)}>TUTUP</button>
          </div>
        </div>
      )}

      {/* 3. CORE FRAME BINGKAI HP UTAMA */}
      <div style={styles.phoneContainer}>
        
        {/* AREA VIEW BERGULIR */}
        <div style={styles.scrollContent}>
          
          {/* BANNER STICKY TOP TOKO */}
          <div style={styles.storeBanner}>
            <img 
              src="/banner.png" 
              style={styles.bannerImg} 
              alt="Banner Toko" 
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div style={styles.bannerPlaceholderText}></div>
          </div>
          
          <div style={styles.mainContentWrapper}>

            {/* ================= INTI HALAMAN 1: HOME PAGE ================= */}
            {activePage === 'home' && (
              <div>
                <div style={styles.profileContainer}>
                  <img src="/dfstoreacc.png" style={styles.profileLogo} alt="DYLF Logo" onError={(e) => { e.target.src = 'https://placehold.co/170x170/0a2463/00ffff?text=DYLF+LOGO' }} />
                  <div style={styles.profileTitle}>DYLF STOREacc</div>
                  <div style={styles.bioBox}>
                    Welcome to web DYLF STOREacc Pusat Layanan Jual & Beli Akun Digital Terpercaya khususnya akun game yg sedang kamu cari. Silahkan Join Komunitas dibawah ini untuk mendapatkan informasi lengkapnya.🌱
                  </div>
                </div>

                <div style={styles.sosmedInstructionText}>🎯 Click Icon to Contact Us 🎯</div>
                <div style={styles.sosmedRow}>
                  <a href="https://wa.me/6285266953530" target="_blank" rel="noopener noreferrer" style={styles.sosmedIcon}><i className="fa-brands fa-whatsapp" style={{color: '#25D366'}}></i></a>
                  <a href="https://www.tiktok.com/@dylfrvr" target="_blank" rel="noopener noreferrer" style={styles.sosmedIcon}><i className="fa-brands fa-tiktok" style={{color: '#ffffff'}}></i></a>
                  <a href="https://instagram.com/dylfrvr" target="_blank" rel="noopener noreferrer" style={styles.sosmedIcon}><i className="fa-brands fa-instagram" style={{color: '#f9376c'}}></i></a>
                </div>

                <div style={styles.waLinksWrapper}>
                  <div style={styles.mascotAbsoluteContainer}>
                    <img src="/images/difibot_v2.png" style={styles.mascotImg} alt="Difibot V2" onError={(e) => { e.target.src = 'https://placehold.co/195x195/080b16/bc13fe?text=Difibot+V2' }} />
                  </div>
                  
                  <a href="https://chat.whatsapp.com/IyHj3XJikuX90k6HSiMpDP" target="_blank" rel="noopener noreferrer" style={styles.groupCard}>
                    <div>
                      <h3 style={{color:'#fff', fontSize:'13px', marginBottom:'2px'}}>GB 1: DYLF STOREacc</h3>
                      <p style={{color:'#a0aec0', fontSize:'10px'}}>Grup komunitas utama pusat jual & beli akun aman</p>
                    </div>
                    <div style={{color:'#bc13fe', fontWeight:'bold'}}>&gt;</div>
                  </a>
                  <a href="https://whatsapp.com/channel/0029VbCmpXQ8vd1RqxIn6h0z" target="_blank" rel="noopener noreferrer" style={styles.groupCard}>
                    <div>
                      <h3 style={{color:'#fff', fontSize:'13px', marginBottom:'2px'}}>CH: DYLF STOREacc</h3>
                      <p style={{color:'#a0aec0', fontSize:'10px'}}>Channel update info stok akun & track history testi</p>
                    </div>
                    <div style={{color:'#bc13fe', fontWeight:'bold'}}>&gt;</div>
                  </a>
                </div>
              </div>
            )}

            {/* ================= INTI HALAMAN 2: TESTIMONI TRACK HISTORY ================= */}
            {activePage === 'testi' && (
              <div style={styles.testiSectionWrapper}>
                <div style={{textAlign:'center', marginBottom:'15px'}}>
                  <h2 style={{fontSize:'18px', color:'#00ffff', textTransform:'uppercase'}}>Track History</h2>
                  <p style={{fontSize:'11px', color:'#a0aec0'}}>Bukti transaksi sukses bersama DYLF STOREacc</p>
                </div>
                
                <div style={styles.testiTabs}>
                  <button style={{...styles.tabBtn, ...(activeTab === 'stok' ? styles.tabBtnActive : {})}} onClick={() => setActiveTab('stok')}>STOK AKUN</button>
                  <button style={{...styles.tabBtn, ...(activeTab === 'rekber' ? styles.tabBtnActive : {})}} onClick={() => setActiveTab('rekber')}>JASA REKBER</button>
                </div>
                
                <div style={styles.testiGrid}>
                  {/* Next.js secara otomatis membaca list statis gambar kamu di folder public/testi */}
                  <p style={styles.noTestiText}>Silakan masukkan aset foto testimoni kamu ke dalam folder public/testi/stok dan rekber Next.js baru milikmu.</p>
                </div>
              </div>
            )}

            {/* ================= INTI HALAMAN 3: ULASAN CLIENT SIDE SUAPBASE ================= */}
            {activePage === 'ulasan' && (
              <div>
                <div style={styles.reviewStatsSummary}>
                  <div style={styles.bigRatingNumber}>5.0 / 5.0</div>
                  <div style={styles.bigRatingStars}>
                    <div style={styles.bigRatingStars}>
  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
</div>
                  <div style={{fontSize:'11px', color:'#a0aec0', fontWeight:'bold'}}>KEPUASAN PELANGGAN DYLF STOREacc</div>
                </div>

                <div style={styles.reviewScrollContainer}>
                  {daftarUlasan.length > 0 ? (
                    daftarUlasan.map((item) => (
                      <div key={item.id} style={styles.standaloneReviewCard}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                          <div style={{fontSize:'13px', fontWeight:'800'}}>👤 {item.nama}</div>
                          <div style={{fontSize:'10px', color:'#718096'}}>{item.tanggal}</div>
                        </div>
                        <div style={styles.reviewItemStars}>
                          {Array.from({ length: item.rating }).map((_, idx) => (
                            <i key={idx} className="fa-solid fa-star"></i>
                          ))}
                        </div>
                        <p style={{fontSize:'12px', color:'#e2e8f0', lineHeight:'1.45'}}>{item.text}</p>
                      </div>
                    ))
                  ) : (
                    <p style={styles.noTestiText}>Belum ada ulasan terverifikasi.</p>
                  )}
                </div>

                <div style={styles.formReviewBox}>
                  <div style={styles.formBoxTitle}>✍️ Bagikan Pengalaman Transaksi</div>
                  <form onSubmit={handleSubmitUlasan}>
                    <div style={{marginBottom:'12px'}}>
                      <label style={styles.fieldLabel}>Nama / Nickname Kamu</label>
                      <input type="text" name="nama" style={styles.inputField} placeholder="Masukan nama lengkap..." required maxLength={30} />
                    </div>
                    <div style={{marginBottom:'12px'}}>
                      <label style={styles.fieldLabel}>Rating Kepuasan</label>
                      <select name="rating" style={{...styles.inputField, color:'#00ffff', fontWeight:'bold'}}>
                        <option value="5">⭐⭐★★★ 5 - Sangat Puas / Rekomended</option>
                        <option value="4">⭐⭐⭐⭐ 4 - Puas / Cepat</option>
                        <option value="3">⭐⭐⭐ 3 - Cukup Baik</option>
                      </select>
                    </div>
                    <div style={{marginBottom:'12px'}}>
                      <label style={styles.fieldLabel}>Isi Ulasan Pengalaman</label>
                      <textarea name="text" style={styles.inputField} rows="3" placeholder="Tulis testimoni kejujuran kamu di sini..." required maxLength={200}></textarea>
                    </div>
                    <button type="submit" style={styles.submitReviewBtn}>KIRIM TESTIMONI KONSUMEN</button>
                  </form>
                  {statusMsg && <p style={{fontSize:'11px', color:'#00ffff', textAlign:'center', marginTop:'10px'}}>{statusMsg}</p>}
                </div>
              </div>
            )}

            {/* TAB BOTTOM FOOTER PRIVACY PRIVILEGE */}
            <div style={styles.footerPrivacy}>
              <button style={styles.privacyLink} onClick={() => setShowAbout(true)}>About Store</button>
              <span style={{color:'rgba(255,255,255,0.15)'}}>|</span>
              <span style={styles.privacyLink}>Privacy Policy</span>
            </div>

          </div>
        </div>

        {/* BAR CONTAINER MENU BAWAH NAVIGASI (DENGAN EFEK AKTIF GLOWING) */}
        <div style={styles.bottomNav}>
          <div style={{...styles.navItem, ...(activePage === 'home' ? styles.navItemActive : {})}} onClick={() => setActivePage('home')}>
            <span>HOME</span><div style={{...styles.navDot, ...(activePage === 'home' ? styles.navDotActive : {})}}></div>
          </div>
          <div style={{...styles.navItem, ...(activePage === 'testi' ? styles.navItemActive : {})}} onClick={() => setActivePage('testi')}>
            <span>TESTIMONI</span><div style={{...styles.navDot, ...(activePage === 'testi' ? styles.navDotActive : {})}}></div>
          </div>
          <div style={{...styles.navItem, ...(activePage === 'ulasan' ? styles.navItemActive : {})}} onClick={() => setActivePage('ulasan')}>
            <span>ULASAN</span><div style={{...styles.navDot, ...(activePage === 'ulasan' ? styles.navDotActive : {})}}></div>
          </div>
        </div>

      </div>
    </>
  )
}

// GANTI SELURUH OBJEK STYLES LAMA DENGAN INI (JANGAN ADA YANG TERPOTONG!)
const styles = {
  // GLOBAL BACKGROUND DENGAN GRID NEON SAMAR
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      backgroundColor: '#030306',
      // MENAMBAHKAN EFEK RADIAL GLOW LATAR BELAKANG
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(188, 19, 254, 0.1) 0%, transparent 45%),
        linear-gradient(rgba(5, 5, 8, 0.92), rgba(8, 12, 24, 0.95)),
        linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 100% 100%, 30px 30px, 30px 30px',
      color: '#ffffff',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      overflow: 'hidden' // Menghindari scroll body utama
    }
  },
  
  // 1. SPLASH SCREEN DENGAN RING NEON BERPUTAR
  splashScreen: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#040407', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  loaderWrapper: { position: 'relative', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  loadLogo: { width: '115px', height: '115px', objectFit: 'contain', 
    // EFEK GLOW LOGO UNGU MELEDAK
    filter: 'drop-shadow(0 0 12px rgba(188, 19, 254, 0.6))',
    animation: 'cosmicPulse 2s infinite ease-in-out' // Animasi detak (tambahan CSS di layout)
  },
  glowRing: { position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#00ffff', borderBottomColor: '#bc13fe', 
    // EFEK GLOW RING CYAN NEON
    filter: 'drop-shadow(0 0 8px #00ffff)',
    animation: 'ringRotate 2.5s infinite linear' // Animasi putar
  },

  // 2. CORE FRAME BINGKAI HP DENGAN GLOW UNGU
  phoneContainer: { width: '100%', maxWidth: '450px', height: '100vh', maxHeight: '850px', backgroundColor: '#05050a', 
    // NEON UNGU BORDER & SHADOW
    border: '2px solid #bc13fe', 
    boxShadow: '0 0 30px rgba(188, 19, 254, 0.3), inset 0 0 15px rgba(0, 255, 255, 0.1)', 
    borderRadius: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' },
  scrollContent: { flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' },
  
  // 3. BANNER TOP DENGAN GRID CYAN
  storeBanner: { width: '100%', height: '130px', background: 'linear-gradient(45deg, #0a2463 0%, #050508 100%)', borderBottom: '1px solid rgba(0, 255, 255, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 },
  bannerPlaceholderText: { fontSize: '13px', fontWeight: 'bold', color: '#00ffff', letterSpacing: '2px', 
    // GLOW TEXT BANNER
    textShadow: '0 0 8px #00ffff', zIndex: 1, textTransform: 'uppercase' },
  mainContentWrapper: { padding: '0 20px 100px 20px', position: 'relative' },
  
  // 4. PROFILE LOGO DENGAN GLOW CYAN
  profileContainer: { textAlign: 'center', marginBottom: '15px', marginTop: '20px' },
  profileLogo: { width: '170px', height: '170px', objectFit: 'contain', marginBottom: '2px', 
    // GLOW LOGO BESAR
    filter: 'drop-shadow(0 0 12px rgba(0, 255, 255, 0.5))' },
  profileTitle: { fontSize: '26px', fontWeight: '900', color: '#ffffff', letterSpacing: '1.5px', 
    // GLOW TITLE PROFIL
    textShadow: '0 0 10px rgba(0, 255, 255, 0.6)', marginBottom: '10px' },
  
  // BIO BOX DENGAN BORDER NEON UNGU
  bioBox: { background: 'rgba(10, 36, 99, 0.5)', border: '1px solid #bc13fe', borderRadius: '14px', padding: '14px', fontSize: '13px', lineHeight: '1.5', color: '#e2e8f0', marginBottom: '15px' },
  
  // SOSMED INSTRUKSI DENGAN ANIMASI DETAK
  sosmedInstructionText: { textAlign: 'center', fontSize: '10px', fontWeight: '700', color: '#00ffff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', 
    // ANIMASI & GLOW
    animation: 'textPulse 2s infinite ease-in-out', textShadow: '0 0 8px rgba(0, 255, 255, 0.4)' },
  
  // SOSMED ROW (SUDAH DIPERBAIKI LETAKNYA)
  sosmedRow: { display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '25px', position: 'relative', zIndex: 10 },
  sosmedIcon: { width: '46px', height: '46px', borderRadius: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px', backgroundColor: '#050508', 
    // NEON BORDER DENGAN EFEK SHADOW
    border: '2px solid transparent', // Awal transparan
    animation: 'fluidNeonShift 4s linear infinite', // Animasi pergeseran neon ungu-cyan
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', textDecoration: 'none', transition: 'all 0.3s ease' },
  waLinksWrapper: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px', position: 'relative', zIndex: 2, marginTop: '10px' },
  
  // 5. MASKOT DIFIBOT V2 DENGAN GLOW CYAN (SUDAH DIPERBAIKI POSISI)
  mascotAbsoluteContainer: { position: 'absolute', left: '-18px', bottom: '-12px', width: '195px', height: '195px', zIndex: 3, pointerEvents: 'none' },
  mascotImg: { width: '100%', height: '100%', objectFit: 'contain', 
    // GLOW MASKOT
    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' },
  
  // GROUP CARD DENGAN BORDER KIRI UNGU
  groupCard: { background: 'rgba(10, 36, 99, 0.4)', borderLeft: '4px solid #bc13fe', borderTop: '1px solid rgba(188, 19, 254, 0.3)', borderBottom: '1px solid rgba(188, 19, 254, 0.3)', borderRight: '1px solid rgba(188, 19, 254, 0.3)', borderRadius: '0 14px 14px 0', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', marginLeft: '140px', transition: 'all 0.2s ease' },
  
  // TESTIMONI SECTION DENGAN GEOMETRI NEON
  testiSectionWrapper: { padding: '20px', position: 'relative', marginTop: '15px', backgroundColor: 'rgba(13, 13, 20, 0.85)', backdropFilter: 'blur(5px)',
    // NEON GRID CYAN
    border: '2px solid rgba(0, 255, 255, 0.2)', borderRadius: '20px', overflow: 'hidden' },
  testiTabs: { display: 'flex', backgroundColor: 'rgba(10, 36, 99, 0.4)', padding: '4px', borderRadius: '10px', marginBottom: '15px', border: '1px solid rgba(188, 19, 254, 0.2)', gap: '4px' },
  tabBtn: { flex: 1, backgroundColor: 'transparent', border: 'none', color: '#718096', padding: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.3s ease' },
  tabBtnActive: { backgroundColor: '#bc13fe', color: '#ffffff', boxShadow: '0 0 10px rgba(188, 19, 254, 0.5)' },
  testiGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  noTestiText: { textAlign: 'center', color: '#718096', fontSize: '12px', padding: '20px 0', lineHeight: '1.5' },
  
  // ULASAN SECTION
  reviewStatsSummary: { backgroundColor: 'rgba(0, 255, 255, 0.05)', border: '1px dashed rgba(0, 255, 255, 0.3)', borderRadius: '16px', padding: '15px', textAlign: 'center', marginTop: '15px', marginBottom: '20px' },
  bigRatingNumber: { fontSize: '32px', fontWeight: '900', color: '#00ffff', textShadow: '0 0 10px rgba(0, 255, 255, 0.4)' },
  
  // FIX BINTANG ULASAN (CIRI KHAS FONTAWESOME CYAN)
  bigRatingStars: { color: '#00ffff', fontSize: '14px', margin: '4px 0', letterSpacing: '2px', textShadow: '0 0 5px #00ffff' },
  reviewScrollContainer: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px', maxHeight: '340px', overflowY: 'auto' },
  standaloneReviewCard: { backgroundColor: 'rgba(10, 36, 99, 0.3)', 
    // NEON UNGU TIPIS
    border: '1px solid rgba(188, 19, 254, 0.15)', borderRadius: '14px', padding: '14px' },
  
  // FIX TOTAL BINTANG ULASAN (CYAN NEON)
  reviewItemStars: { color: '#00ffff', fontSize: '11px', marginBottom: '6px', textShadow: '0 0 5px #00ffff', display: 'flex', gap: '3px' },
  
  // FORM ULASAN DENGAN GLOW NEON
  formReviewBox: { backgroundColor: 'rgba(13, 13, 20, 0.9)', 
    // BORDER NEON UNGU
    border: '1px solid #bc13fe', borderRadius: '18px', padding: '18px', 
    boxShadow: '0 0 15px rgba(188,19,254,0.15)' },
  formBoxTitle: { fontSize: '14px', fontWeight: '800', color: '#00ffff', textTransform: 'uppercase', marginBottom: '14px', textShadow: '0 0 6px #00ffff', letterSpacing: '0.5px' },
  fieldLabel: { display: 'block', fontSize: '10px', color: '#a0aec0', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '5px' },
  inputField: { width: '100%', backgroundColor: '#080b16', 
    // NEON CYAN BORDER FOCUS
    border: '1px solid rgba(0, 255, 255, 0.2)', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '12px', outline: 'none' },
  
  // BUTTON SUBMIT NEON UNGU-CYAN
  submitReviewBtn: { width: '100%', background: 'linear-gradient(90deg, #bc13fe, #0a2463)', color: '#ffffff', border: '1px solid #bc13fe', borderRadius: '10px', padding: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.3s ease' },
  
  // FOOTER DENGAN GLOW SAMAR
  footerPrivacy: { textAlign: 'center', marginTop: '40px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 10 },
  privacyLink: { color: '#718096', fontSize: '12px', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' },
  
  // BOTTOM NAV DENGAN BORDER NEON UNGU
  bottomNav: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70px', backgroundColor: '#0d0d13', borderTop: '1px solid rgba(188, 19, 254, 0.3)', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '0 0 22px 22px', zIndex: 100 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#718096', fontSize: '10px', fontWeight: '700', cursor: 'pointer', flex: 1, textAlign: 'center', transition: 'color 0.2s', padding: '10px 10px' },
  navItemActive: { color: '#00ffff', textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' },
  navDot: { width: '5px', height: '5px', backgroundColor: 'transparent', borderRadius: '50px', marginTop: '4px' },
  navDotActive: { backgroundColor: '#00ffff', boxShadow: '0 0 8px #00ffff' },
  
  // POP-UP MODAL DENGAN GLOW NEON UNGU
  modalOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 8, 0.95)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '25px' },
  modalCard: { width: '100%', backgroundColor: '#080b16', border: '1px solid #bc13fe', boxShadow: '0 0 20px rgba(188, 19, 254, 0.3)', borderRadius: '20px', padding: '22px' },
  modalHeader: { color: '#00ffff', fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '15px', textShadow: '0 0 8px rgba(0, 255, 255, 0.4)' },
  modalBodyText: { color: '#e2e8f0', fontSize: '13px', lineHeight: '1.6', marginBottom: '18px' },
  modalCloseBtn: { background: '#bc13fe', color: '#ffffff', border: 'none', padding: '10px 20px', fontSize: '12px', fontWeight: '700', borderRadius: '12px', cursor: 'pointer', width: '100%' }
}
