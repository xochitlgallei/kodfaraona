document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.start-btn');

  const dice = [
    { el: document.querySelector('.die-d8'),  sides: 8  },
    { el: document.querySelector('.die-d10'), sides: 10 },
    { el: document.querySelector('.die-d12'), sides: 12 }
  ];

  // Строим правильные многоугольники
  const buildPolygon = (sides, cx, cy, radius) => {
    const points = [];
    // Смещение -90°, чтобы вершина смотрела вверх
    const offset = -Math.PI / 2;
    for (let i = 0; i < sides; i++) {
      const angle = offset + (2 * Math.PI * i) / sides;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  dice.forEach(d => {
    const outer = d.el.querySelector('.shape');
    const inner = d.el.querySelector('.shape-inner');
    d.valueEl = d.el.querySelector('.value');

    const outerPoints = buildPolygon(d.sides, 100, 100, 90);
    const innerPoints = buildPolygon(d.sides, 100, 100, 78);

    outer.setAttribute('points', outerPoints);
    inner.setAttribute('points', innerPoints);
  });

  const ROLL_DURATION = 1000;
  const TICK_MIN = 60;
  const TICK_MAX = 80;

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
    const cancellers = dice.map(die => rollDie(die, stopAt));

    setTimeout(() => {
      cancellers.forEach(cancel => cancel());
      dice.forEach(d => {
        d.valueEl.textContent = randInt(d.sides);
      });
      isRolling = false;
      btn.disabled = false;
    }, ROLL_DURATION);
  });
});
