'use client'
import { useState } from 'react'
import { Copy } from 'lucide-react'
export function CopyMint({ mint }: { mint: string }) {
  const [message, setMessage] = useState('')
  async function copy() {
    try {
      await navigator.clipboard.writeText(mint)
      setMessage('Mint address copied.')
    } catch {
      setMessage('Copy the address from the text above.')
    }
  }
  return (
    <>
      <button className="button ghost" onClick={copy}>
        <Copy size={17} /> Copy address
      </button>
      <p role="status">{message}</p>
    </>
  )
}
