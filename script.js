const pairingPeriod = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
let names = ["Kirsten", "Laila", "Joy", "Donna", "Xyrah", "Princess", "Chris", "Brianna"];
let pairingHistory = {};

document.addEventListener('DOMContentLoaded', () => {
    updatePairingList();
    document.getElementById('pairingForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting and refreshing the page
    });
});

function addName() {
    const newName = document.getElementById('newName').value.trim();
    if (newName && !names.includes(newName)) {
        names.push(newName);
        pairingHistory[newName] = { pairs: [], pairedOn: [] };
        updatePairingList();
        document.getElementById('newName').value = '';
    } else {
        alert("Please enter a valid, unique name.");
    }
}

function removeName() {
    const nameToRemove = document.getElementById('newName').value.trim();
    if (nameToRemove && names.includes(nameToRemove)) {
        names = names.filter(name => name !== nameToRemove);
        delete pairingHistory[nameToRemove];
        updatePairingList();
        document.getElementById('newName').value = '';
    } else {
        alert("Please enter a valid name that exists.");
    }
}

function pairBuddy() {
    const userName = document.getElementById('userNameInput').value.trim();
    
    if (userName === "") {
        document.getElementById('result').textContent = "Please enter your name.";
        return;
    }

    if (!names.includes(userName)) {
        document.getElementById('result').textContent = "Name not found. Please add your name to the list.";
        return;
    }

    const now = Date.now();
    const userPairing = pairingHistory[userName] || { pairs: [], pairedOn: [] };
    
    // Check if the user can be paired
    if (userPairing.pairedOn.length > 0) {
        const lastPairedOn = userPairing.pairedOn[userPairing.pairedOn.length - 1];
        if (now - lastPairedOn < pairingPeriod) {
            document.getElementById('result').textContent = "You have already been paired recently. Please wait 2 weeks before pairing again.";
            return;
        }
    }

    const availableNames = names.filter(name => 
        name !== userName && 
        (!pairingHistory[name] || !pairingHistory[name].pairedOn.length || 
        (now - pairingHistory[name].pairedOn[pairingHistory[name].pairedOn.length - 1] >= pairingPeriod))
    );

    if (availableNames.length === 0) {
        resetPairings();
        return;
    }

    const buddyName = availableNames[Math.floor(Math.random() * availableNames.length)];

    // Update pairing history
    userPairing.pairs.push(buddyName);
    userPairing.pairedOn.push(now);
    pairingHistory[userName] = userPairing;

    if (!pairingHistory[buddyName]) {
        pairingHistory[buddyName] = { pairs: [], pairedOn: [] };
    }
    pairingHistory[buddyName].pairs.push(userName);
    pairingHistory[buddyName].pairedOn.push(now);

    updatePairingList();

    document.getElementById('result').textContent = `You have been paired with ${buddyName}.`;
}

function updatePairingList() {
    const pairingList = document.getElementById('pairingList');
    pairingList.innerHTML = '';

    const pairs = new Set();
    for (const [person, { pairs: buddies }] of Object.entries(pairingHistory)) {
        buddies.forEach(buddy => {
            const pairKey = [person, buddy].sort().join('-');
            if (!pairs.has(pairKey)) {
                pairs.add(pairKey);
                const li = document.createElement('li');
                li.textContent = `${person} is paired with ${buddy}`;
                pairingList.appendChild(li);
            }
        });
    }
}

function resetPairings() {
    const now = Date.now();
    const allPaired = names.every(name => pairingHistory[name] && pairingHistory[name].pairedOn.length > 0 &&
        now - pairingHistory[name].pairedOn[pairingHistory[name].pairedOn.length - 1] >= pairingPeriod
    );

    if (allPaired) {
        pairingHistory = {};
        names.forEach(name => {
            pairingHistory[name] = { pairs: [], pairedOn: [] };
        });
        updatePairingList();
        document.getElementById('result').textContent = "All pairings have been reset.";
    } else {
        document.getElementById('result').textContent = "Not all names have been paired yet.";
    }
}
