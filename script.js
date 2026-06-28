const button = document.getElementById("rollButton");

const dice = [
    {
        element: document.querySelector(".d8"),
        text: document.getElementById("value8"),
        sides: 8
    },
    {
        element: document.querySelector(".d10"),
        text: document.getElementById("value10"),
        sides: 10
    },
    {
        element: document.querySelector(".d12"),
        text: document.getElementById("value12"),
        sides: 12
    }
];

let rolling = false;

function randomValue(max) {
    return Math.floor(Math.random() * max) + 1;
}

function stopDie(die) {

    die.element.classList.remove("rolling");

    die.text.textContent = randomValue(die.sides);

    die.element.classList.add("stop");

    setTimeout(() => {
        die.element.classList.remove("stop");
    }, 300);

}

button.addEventListener("click", () => {

    if (rolling) return;

    rolling = true;

    button.disabled = true;

    dice.forEach(die => {

        die.element.classList.add("rolling");

    });

    const interval = setInterval(() => {

        dice.forEach(die => {

            die.text.textContent = randomValue(die.sides);

        });

    }, 45);

    setTimeout(() => {

        stopDie(dice[0]);

    }, 1000);

    setTimeout(() => {

        stopDie(dice[1]);

    }, 1200);

    setTimeout(() => {

        stopDie(dice[2]);

        clearInterval(interval);

        rolling = false;

        button.disabled = false;

    }, 1400);

});
