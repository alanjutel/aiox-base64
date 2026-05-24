# PRD - AIOX Compressor & Converter

## 1. Visão Geral
O **AIOX Compressor & Converter** é uma ferramenta web de produtividade voltada para desenvolvedores, projetada para facilitar a manipulação de dados em formato Base64 com suporte a compressão de dados. A aplicação foca em velocidade, privacidade (processamento local) e facilidade de uso.

## 2. Objetivos
- Prover uma interface moderna e intuitiva para conversão de texto e Base64.
- Integrar algoritmos de compressão para otimizar o tamanho das strings resultantes.
- Garantir que nenhum dado saia do navegador do usuário (processamento client-side).
- Facilitar o fluxo de trabalho de desenvolvedores que lidam com payloads comprimidos.

## 3. Requisitos Funcionais (RF)
- **RF01 - Conversão Texto para Base64:** O usuário deve inserir texto e ver o resultado em Base64 instantaneamente.
- **RF02 - Decodificação Base64 para Texto:** O usuário deve inserir Base64 e ver o texto original.
- **RF03 - Compressão de Dados:** Opção para comprimir o texto antes de converter para Base64 (usando algoritmos como Gzip/Deflate).
- **RF04 - Preview em Tempo Real:** As saídas devem ser atualizadas automaticamente conforme o usuário digita.
- **RF05 - Cópia Rápida:** Botão de um clique para copiar o resultado para a área de transferência.
- **RF06 - Histórico Local:** Salvar as últimas 10 operações bem-sucedidas no `localStorage`.
- **RF07 - Detecção de Erros:** Exibir mensagens de erro amigáveis caso o input Base64 seja inválido.
- **RF08 - Limpeza de Campos:** Botão para limpar rapidamente os campos de entrada e saída.

## 4. Requisitos Não Funcionais (RNF)
- **RNF01 - Performance:** A conversão e compressão de textos de até 1MB devem ser instantâneas (< 100ms).
- **RNF02 - Disponibilidade:** A aplicação deve ser acessível via web através do Vercel.
- **RNF03 - Responsividade:** A interface deve se adaptar a dispositivos móveis e desktops.
- **RNF04 - UI/UX:** Design moderno, preferencialmente seguindo tendências de "Developer Tools" (Dark Mode por padrão).
- **RNF05 - Segurança:** Todo o processamento deve ocorrer no cliente; nenhum dado deve ser enviado para servidores externos.

## 5. Critérios de Aceite (CA)
- **CA01:** Ao digitar "AIOX" e selecionar compressão off, o output Base64 deve ser "QUlPWA==".
- **CA02:** Ao clicar em "Copiar", o sistema deve exibir um feedback visual de sucesso.
- **CA03:** O histórico deve persistir após o recarregamento da página (F5).
- **CA04:** O layout não deve quebrar em telas de largura mínima de 320px.

## 6. Roadmap Inicial
- **M1:** Configuração do ambiente (Vite + React + Tailwind).
- **M2:** Implementação do motor de conversão Base64 e integração do `pako`.
- **M3:** Desenvolvimento da interface UI (Cards, Inputs, Histórico).
- **M4:** Implementação da persistência local e refinamento de UX.
- **M5:** Deploy e validação no Vercel.

---
— Morgan, planejando o futuro 📊