// Get references to the DOM elements
const generateBtn = document.getElementById('generateBtn');
const pairList = document.getElementById('pairList');

// List of buddies
let buddies = ["Kirsten", "Joy", "Lovely", "Laila", "Brianna", "Xyrah", "Flor", "Jodelle", "Joyce", "Nikki", "Maria"
];

// Function to shuffle array (Fisher-Yates shuffle)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Function to generate buddy pairs
function generatePairs() {
  let pairs = [];
  let shuffledBuddies = shuffle([...buddies]); // Create a copy to shuffle

  for (let i = 0; i < shuffledBuddies.length; i += 2) {
    if (i + 1 < shuffledBuddies.length) {
      pairs.push([shuffledBuddies[i], shuffledBuddies[i + 1]]);
    } else {
      pairs.push([shuffledBuddies[i], "No Partner"]);
    }
  }

  return pairs;
}

// Function to display the pairs
function displayPairs(pairs) {
  pairList.innerHTML = ''; // Clear previous list
  pairs.forEach(pair => {
    const li = document.createElement('li');
    li.textContent = pair[0] + ' & ' + pair[1];
    pairList.appendChild(li);
  });
}

// Function to show the next refresh date
function showNextRefresh(savedAt) {
  const nextRefresh = document.getElementById('nextRefresh');
  if (savedAt) {
    const nextRefreshDate = new Date(parseInt(savedAt) + 14 * 24 * 60 * 60 * 1000); // + 2 weeks
    nextRefresh.textContent = `Next buddy refresh: ${nextRefreshDate.toLocaleDateString()}`;
  } else {
    nextRefresh.textContent = '';
  }
}

// Event listener for DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const savedPairs = localStorage.getItem('buddyPairs');
  const savedAt = localStorage.getItem('buddyPairsSavedAt');
  const now = Date.now();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

  if (savedPairs && savedAt) {
    if (now - savedAt < twoWeeks) {
      displayPairs(JSON.parse(savedPairs));
      showNextRefresh(savedAt);
    } else {
      // It's been more than 2 weeks → auto-generate new pairs
      const newPairs = generatePairs();
      displayPairs(newPairs);
      localStorage.setItem('buddyPairs', JSON.stringify(newPairs));
      localStorage.setItem('buddyPairsSavedAt', now);
      showNextRefresh(now);

      // Optional: show a message if pairs were refreshed
      const refreshMessage = document.createElement('p');
      refreshMessage.textContent = "New buddies have been assigned today!";
      refreshMessage.style.color = 'green';
      pairList.parentNode.insertBefore(refreshMessage, pairList);
    }
  } else {
    // No saved pairs → generate immediately
    const newPairs = generatePairs();
    displayPairs(newPairs);
    localStorage.setItem('buddyPairs', JSON.stringify(newPairs));
    localStorage.setItem('buddyPairsSavedAt', now);
    showNextRefresh(now);
  }
});

// Event listener for generate button click
generateBtn.addEventListener('click', () => {
  const pairs = generatePairs();
  displayPairs(pairs);
  localStorage.setItem('buddyPairs', JSON.stringify(pairs));
  localStorage.setItem('buddyPairsSavedAt', Date.now());
  showNextRefresh(Date.now());
});
