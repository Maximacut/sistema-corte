
import { useState } from "react"
import PlanoCorteVisual from "./PlanoCorteVisual"

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

  const pecasSimuladas = [
    { nome: "Base", largura: 600, altura: 400, x: 10, y: 10, cor: "#cce5ff" },
    { nome: "Lateral", largura: 600, altura: 400, x: 620, y: 10, cor: "#fff3cd" },
    { nome: "Fundo", largura: 800, altura: 300, x: 10, y: 420, cor: "#d4edda" },
    { nome: "Divisória", largura: 400, altura: 300, x: 820, y: 420, cor: "#f8d7da" },
  ]

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

      <PlanoCorteVisual pecas={pecasSimuladas} />

      <div className="mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => alert('Integração futura')}>Gerar Plano de Corte</button>
      </div>
    </div>
  )
}
