$(document).ready(function () {
    /* if sessionStorage exists then show user details    */
    var userSessionName = sessionStorage.getItem("uName");
    console.log("session==" + userSessionName);
    if (userSessionName) {
        showUser(userSessionName);
    } else {
        showLoginBox();
    }


    /* Start - to show the sign up modal */
    $('#sign-up-btn').on('click', function () {
        $('.signup-modal').addClass('is-active')
        $('.signup-modal').addClass('is-clipped')
    });

    $(document).on('click', '.delete', function () {
        $('.signup-modal').removeClass('is-active');

    })
    $(document).on('click', '.close-button', function () {
        $('.signup-modal').removeClass('is-active');

    })
    /* End - to show the sign up modal */

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    $('#sign-up-save-btn').on('click', function () {
        // Initialize form validation on the registration form.
        // It has the name attribute "registration"
        $("form[name='registration']").validate({
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
                },
                password_confirm: {
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            // Specify validation error messages
            messages: {
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                password: {
                    required: "Please enter a password",
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

                //console.log(userObj);
                firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                        } else {
                            //alert(errorMessage);
                            var newDiv = $("<article>");
                            newDiv.addClass("message is-danger");
                            newDiv.append("<div class='message-body'>" + errorMessage + "</div>");
                            $("#errorMsgDiv").append(newDiv);
                        }
                        //console.log(error);
                    }).then(function (response) {
                        console.log(response);
                        if (response) {
                            if (response.additionalUserInfo.isNewUser == true && response.operationType == "signIn") {
                                var uName = userObj.firstname + " " + userObj.lastname;
                                response.user.updateProfile({
                                    displayName: uName
                                });
                                sessionStorage.setItem("uName", uName);
                                sessionStorage.setItem("uId", response.user.uid);
                                showUser(uName);
                            }
                        }
                    });
            }
        });
    });

    $('#logout-btn').on('click', function () {
        sessionStorage.clear();
        showLoginBox();
    });
});

function showUser(uName) {
    $("#login-btn").hide();
    $("#sign-up-btn").hide();
    $("#welcomeUser").text("Welcome " + uName);
    $('.signup-modal').removeClass('is-active');
    $(".loginBox").html('<p class="control"><button id="logout-btn" class="button is-link">Logout</button></p>');
}

function showLoginBox() {
    $(".loginBox").html('<p class="control"><button id="login-btn" class="button is-link">Login</button></p><p class="control"><button id="sign-up-btn" class="button is-link">Sign up</button></p>');
}