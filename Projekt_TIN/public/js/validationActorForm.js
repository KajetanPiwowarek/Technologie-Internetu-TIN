function validateForm() {
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const birthDateInput = document.getElementById('birthDate');
  const emailInput = document.getElementById('email');
  const phoneNumberInput = document.getElementById('phoneNumber');

  const errorFirstName = document.getElementById('errorFirstName');
  const errorLastName = document.getElementById('errorLastName');
  const errorBirthDate = document.getElementById('errorBirthDate');
  const errorEmail = document.getElementById('errorEmail');
  const errorPhoneNumber = document.getElementById('errorPhoneNumber');

  resetErrors([firstNameInput,lastNameInput,birthDateInput,emailInput,phoneNumberInput], [errorFirstName,errorLastName,errorBirthDate,errorEmail,errorPhoneNumber], errorsSummary);

  let valid = true;

  if(!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
  }else if(!checkTextLengthRange(firstNameInput.value, 2, 30)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
  }

  if(!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole jest wymagane";
  }else if(!checkTextLengthRange(lastNameInput.value, 2, 30)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
  }
  
  /*
  let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = '' + nowDate.getFullYear();

  if(month.length < 2) {
    month = '0' + month;
  }
  if(day.length < 2) {
    day = '0' + day;
  }
  const nowString = [year, month, day].join('-');
  */

  if(!checkRequired(birthDateInput.value)) {
    valid = false;
    birthDateInput.classList.add("error-input");
    errorBirthDate.innerText = "Pole jest wymagane";
  }

  if(!checkRequired(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole jest wymagane";
  }else if(!checkTextLengthRange(emailInput.value, 2, 60)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole powinno zawierać od 2 do 60 znaków";
  }else if(!checkEmail(emailInput.value)) {
    valid = false;
    emailInput.classList.add("error-input");
    errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
  }

  if(phoneNumberInput.value != "") {
    if(!checkPhoneNumber(phoneNumberInput.value)) {
      valid = false;
      phoneNumberInput.classList.add("error-input");
      errorPhoneNumber.innerText = "Pole powinno zawierać numer telefonu w formacie xxx-xxx-xxx";
    }
  }

  if(!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
  }

  return valid;
}