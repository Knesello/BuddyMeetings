const pairingPeriod = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
let names = ["Kirsten", "Laila", "Joy", "Kim", "Xyrah", "Princess", "April", "Brianna"];
let pairingHistory = loadPairingHistory();

// Function to generate a simple browser fingerprint
function generateFingerprint() {
    const userAgent = navigator.userAgent;
    const screenResolution = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return `${userAgent}-${screenResolution}-${timezone}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updatePairingList();
    document.getElementById('pairingForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting and refreshing the page
        pairBuddy(); // Manually call pairBuddy on form submit
    });
});

function savePairingHistory() {
    localStorage.setItem('pairingHistory', JSON.stringify(pairingHistory));
}

function loadPairingHistory() {
    const data = localStorage.getItem('pairingHistory');
    return data ? JSON.parse(data) : {};
}

function addName() {
    const newName = document.getElementById('newName').value.trim();
    if (newName && !names.includes(newName)) {
        names.push(newName);
        pairingHistory[newName] = { pairs: [], pairedOn: [] };
        updatePairingList();
        savePairingHistory();
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
        savePairingHistory();
        document.getElementById('newName').value = '';
    } else {
        alert("Please enter a valid name that exists.");
    }
}

function pairBuddy() {
    const userName = document.getElementById('userNameInput').value.trim();
    const fingerprint = generateFingerprint();
    
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
    
    // Check if the user has an existing pair within the 2-week period
    if (userPairing[fingerprint] && userPairing[fingerprint].pairedOn.length > 0) {
        const lastPairedOn = userPairing[fingerprint].pairedOn[userPairing[fingerprint].pairedOn.length - 1];
        if (now - lastPairedOn < pairingPeriod) {
            const lastBuddy = userPairing[fingerprint].pairs[userPairing[fingerprint].pairs.length - 1];
            document.getElementById('result').textContent = `You have already been paired with ${lastBuddy}. Please wait 2 weeks before pairing again.`;
            return;
        }
    }

    const availableNames = names.filter(name => 
        name !== userName && 
        (!pairingHistory[name] || !pairingHistory[name][fingerprint] || !pairingHistory[name][fingerprint].pairedOn.length || 
        (now - pairingHistory[name][fingerprint].pairedOn[pairingHistory[name][fingerprint].pairedOn.length - 1] >= pairingPeriod))
    );

    if (availableNames.length === 0) {
        resetPairings();
        return;
    }

    const buddyName = availableNames[Math.floor(Math.random() * availableNames.length)];

    // Update pairing history
    if (!userPairing[fingerprint]) {
        userPairing[fingerprint] = { pairs: [], pairedOn: [] };
    }
    userPairing[fingerprint].pairs.push(buddyName);
    userPairing[fingerprint].pairedOn.push(now);
    pairingHistory[userName] = userPairing;

    if (!pairingHistory[buddyName]) {
        pairingHistory[buddyName] = {};
    }
    if (!pairingHistory[buddyName][fingerprint]) {
        pairingHistory[buddyName][fingerprint] = { pairs: [], pairedOn: [] };
    }
    pairingHistory[buddyName][fingerprint].pairs.push(userName);
    pairingHistory[buddyName][fingerprint].pairedOn.push(now);

    updatePairingList();
    savePairingHistory();

    document.getElementById('result').textContent = `You have been paired with ${buddyName}.`;
}

function updatePairingList() {
    const pairingList = document.getElementById('pairingList');
    pairingList.innerHTML = '';

    const pairs = new Set();
    for (const [person, history] of Object.entries(pairingHistory)) {
        for (const [fingerprint, { pairs: buddies }] of Object.entries(history)) {
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
}

function resetPairings() {
    const now = Date.now();
    const allPaired = names.every(name => pairingHistory[name] && Object.keys(pairingHistory[name]).every(fingerprint => 
        pairingHistory[name][fingerprint].pairedOn.length > 0 &&
        now - pairingHistory[name][fingerprint].pairedOn[pairingHistory[name][fingerprint].pairedOn.length - 1] >= pairingPeriod
    ));

    if (allPaired) {
        pairingHistory = {};
        names.forEach(name => {
            pairingHistory[name] = {};
        });
        updatePairingList();
        savePairingHistory();
        document.getElementById('result').textContent = "All pairings have been reset.";
    } else {
        document.getElementById('result').textContent = "Not all names have been paired yet.";
    }
}
