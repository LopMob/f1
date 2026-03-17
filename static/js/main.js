async function loadDrivers() {
    const container = document.getElementById('drivers-list');
    if (!container) return;

    const response = await fetch('/api/drivers');
    const drivers = await response.json();

    drivers.forEach(driver => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${driver.name}</h3>
            <p><strong>Team:</strong> ${driver.team}</p>
            <p><strong>Number:</strong> ${driver.number}</p>
            <p><strong>Points:</strong> ${driver.points}</p>
        `;
        container.appendChild(card);
    });
}

async function loadRaces() {
    const container = document.getElementById('races-list');
    if (!container) return;

    const response = await fetch('/api/races');
    const races = await response.json();

    races.forEach(race => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${race.grand_prix}</h3>
            <p><strong>Track:</strong> ${race.track}</p>
            <p><strong>Winner:</strong> ${race.winner}</p>
            <p><strong>Date:</strong> ${race.date}</p>
        `;
        container.appendChild(card);
    });
}

loadDrivers();
loadRaces();
