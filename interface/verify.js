const signupBtn = document.querySelector('.sign--up')
console.log(signupBtn);
const passFields = document.querySelectorAll('input[type="password"]')
console.log(passFields);
passFields.forEach(element => {
    element.addEventListener("input", () => {
        if (passFields[0].value === passFields[1].value) {
            passFields.forEach(element => {
                element.classList = "w-full px-6 py-3 mb-2 border border-slate-600 rounded-3xl font-medium"
                signupBtn.classList.remove('disabled')
                signupBtn.classList.remove('cursor-not-allowed')
                signupBtn.classList.add('cursor-pointer')
                signupBtn.disabled = false;
            })
        } else {
            passFields.forEach(element => {
                element.classList = "w-full px-6 py-3 mb-2 rounded-3xl font-mediumborder-solid border-2 border-red-700"
                signupBtn.disabled = true;
            })
        }
    })})