
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

  function removerPeca(index) {
    setPecas(pecas.filter((_, i) => i !== index))
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Plano de Corte - Maximacut</h1>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <label className="block text-sm font-semibold mb-1">Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-9 gap-2 mb-4">
        <input className="border p-2" placeholder="Nome" value={nova.nome} onChange={(e) => setNova({ ...nova, nome: e.target.value })} />
        <input className="border p-2" placeholder="Largura" value={nova.largura} onChange={(e) => setNova({ ...nova, largura: e.target.value })} />
        <input className="border p-2" placeholder="Altura" value={nova.altura} onChange={(e) => setNova({ ...nova, altura: e.target.value })} />
        <input className="border p-2" placeholder="Qtd" value={nova.quantidade} onChange={(e) => setNova({ ...nova, quantidade: e.target.value })} />
        <select className="border p-2" value={nova.veio} onChange={(e) => setNova({ ...nova, veio: e.target.value })}>
          <option value="comprimento">Veio no comprimento</option>
          <option value="largura">Veio na largura</option>
        </select>
        <select className="border p-2" value={nova.fitaTipo} onChange={(e) => setNova({ ...nova, fitaTipo: e.target.value })}>
          <option>22mm - Branco</option>
          <option>35mm - Cinza</option>
          <option>64mm - Carvalho</option>
        </select>
        <select className="border p-2" value={nova.chapa} onChange={(e) => setNova({ ...nova, chapa: e.target.value })}>
          <option>2750x1850 - Branco</option>
          <option>2750x1850 - Freijó</option>
          <option>2750x1850 - Cinza 15mm</option>
        </select>
        <button className="bg-blue-600 text-white px-3 rounded" onClick={adicionarPeca}>Adicionar</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Largura</th>
              <th className="p-2 border">Altura</th>
              <th className="p-2 border">Qtd</th>
              <th className="p-2 border">Veio</th>
              <th className="p-2 border">Fita</th>
              <th className="p-2 border">Chapa</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2 border text-center">{p.nome}</td>
                <td className="p-2 border text-center">{p.largura}</td>
                <td className="p-2 border text-center">{p.altura}</td>
                <td className="p-2 border text-center">{p.quantidade}</td>
                <td className="p-2 border text-center">{p.veio}</td>
                <td className="p-2 border text-center">{p.fitaTipo}</td>
                <td className="p-2 border text-center">{p.chapa}</td>
                <td className="p-2 border text-center">
                  <button onClick={() => removerPeca(i)} className="text-red-500 hover:text-red-700">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={gerarPlano}>Gerar Plano de Corte</button>
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
