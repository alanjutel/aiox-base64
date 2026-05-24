# Design Técnico - AIOX Compressor & Converter

## 1. Stack Tecnológica
- **Frontend:** React 18+ (TypeScript)
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS + Radix UI (via shadcn/ui)
- **Ícones:** Lucide React
- **Compressão:** `pako` (Zlib/Deflate)
- **Persistência:** Browser `localStorage`

## 2. Estrutura de Pastas Sugerida
```text
src/
├── assets/             # Recursos estáticos
├── components/         # Componentes UI reutilizáveis
│   ├── ui/             # Primitivos (Button, Input, Switch, Card, Badge)
│   ├── Converter/      # Componentes principais da aplicação
│   │   ├── ConverterContainer.tsx # Orquestrador da lógica de conversão
│   │   ├── InputSection.tsx       # Área de entrada de dados
│   │   ├── OutputSection.tsx      # Área de resultado e ações
│   │   └── OptionsBar.tsx         # Controles (Compression, Mode)
│   └── History/        # Componentes do histórico
│       ├── HistoryPanel.tsx       # Sidebar/Painel de histórico
│       └── HistoryItem.tsx        # Item individual da lista
├── hooks/              # Custom hooks
│   ├── useConverter.ts # Gerencia input, modo e resultado
│   └── useHistory.ts   # Gerencia persistência no localStorage
├── lib/                # Utilitários
│   └── conversion.ts   # Lógica de pako e base64
├── types/              # Interfaces TS
└── App.tsx             # Entry point e layout global
```

## 3. Fluxo de Dados e Estado
1. **useConverter**: Estado centralizado (`input`, `output`, `mode`, `isCompressed`).
2. **Real-time**: Um `useEffect` observa as mudanças no input/configurações e chama as funções de `conversion.ts`.
3. **Persistência**: Ao realizar uma conversão válida, o `useHistory` é acionado para salvar o snapshot no `localStorage`.

## 4. Estratégia de UI/UX
- **Visual:** Tema escuro (slate-950), bordas sutis e tipografia mono para dados.
- **Feedback:** Animações de transição simples e toasts para erros de decodificação Base64.
- **Layout:** Flexbox/Grid responsivo que prioriza o espaço de texto em telas grandes.
## 4. Estratégia de Processamento
Todo o processamento será síncrono e local:
- **Encode:** `Texto -> [Pako Compress] -> Uint8Array -> Base64 String`
- **Decode:** `Base64 String -> Uint8Array -> [Pako Decompress] -> Texto`
- Suporte a UTF-8 garantido via `TextEncoder`/`TextDecoder`.

## 5. UI/UX e Responsividade
- **Layout:** "Split-pane" em desktop (Input lado a lado com Output) e empilhado em mobile.
- **Feedback:** Toasts para erros de decodificação e confirmação de "Copiado".
- **Tema:** Dark Mode por padrão para ferramentas de dev.

## 6. Plano de Deploy
- **Plataforma:** Vercel.
- **Workflow:** Push para `main` dispara o build automático.
- **Configuração:** `vite build` gerando arquivos estáticos na pasta `dist`.

## 7. Próximos Passos (Handoff para @dev)
1. Iniciar projeto Vite: `npm create vite@latest . -- --template react-ts`.
2. Instalar dependências: `pako`, `lucide-react`, `clsx`, `tailwind-merge`.
3. Configurar Tailwind e shadcn/ui.
4. Implementar `lib/conversion.ts`.

---
— Aria, arquitetando o futuro 🏗️