function submitNewUserForm() {
  // creates new object out of form data to submit in fetch request body
  const formDataObj = {};
  new FormData(document.forms["new-user-form"]).forEach(
    (value, key) => (formDataObj[key] = value)
  );
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => response.json())
    .then((result) => {
      let message;
      if (result.content.usernameExists && !result.content.emailExists) {
        message = "This username is already being used.";
      } else if (!result.content.usernameExists && result.content.emailExists) {
        message = "This email is already being used.";
      } else {
        message = "Other users are already using this username and email.";
      }

      if (document.querySelector("div#sign-up-error-div"))
        document.querySelector("div#sign-up-error-div").remove();
      const signUpErrorDivEl = Object.assign(document.createElement("div"), {
        id: "sign-up-error-div",
      });
      signUpErrorDivEl.append(
        Object.assign(document.createElement("p"), {
          textContent: message,
        })
      );
      signUpErrorDivEl.append(
        Object.assign(document.createElement("p"), {
          textContent: "Emails and usernames must be unique.",
        })
      );
      document.querySelector("#new-user-form-div").append(signUpErrorDivEl);
    });
}
