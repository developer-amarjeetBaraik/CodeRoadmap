const profileBtn = document.getElementById('profile')
const profileDilogBox = document.getElementById('profileDilogBox')
const logoutBtn = document.getElementById('logoutBtn')
const fetchAllCollection = document.getElementById('collectionBtn')

profileBtn.addEventListener('click', () => {
    event.stopPropagation()
    profileDilogBox.style.display = 'block'
})

window.addEventListener('click', () => {
    profileDilogBox.style.display = 'none'
})

logoutBtn.addEventListener('click', () => {
    async function delteCookie() {
        await fetch('/delete-token', {
            method: 'POST',
            credentials: "include"
        }).then(response => response.url)
            .then(data => {
                window.location.href = data
            }).catch(err => {
                console.log(err)
            })
    }
    delteCookie()
})

fetchAllCollection.addEventListener('click', () => {
    async function gettingCollection() {
        fetch('/collections', {
            method: 'GET',
            credentials: "include"
        }).then(response => response.url)
            .then(data => {
                window.location.href = data
            }).catch(err => {
                console.log(err)
            })
    }
    gettingCollection()
})