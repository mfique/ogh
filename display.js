document.addEventListener("DOMContentLoaded", () => {
  loadForm();
});
function loadForm() {
  var xhr = new XMLHttpRequest();
  document.getElementById("formList").style.display = "block";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var formList = document.getElementById("formList");
        formList.innerHTML = "";
        displayForm(JSON.parse(xhr.responseText));
      } else {
        console.error("Failed to load form.");
      }
    }
  };
  xhr.open("GET", "registration.php", true);
  xhr.send();
}
function displayForm(Form) {
  var Formlist = document.getElementById("formList");
  Formlist.innerHTML = "";
  Form.forEach(function (form) {
    var FormDiv = document.createElement("div");
    FormDiv.innerHTML = `
        <p>ID:${form.id}</p>
        <p>fullname:${form.full_name}</p>
        <p>email:${form.email}</p>
        <button onclick="editForm(${form.id})">Edit</button>
        <button onclick="deleteForm(${form.id})">Delete</button>
        <hr>
        `;
    Formlist.appendChild(FormDiv);
  });
}
function editForm(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const users = JSON.parse(xhr.responseText);

        users.forEach((user) => {
          if (user.id == id) {
            const form = document.createElement("form");
           
            form.innerHTML = `
              <label>Full name</label>
              <input type="text" id="edit-name" placeholder="Full name" value="${user.full_name}" />
              <label>Email</label>
              <input type="text" id="edit-email" placeholder="Email" value="${user.email}" />
              <label>Password</label>
              <input type="password" id="edit-password" placeholder="Password"  value="${user.password}" />
              <div>
               <button type="submit">Update</button>
              </div>
            `;

            document.getElementById("formList").style.display = "none";

            form.addEventListener("submit", (e) => {
              e.preventDefault();
              updateRequest(id);

              form.remove()
            });

            document.body.appendChild(form);
          }
        });
      } else {
        console.error("Failed to edit form.");
      }
    }
  };
  xhr.open("GET", "registration.php", true);
  xhr.send();
}

function updateRequest(id) {
  const ajax = new XMLHttpRequest();
  const name = document.getElementById("edit-name").value;
  const email = document.getElementById("edit-email").value;
  const password = document.getElementById("edit-password").value;

  const data =
    "id=" +
    id +
    "&fullname=" +
    name +
    "&email=" +
    email +
    "&password=" +
    password;

  ajax.onload = function () {
    if (ajax.status == 200) {
      loadForm();
    }
  };

  ajax.open("PUT", "registration.php", true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(data);
}

function deleteForm(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        loadForm();
      } else {
        console.error("Failed to delete form.");
      }
    }
  };
  xhr.open("DELETE", "registration.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("id=" + id);
}
