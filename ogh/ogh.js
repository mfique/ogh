document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    submitLoginForm();
});
function submitLoginForm() {
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                window.location.href = 'display.html';
            } else {
                console.error('Error:', xhr.status);
                alert('Registration failed. Please try again');
            }
        }
    };
    xhr.open('POST', 'registration.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('fullname=' + fullname + '&email=' + email + '&phonenumber=' + phonenumber + '&password=' + password + '&confirm_password=' + confirm_password);
}