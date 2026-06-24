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
          /* --- GLOBAL RESET & BACKDROP SIBER NEON --- */
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #030306;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.12) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(188, 19, 254, 0.12) 0%, transparent 45%),
                linear-gradient(rgba(5, 5, 8, 0.94), rgba(8, 12, 24, 0.96)),
                linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 100% 100%, 30px 30px, 30px 30px;
            color: #ffffff;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
          }

          /* --- ANIMASI AMAN JAYA (EFEK MENYALA-NYALA) --- */
          @keyframes cosmicPulse {
            0%, 100% { transform: scale(0.96); filter: drop-shadow(0 0 12px rgba(188, 19, 254, 0.6)); }
            50% { transform: scale(1.04); filter: drop-shadow(0 0 25px #00ffff); }
          }
          
          @keyframes ringRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes textPulse {
            0%, 100% { opacity: 0.4; transform: scale(0.98); text-shadow: 0 0 4px rgba(0, 255, 255, 0.3); }
            50% { opacity: 1; transform: scale(1); text-shadow: 0 0 15px #00ffff; }
          }

          @keyframes fluidNeon {
            0%, 100% { border-color: #bc13fe; box-shadow: 0 0 10px #bc13fe, inset 0 0 5px #00ffff; }
            50% { border-color: #00ffff; box-shadow: 0 0 20px #00ffff, inset 0 0 10px #bc13fe; }
          }

          /* --- KELAS UTAMA PEMICU ANIMASI --- */
          .logo-pulse { animation: cosmicPulse 2s infinite ease-in-out; }
          .ring-rotate { animation: ringRotate 2.5s infinite linear; }
          .text-pulse { animation: textPulse 2s infinite ease-in-out; }
          .neon-border-glow { animation: fluidNeon 4s linear infinite; }

          /* Custom Scrollbar inside Phone Container */
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #00ffff; border-radius: 10px; box-shadow: 0 0 8px #00ffff; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
