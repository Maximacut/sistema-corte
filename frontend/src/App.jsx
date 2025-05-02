
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

  function adicionarPeca() {
    if (!nova.nome || !nova.largura || !nova.altura) return
    setPecas([...pecas, nova])
    setNova({ ...nova, nome: "", largura: "", altura: "", quantidade: 1 })
  }

  async function gerarPlano() {
    const pecasExpandida = []
    pecas.forEach(p => {
      for (let i = 0; i < parseInt(p.quantidade); i++) {
        pecasExpandida.push({
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
      body: JSON.stringify({ cliente, pecas: pecasExpandida })
    })
    const data = await resposta.json()
    setResposta(data)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Plano de Corte - Maximacut</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium">Cliente:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-9 gap-2 mb-2">
        <input className="border p-1" placeholder="Nome" value={nova.nome} onChange={(e) => setNova({ ...nova, nome: e.target.value })} />
        <input className="border p-1" placeholder="Largura" value={nova.largura} onChange={(e) => setNova({ ...nova, largura: e.target.value })} />
        <input className="border p-1" placeholder="Altura" value={nova.altura} onChange={(e) => setNova({ ...nova, altura: e.target.value })} />
        <input className="border p-1" placeholder="Qtd" value={nova.quantidade} onChange={(e) => setNova({ ...nova, quantidade: e.target.value })} />
        <select className="border p-1" value={nova.veio} onChange={(e) => setNova({ ...nova, veio: e.target.value })}>
          <option value="comprimento">Veio no comprimento</option>
          <option value="largura">Veio na largura</option>
        </select>
        <select className="border p-1" value={nova.fitaTipo} onChange={(e) => setNova({ ...nova, fitaTipo: e.target.value })}>
          <option>22mm - Branco</option>
          <option>35mm - Cinza</option>
          <option>64mm - Carvalho</option>
        </select>
        <select className="border p-1" value={nova.chapa} onChange={(e) => setNova({ ...nova, chapa: e.target.value })}>
          <option>2750x1850 - Branco</option>
          <option>2750x1850 - Freijó</option>
          <option>2750x1850 - Cinza 15mm</option>
        </select>
        <button className="bg-blue-500 text-white px-2" onClick={adicionarPeca}>Adicionar</button>
      </div>

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">Nome</th>
            <th className="border p-1">Largura</th>
            <th className="border p-1">Altura</th>
            <th className="border p-1">Qtd</th>
            <th className="border p-1">Veio</th>
            <th className="border p-1">Fita</th>
            <th className="border p-1">Chapa</th>
          </tr>
        </thead>
        <tbody>
          {pecas.map((p, i) => (
            <tr key={i} className="border">
              <td className="border p-1">{p.nome}</td>
              <td className="border p-1">{p.largura}</td>
              <td className="border p-1">{p.altura}</td>
              <td className="border p-1">{p.quantidade}</td>
              <td className="border p-1">{p.veio}</td>
              <td className="border p-1">{p.fitaTipo}</td>
              <td className="border p-1">{p.chapa}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button className="bg-green-600 text-white px-4 py-2" onClick={gerarPlano}>Gerar Plano de Corte</button>
      </div>

      {resposta && (
        <div className="mt-6 text-sm">
          <h3 className="font-bold">Resultado:</h3>
          <a className="text-blue-600 underline" href={import.meta.env.VITE_API_URL + resposta.plano_pdf_url} target="_blank">📄 Baixar Plano PDF</a><br />
          <a className="text-blue-600 underline" href={import.meta.env.VITE_API_URL + resposta.etiquetas_pdf_url} target="_blank">🏷️ Baixar Etiquetas PDF</a>
        </div>
      )}
    </div>
  )
}
