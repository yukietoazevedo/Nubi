import { Conversation, PromptSuggestion, UserProfile } from "../types/chat";

export const INITIAL_USER: UserProfile = {
  name: "Yuki",
  email: "yuki@orion.ai",
  avatarText: "Y",
  plan: "Conta pessoal",
};

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    id: "sug-1",
    title: "Explique um conceito para mim",
    subtitle: "Aprenda sobre tecnologia, ciência ou física de forma clara",
    prompt: "Explique o conceito de computação quântica de forma simples e intuitiva com analogias do dia a dia.",
    iconName: "lightbulb",
  },
  {
    id: "sug-2",
    title: "Ajude-me a criar uma ideia",
    subtitle: "Brainstorming para projetos, novos produtos ou estratégias",
    prompt: "Quero criar um produto SaaS voltado para produtividade de desenvolvedores. Pode me dar 3 ideias inovadoras?",
    iconName: "compass",
  },
  {
    id: "sug-3",
    title: "Analise este problema",
    subtitle: "Encontre soluções estratégicas e diagnósticos práticos",
    prompt: "Estou tendo dificuldades de retenção de usuários no meu aplicativo web. Quais métricas devo analisar primeiro?",
    iconName: "code",
  },
  {
    id: "sug-4",
    title: "Escreva algo para mim",
    subtitle: "Rascunhos de e-mails, artigos técnicos ou apresentações",
    prompt: "Escreva um e-mail profissional e persuasivo apresentando nossa nova solução de IA para um potencial cliente corporativo.",
    iconName: "pen",
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Como funciona energia solar?",
    createdAt: "Hoje, 14:32",
    model: "Orion 3.5 Turbo",
    messages: [
      {
        id: "m1-1",
        role: "user",
        content: "Como funciona a energia solar e por que ela é considerada uma energia limpa?",
        createdAt: "14:32",
      },
      {
        id: "m1-2",
        role: "assistant",
        content: `A energia solar fotovoltaica funciona convertendo a luz do Sol diretamente em eletricidade por meio do **efeito fotovoltaico**.

### Como funciona o processo:

1. **Captação:** Os painéis solares (compostos por células de silício) absorvem os fótons da luz solar.
2. **Geração de Corrente:** A energia dos fótons liberta elétrons nas células de silício, gerando uma corrente elétrica contínua (CC).
3. **Inversão:** O inversor solar converte a corrente contínua (CC) em corrente alternada (CA), que é o padrão utilizado nas residências e indústrias.
4. **Distribuição:** A eletricidade alimenta os aparelhos da casa e o excesso pode ser enviado para a rede elétrica local em troca de créditos.

### Por que é considerada uma energia limpa?

- **Zero Emissões:** Não emite gases de efeito estufa (como $CO_2$) durante a sua geração.
- **Recurso Inesgotável:** A radiação solar é abundante e sustentável a longo prazo.
- **Baixo Impacto Ambiental:** Não requer desmatamento ou grandes intervenções hídricas.`,
        createdAt: "14:32",
      },
      {
        id: "m1-3",
        role: "user",
        content: "Qual o tempo médio de retorno do investimento (payback) em uma residência?",
        createdAt: "14:35",
      },
      {
        id: "m1-4",
        role: "assistant",
        content: `No Brasil, o tempo médio de retorno do investimento (**payback**) em um sistema fotovoltaico residencial gira em torno de **3 a 5 anos**, variando de acordo com a região e a tarifa da distribuidora local.

Como a vida útil dos equipamentos é superior a **25 anos**, você desfrutará de mais de 20 anos de energia praticamente gratuita após pagar o investimento inicial!`,
        createdAt: "14:35",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Ideias para meu projeto",
    createdAt: "Hoje, 11:15",
    model: "Orion Pro",
    messages: [
      {
        id: "m2-1",
        role: "user",
        content: "Preciso de sugestões de projetos web modernos com IA para colocar no meu portfólio de desenvolvedor.",
        createdAt: "11:15",
      },
      {
        id: "m2-2",
        role: "assistant",
        content: `Aqui estão 3 ideias impactantes para o seu portfólio:

1. **Assistente Inteligente de Code Review**
   - *O que faz:* Analisa repositórios de código e sugere refatorações, boas práticas de segurança e otimizações de performance.
   - *Diferencial:* Visualização de diff interativa e pontuação de qualidade do código.

2. **Gerador e Editor de Conteúdo Multimodal**
   - *O que faz:* Converte notas de reuniões em artigos de blog, posts para redes sociais e apresentações de slides em segundos.
   - *Diferencial:* Suporte a exportação em PDF e markdown estruturado.

3. **Plataforma de Diagnóstico de Interface UX/UI**
   - *O que faz:* Usuário envia um screenshot de uma tela e a IA identifica problemas de acessibilidade, contraste e hierarquia visual.
   - *Diferencial:* Relatório detalhado com pontuação WCAG.`,
        createdAt: "11:16",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Planejamento de estudos",
    createdAt: "Ontem, 19:40",
    model: "Orion 3.5 Turbo",
    messages: [
      {
        id: "m3-1",
        role: "user",
        content: "Monte um cronograma de estudos de 4 semanas para aprender TypeScript avançado e arquitetura de código.",
        createdAt: "19:40",
      },
      {
        id: "m3-2",
        role: "assistant",
        content: `Aqui está um plano de estudos estruturado para 4 semanas:

### Semana 1: Sistema de Tipos Avançado
- Generics avançados, inferência de tipos e restrições.
- Mapped Types, Conditional Types e operador \`infer\`.
- Utility Types customizados.

### Semana 2: Design Patterns em TypeScript
- Patterns Criacionais (Factory, Singleton, Builder).
- Patterns Estruturais (Adapter, Decorator, Facade).
- Patterns Comportamentais (Observer, Strategy).

### Semana 3: Arquitetura & Modularização
- Princípios SOLID aplicados ao TypeScript.
- Arquitetura Hexagonal (Ports & Adapters) e Clean Architecture.
- Injeção de Dependência e desacoplamento.

### Semana 4: Testes & Projeto Prático
- Testes unitários com Vitest/Jest e tipagem forte.
- Construção de uma biblioteca tipada do zero.`,
        createdAt: "19:41",
      },
    ],
  },
  {
    id: "conv-4",
    title: "Análise de documento",
    createdAt: "Ontem, 16:05",
    model: "Orion Ultra",
    messages: [
      {
        id: "m4-1",
        role: "user",
        content: "Quais são as seções fundamentais de uma proposta comercial de software B2B?",
        createdAt: "16:05",
      },
      {
        id: "m4-2",
        role: "assistant",
        content: `Uma proposta comercial B2B eficiente deve conter as seguintes seções essenciais:

1. **Resumo Executivo:** Visão geral rápida dos objetivos e resultados esperados.
2. **Entendimento do Desafio:** Demonstração clara da dor atual do cliente.
3. **Escopo da Solução:** Funcionalidades, entregáveis e limites do projeto.
4. **Cronograma & Fases:** Marcos de entrega e datas chave.
5. **Investimento & Opções:** Preços, condições de pagamento e ROI estimado.
6. **Casos de Sucesso:** Prova social e depoimentos relevantes.
7. **Termos & Próximos Passos:** Validade da proposta e assinatura.`,
        createdAt: "16:06",
      },
    ],
  },
  {
    id: "conv-5",
    title: "Dúvida sobre programação",
    createdAt: "28 Ago, 10:12",
    model: "Orion Code",
    messages: [
      {
        id: "m5-1",
        role: "user",
        content: "Como evitar re-renders desnecessários no React em componentes de listas grandes?",
        createdAt: "10:12",
      },
      {
        id: "m5-2",
        role: "assistant",
        content: `Para otimizar listas extensas no React e evitar renderizações desnecessárias:

1. **Virtualização de Lista:** Utilize bibliotecas como \`react-window\` ou \`tanstack-virtual\` para renderizar apenas os itens visíveis na viewport.
2. **React.memo com comparador customizado:** Envolva os componentes de item da lista com \`React.memo\`.
3. **Estabilidade de Callbacks:** Passe funções memorizadas usando \`useCallback\` para evitar que as referências das props mudem a cada ciclo.
4. **Chaves Únicas e Estáveis:** Use IDs únicos em vez do índice do array no atributo \`key\`.`,
        createdAt: "10:13",
      },
    ],
  },
  {
    id: "conv-6",
    title: "Criar uma estratégia de marketing",
    createdAt: "25 Ago, 18:22",
    model: "Orion Pro",
    messages: [
      {
        id: "m6-1",
        role: "user",
        content: "Como criar uma campanha de lançamento para uma ferramenta SaaS B2B?",
        createdAt: "18:22",
      },
      {
        id: "m6-2",
        role: "assistant",
        content: `Uma campanha de lançamento SaaS de sucesso divide-se em 3 fases estratégicas:

- **Pré-lançamento (Warm-up):** Landing page de lista de espera, teaser no LinkedIn, parceria com beta testers estratégicos.
- **Dia D (Lançamento):** Publicação no Product Hunt, anúncio oficial por e-mail para a lista de espera e webinar de demonstração ao vivo.
- **Pós-lançamento (Nutrição):** Onboarding guiado, coleta de feedbacks rápidos e estudos de caso dos primeiros clientes.`,
        createdAt: "18:23",
      },
    ],
  },
];

export const MOCK_RESPONSES = [
  "Entendi perfeitamente. Esta é uma excelente questão! Com base nos dados e no contexto fornecido, posso recomendar uma abordagem direta focada em simplicidade e alta eficiência.",
  "Ótima pergunta! Para resolver isso com precisão, é importante estruturar os passos principais em ordem de prioridade. Vou detalhar as recomendações a seguir.",
  "Compreendi o seu objetivo. Como estamos nesta versão de demonstração da interface ORION, esta resposta está sendo simulada localmente com sucesso! Como posso ajudar você a aprofundar este tema?",
  "Interessante! Analisando esse ponto sob a perspectiva de arquitetura e boas práticas, o caminho mais recomendado envolve dividir a solução em pequenas etapas incrementais.",
  "Com certeza! Vamos explorar isso juntos. Segue uma visão geral clara e estruturada para orientar sua tomada de decisão.",
];
