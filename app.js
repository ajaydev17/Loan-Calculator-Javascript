// Listen for form submit

document.getElementById("loan-form").addEventListener("submit", (event) => {
    document.getElementById("results").style.display = "none";

    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    event.preventDefault();
});

const calculateResults = () => {
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const year = document.getElementById("years");

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const enteredAmount = parseFloat(amount.value);
    const enterdInterest = parseFloat(interest.value) / 100 / 12;
    const enterdYear = parseFloat(year.value) * 12;

    const x = Math.pow(1 + enterdInterest, enterdYear);

    const monthly = (enteredAmount * x * enterdInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * enterdYear).toFixed(2);
        totalInterest.value = (monthly * enterdYear - enteredAmount).toFixed(2);

        document.getElementById("results").style.display = "block";

        document.getElementById("loading").style.display = "none";
    } else {
        showError("Please Check the inputs!!!");
    }
};

const showError = (errorMessage) => {
    document.getElementById("results").style.display = "none";

    document.getElementById("loading").style.display = "none";

    const errorDiv = document.createElement("div");

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(errorMessage));

    card.insertBefore(errorDiv, heading);

    setTimeout(() => {
        document.querySelector(".alert").remove();
    }, 3000);
};
