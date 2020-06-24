$(document).ready(function () {

    $("#main-container").scroll(function () {
        var scrollTop = $("#main-container").scrollTop();
        if (scrollTop < $("#landing-section").height()) {
            var percentage = ($("#landing-section").height() - scrollTop) / $("#landing-section").height();
            $("#profilePhoto").css("height", "calc(40vh * " + percentage.toString() + ")");
            $("#name-of-user").css("font-size", "calc(min(max(30px, 8vw), 55px) * " + percentage.toString() + ")")
        }
    })

    function takeCareOfProfilePhoto(){
        var left_image = $("#profilePhoto").width() / 2;
        $("#profilePhoto").css("left", "calc(50% - " + left_image.toString() + ")");
    }

    takeCareOfProfilePhoto();

    setTimeout(function () {
        $("#main-container").addClass("snap-scroll-parent");
    }, 2000);

    var main_height = $(window).height() - $("#navbar").outerHeight();
    console.log(main_height);
    $("#main-container").height(main_height.toString() + "px");

    $("#user-sign").css("display", "none");
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            $("#joinUsLink").css("display", "none");
            $("#user-profile-photo-navbar").attr("src", photoURL);
            $("#profilePhoto").attr("src", photoURL);
            $("#user-profile-photo-navbar").attr("alt", displayName);
            $("#user-sign").css("display", "block");
            $("#name-of-user").html(displayName);
            $("#initials img").css("display", "block");
            takeCareOfProfilePhoto();
            // initEveryTime();
        } else {
            window.location.replace("https://" + window.location.hostname + "/join_us/")
            // initEveryTime();
        }
    }, function(error) {
        console.log(error);
    });
})
