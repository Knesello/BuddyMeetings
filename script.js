   document.addEventListener('DOMContentLoaded', function() {

// Get references to the DOM elements
const generateBtn = document.getElementById('generateBtn');
const pairList = document.getElementById('pairList');

// Hardcoded buddy pairs
const pairs = [
  ['Kirsten', 'Flor'],
  ['Joy', 'Jodelle'],
  ['Brianna', 'Joyce'],
  ['Laila', 'Nikki']
 ['Maria', 'Lovely']
 ['Xyrah', 'Kenzie']
];

// Function to display the pairs
function displayPairs(pairs) {
  pairList.innerHTML = ''; // Clear previous list
  pairs.forEach(pair => {
    const li = document.createElement('li');
    li.textContent = pair[0] + ' & ' + pair[1];
    pairList.appendChild(li);
  });
}

// Always display the fixed buddy pairs
displayPairs(pairs);

// Hide the Generate button (optional)
generateBtn.style.display = 'none';

});
