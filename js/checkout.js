// Exercise 6

function validate() {
  const form = document.querySelector(".needs-validation");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateField("fName", "errorName", 3);
    validateField("fEmail", "errorEmail", 3, "@");
    validateField("fAddress", "errorAddress", 3);
    validateField("fLastN", "errorLastN", 3);
    validateField("fPassword", "errorPassword", 4, null, 8);
    validatePhone("fPhone", "errorPhone");

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      alert("Compra realizada correctamente");
      window.location.href = "index.html";
    }
    form.classList.add("was-validated");
  });
}

function validateField(
  inputId,
  errorId,
  minLength,
  extraCheck = null,
  maxLenght
) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  // Check if the input meets length and extra criteria
  if (
    input.value.trim().length < minLength ||
    (extraCheck &&
      !input.value.includes(extraCheck) &&
      (!input || input.value.trim().length > maxLenght))
  ) {
    input.classList.add("is-invalid");
    error.style.display = "block";
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    error.style.display = "none";
  }
}

function validatePhone(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  // Check if the phone number is exactly 9 digits
  if (!/^\d{9}$/.test(input.value)) {
    input.classList.add("is-invalid");
    error.style.display = "block";
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    error.style.display = "none";
  }
}
