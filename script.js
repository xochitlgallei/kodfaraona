const button = document.getElementById("rollButton");

const dice = [
    {
        sides: 8,
        die: document.getElementById("die8"),
        value: document.getElementById("value8")
    },
    {
        sides: 10,
        die: document.getElementById("die10"),
        value: document.getElementById("value10")
    },
    {
        sides: 12,
        die: document.getElementById("die12"),
        value: document.getElementById("value12")
    }
];

let isRolling = false;

function rnd(max) {
    return Math.floor(Math.random() * max) + 1;
}

function animateNumber(item) {

    item.value.classList.add("number-change");

    setTimeout(() => {
        item.value.classList.remove("number-change");
    }, 70);

}

let flashState = 0;

function flash(item) {

    item.die.classList.remove(
        "flash-dark",
        "flash-normal",
        "flash-light"
    );

    switch (flashState) {

        case 0:
            item.die.classList.add("flash-dark");
            break;

        case 1:
            item.die.classList.add("flash-light");
            break;

        case 2:
            item.die.classList.add("flash-normal");
            break;

    }

    flashState++;

    if (flashState > 2)
        flashState = 0;

}

function clearFlash(item) {

    item.die.classList.remove(
        "flash-dark",
        "flash-light",
        "flash-normal"
    );

}

function stopDie(item) {

    clearFlash(item);

    item.value.textContent = rnd(item.sides);

    animateNumber(item);

}

button.addEventListener("click", () => {

    if (isRolling)
        return;

    isRolling = true;

    button.disabled = true;

    const timer = setInterval(() => {

        dice.forEach(item => {

            item.value.textContent = rnd(item.sides);

            animateNumber(item);

            flash(item);

        });

    }, 75);

    setTimeout(() => {

        stopDie(dice[0]);

    }, 1000);

    setTimeout(() => {

        stopDie(dice[1]);

    }, 1200);

    setTimeout(() => {

        stopDie(dice[2]);

        clearInterval(timer);

        isRolling = false;

        button.disabled = false;

    }, 1400);

});
