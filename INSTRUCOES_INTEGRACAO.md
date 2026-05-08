# Como integrar o módulo EUA v2 no seu index.html

## Mudança 1 — Adicionar aba na topbar (procure id="mkt-CAL")
Após:
  <button class="atb-tab" id="mkt-CAL" onclick="atbSetMkt('CAL')">📅 Eventos</button>

Adicione:
  <button class="atb-tab" id="mkt-USA" onclick="atbSetMkt('USA')">🇺🇸 EUA</button>

---

## Mudança 2 — Linkar o arquivo JS (antes de </body>)
Adicione ESTA linha imediatamente antes do </body>:
  <script src="usa_module_final.js"></script>

---

## Mudança 3 — Subir o arquivo usa_module_final.js no GitHub
No seu repositório GitHub:
1. Clique em "Add file" → "Upload files"  
2. Selecione o arquivo usa_module_final.js
3. Commit

---

## Resultado
- Nova aba 🇺🇸 EUA aparece na topbar
- Clicando exibe lista de Big Techs (AAPL, MSFT, NVDA, GOOGL, AMZN, MELI, KO, V, JPM, DIS)
- Preços carregam automaticamente em background
- Análise completa: TTM, gráfico 1M/3M/6M/1A/5A, pares do setor, IA
- Conversão USD/BRL automática pelo câmbio Focus do Bacen
