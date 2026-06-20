import React from 'react'

export const metadata = {
  description: 'Payload CMS backend voor het SvelteKit portfolio.',
  title: 'Portfolio CMS'
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
