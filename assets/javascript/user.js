$(document).ready(function () {
    /* Start - to show the sign up modal */

    $(document).on('click', '#sign-up-btn', showSignUpModal);

    $(document).on('click', '.delete', function () {
        $('.signup-modal').removeClass('is-active');

    })
    $(document).on('click', '.close-button', function () {
        $('.signup-modal').removeClass('is-active');

    })
    /* End - to show the sign up modal */

    /* Start - to show the login modal */
    $(document).on('click', '#login-btn', showLoginModal);

    $(document).on('click', '.delete', function () {
        $('.login-modal').removeClass('is-active');

    })
    $(document).on('click', '.close-button', function () {
        $('.login-modal').removeClass('is-active');

    })
    /* End - to show the login modal */


    /* Forgot password */
    $(document).on("click", "#forgot-pwd-id", showFPModal);

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    /* check the user state in firebase has changed i.e user is signed in or signed out */
    //var userData;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //var userData = firebase.auth().currentUser; //userData.uid
            //console.log(user.email);
            var uname = (user.displayName) ? user.displayName : sessionStorage.getItem("uName");
            showUser(uname);
        } else {
            showLoginBox();
        }
    });

    $(document).on("click", "#login-auth-btn", login);
    $(document).on("click", "#sign-up-save-btn", save);
    $(document).on("click", "#logout-btn", logout);
    $(document).on("click", "#reset-fp-btn", reset_password);

    $("#forgot-pwd-div").hide();
});

function showUser(uName) {
    $("#login-btn").hide();
    $("#sign-up-btn").hide();
    $("#welcomeUser").text("Welcome " + uName);
    //$('.signup-modal').removeClass('is-active');
    $('.login-modal').removeClass('is-active');
    $(".loginBox").html('<p class="control"><button id="logout-btn" class="button is-link">Logout</button></p>');
}

function showLoginBox() {
    $("#welcomeUser").empty();
    $(".loginBox").html('<p class="control login-box-css"><button id="login-btn" class="button is-link">Login</button></p><p class="control login-box-css"><button id="sign-up-btn" class="button is-link">Sign up</button></p>');
}

function showErrorMessage(error, errorDiv, msgtype = 'is-danger') {
    $("#" + errorDiv).empty();
    var newDiv = $("<article>");
    newDiv.addClass("message " + msgtype);
    newDiv.append("<div class='message-body'>" + error + "</div>");
    $("#" + errorDiv).append(newDiv);
}

function showSignUpModal() {
    $("#signup-div").show();
    $("form[name='registration']").trigger("reset");
    $("#errorMsgDiv").empty();
    $('.signup-modal').addClass('is-active');
    $('.signup-modal').addClass('is-clipped');
}

function showLoginModal() {
    $("#forgot-pwd-div").hide();
    $("#login-div").show();
    $('.login-modal').addClass('is-active');
    $('.login-modal').addClass('is-clipped');
}

function showFPModal() {
    $("#login-div").hide();
    $("#forgot-pwd-div").show();
}

function login() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='loginFrm']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            login_email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            login_password: {
                required: true
            }
        },
        // Specify validation error messages
        messages: {
            password: {
                required: "Please enter a password"
            },
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var userObj = {
                email: $("#login_email").val(),
                password: $("#login_password").val()
            }

            console.log(userObj);
            firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password).then(function (response) {
                console.log(response);
                showUser(response.user.displayName);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                showErrorMessage(errorMessage, "errorMsgLoginDiv");
            });
        }
    });
}

function save() {
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

            firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        showErrorMessage(errorMessage, 'errorMsgDiv');
                    }
                }).then(function (response) {
                    if (response) {
                        if (response.additionalUserInfo.isNewUser == true && response.operationType == "signIn") {
                            var uName = userObj.firstname + " " + userObj.lastname;
                            response.user.updateProfile({
                                displayName: uName
                            });
                            sessionStorage.setItem("uName", uName);
                            showErrorMessage("You have been successfully signed up!!", "errorMsgDiv", "is-success");
                            $("#signup-div").hide();
                        }
                    }
                });
        }
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        sessionStorage.clear();
        showLoginBox();
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}

function reset_password() {
    $("form[name='forgotPwdFrm']").validate({
        // Specify validation rules
        rules: {
            fp_email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            }
        },
        // Specify validation error messages
        messages: {
            fp_email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            firebase.auth().sendPasswordResetEmail($("#fp_email").val()).then(function () {
                // Email sent.
                showErrorMessage("Email was successfully sent to your email address", "errorMsgLoginDiv", "is-success");
            }).catch(function (error) {
                showErrorMessage(error, "errorMsgLoginDiv");
            });
            $("#fp_email").val('');
        }
    });
}