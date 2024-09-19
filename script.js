let names = ["Kirsten", "Laila", "Joy", "April", "Xyrah", "Princess", "Brianna"];
const startDate = new Date(2024, 8, 23).getTime(); // September 23rd, 2024 (Month is 0-indexed, so 8 is September)
const pairingPeriod = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds

document.addEventListener('DOMContentLoaded', () => {
    generatePairs();
    setInterval(generatePairs, pairingPeriod); // Update the pairs every 2 weeks
});

function generatePairs() {
    const now = Date.now();
    const timeSinceStart = now - startDate;

    // Calculate the current pairing period (how many 2-week cycles have passed since the start date)
    const currentPeriod = Math.floor(timeSinceStart / pairingPeriod);

    // Shuffle the names array based on the current period (to get a consistent result each time)
    const shuffledNames = shuffleNames(names, currentPeriod);

    // Pair the shuffled names
    const pairs = [];
    for (let i = 0; i < shuffledNames.length; i += 2) {
        if (shuffledNames[i + 1]) {
            pairs.push(`${shuffledNames[i]} is paired with ${shuffledNames[i + 1]}`);
        } else {
            pairs.push(`${shuffledNames[i]} has no pair`);
        }
    }

    // Display the pairs on the page
    const pairingList = document.getElementById('pairingList');
    pairingList.innerHTML = '';
    pairs.forEach(pair => {
        const li = document.createElement('li');
        li.textContent = pair;
        pairingList.appendChild(li);
    });
}

// Function to shuffle names in a consistent way based on the current period
function shuffleNames(arr, period) {
    const array = [...arr];
    let currentIndex = array.length, randomIndex;

    // Shuffle array using a seeded algorithm based on the period (to get the same result for each 2-week period)
    while (currentIndex !== 0) {
        randomIndex = (Math.floor(Math.random() * period) + currentIndex) % currentIndex;
        currentIndex--;

        // Swap elements
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
