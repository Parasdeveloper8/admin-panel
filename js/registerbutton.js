document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("button");
    const password = document.getElementById("password");
    const confirmpassword = document.getElementById("confirmpass");

    const check = () => {
        if (password.value === confirmpassword.value) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
            btn.title = "Enter correct password to go ahead";
        }
    };

    password.addEventListener('input', check);
    confirmpassword.addEventListener('input', check);
});
