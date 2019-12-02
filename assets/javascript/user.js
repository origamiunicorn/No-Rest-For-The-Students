$(document).ready(function () {
    /* Start - to show the sign up modal */
    $('#sign-up-btn').on('click', function () {
        $('.signup-modal').addClass('is-active')
        $('.signup-modal').addClass('is-clipped')
    });

    $(document).on('click', '.delete', function () {
        $('.signup-modal').removeClass('is-active')

    })
    $(document).on('click', '.close-button', function () {
        $('.signup-modal').removeClass('is-active')

    })
    /* End - to show the sign up modal */

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database.
    var database = firebase.database();

    var usersRef = database.ref("/user");

    $('#sign-up-save-btn').on('click', function () {
        event.preventDefault();
        // Initialize form validation on the registration form.
        // It has the name attribute "registration"
        $("form[name='sign-up-frm']").validate({
            // Specify validation rules
            rules: {
                // The key name on the left side is the name attribute
                // of an input field. Validation rules are defined
                // on the right side
                firstname: "required",
                lastname: "required",
                email: {
                    required: true,
                    // Specify that email should be validated
                    // by the built-in "email" rule
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            // Specify validation error messages
            messages: {
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address"
            },
            // Make sure the form is submitted to the destination defined
            // in the "action" attribute of the form when valid
            submitHandler: function (form) {
                var userObj = {
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    email: $("#email").val(),
                    password: $("#password").val()
                }

                console.log(userObj);
                firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        /*if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            alert(errorMessage);
                        }*/
                        console.log(error);
                    }).then(function (response) {
                        console.log(response);
                    });

                // database.ref("/user").set(userObj);
            }
        });

    });
}); 