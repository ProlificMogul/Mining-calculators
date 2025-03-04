document
  .getElementById("grade-calculator-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get inputs
    const mineral = document.getElementById("mineral").value;
    const drillResult = parseFloat(
      document.getElementById("drill-result").value
    );

    // Mineralization table
    const gradeTable = {
      Cobalt: { low: 1, medium: 2 },
      Copper: { low: 0.5, medium: 1.5 },
      "Iron Ore": { low: 25, medium: 35 },
      Lead: { low: 2.5, medium: 10 },
      Molybdenum: { low: 0.15, medium: 0.5 },
      Nickel: { low: 1, medium: 2 },
      Zinc: { low: 2.5, medium: 10 },
      Gold: { low: 1.5, medium: 5 },
      Palladium: { low: 1.5, medium: 5 },
      Platinum: { low: 1, medium: 2.5 },
      Silver: { low: 10, medium: 50 },
    };

    // Determine the grade
    let grade = "Low Grade";
    if (drillResult >= gradeTable[mineral].medium) {
      grade = "High Grade";
    } else if (drillResult >= gradeTable[mineral].low) {
      grade = "Medium Grade";
    }

    // Display results
    document.getElementById("results").style.display = "block";
    document.getElementById("mineral-name").textContent = mineral;
    document.getElementById("grade-result").textContent = grade;
  });
