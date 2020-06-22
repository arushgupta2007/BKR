$(".feature-more").css("display", "none");
$("#noise-reduction").css("display", "block");

function featureOpen(id_main_open, id_button) {
    $(".feature-more").css("display", "none");
    $("#" + id_main_open).css("display", "block");
    $(".side-button-features").removeClass("active");
    $("#" + id_button).addClass("active");
}

$(document).ready(function () {
    $("body").addClass("snap-scroll-parent");
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
            $("#user-profile-photo-navbar").attr("alt", displayName);
            $("#user-sign").css("display", "block");
            $(".userId").val(uid);
            // initEveryTime();
        } else {
            $("#user-sign").css("display", "none");
            // initEveryTime();
        }
    }, function(error) {
        console.log(error);
    });
})
