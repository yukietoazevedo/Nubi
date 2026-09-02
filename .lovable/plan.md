# Plano: Página em Branco

## Objetivo
Substituir o placeholder atual em `/` por uma página completamente em branco.

## Alterações
1. Editar `src/routes/index.tsx` para remover o conteúdo do placeholder (`img` do GPT Engineer e o container centralizado).
2. Manter a estrutura mínima da rota do TanStack Router.
3. Renderizar apenas um container vazio que ocupe a tela sem nenhum elemento visível.

## Critérios de conclusão
- A rota `/` exibe uma tela totalmente branca.
- Não há imagens, textos ou botões visíveis.
- A build continua funcionando sem erros.
