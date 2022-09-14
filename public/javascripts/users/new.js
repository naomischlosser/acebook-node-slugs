function submitNewUserForm() {
  const firstNameInputValue = document.querySelector("#first-name").value;
  const lastNameInputValue = document.querySelector("#last-name").value;
  const usernameInputValue = document.querySelector("#last-name").value;
  const emailInputValue = document.querySelector("#email").value;
  const passwordInputValue = document.querySelector("#password").value;

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstNameInputValue,
      last_name: lastNameInputValue,
      username: usernameInputValue,
      email: emailInputValue,
      password: passwordInputValue,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.content) {
        let message;
        if (result.content.usernameExists && !result.content.emailExists) {
          message = "This username is already being used.";
        } else if (
          !result.content.usernameExists &&
          result.content.emailExists
        ) {
          message = "This email is already being used.";
        } else {
          message = "Other users are already using this username and email.";
        }
        document.querySelector("#new-user-form-div").append(
          Object.assign(document.createElement("p"), {
            className: "sign-up-error",
            textContent: `${message}<br>Emails and usernames must be unique.`,
          })
        );
      }
    });
}
