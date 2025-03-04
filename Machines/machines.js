document
  .getElementById("machine-matching-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get inputs
    const bucketSize = parseFloat(document.getElementById("bucket-size").value);
    const truckCapacity = parseFloat(
      document.getElementById("truck-capacity").value
    );
    const excavatorCycleTime =
      parseFloat(document.getElementById("excavator-cycle-time").value) / 60; // Convert to minutes
    const truckCycleTime = parseFloat(
      document.getElementById("truck-cycle-time").value
    ); // Already in minutes

    // Perform calculations
    const passesToFillTruck = Math.ceil(truckCapacity / bucketSize);
    const excavatorLoadingTime = passesToFillTruck * excavatorCycleTime;
    const trucksNeeded = Math.ceil(truckCycleTime / excavatorLoadingTime);

    // Display results
    document.getElementById("results").style.display = "block";
    document.getElementById("passes-result").textContent = passesToFillTruck;
    document.getElementById("loading-time-result").textContent =
      excavatorLoadingTime.toFixed(2) + " minutes";
    document.getElementById("trucks-needed-result").textContent = trucksNeeded;
  });
