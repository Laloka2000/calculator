const kijelzo = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

const szamologep = {
    kijelzettErtek: '0',
    elsoMuvelet: null,
    masodikErtekreVar: false,
    operator: null,
};

function bevittSzam(Szam) {
    const { kijelzettErtek, masodikErtekreVar } = szamologep;

    if (masodikErtekreVar === true) {
        szamologep.kijelzettErtek = Szam;
        szamologep.masodikErtekreVar = false;
    } else {
        szamologep.kijelzettErtek = kijelzettErtek === '0' ? Szam : kijelzettErtek + Szam;
    }
}

function inputDecimal(pont) {
    if (szamologep.masodikErtekreVar === true) {
        szamologep.kijelzettErtek = '0';
        szamologep.masodikErtekreVar = false;
        return;
    }

    if (!szamologep.kijelzettErtek.includes(pont)) {
        szamologep.kijelzettErtek += pont;
    }
}

function kezeloMuvelet(kovetkezoMuvelet) {
    const { elsoMuvelet, kijelzettErtek, operator } = szamologep;
    const bevitErtek = parseFloat(kijelzettErtek);

    if (operator && szamologep.masodikErtekreVar) {
        szamologep.operator = kovetkezoMuvelet;
        return;
    }

    if (elsoMuvelet == null && !isNaN(bevitErtek)) {
        szamologep.elsoMuvelet = bevitErtek;
    } else if (operator) {
        const eredmeny = szamol(szamologep.elsoMuvelet, bevitErtek, operator);
        szamologep.kijelzettErtek = `${parseFloat(eredmeny.toFixed(7))}`;
        szamologep.elsoMuvelet = eredmeny;
    }

    szamologep.masodikErtekreVar = true;
    szamologep.operator = kovetkezoMuvelet;
}

function szamol(elsoMuvelet, masodikMuvelet, muvelet) {
    if (muvelet === '+') {
        return elsoMuvelet + masodikMuvelet;
    } else if (muvelet === '-') {
        return elsoMuvelet - masodikMuvelet;
    } else if (muvelet === '*') {
        return elsoMuvelet * masodikMuvelet;
    } else if (muvelet === '/') {
        return elsoMuvelet / masodikMuvelet;
    }

    return masodikMuvelet;
}

function visszaAllit() {
    szamologep.kijelzettErtek = '0';
    szamologep.elsoMuvelet = null;
    szamologep.masodikErtekreVar = false;
    szamologep.operator = null;
}

function kijelzoFrissit() {
    kijelzo.value = szamologep.kijelzettErtek;
}

// Event Listeners
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            kezeloMuvelet(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            visszaAllit();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                bevittSzam(value);
            }
    }

    kijelzoFrissit();
});
