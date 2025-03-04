document
  .getElementById("calculator-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get inputs
    const initialInvestment = parseFloat(
      document.getElementById("initial-investment").value
    );
    const projectLifetime = parseInt(
      document.getElementById("project-lifetime").value
    );
    const discountRate =
      parseFloat(document.getElementById("discount-rate").value) / 100; // Convert to decimal
    const cashFlows = document
      .getElementById("cash-flows")
      .value.split(",")
      .map(Number);

    // Validate inputs
    if (cashFlows.length !== projectLifetime) {
      alert("The number of cash flows must match the project lifetime!");
      return;
    }

    // NPV Calculation
    let npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }

    // IRR Calculation (using approximation)
    let irr = 0.1; // Start with an initial guess
    const maxIterations = 1000;
    const tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
      let npvAtIRR = -initialInvestment;
      for (let j = 0; j < cashFlows.length; j++) {
        npvAtIRR += cashFlows[j] / Math.pow(1 + irr, j + 1);
      }

      if (Math.abs(npvAtIRR) < tolerance) break;
      irr += 0.0001; // Increment guess
    }

    // Payback Period Calculation
    let cumulativeCashFlow = -initialInvestment;
    let paybackPeriod = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];
      if (cumulativeCashFlow >= 0) {
        paybackPeriod = i + 1;
        break;
      }
    }

    // Profitability Index
    const profitabilityIndex = npv / initialInvestment;

    // Display results
    document.getElementById("results").style.display = "block";
    document.getElementById("npv-result").textContent = `$${npv.toFixed(2)}`;
    document.getElementById("irr-result").textContent = `${(irr * 100).toFixed(
      2
    )}%`;
    document.getElementById(
      "payback-period-result"
    ).textContent = `${paybackPeriod} years`;
    document.getElementById("pi-result").textContent =
      profitabilityIndex.toFixed(2);
  });
