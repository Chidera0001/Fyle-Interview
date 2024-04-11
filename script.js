$(document).ready(function () {
  $("#taxForm").submit(function (event) {
    event.preventDefault();
    calculateTax(); // Ensure that calculateTax() is called when the form is submitted
  });

  $(".error-icon").click(function () {
    $(this).tooltip("dispose");
  });

  $(".close").click(function () {
    $("#resultModal").hide();
  });
});

function calculateTax() {
  const grossIncome = parseFloat($("#grossIncome").val());
  const extraIncome = parseFloat($("#extraIncome").val());
  const ageGroup = $("#age").val();
  const deductions = parseFloat($("#deductions").val());

  const totalIncome = grossIncome + extraIncome - deductions;
  let tax = 0;

  if (totalIncome > 800000) {
    if (ageGroup === "<40") {
      tax = 0.3 * (totalIncome - 800000);
    } else if (ageGroup === "≥ 40 < 60") {
      tax = 0.4 * (totalIncome - 800000);
    } else if (ageGroup === "≥ 60") {
      tax = 0.1 * (totalIncome - 800000);
    }
  }

  const netIncome = totalIncome - tax; // Subtract tax from total income to calculate net income

  displayTaxResult(netIncome); // Pass the netIncome value to the displayTaxResult function
}

function displayTaxResult(netIncome) {
  const tax = netIncome > 800000 ? netIncome - 800000 : 0; // Tax applies only to income exceeding 8 Lakhs

  // Display tax amount (assuming you have an element with ID "taxDisplay")
  $("#taxDisplay").text("Your tax will be " + tax.toFixed(2) + " Lakhs");

  // Display net income (assuming you have an element with ID "netIncomeDisplay")
  $("#netIncomeDisplay").text(netIncome.toFixed(2));
  $("#resultModal").show();
}
