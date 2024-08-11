document.querySelectorAll(".input_fields").forEach((item) => {
    item.addEventListener("input", () => {

        return email = document.getElementById('email').value,
            password = document.getElementById('password').value

    })
})
document.getElementById('go_to_dashboard').addEventListener("click", async () => {
    if (email.length > 8 && password.length > 8) {
        await fetch('/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redirect to the response URL
            } else {
                return response.text();
            }
        })
            .then(data => {
                console.log("response ", data)
                document.getElementById('email').value = ''
                document.getElementById('password').value = ''
            })
            .catch(err => console.error('Error', err))
    }
})


