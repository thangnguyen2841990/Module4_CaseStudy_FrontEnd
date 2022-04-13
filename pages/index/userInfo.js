let currentUser = JSON.parse(localStorage.getItem("currentUser")) ;
function showAllUserInfo() {
    $.ajax({
        type : 'GET',
        url : 'http://localhost:8080/userInfo/',
        // headers : {
        //     "Authorization" : 'Bearer ' + currentUser.token
        // },
        success : function (data) {
            let array = data.content;
            let content = '';
            let content1 = '';
            for (let i = 0; i < array.length; i++) {
                if (currentUser.id != array[i].user.id) {
                content += `<li>
                                      <div class="nearly-pepls">
                                                <figure>
                                                    <a href="time-line.html" title=""><img src="http://localhost:8080/image/${array[i].avatar}"></a>
                                                </figure>
                                                <div class="pepl-info">
                                                    <h4><a href="time-line.html" title="">${array[i].fullName}</a></h4>
                                            
                                                   <a href="#" title="" class="add-butn" data-ripple="">Kết bạn</a>
                                                </div>
                                            </div>
                                        </li> <br>`
                    content1 += `  <li>
                                                <figure><img src="http://localhost:8080/image/${array[i].avatar}" width=45px height=45px style="vertical-align: middle; border-radius: 50%"></figure>
                                                <div class="friend-meta">
                                                    <h4><a href="time-line.html" title="">${array[i].fullName}</a></h4>
                                                    <a href="#" title="" class="underline">Kết bạn</a>
                                                </div>
                                            </li>`

            }
            }
            $(`#listUser`).html(content);
            $(`#listfriends`).html(content1);
        },
    })
}
function showUserDetails() {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/userInfo/${currentUser.id}`,
        success : function (data) {
            let fullName = `<p>${data.fullName}</p>`
            let avartar = ` <img src="http://localhost:8080/image/${data.avatar}"  width=100 height=100 style="vertical-align: middle; border-radius: 50%" >`
            let avartar1 = ` <img src="http://localhost:8080/image/${data.avatar}" width=1500 height=1500 style="vertical-align: middle; border-radius: 50%">`
            let avartar2 = ` <img src="http://localhost:8080/image/${data.avatar}" width=45px height=45px style="vertical-align: middle; border-radius: 50%" >`
            let background = ` <img src="http://localhost:8080/image/${data.backGround}" width=350 height=1000 >`
            let background2 = ` <img src="http://localhost:8080/image/${data.backGround}" width=1500 height=1500 >`
            $(`#showUsername`).html(fullName);
            $(`#avatar`).html(avartar);
            $(`#avatar-gr1`).html(avartar);
            $(`#avatar-gr2`).html(avartar);
            $(`#avatar-gr3`).html(avartar);
            $(`#avatar-gr4`).html(avartar2);
            $(`#avatar-gr5`).html(avartar);
            $(`#avatar-gr7`).html(avartar1);
            $(`#avatar-gr8`).html(avartar2);
            $(`#avatar-gr10`).html(avartar1);
            $(`#background-gr1`).html(background);
            $(`#background-gr2`).html(background2);
        }
    })
}

function getAvatar() {
    let image = $(`#avt-gr7`);
    let avtForm = new FormData();
    avtForm.append('avatar',image.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/userInfo/avt/${currentUser.id}`,
        data: avtForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            location.href = 'about.html'
        }
    })
}

function getBackground() {
    let image = $(`#avt-gr8`);
    let avtForm = new FormData();
    avtForm.append('background',image.prop('files')[0]);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/userInfo/bgr/${currentUser.id}`,
        data: avtForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function () {
            location.href = 'about.html'
        }
    })
}

function showAvt() {
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/userInfo/${currentUser.id}`,
        success : function (data) {
            location.href = `http://localhost:8080/image/${data.avatar}`
        }

    })
}
$(document).ready(function () {
    if (currentUser != null) {
        showUserDetails()
        showAllUserInfo();
    } else {
        location.href = '/module4-casestudy-frontend/pages/auth/login.html'
    }
})

