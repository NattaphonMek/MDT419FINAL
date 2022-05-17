basePath = "http://localhost:3000"

function logout() {
    localStorage.clear()
    location.replace('login.html')
}

function ToMyProfile() {
    location.replace('Profile.html')
}

function ToIndexpage() {
    location.replace('index.html')
}

function likePost(id, liked) {
    fetch(basePath + "/post?" + new URLSearchParams({
            liked: liked,
            post_id: id
        }), {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data)
                if (!data.success) {
                    alert('Like error')
                } else {
                    location.reload()
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function deletePost(id) {
    const confirmed = confirm("Do you want to delete this post?")
    if (confirmed) {
        fetch(basePath + "/post?" + new URLSearchParams({
                post_id: id
            }), {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(data => {
                    console.log(data)
                    if (!data.success) {
                        alert('Delete error')
                    } else {
                        location.reload()
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

function getPost() {
    fetch(basePath + "/post?" + new URLSearchParams({
            user_id: user.id
        }), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json().then(data => {
                console.log(data)
                if (!data.success) {
                    alert('Get posts error')
                } else {
                    let posts = ''
                    for (let i = 0; i < data.data.length; i++) {
                        posts += `<div class="post-container">
                        <div class="post-row">
        
                            <div class="user-profile">
                                <img src="images/profile-pic.png">
                                <div>
                                    <p>${user.firstname + ' ' + user.lastname}</p>
                                    
                                    <span>${new Date(data.data[i].created_at)}</span>
                                </div>
                            </div>
                            <a href="#" onclick="deletePost(${data.data[i].id})">x</a>
                        </div>
                        <p class="post-text"><span>${data.data[i].content}</span></p>
                        <div class="post-row">
                            <div class="activity-icons">
                                <div><img style="cursor: pointer;" src="${data.data[i].liked ? "images/like-blue.png" : "images/like.png"}" onclick="likePost(${data.data[i].id},${data.data[i].liked ? 0 : 1})"> ${data.data[i].liked ? 1 : 0} </div>
                            </div>
        
                            <div class="post-profile-icon">
                                <img src="images/profile-pic.png">
                            </div>
                        </div>
        
                    </div>`

                        document.getElementById("all-post").innerHTML = posts
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function submitPost() {
    let content = document.getElementById('content').value;
    if (content.trim() == '') alert("Post can't be empty")
    else {
        fetch(basePath + "/post", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content,
                    liked: 0,
                    user_id: user.id
                })
            }).then(response => {
                response.json().then(data => {
                    console.log(data)
                    if (!data.success) {
                        alert('Post error')
                    } else {
                        location.reload()
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

}
//content.addEventListener('click', submitPost);

function settingsMenuToggle() {
    var settingsmenu = document.querySelector(".settings-menu");
    settingsmenu.classList.toggle("settings-menu-height");
}