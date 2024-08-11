// Code to collect data from signup page

let signupName = document.getElementById('name').value
let signupEmail = document.getElementById('email').value
let signupPassword = document.getElementById('password').value


document.querySelectorAll('.input_fields').forEach((item) => {
    item.addEventListener('input', () => {

        return signupName = document.getElementById('name').value,
            signupEmail = document.getElementById('email').value,
            signupPassword = document.getElementById('password').value
    })
})

document.getElementById('submit').addEventListener('click', async () => {
    if (signupName.length >= 3 && signupEmail.length >= 9 && signupPassword.length >= 8) {
        await fetch('/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: signupName, email: signupEmail, password: signupPassword })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.response)
                if (data.response === "email already exists") {
                    alert("This email is already exists")
                } else {
                    alert("you have ragistered")
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                    document.getElementById('password').value = ''
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

})