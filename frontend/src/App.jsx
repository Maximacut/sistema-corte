import { useState } from 'react'

const api = import.meta.env.VITE_API_URL

export default function App() {
  const [cliente, setCliente] = useState('')
  const [resposta, setResposta] = useState(null)

  async function gerar() {
    const resposta = await fetch(`${api}/api/gerar-plano`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente,
        pecas: [
          {
            nome: 'Base',
            largura: 600,
            altura: 400,
            fita_borda: [true, false, false, true],
            veio: 'comprimento',
            fitaTipo: '22mm - Branco',
            chapa: '2750x1850 - Branco'
          }
        ]
      })
    })
    const data = await resposta.json()
    setResposta(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Plano de Corte - Maximacut</h1>
      <input placeholder='Nome do cliente' value={cliente} onChange={(e) => setCliente(e.target.value)} />
      <button onClick={gerar}>Gerar plano de corte</button>

      {resposta && (
        <div>
          <p><a href={api + resposta.plano_pdf_url} target='_blank'>📄 Baixar Plano PDF</a></p>
          <p><a href={api + resposta.etiquetas_pdf_url} target='_blank'>🏷️ Baixar Etiquetas</a></p>
        </div>
      )}
    </div>
  )
}
