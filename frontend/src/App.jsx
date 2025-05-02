
import { useState } from "react"

export default function App() {
  const [cliente, setCliente] = useState("")
  const [pecas, setPecas] = useState([])
  const [nova, setNova] = useState({
    nome: "",
    largura: "",
    altura: "",
    quantidade: 1,
    veio: "comprimento",
    fita_borda: [false, false, false, false],
    fitaTipo: "22mm - Branco",
    chapa: "2750x1850 - Branco"
  })
  const [resposta, setResposta] = useState(null)

  function adicionar() {
    setPecas([...pecas, nova])
    setNova({ ...nova, nome: "", largura: "", altura: "", quantidade: 1 })
  }

  async function gerar() {
    const pecas_expandida = []
    pecas.forEach(p => {
      for (let i = 0; i < parseInt(p.quantidade); i++) {
        pecas_expandida.push({
          nome: p.nome,
          largura: parseInt(p.largura),
          altura: parseInt(p.altura),
          fita_borda: p.fita_borda,
          veio: p.veio,
          fitaTipo: p.fitaTipo,
          chapa: p.chapa
        })
      }
    })

    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/api/gerar-plano`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, pecas: pecas_expandida })
    })
    const data = await resposta.json()
    setResposta(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Plano de Corte - Maximacut</h2>
      <input
        placeholder="Nome do Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <input placeholder="Nome peça" value={nova.nome} onChange={(e) => setNova({ ...nova, nome: e.target.value })} />
        <input placeholder="Largura" value={nova.largura} onChange={(e) => setNova({ ...nova, largura: e.target.value })} />
        <input placeholder="Altura" value={nova.altura} onChange={(e) => setNova({ ...nova, altura: e.target.value })} />
        <input placeholder="Qtd" value={nova.quantidade} onChange={(e) => setNova({ ...nova, quantidade: e.target.value })} />
        <select value={nova.veio} onChange={(e) => setNova({ ...nova, veio: e.target.value })}>
          <option value="comprimento">Veio no Comprimento</option>
          <option value="largura">Veio na Largura</option>
        </select>
        <select value={nova.fitaTipo} onChange={(e) => setNova({ ...nova, fitaTipo: e.target.value })}>
          <option value="22mm - Branco">22mm - Branco</option>
          <option value="35mm - Cinza">35mm - Cinza</option>
          <option value="64mm - Carvalho">64mm - Carvalho</option>
        </select>
        <select value={nova.chapa} onChange={(e) => setNova({ ...nova, chapa: e.target.value })}>
          <option value="2750x1850 - Branco">2750x1850 - Branco</option>
          <option value="2750x1850 - Freijó">2750x1850 - Freijó</option>
        </select>
        <button onClick={adicionar}>Adicionar Peça</button>
      </div>

      <ul>
        {pecas.map((p, i) => (
          <li key={i}>{p.quantidade}x {p.nome} - {p.largura}x{p.altura} - {p.veio}</li>
        ))}
      </ul>

      <button onClick={gerar} style={{ marginTop: 20 }}>Gerar Plano de Corte</button>

      {resposta && (
        <div>
          <h3>Resultado:</h3>
          <p><a href={import.meta.env.VITE_API_URL + resposta.plano_pdf_url} target="_blank">📄 Baixar Plano</a></p>
          <p><a href={import.meta.env.VITE_API_URL + resposta.etiquetas_pdf_url} target="_blank">🏷️ Baixar Etiquetas</a></p>
        </div>
      )}
    </div>
  )
}
