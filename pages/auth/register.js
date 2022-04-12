function register() {

    let username = $(`#username`).val();
    let password = $(`#password`).val();
    let confirmPassword = $(`#confirm-password`).val();
    let fullName = $(`#fullName`).val();
    let email = $(`#email`).val();
    let phoneNumber = $(`#phoneNumber`).val();
    let dateOfBirth = $(`#dateOfBirth`).val();
    let address = $(`#address`).val();

    let user = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        fullName : fullName,
        email : email,
        phoneNumber : phoneNumber,
        dateOfBirth : dateOfBirth,
        address : address
    };
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/register`,
        data : JSON.stringify(user),
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        success : function () {
            showSuccessMessage('Đăng ký thành công!')
            $(`#registerForm`).resetForm();
        },
        error : function () {
            showErrorMessage('Đăng ký thất bại!')
        }


    })
}