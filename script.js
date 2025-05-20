// ---------- Constantes ----------
const DAYS = 365;
const habitSelect   = document.getElementById('habit');
const dailySlider   = document.getElementById('daily-slider');
const dailyValueEl  = document.getElementById('daily-value');
const totalAmountEl = document.getElementById('total-amount');
const extraInfoEl   = document.getElementById('extra-info');

// ---------- Helpers ----------
const fmt = (n, u='') => `${n.toLocaleString('fr-FR')}${u}`;

// Renvoie { total, extra }
function compute(habit, daily){
  const total = daily * DAYS;
  let extra = '';
  switch(habit){
    case 'money':
      extra = `≈ ${fmt(Math.round(total/12), ' €')} par mois`;
      break;
    case 'words':
      extra = `≈ ${fmt((total/250).toFixed(1))} pages (250 mots/page)`;
      break;
    case 'pushups':
      extra = `≈ ${fmt((total/100).toFixed(1))} séries de 100`;
      break;
  }
  return { total, extra };
}

// ---------- Affichage ----------
function update(){
  const habit = habitSelect.value;
  const daily = +dailySlider.value;
  dailyValueEl.textContent = daily;

  const { total, extra } = compute(habit, daily);

  const unit = habit === 'money' ? ' €' : (habit === 'words' ? ' mots' : ' reps');
  totalAmountEl.textContent = fmt(total, unit);

  extraInfoEl.textContent = extra;
  extraInfoEl.style.display = extra ? 'flex' : 'none';
}

// ---------- Événements ----------
habitSelect.addEventListener('change', update);
dailySlider.addEventListener('input', update);

// ---------- Init ----------
update();
