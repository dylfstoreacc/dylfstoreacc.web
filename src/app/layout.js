export const metadata = {
  title: 'DYLF STORE OFFICIAL',
  description: 'Pusat Layanan Jual & Beli Akun Digital Terpercaya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style>{`
          /* KUNCI UTAMA LATAR BELAKANG SIBER NEON TOKO */
          body { 
            margin: 0; padding: 0; box-sizing: border-box; 
            background-color: #030306; 
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(188, 19, 254, 0.1) 0%, transparent 45%),
                linear-gradient(rgba(5, 5, 8, 0.92), rgba(8, 12, 24, 0.95)),
                linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 100% 100%, 30px 30px, 30px 30px;
            color: #ffffff; display: flex; justify-content: center; align-items: center; min-height: 100vh; overflow: hidden; 
          }
          
          /* ANIMASI GAIB UNTUK LOGO & TEXT NEON */
          @keyframes cosmicPulse { 0%, 100% { transform: scale(0.96); } 50% { transform: scale(1.04); filter: drop-shadow(0 0 20px #00ffff); } }
          @keyframes ringRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes textPulse { 0%, 100% { opacity: 0.4; transform: scale(0.98); } 50% { opacity: 1; transform: scale(1); } }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
