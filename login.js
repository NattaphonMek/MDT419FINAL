let LoginButton = document.getElementById('Login');
let RegisButton = document.getElementById('Register');
const basePath = "http://localhost:3000"

const loginFunc = () => {
        let email = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        fetch(basePath + "/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(response => {
                response.json().then(data => {

                    if (!data.success) {
                        alert('Email หรือ password ไม่ถูกต้อง')
                    } else {
                        console.log(data)
                        localStorage.setItem("user", JSON.stringify(data.data))
                            //alert("Login success")
                        location.href = 'index.html'
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })

    }
    //LoginButton.addEventListener('click', loginFunc);

const BackFunc = () => {
    location.href = 'login.html';
}

const PageRegis = () => {
        location.href = 'Register.html'
    }
    //RegisButton.addEventListener('click', PageRegis);