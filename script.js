document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.start-btn');

  const dice = [
    { el: document.querySelector('.die-d8'),  sides: 8  },
    { el: document.querySelector('.die-d10'), sides: 10 },
    { el: document.querySelector('.die-d12'), sides: 12 }
  ];

  dice.forEach(d => {
    d.valueEl = d.el.querySelector('.value');
  });

  const ROLL_DURATION = 1000; // ~1 секунда «трясучки»
  const TICK_MIN = 60;        // мс
  const TICK_MAX = 80;        // мс

  let isRolling = false;

  const randInt = (max) => Math.floor(Math.random() * max) + 1;
  const randTick = () => TICK_MIN + Math.random() * (TICK_MAX - TICK_MIN);

  const rollDie = (die, stopAt) => {
    let tickTimer = null;

    const scheduleTick = () => {
      tickTimer = setTimeout(() => {
        if (Date.now() >= stopAt) {
          die.valueEl.textContent = randInt(die.sides);
          return;
        }
        die.valueEl.textContent = randInt(die.sides);
        scheduleTick();
      }, randTick());
    };

    scheduleTick();

    return () => clearTimeout(tickTimer);
  };

  btn.addEventListener('click', () => {
    if (isRolling) return;
    isRolling = true;
    btn.disabled = true;

    const stopAt = Date.now() + ROLL_DURATION;

    // Запускаем «трясучку» для всех трёх кубиков
    const cancellers = dice.map(die => rollDie(die, stopAt));

    // Останавливаем все три одновременно через ROLL_DURATION
    setTimeout(() => {
      cancellers.forEach(cancel => cancel());
      // Финальные значения (на случай, если последний tick не успел сработать ровно в stopAt)
      dice.forEach(d => {
        d.valueEl.textContent = randInt(d.sides);
      });
      isRolling = false;
      btn.disabled = false;
    }, ROLL_DURATION);
  });
});
