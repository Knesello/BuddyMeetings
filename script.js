document.addEventListener('DOMContentLoaded', function() {

// Get reference to the UL element
const pairList = document.getElementById('pairList');

// Hardcoded buddy pairs
const pairs = [
  ['Kirsten', 'Joyce'],
['Flor', 'Joy'],
['Jodelle', 'Lovely'],
['Brianna', 'Kenzie'],
['Laila', 'Maria'],
['Nikki', 'Xyrah']
];
// Function to display the pairs
function displayPairs(pairs) {
  pairList.innerHTML = ''; // Clear previous list
  pairs.forEach((pair, index) => {
    const li = document.createElement('li');
    li.textContent = `Pair ${index + 1}: ${pair[0]} & ${pair[1]}`;
    pairList.appendChild(li);
  });
}

// Always display the fixed buddy pairs
displayPairs(pairs);

});
