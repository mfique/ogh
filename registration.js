$(document).ready(function () {

    // Handle form submission
    $("#registrationForm").submit(function (event) {
      event.preventDefault();

      var formData = {
        fullname: $("#fullname").val(),
        email: $("#email").val(),
        phonenumber: $("#phonenumber").val(),
        password: $("#password").val(),
        confirm_password: $("#confirm_password").val(),
      };

      $.ajax({
        type: "POST",
        url: "your_php_file.php", // Replace with the correct path to your PHP file
        data: formData,
        dataType: "json",
        success: function (response) {
          console.log(response);
          // Handle success response
        },
        error: function (error) {
          console.error(error);
          // Handle error
        }
      });
    });

    // Add other event handlers for update and delete if needed

    // Fetch data on page load
    $.ajax({
      type: "GET",
      url: "your_php_file.php", // Replace with the correct path to your PHP file
      dataType: "json",
      success: function (data) {
        // Handle data retrieval success
        displayData(data);
      },
      error: function (error) {
        console.error(error);
        // Handle error
      }
    });

    // Function to display data on the page
    function displayData(data) {
      // Implement logic to display data on the page
      // You can append the data to #formList or any other HTML element
    }

  });