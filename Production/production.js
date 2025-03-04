function calculateOEE() {
  // Get input values
  const plannedTime = parseFloat(document.getElementById("plannedTime").value);
  const actualTime = parseFloat(document.getElementById("actualTime").value);
  const expectedOutput = parseFloat(
    document.getElementById("expectedOutput").value
  );
  const actualOutput = parseFloat(
    document.getElementById("actualOutput").value
  );
  const totalOutput = parseFloat(document.getElementById("totalOutput").value);
  const goodOutput = parseFloat(document.getElementById("goodOutput").value);

  // Error handling
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = "";
  if (
    isNaN(plannedTime) ||
    isNaN(actualTime) ||
    isNaN(expectedOutput) ||
    isNaN(actualOutput) ||
    isNaN(totalOutput) ||
    isNaN(goodOutput)
  ) {
    errorMessage.textContent = "Please fill in all fields with valid numbers.";
    return;
  }
  if (plannedTime <= 0 || expectedOutput <= 0 || totalOutput <= 0) {
    errorMessage.textContent =
      "Planned time, expected output, and total output must be greater than zero.";
    return;
  }

  // Calculate Availability, Performance, and Quality
  const availability = (actualTime / plannedTime) * 100;
  const performance = (actualOutput / expectedOutput) * 100;
  const quality = (goodOutput / totalOutput) * 100;

  // Calculate OEE
  const oee =
    (availability / 100) * (performance / 100) * (quality / 100) * 100;

  // Display results
  document.getElementById("availabilityResult").textContent =
    availability.toFixed(2) + "%";
  document.getElementById("performanceResult").textContent =
    performance.toFixed(2) + "%";
  document.getElementById("qualityResult").textContent =
    quality.toFixed(2) + "%";
  document.getElementById("oeeResult").textContent = oee.toFixed(2) + "%";

  document.getElementById("results").style.display = "block";
}
