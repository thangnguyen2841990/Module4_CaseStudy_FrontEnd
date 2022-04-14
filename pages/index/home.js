let currentUser = JSON.parse(localStorage.getItem("currentUser"));

$(document).ready(function () {
    if (currentUser == null) {
        location.href = '/module4-casestudy-frontend/pages/auth/login.html';
    }
});

function logOut() {
    window.localStorage.clear();
    location.href = '/module4-casestudy-frontend/pages/auth/login.html';
}

function createNewPost() {
    let content = $(`#content-post`).val();
    let status = $(`#status`).val();
    let image = $(`#image`);
    let postUserForm = new FormData();
    postUserForm.append("content", content);
    postUserForm.append("status", status);
    postUserForm.append("image", image.prop('files'));
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/createPost/${current.id}`,
        data: postUserForm,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function () {
            showSuccessMessage('Đăng bài thành công!')
        },
        error: function () {
            showErrorMessage('Đăng bài không thành công!')
        }
    })
}

function displayPost() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/posts',
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {

                content += `<div class="friend-info">
                                                <figure>
                                                    <img src="images/resources/friend-avatar10.jpg" alt="">
                                                </figure>
                                                <div class="friend-name">
                                                    <ins><a href="time-line.html" title="">${data[i].userInfo.fullName}</a></ins>
                                                    <span>${data[i].dateCreated}</span>
                                                </div>
  <div class="container-fluid">
   
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ...
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Chỉnh sửa bài viết</a></li>
            <li><a class="dropdown-item" href="#">Xóa bài viết</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

                                                 <div class="description">

                                                        <p id="description">
                                                                ${data[i].content}
                                                        </p>
                                                    </div>
                                                <div class="post-meta">
                                                <div class="grid-image">`;
                for (let image of data[i].listImage) {
                    content += `<img src="http://localhost:8080/image/${image}" alt="">`
                }


                content += `</div><div class="we-video-info">
                                                        <ul>
                                                            <li>
                                                <span class="views" data-toggle="tooltip" title="views">
                                                <i class="fa fa-eye"></i>
                                                 <ins>1.2k</ins>
                                                    </span>
                                                            </li>
                                                            <li>
                                                <span class="comment" data-toggle="tooltip"
                                                                  title="Comments">
                                                    <i class="fa fa-comments-o"></i>
                                                <ins>52</ins>
                                                </span>
                                                            </li>
                                                            <li>
                                                    <span class="like" data-toggle="tooltip" title="like">
                                                    <i class="ti-heart"></i>
                                                    <ins>2.2k</ins>
                                                </span>
                                                            </li>
                                                            <li>
                                                <span class="dislike" data-toggle="tooltip" title="dislike">
                                            <i class="ti-heart-broken"></i>
                                        <ins>200</ins>
                                            </span>
                                                            </li>
                                                            <li class="social-media">
                                                                <div class="menu">
                                                                    <div class="btn trigger"><i
                                                                            class="fa fa-share-alt"></i></div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-html5"></i></a></div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-facebook"></i></a></div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-google-plus"></i></a></div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-twitter"></i></a></div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-css3"></i></a></div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-instagram"></i></a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-dribbble"></i></a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="rotater">
                                                                        <div class="btn btn-icon"><a href="#"
                                                                                                     title=""><i
                                                                                class="fa fa-pinterest"></i></a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </li>
                                                        </ul>   
                                                    </div>
                                                  
                                                </div>
                                            </div>`
            }
            $(`#post_User`).html(content);
        }

    })
}

displayPost();