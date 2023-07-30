const apiUrl = 'https://sportscore1.p.rapidapi.com/players';
const apiHeaders = {
    'X-RapidAPI-Key': '072c1fca36msh5131799fa3240efp196bbbjsnaac205374554',
    'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
};

// Function to fetch the list of players from the API
async function fetchPlayers() {
    try {
        const response = await fetch(apiUrl, { headers: apiHeaders });
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to populate the dropdown list with players
function populateDropdown(playerList, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';

    for (const player of playerList) {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = player.name; 
        dropdown.appendChild(option);
    }
}

async function fetchPlayerData(playerId) {
    try {
        const url = `${apiUrl}/${playerId}/statistics?page=1`;
        const response = await fetch(url, { headers: apiHeaders });
        const data = await response.json();
        return data.data[0]; 
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to display player statistics in the specified container
function displayPlayerStatistics(playerData, containerId) {
    const container = document.getElementById(containerId);
    // container.innerHTML = '';

    for (const detail of playerData.details) {
        const groupName = detail.group_name;
        const statisticsItems = detail.statistics_items;
        const div = document.createElement('div');
        div.classList.add('stat-group');

        const heading = document.createElement('h3');
        heading.textContent = groupName;
        div.appendChild(heading);

        for (const item of statisticsItems) {
            const statName = Object.values(item)[0];
            const statValue = detail[Object.keys(item)[0]];
            console.log(statValue);

            const p = document.createElement('p');
            p.textContent = `${statName}: ${statValue}`;
            div.appendChild(p);
        }

        container.appendChild(div);
    }
}

function updatePlayerNames(player1Name, player2Name) {
    const player1Heading = document.querySelector('#player1 h2');
    const player2Heading = document.querySelector('#player2 h2');
    player1Heading.textContent = player1Name;
    player2Heading.textContent = player2Name;
  }

async function comparePlayers(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const player1Select = document.getElementById('player1Select');
    const player2Select = document.getElementById('player2Select');
    const player1Id = player1Select.value;
    const player2Id = player2Select.value;

    const player1Data = await fetchPlayerData(player1Id);
    const player2Data = await fetchPlayerData(player2Id);

    displayPlayerStatistics(player1Data, 'player1'); // Check if 'player1' is the correct ID
    displayPlayerStatistics(player2Data, 'player2'); // Check if 'player2' is the correct ID
    const player1Name = player1Select.options[player1Select.selectedIndex].textContent;
    const player2Name = player2Select.options[player2Select.selectedIndex].textContent;
  
    updatePlayerNames(player1Name, player2Name);
}

// Event listener for the "Compare" button
const compareBtn = document.getElementById('compareBtn');
compareBtn.addEventListener('click', comparePlayers);


// Fetch the list of players and populate the dropdown lists
(async function () {
    const players = await fetchPlayers();
    populateDropdown(players, 'player1Select');
    populateDropdown(players, 'player2Select');
})();
