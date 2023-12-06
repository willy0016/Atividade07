const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const perguntas = [
    {
      pergunta: 'Qual é a capital do Brasil?',
      alternativas: ['A) Rio de Janeiro', 'B) São Paulo', 'C) Brasília'],
      resposta: 'C'
    },
    {
      pergunta: 'Quem escreveu "Dom Quixote"?',
      alternativas: ['A) Machado de Assis', 'B) Cervantes', 'C) Tolstói'],
      resposta: 'B'
    },
    {
      pergunta: 'Qual é o maior planeta do sistema solar?',
      alternativas: ['A) Terra', 'B) Marte', 'C) Júpiter'],
      resposta: 'C'
    },
    {
      pergunta: 'Quantos continentes existem?',
      alternativas: ['A) 5', 'B) 6', 'C) 7'],
      resposta: 'C'
    },
    {
      pergunta: 'Qual é o símbolo químico do ouro?',
      alternativas: ['A) Au', 'B) Ag', 'C) Fe'],
      resposta: 'A'
    },
    {
      pergunta: 'Quem pintou a Mona Lisa?',
      alternativas: ['A) Van Gogh', 'B) Da Vinci', 'C) Picasso'],
      resposta: 'B'
    },
    {
      pergunta: 'Em que ano ocorreu a independência do Brasil?',
      alternativas: ['A) 1808', 'B) 1822', 'C) 1889'],
      resposta: 'B'
    },
    {
      pergunta: 'Qual é a maior cordilheira do mundo?',
      alternativas: ['A) Andes', 'B) Himalaias', 'C) Rockies'],
      resposta: 'B'
    },
    {
      pergunta: 'Quem foi o primeiro presidente do Brasil?',
      alternativas: ['A) Getúlio Vargas', 'B) Juscelino Kubitschek', 'C) Marechal Deodoro'],
      resposta: 'C'
    },
    {
      pergunta: 'Quantos lados tem um hexágono?',
      alternativas: ['A) 5', 'B) 6', 'C) 7'],
      resposta: 'B'
    },
    {
      pergunta: 'Qual é o maior animal terrestre?',
      alternativas: ['A) Elefante', 'B) Girafa', 'C) Rinoceronte'],
      resposta: 'A'
    },
    {
      pergunta: 'Qual é o maior oceano do planeta?',
      alternativas: ['A) Atlântico', 'B) Índico', 'C) Pacífico'],
      resposta: 'C'
    },
    {
      pergunta: 'Quem foi o inventor da lâmpada elétrica?',
      alternativas: ['A) Thomas Edison', 'B) Nikola Tesla', 'C) Alexander Graham Bell'],
      resposta: 'A'
    },
    {
      pergunta: 'Em que ano começou a Segunda Guerra Mundial?',
      alternativas: ['A) 1935', 'B) 1939', 'C) 1945'],
      resposta: 'B'
    },
    {
      pergunta: 'Qual é a camada mais externa da Terra?',
      alternativas: ['A) Núcleo', 'B) Manto', 'C) Crosta'],
      resposta: 'C'
    },
  ];
  

let jogadorNome;
let rodadaAtual = 0;
let premiacaoAcerto = 100000; // R$ 1.000,00 por resposta correta
let premiacaoErro = 50000;   // R$ 500,00 por resposta incorreta
let pontuacaoTotal = 0;
const totalRodadas = 10;   // Número total de rodadas

function gerarPerguntasAleatorias() {
  for (let i = perguntas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]];
  }
}

function apresentarPergunta() {
  const perguntaAtual = perguntas[rodadaAtual];
  console.log(`\n${jogadorNome} - Rodada ${rodadaAtual + 1}`);
  console.log(`Prêmio: Acerto - R$${premiacaoAcerto.toFixed(2)} | Erro - R$${premiacaoErro.toFixed(2)}`);
  console.log(`Pontuação Atual: R$${pontuacaoTotal.toFixed(2)}`);
  console.log(`Pergunta: ${perguntaAtual.pergunta}`);
  perguntaAtual.alternativas.forEach(alternativa => console.log(alternativa));

  rl.question('Sua resposta (ou digite "P" para parar): ', resposta => {
    if (resposta.toUpperCase() === 'P') {
      pararJogo();
    } else {
      verificarResposta(resposta.toUpperCase());
    }
  });
}

function verificarResposta(resposta) {
  const perguntaAtual = perguntas[rodadaAtual];
  if (resposta === perguntaAtual.resposta) {
    pontuacaoTotal += premiacaoAcerto;
    console.log('******************Resultado******************');
    console.log('Acertou!');
    if (rodadaAtual < totalRodadas - 1) {
      rodadaAtual++;
      apresentarPergunta();
    } else {
      finalizarJogo();
    }
  } else {
    console.log('******************Resultado******************');
    console.log('Errou!');
    finalizarJogo();
  }
}

function pararJogo() {
  console.log('\n************ Jogo Parado ************');
  console.log(`Nome do jogador: ${jogadorNome}`);
  console.log(`Rodada atual: ${rodadaAtual + 1}`);
  console.log(`Premiação Atual: R$${pontuacaoTotal.toFixed(2)}`);
  
  rl.question('Deseja sair com a quantia atual? (S/N): ', resposta => {
    if (resposta.toUpperCase() === 'S') {
      finalizarJogo();
    } else {
      rl.close();
    }
  });
}

function finalizarJogo() {
  console.log('\n************ Fim do Jogo ************');
  console.log(`Nome do jogador: ${jogadorNome}`);
  console.log(`Rodada final: ${rodadaAtual + 1}`);
  console.log(`Você ganhou: R$${pontuacaoTotal.toFixed(2)}`);
  console.log(`Resposta correta da última pergunta: ${perguntas[rodadaAtual].resposta}`);
  const rodadasRestantes = totalRodadas - rodadaAtual - 1;
  console.log(`Faltavam: ${rodadasRestantes} rodadas`);

  rl.question('Deseja jogar novamente? (S/N): ', resposta => {
    if (resposta.toUpperCase() === 'S') {
      reiniciarJogo();
    } else {
      rl.close();
    }
  });
}

function reiniciarJogo() {
  rodadaAtual = 0;
  pontuacaoTotal = 0;
  gerarPerguntasAleatorias();
  rl.question('Digite seu nome: ', nome => {
    jogadorNome = nome;
    apresentarPergunta();
  });
}

gerarPerguntasAleatorias();
reiniciarJogo();
