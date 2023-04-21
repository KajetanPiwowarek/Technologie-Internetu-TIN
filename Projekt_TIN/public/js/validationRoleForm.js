function validateForm() {
  const actorNameInput = document.getElementById('actorName');
  const filmNameInput = document.getElementById('filmName');
  const roleNameInput = document.getElementById('roleName');
  const roleAgeInput = document.getElementById('roleAge');

  const errorActorName = document.getElementById('errorActorName');
  const errorFilmName = document.getElementById('errorFilmName');
  const errorRoleName = document.getElementById('errorRoleName');
  const errorRoleAge = document.getElementById('errorRoleAge');

  resetErrors([actorNameInput,filmNameInput,roleNameInput,roleAgeInput], [errorActorName,errorFilmName,errorRoleName,errorRoleAge], errorsSummary);

  let valid = true;

  if(!checkRequired(actorNameInput.value)) {
    valid = false;
    actorNameInput.classList.add("error-input");
    errorActorName.innerText = "Pole jest wymagane";
  }

  if(!checkRequired(filmNameInput.value)) {
    valid = false;
    filmNameInput.classList.add("error-input");
    errorFilmName.innerText = "Pole jest wymagane";
  }

  if(!checkRequired(roleNameInput.value)) {
    valid = false;
    roleNameInput.classList.add("error-input");
    errorRoleName.innerText = "Pole jest wymagane";
  }else if(!checkTextLengthRange(roleNameInput.value, 2, 30)) {
    valid = false;
    roleNameInput.classList.add("error-input");
    errorRoleName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
  }
  if(roleAgeInput.value != "") {
    if(!checkNumber(roleAgeInput.value)) {
      valid = false;
      roleAgeInput.classList.add("error-input");
      errorRoleAge.innerText = "Pole powinno być liczbą";
    }else if(!checkNumberRange(roleAgeInput.value, 1, 1000)) {
      valid = false;
      roleAgeInput.classList.add("error-input");
      errorRoleAge.innerText = "Pole powinno być liczbą w zakresie od 1 do 200";
    }
  }

  if(!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
  }

  return valid;
}