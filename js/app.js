let postTitle = document.getElementById('post-title')
let postBody = document.getElementById('post-body')
let postForm = document.getElementById('post-form')
let userPost = [];

postForm.addEventListener('submit', createPost)

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        userPost = data;
        let postLayout = document.getElementById("post-layout");
        let html = "";
        userPost.forEach(element => {
            html += `
                <div class="col-md-4 mb-2">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-end text-danger">
                                <h6>${element.id}</h6>
                            </div>
                            <h4 class="post-title mb-4">${element.title}</h4>
                            <p class="post-body">${element.body}</p>
                            <div class="d-flex justify-content-end mt-4">
                                <button class="btn btn-success" onclick="displayPost(${element.id})">View Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            postLayout.innerHTML = html
        });
    });
}

getPosts(); 

function createPost(e) {
    e.preventDefault();
    let pTitle = postTitle.value;
    let pBody = postBody.value;
    // console.log('post title', pTitle)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: pTitle,
            body: pBody,
            userId: 7
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('post', data)
        alert('Post creation successful!')
        userPost.push(data)
        let postLayout = document.getElementById("post-layout");
        let html = "";
        userPost.forEach(element => {
            html += `
                <div class="col-md-4 mb-2">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-end text-danger">
                                <h6>${element.id}</h6>
                            </div>
                            <h4 class="post-title mb-4">${element.title}</h4>
                            <p class="post-body">${element.body}</p>
                        </div>
                    </div>
                </div>
            `
            postLayout.innerHTML = html
        });
    });  

}

function displayPost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let singlePost = document.getElementById("post-layout");
        let html = "";
            html += `
                <div class="mt-3 mb-5 w-75">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-end text-danger">
                                <h6>${data.id}</h6>
                            </div>
                            <h4 class="post-title mb-4">${data.title}</h4>
                            <p class="post-body">${data.body}</p>
                            <div class="d-flex justify-content-end mt-4">
                                <button class="btn btn-primary" onclick="getPosts()">Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            singlePost.innerHTML = html
    });
}