// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// 1. Elements based on index.html IDs
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// 2. Main function to fetch data
async function fetchWeatherAlerts(stateCode) {
    // Step 3 $ 4: Clear UI and hide previous errors
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    try {
        const response = await fetch(`${weatherApi}${stateCode.toUpperCase()}`);

        const data = await response.json();

        // Step 2: Display alerts
        displayAlerts(data, stateCode);

    } catch (error) {
        // Step 4: Handle errors
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove("hidden");
    } finally {
        // Step 3: Clear input field
        stateInput.value = "";
    }
}

// Function to build the DOM elements
function displayAlerts(data, state)  {
    const features = data.features;

    // Clear the display first to ensure no old text is sticking around
    alertsDisplay.innerHTML = "";


    // Create the summary message
    const summary = document.createElement("p");
    summary.textContent = `Weather Alerts: ${features.length} `;
    alertsDisplay.appendChild(summary);

    // Create a list of headlines
    const list = document.createElement("ul");
    features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature.properties.headline;
        list.appendChild(li);
    });
    alertsDisplay.appendChild(list);
}

// 4. Event listener for the button
fetchButton.addEventListener("click", () => {
    const stateValue = stateInput.value.trim();
    if (stateValue) {
        fetchWeatherAlerts(stateValue);
    }
});

