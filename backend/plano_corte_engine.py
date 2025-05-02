from fpdf import FPDF
from typing import List, Dict

def gerar_pdf_plano_corte(pecas: List[Dict], cliente: str, path: str):
    pdf = FPDF(orientation='L', unit='mm', format='A4')
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"Plano de Corte - Cliente: {cliente}", ln=True)

    escala = 0.1
    x, y = 10, 20
    for i, p in enumerate(pecas):
        w = p["largura"] * escala
        h = p["altura"] * escala
        if x + w > 270:
            x = 10
            y += h + 10
        pdf.rect(x, y, w, h)
        pdf.text(x + 2, y + 5, f'{p["nome"]} ({p["largura"]}x{p["altura"]})')
        x += w + 5

    pdf.output(path)

def gerar_pdf_etiquetas(pecas: List[Dict], cliente: str, path: str):
    pdf = FPDF(orientation='P', unit='mm', format='A4')
    pdf.set_auto_page_break(auto=True, margin=10)
    pdf.set_font("Arial", size=12)

    for p in pecas:
        pdf.add_page()
        pdf.cell(0, 10, f"Cliente: {cliente}", ln=True)
        pdf.cell(0, 10, f"Peça: {p['nome']}", ln=True)
        pdf.cell(0, 10, f"Tamanho: {p['largura']} x {p['altura']} mm", ln=True)
        pdf.cell(0, 10, f"Veio: {p['sentido_veio']}", ln=True)
        pdf.cell(0, 10, f"Chapa: {p['chapa']}", ln=True)

    pdf.output(path)
