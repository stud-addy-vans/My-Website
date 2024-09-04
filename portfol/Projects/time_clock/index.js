const countries = [
    { name: "India", timezone: "Asia/Kolkata" },
    { name: "United States", timezone: "America/New_York" },
    { name: "United Kingdom", timezone: "Europe/London" },
    { name: "Japan", timezone: "Asia/Tokyo" },
    { name: "Australia", timezone: "Australia/Sydney" },
    { name: "France", timezone: "Europe/Paris" },
    { name: "Brazil", timezone: "America/Sao_Paulo" },
    { name: "South Africa", timezone: "Africa/Johannesburg" },
    { name: "Russia", timezone: "Europe/Moscow" },
    { name: "China", timezone: "Asia/Shanghai" },
    { name: "Canada", timezone: "America/Toronto" },
    { name: "South Korea", timezone: "Asia/Seoul" },
    { name: "Mexico", timezone: "America/Mexico_City" },
    { name: "Italy", timezone: "Europe/Rome" },
    { name: "Spain", timezone: "Europe/Madrid" },
    { name: "Germany", timezone: "Europe/Berlin" },
    { name: "Argentina", timezone: "America/Argentina/Buenos_Aires" },
    { name: "Turkey", timezone: "Europe/Istanbul" },
    { name: "Saudi Arabia", timezone: "Asia/Riyadh" },
    { name: "New Zealand", timezone: "Pacific/Auckland" },
    { name: "Indonesia", timezone: "Asia/Jakarta" },
    { name: "Malaysia", timezone: "Asia/Kuala_Lumpur" },
    { name: "Thailand", timezone: "Asia/Bangkok" },
    { name: "United Arab Emirates", timezone: "Asia/Dubai" },
    { name: "Singapore", timezone: "Asia/Singapore" },
    { name: "Sweden", timezone: "Europe/Stockholm" },
    { name: "Netherlands", timezone: "Europe/Amsterdam" },
    { name: "Belgium", timezone: "Europe/Brussels" },
    { name: "Poland", timezone: "Europe/Warsaw" },
    { name: "Switzerland", timezone: "Europe/Zurich" },
    { name: "Norway", timezone: "Europe/Oslo" },
    { name: "Denmark", timezone: "Europe/Copenhagen" },
    { name: "Portugal", timezone: "Europe/Lisbon" },
    { name: "Egypt", timezone: "Africa/Cairo" },
    { name: "Nigeria", timezone: "Africa/Lagos" },
    { name: "Kenya", timezone: "Africa/Nairobi" },
    { name: "Ghana", timezone: "Africa/Accra" },
    { name: "Israel", timezone: "Asia/Jerusalem" },
    { name: "Iran", timezone: "Asia/Tehran" },
    { name: "Pakistan", timezone: "Asia/Karachi" },
    { name: "Sri Lanka", timezone: "Asia/Colombo" },
    { name: "Vietnam", timezone: "Asia/Ho_Chi_Minh" },
    { name: "Philippines", timezone: "Asia/Manila" },
    { name: "Bangladesh", timezone: "Asia/Dhaka" },
    { name: "Ukraine", timezone: "Europe/Kiev" },
    { name: "Chile", timezone: "America/Santiago" },
    { name: "Colombia", timezone: "America/Bogota" },
    { name: "Peru", timezone: "America/Lima" },
    { name: "Cuba", timezone: "America/Havana" },
    { name: "Jamaica", timezone: "America/Jamaica" },
    { name: "Nepal", timezone: "Asia/Kathmandu" },
    { name: "Kazakhstan", timezone: "Asia/Almaty" },
    { name: "Uzbekistan", timezone: "Asia/Tashkent" },
    { name: "Mongolia", timezone: "Asia/Ulaanbaatar" },
    { name: "Armenia", timezone: "Asia/Yerevan" },
    { name: "Georgia", timezone: "Asia/Tbilisi" },
    { name: "Azerbaijan", timezone: "Asia/Baku" },
    { name: "Qatar", timezone: "Asia/Qatar" },
    { name: "Oman", timezone: "Asia/Muscat" },
    { name: "Cyprus", timezone: "Asia/Nicosia" },
    { name: "Malta", timezone: "Europe/Malta" },
    { name: "Iceland", timezone: "Atlantic/Reykjavik" },
    { name: "Luxembourg", timezone: "Europe/Luxembourg" }
];

let timeInterval;

function updateWorldTimes(selectedTimezone = "Asia/Kolkata") {
    const container = document.getElementById('worldClocks');
    container.innerHTML = '';

    const country = countries.find(country => country.timezone === selectedTimezone);
    if (country) {
        const clockDiv = document.createElement('div');
        clockDiv.className = 'col-md-12 clock-container';
        container.appendChild(clockDiv);

        function updateTime() {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { timeZone: country.timezone });
            const date = now.toLocaleDateString('en-US', { timeZone: country.timezone });

            clockDiv.innerHTML = `
                <h3>${country.name}</h3>
                <p>${time}</p>
                <p>${date}</p>
            `;
        }

        updateTime();

        timeInterval = setInterval(updateTime, 1000);
    }
}

function populateDropdown() {
    const dropdown = document.getElementById('countryDropdown');
    countries.forEach(country => {
        const li = document.createElement('li');
        li.innerHTML = `<a class="dropdown-item" data-timezone="${country.timezone}">${country.name}</a>`;
        dropdown.appendChild(li);
    });

    dropdown.addEventListener('click', (event) => {
        if (event.target && event.target.matches('a.dropdown-item')) {
            const selectedTimezone = event.target.getAttribute('data-timezone');

            clearInterval(timeInterval);

            updateWorldTimes(selectedTimezone);
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('#countryDropdown .dropdown-item');

        items.forEach(item => {
            const countryName = item.textContent.toLowerCase();
            if (countryName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

populateDropdown();
setupSearch();
updateWorldTimes();
