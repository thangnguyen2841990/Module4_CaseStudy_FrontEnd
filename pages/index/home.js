// $(document).ready(function () {
//     if (currentUser == null) {
//         location.href = '/module4-casestudy-frontend/pages/auth/login.html';
//     }
// });

// function logOut() {
//     window.localStorage.clear();
//     location.href = '/module4-casestudy-frontend/pages/auth/login.html';
// }

function createNewPost() {
    let content = $(`#content-post`).val();
    let status = $(`#status`).val();
    let image = $(`#image`)[0].files;
    let postUserForm = new FormData();
    postUserForm.append("content", content);
    postUserForm.append("status", status);
    jQuery.each(image, function (i, file) {
        postUserForm.append('image[]', file);
    })
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/posts/${currentUser.id}`,
        data: postUserForm,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function () {
            location.href='about.html'
        },
        error: function () {
        }
    })
}


function displayImage(image) {
    let image1 = `<img src="http://localhost:8080/image/${image}">`
    $(`#imagePostDetails`).html(image1);
}

function displayPost() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/posts',
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
showTotalLikes(data.postUserId)
                content += `<div class="friend-info">
                                                <figure>
                                                    <img src="images/resources/friend-avatar10.jpg" alt="">
                                                </figure>
                                                
                                                <div class="friend-name">
                                                    <ins><a href="time-line.html" title="">${data[i].userInfo.fullName}</a></ins>
                                                
                                                    <span>${data[i].dateCreated}</span>
                                                   <button class="btn btn-warning" style="float: right"data-bs-toggle="modal" data-bs-target="#edit-post" onclick="showEditPost(${data[i].postUserId})">Sửa</button>
                                                   <button class="btn btn-danger" style="float: right"  data-bs-toggle="modal" data-bs-target="#deletePost" onclick="showDeletePost(${data[i].postUserId})"><i class="fa-solid fa-trash-check"></i></button>
                                                



                                                </div>


                                                 <div class="description">

                                                        <p id="description">
                                                                ${data[i].content}
                                                        </p>
                                                    </div>
                                                <div class="post-meta">
                                                <div class="grid-image">`;
                let image = data[i].listImage
                for (let j = 0; j < image.length; j++) {
                    content += `<a data-bs-toggle="modal" onclick="displayImage(${image[j].id})" data-bs-target="#postImage"><img src="http://localhost:8080/image/${image[j].image}"></a>`
                }


                content += `</div><div class="we-video-info">
                                                        <ul>
                                                    
                                                   
                                                            <li>
                                                    <span class="like" data-toggle="tooltip" title="Lượt thích">
                                                    <a onclick="likePost(${data[i].postUserId})"><i class="ti-heart"></i></a>
                                                    <ins>${data[i].totalLike}</ins>
                                                </span>
                                                            </li>
                                                    
                                                                <li>
                                                <span class="comment" data-toggle="tooltip"
                                                                  title="Bình luận">
                                                    <i class="fa fa-comments-o"></i>
                                                <ins>52</ins>
                                                </span>
                                                            </li>
                                               
                                                        </ul>   
                                                    </div>
                                                  
                                                </div>
                                            </div> <hr>`
            }
            $(`#post_User`).html(content);
        }

    })
}
function showEditPost(id) {
    let footer =   `
                    <button class="btn btn-warning" onclick="editPost(${id})" type="button">Cập nhật</button>`;
    $(`#edit-post-button`).html(footer);
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/posts/${currentUser.id}/${id}`,
        success :  function (data) {

            $(`#content-post`).val(data.content);
            let imagePosts='';
            for (let i = 0; i < data.listImage.length; i++) {
                imagePosts += `<img src="http://localhost:8080/image/${data.listImage[i]}"/>`
            }
            $(`#image-post`).html(imagePosts);
        }
    })
}
function showDeletePost(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deletePost(${id})" data-dismiss="modal"  type="button">Xóa</button>`;
    $(`#deleteButton`).html(content);
}

function deletePost(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/posts/${id}`,
        success: function () {
            // showSuccessMessage('Xóa thành công!');
            location.href = 'about.html'
        }
    });
}

function displayImage(id) {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/images/${id}`,
        success : function (data) {
            let image = '';
            image = `<img src="http://localhost:8080/image/${data}" width="400" height="400"/>`
            $(`#imagePostDetails`).html(image);
        }
    })

}

function likePost(id) {
    $.ajax({
        type : 'POST',
        url : `http://localhost:8080/likePosts/${currentUser.id}/${id}`,
        success :  function () {

        }
    })
}
function showTotalLikes(id) {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/likePosts/${id}`,
        success : function (data) {
                let content = '';
                content = `<p>${data}</p>`
            $(`#totalLikes`).html(content)
        }
    })
}

displayPost();
