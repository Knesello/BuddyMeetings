document.addEventListener('DOMContentLoaded', function() {
  // Get reference to the UL element
  const pairList = document.getElementById('pairList');

  // Hardcoded buddy pairs
  const pairs = [
    ['Kirsten', 'Maria'],
    ['Flor', 'Nikki'],
    ['Jodelle', 'Joyce'],
    ['Brianna', 'Lovely'],
    ['Laila', 'Xyrah', 'Kenzie'] // <-- fixed closing bracket
  ];

  // Function to display the pairs
  function displayPairs(pairs) {
    pairList.innerHTML = ''; // Clear previous list
    pairs.forEach((pair, index) => {
      const li = document.createElement('li');
      li.textContent = `Pair ${index + 1}: ${pair.join(' & ')}`; // joins all names with &
      pairList.appendChild(li);
    });
  }

  // Always display the fixed buddy pairs
  displayPairs(pairs);
});
