export const metadata = {
  title: 'DYLF STORE OFFICIAL',
  description: 'Pusat Layanan Jual & Beli Akun Digital Terpercaya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}