$(document).ready(function () {
    var https_url = "https://" + window.location.hostname
    if (window.location.port) {
        https_url = https_url + ":" + window.location.port
    }
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
            var data_ajax = {
                userUID: uid,
            }
            $.ajax({
                url: https_url + "/user-api/user/prevMeetings/",
                type: "POST",
                data: data_ajax,
                error: function (err) {
                    console.log(err);
                }
            }).done(function(data) {
                data.forEach((item, i) => {
                    var meetingName = item.meeting_name;
                    var meetingId = item.meeting_id;

                });

            });
            // initEveryTime();
        } else {
            window.location.replace(https_url + "/join_us/")
        }
    }, function(error) {
        console.log(error);
    });
})
