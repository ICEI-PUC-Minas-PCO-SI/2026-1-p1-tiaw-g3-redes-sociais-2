// ===== SCORE DINÂMICO =====

function getLabel(pontos) {
  if (pontos >= 500) return 'Excelente';
  if (pontos >= 300) return 'Muito Bom';
  if (pontos >= 150) return 'Bom';
  if (pontos >=  50) return 'Regular';
  return 'Iniciante';
}

function atualizarScoreUI() {
  const pontos = getPontosUsuario(); // vem do score.js

  // número
  const scoreNumber = document.querySelector('.score-number');
  if (scoreNumber) scoreNumber.textContent = pontos;

  // label
  const scoreLabel = document.querySelector('.score-label');
  if (scoreLabel) scoreLabel.textContent = getLabel(pontos);

  // barra SVG (máximo visual = 1000 pontos)
  const circleProgress = document.querySelector('.circle-progress');
  if (circleProgress) {
    const percentual = Math.min(pontos / 1000, 1); // 0 a 1
    const arco = (percentual * 100).toFixed(1);    // 0 a 100
    circleProgress.setAttribute('stroke-dasharray', `${arco}, 100`);
  }

  // badge "+X pts" no footer do score
  const scoreUp = document.querySelector('.score-up');
  if (scoreUp) scoreUp.innerHTML = `<i class="bi bi-arrow-up"></i> ${pontos} pts`;
}