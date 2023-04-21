function validateForm() {
  const filmNameInput = document.getElementById('filmName');
  const boxOfficeInput = document.getElementById('boxOffice');
  const releaseDateInput = document.getElementById('releaseDate');

  const errorFilmName = document.getElementById('errorFilmName');
  const errorBoxOffice = document.getElementById('errorBoxOffice');
  const errorReleaseDate = document.getElementById('errorReleaseDate');

  resetErrors([filmNameInput,boxOfficeInput,releaseDateInput], [errorFilmName,errorBoxOffice,errorReleaseDate], errorsSummary);

  let valid = true;

  if(!checkRequired(filmNameInput.value)) {
    valid = false;
    filmNameInput.classList.add("error-input");
    errorFilmName.innerText = "Pole jest wymagane";
  }else if(!checkTextLengthRange(filmNameInput.value, 2, 30)) {
    valid = false;
    filmNameInput.classList.add("error-input");
    errorFilmName.innerText = "Pole powinno zawierać od 2 do 30 znaków";
  }

  if(boxOfficeInput.value != "") {
    if(!checkNumber(boxOfficeInput.value)) {
      valid = false;
      boxOfficeInput.classList.add("error-input");
      errorBoxOffice.innerText = "Pole powinno być liczbą";
    }else if(!checkNumberRange(boxOfficeInput.value, 1, 1_000_000_000)) {
      valid = false;
      boxOfficeInput.classList.add("error-input");
      errorBoxOffice.innerText = "Pole powinno być liczbą w zakresie od 1 do 1 000 000 000";
    }
  }

  if(!checkRequired(releaseDateInput.value)) {
    valid = false;
    releaseDateInput.classList.add("error-input");
    errorReleaseDate.innerText = "Pole jest wymagane";
  }

  if(!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
  }

  return valid;
}