// let currentUser = localStorage.getItem('currentUser');
// currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
let userId = currentUser.id;

function getAllGroups() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/groups',
        success: function (data) {
            let groups = data.content;
            let content = '';
            for (let i = 0; i < groups.length; i++) {
                content += ` <tr>
      <td>${i + 1}</td>
      <td>${groups[i].name}</td>
      <td>${groups[i].avatar}</td>
      <td>${groups[i].background}</td>
      <td><button class ="btn btn-primary" onclick="showEditCategoryForm(${groups[i].id})" data-target="#create-group" data-toggle="modal"  >sửa</button></td>
      <td><button class ="btn btn-danger" onclick="showDeleteGroup(${groups[i].id})" data-target="#delete-group" data-toggle="modal"  >xóa</button></td>
    </tr>`;
            }
            $('#group-list-content').html(content);
        }
    })
}

function createNewGroup() {
    let name = $(`#name-group`).val();
    let newGroup = {
        name: name
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/groups/${userId}`,
        data: JSON.stringify(newGroup),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllGroups();
            showSuccessMessage1('Thêm nhóm thành công!');
        },
        error: function () {
            showErrorMessage1('Thêm không thành công');
        }

    })
}

function showEditCategoryForm(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/groups/${id}`,
        success: function (data) {
            $(`#name-group`).val(data.name)
            index = data.id
            document.getElementById("submit-create-edit-group").onclick = function () {
                editGroup();
            }
        }
    })
}

function editGroup() {
    let name = $(`#name-group`).val();
    let newGroup = {
        name: name
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/groups/${index}`,
        data: JSON.stringify(newGroup),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            getAllGroups();
            showSuccessMessage1('Cập nhật thông tin thành công!');
        },
        error: function () {
            showErrorMessage1('Cập nhật thông tin không thành công!');
        }

    })
}



function showDeleteGroup(id) {
    let content1 = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteGroup(${id})" data-dismiss="modal"  type="button">Xóa</button>`;
    document.getElementById("footer-deleteGroup").innerHTML = content1;
}

function deleteGroup(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/groups/${id}`,
        success: function () {
            getAllGroups();
            showSuccessMessage1('Xóa thành công!');
        },
        error: function () {
            showErrorMessage1('Xóa lỗi');
        }
    });
}


function showSuccessMessage1(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    });
}

function showErrorMessage1(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}

$(document).ready(function () {
    getAllGroups();
})
