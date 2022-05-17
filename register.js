let RegisButton = document.getElementById('Regis');
let ResetButton = document.getElementById('Reset');
let BackBtn = document.querySelector(".back-button");
const basePath = "http://localhost:3000"

const RegisFunction = async() => {
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let birthday = document.getElementById('birthday').value;
    let email = document.getElementById('email').value;
    let username = document.querySelector('#username').value;
    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;

    if (firstname == '') {
        alert("กรอก Firstname")
    } else if (lastname == '') {
        alert("กรอก lastname")
    } else if (birthday == '') {
        alert("กรอก Birthday")
    } else if (email == '') {
        alert("กรอก email")
    } else if (username == '') {
        alert("กรอก Username")
    } else if (password == '') {
        alert("กรอก Password")
    } else if (repassword == '') {
        alert("กรอก Repassword")
    } else if (password != repassword) {
        alert("Password กับ Repassword ไม่ตรงกัน")
    } else {
        fetch(basePath + "/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    birthday: birthday,
                    email: email,
                    username: username,
                    password: password
                })
            }).then(response => {
                response.json().then(data => {
                    console.log(data)
                    if (!data.success) {
                        if (data.data.sqlMessage.includes('user.email')) alert('Email ซ้ำ')
                        else if (data.data.sqlMessage.includes('user.username')) alert('Username ซ้ำ')
                        else alert('สมัครสมาชิกไม่สำเร็จ')
                    } else {
                        alert("สมัครสมาชิกสำเร็จ")
                        location.href = 'login.html'
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    //localStorage.setItem("username", username)
    //localStorage.setItem("password", password)
}

//RegisButton.addEventListener('click', RegisFunction);

const ResetFunction = () => {
        document.querySelector('#firstname').value = ''
        document.querySelector('#lastname').value = ''
        document.getElementById('birthday').value = ''
        document.getElementById('email').value = ''
        document.querySelector('#username').value = ''
        document.getElementById('password').value = ''
        document.getElementById('repassword').value = ''
    }
    //ResetButton.addEventListener('click', ResetFunction);

const BackFunc = () => {
        location.href = 'login.html';
    }
    //BackBtn.addEventListener('click', BackFunc);