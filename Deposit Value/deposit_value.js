async function fetchMetalPrices() {
  try {
    const response = await fetch(
      "https://api.metals.dev/v1/latest?api_key=4IVGS0IM4VGVEXZUNITH626ZUNITH&currency=USD&unit=toz",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    // Fallback prices if network error
    return {
      copper: 3.9,
      gold: 1989,
      silver: 23.5,
      platinum: 980,
      palladium: 1450,
      lead: 2.1,
      zinc: 2.8,
      nickel: 7.5,
    };
  }
}

async function calculateValue() {
  // Get input values
  const baseMetal = document.getElementById("baseMetal").value;
  const preciousMetal = document.getElementById("preciousMetal").value;
  const baseGrade =
    parseFloat(document.getElementById("baseGrade").value) / 100;
  const preciousGrade = parseFloat(
    document.getElementById("preciousGrade").value
  );
  const strike = parseFloat(document.getElementById("strike").value);
  const depth = parseFloat(document.getElementById("depth").value);
  const width = parseFloat(document.getElementById("width").value);
  const gravity = parseFloat(document.getElementById("gravity").value);

  // Fetch current metal prices
  const prices = await fetchMetalPrices();

  // Calculate tonnage
  const tonnage = strike * depth * width * gravity;

  // Calculate metal content
  const baseMetalTonnes = tonnage * baseGrade;
  const preciousMetalGrams = tonnage * preciousGrade;

  // Convert to pounds and ounces
  const baseMetalPounds = baseMetalTonnes * 2204.62262;
  const preciousMetalOunces = preciousMetalGrams / 34.2857;

  // Calculate values
  const baseMetalValue = baseMetalPounds * prices[baseMetal];
  const preciousMetalValue = preciousMetalOunces * prices[preciousMetal];

  // Display results
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
      <h2>Results</h2>
      <div class="result-item">Total Tonnage: ${tonnage.toLocaleString()} tonnes</div>
      <div class="result-item">${
        baseMetal.charAt(0).toUpperCase() + baseMetal.slice(1)
      } Content: ${baseMetalPounds.toLocaleString()} pounds</div>
      <div class="result-item">${
        preciousMetal.charAt(0).toUpperCase() + preciousMetal.slice(1)
      } Content: ${preciousMetalOunces.toLocaleString()} ounces</div>
      <div class="result-item">${
        baseMetal.charAt(0).toUpperCase() + baseMetal.slice(1)
      } Value: $${baseMetalValue.toLocaleString()}</div>
      <div class="result-item">${
        preciousMetal.charAt(0).toUpperCase() + preciousMetal.slice(1)
      } Value: $${preciousMetalValue.toLocaleString()}</div>
      <div class="result-item">Total Value: $${(
        baseMetalValue + preciousMetalValue
      ).toLocaleString()}</div>
  `;

  // Update current prices display
  document.getElementById("currentPrices").innerHTML = `
      <strong>Current Metal Prices:</strong><br>
      ${baseMetal.charAt(0).toUpperCase() + baseMetal.slice(1)}: $${
    prices[baseMetal]
  }/lb<br>
      ${preciousMetal.charAt(0).toUpperCase() + preciousMetal.slice(1)}: $${
    prices[preciousMetal]
  }/oz
  `;
}

// Initial price fetch
fetchMetalPrices().then((prices) => {
  document.getElementById("currentPrices").innerHTML = `
      <strong>Current Metal Prices:</strong><br>
      Copper: $${prices.copper}/lb<br>
      Gold: $${prices.gold}/oz
  `;
});
