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
  var grossIncome = parseFloat($("#grossIncome").val());
  var extraIncome = parseFloat($("#extraIncome").val());
  var ageGroup = $("#age").val();
  var deductions = parseFloat($("#deductions").val());

  var totalIncome = grossIncome + extraIncome - deductions;
  var tax = 0;

  if (totalIncome > 800000) {
    if (ageGroup === "<40") {
      tax = 0.3 * (totalIncome - 800000);
    } else if (ageGroup === "≥ 40 &lt; 60") {
      tax = 0.4 * (totalIncome - 800000);
    } else if (ageGroup === "≥ 60") {
      tax = 0.1 * (totalIncome - 800000);
    }
  }

  var netIncome = totalIncome - tax; // Subtract tax from total income to calculate net income

  displayTaxResult(netIncome); // Pass the netIncome value to the displayTaxResult function
}

function displayTaxResult(netIncome) {
  $("#netIncomeDisplay").text(
    "Your overall income will be " +
      netIncome.toFixed(2) +
      " Lakhs after tax deductions"
  );
  $("#resultModal").show();
}
