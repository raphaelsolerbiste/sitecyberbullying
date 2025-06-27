document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('quiz-form');
  const resultado = document.getElementById('resultado');
  let startTime = null;
  let timerStarted = false;

  const radios = document.querySelectorAll('input[type="radio"]');
  const submitButton = form.querySelector('button[type="submit"]');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (!timerStarted) {
        startTime = Date.now();
        timerStarted = true;
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!startTime) {
      resultado.innerHTML = `<p style="color: red;"><strong>Responda ao menos uma pergunta antes de enviar o quiz.</strong></p>`;
      return;
    }

    const respostas = document.querySelectorAll('input[type="radio"]:checked');
    let acertos = 0;
    respostas.forEach(resposta => {
      acertos += parseInt(resposta.value);
    });

    const total = 5;
    const percentual = Math.round((acertos / total) * 100);
    const endTime = Date.now();
    const tempoSegundos = Math.floor((endTime - startTime) / 1000);

    radios.forEach(radio => radio.disabled = true);
    submitButton.disabled = true;

    let titulo = '';
    let mensagem = '';
    let emoji = '';
    let cor = '';

    if (percentual === 100) {
      titulo = 'Perfeito! 🧠';
      mensagem = 'Você realmente entende o que é cyberbullying. Continue espalhando respeito e empatia na internet!';
      emoji = '🏆';
      cor = '#4CAF50';
    } else if (percentual >= 80) {
      titulo = 'Muito bem! 👏';
      mensagem = 'Você mandou bem, mas sempre dá pra aprender mais. Que tal conversar com alguém sobre o tema hoje?';
      emoji = '✅';
      cor = '#2196F3';
    } else if (percentual >= 50) {
      titulo = 'Atenção! ⚠️';
      mensagem = 'Você acertou algumas, mas talvez precise revisar o conteúdo. Cyberbullying é sério e merece atenção.';
      emoji = '🧐';
      cor = '#FFC107';
    } else {
      titulo = 'É hora de refletir... 😟';
      mensagem = 'O tema é sério e vale a pena aprender mais. Leia com carinho o conteúdo e converse sobre isso com colegas.';
      emoji = '📚';
      cor = '#f44336';
    }

    resultado.innerHTML = `
      <div class="resultado-box" style="border-left: 8px solid ${cor}; animation: fadeIn 1s;">
        <h2 style="color: ${cor};">${titulo} ${emoji}</h2>
        <p><strong>${acertos}</strong> de ${total} perguntas certas (${percentual}%)</p>
        <p><strong>Tempo de resposta:</strong> ${tempoSegundos} segundos ⏱️</p>
        <p class="mensagem-final">${mensagem}</p>
      </div>
    `;
  });
});
