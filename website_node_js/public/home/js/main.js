var canvas_background;
var mouse = {
    x: $(window).width() / 2,
    y: $(window).height() / 2,
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function alphanumeric(inputtxt) {
    var letters = /^[0-9a-zA-Z]+$/;
    return (inputtxt.match(letters)) ;
}


function createFormValidation() {
    var user_name = $("#create_new_name").val();
    var meeting_name = $("#create_new_meeting_name").val();
    var meeting_code = $("#create_new_meeting_code").val();
    var ok = true;
    if (user_name.trim() === "") {
        $("#create_new_name").removeClass("is-valid");
        $("#create_new_name").addClass("is-invalid");
        ok = false;
    } else {
        $("#create_new_name").removeClass("is-invalid");
        $("#create_new_name").addClass("is-valid");
    }

    if (meeting_name.trim() === "") {
        $("#create_new_meeting_name").removeClass("is-valid");
        $("#create_new_meeting_name").addClass("is-invalid");
        ok = false;
    } else {
        $("#create_new_meeting_name").removeClass("is-invalid");
        $("#create_new_meeting_name").addClass("is-valid");
    }

    if (meeting_code.indexOf(" ") >= 0 || !alphanumeric(meeting_code) || meeting_code.length < 8) {
        $("#create_new_meeting_code").removeClass("is-valid");
        $("#create_new_meeting_code").addClass("is-invalid");
        $("#create_new_meeting_code_help").removeClass("text-muted");
        $("#create_new_meeting_code_help").css("color", "#dc3545");
        ok = false;
    } else {
        $("#create_new_meeting_code").removeClass("is-invalid");
        $("#create_new_meeting_code").addClass("is-valid");
        $("#create_new_meeting_code_help").addClass("text-muted");
        $("#create_new_meeting_code_help").css("color", "#dc3545");
    }

    $(".create-new-input").change(function () {
        createFormValidation();
    })

    return ok;
}

function joinFormValidation () {
    var user_name = $("#join_name").val();
    var meetingID = $("#join_meeting_name").val();
    var meetingCode = $("#join_meeting_code").val();
    var ok = true;
    if (user_name.trim() === "") {
        $("#join_name").removeClass("is-valid");
        $("#join_name").addClass("is-invalid");
        ok = false;
    } else {
        $("#join_name").removeClass("is-invalid");
        $("#join_name").addClass("is-valid");
    }
    return ok;
}

function featureOpen(id_element, id_button) {
    $(".feature-more").hide();
    $("#" + id_element).show();
    $(".side-button-features").removeClass("active");
    $("#" + id_button).addClass("active");
}

$("#user-sign-out-navbar").click(function () {
    firebase.auth().signOut();
    location.reload();
})

$(document).ready( function () {
    $(window).resize(initEveryTime);
    setTimeout(function () {
        $("#main-container").addClass("snap-scroll-parent");
    }, 2000);
    $(".feature-more").hide();
    $("#noise-reduction").show();

    function initEveryTime() {
        var main_container_height;
        var is_on_phone = false;
        if ($(window).width() > 992) {
            $("#device-support-img").attr("src", "/static/home/images/laptopscreen.png");
            $("#device-support-img").addClass("big-device");
            $("#dropdown-user-data").addClass("dropdown-menu-right");
            main_container_height = $(window).outerHeight() - $("#navbar").outerHeight() - $("#meetingOptions").outerHeight() - 48;
            $("#main-container").height(main_container_height.toString() + "px");
//            $("#intro-img-represent").css("max-height", max_height_intro_represent_image.toString() + "px");
        } else if ($(window).width() > 576) {
            $("#device-support-img").attr("src", "/static/home/images/laptopscreen.png");
            $("#device-support-img").addClass("medium-device");
            $("#dropdown-user-data").addClass("dropdown-menu-right");
            main_container_height = $(window).outerHeight() - $("#navbar").outerHeight() - $("#meetingOptions").outerHeight();
            $("#main-container").height(main_container_height.toString() + "px");
            is_on_phone = true;
        } else {
            $("#device-support-img").attr("src", "/static/home/images/phonescreen.png");
            $("#device-support-img").addClass("small-device");
            $("#dropdown-user-data").removeClass("dropdown-menu-right");
            main_container_height = $(window).outerHeight() - $("#navbar").outerHeight() - $("#meetingOptions").outerHeight();
            $("#main-container").height(main_container_height.toString() + "px");
            is_on_phone = true;
        }
        //$("#img-footer").height($("#links-container").height().toString() + "px");
        var max_height_intro_represent_image = main_container_height - 70;
        var navabar_height = $("#navbar").outerHeight();
        var buttonGroup_height = $("#meetingOptions").outerHeight();
        var scrollbar_width = document.getElementById("intro-section-row").offsetWidth - document.getElementById("intro-section-row").clientWidth;
        canvas_background = document.getElementById("canvas-background-animation");
        var ctx = canvas_background.getContext('2d');
        canvas_background.width = window.innerWidth;
        canvas_background.height = window.innerHeight;
        var common_velocity = 2;
        function random_x_y_dx_dy() {
            var x = Math.random() * (window.innerWidth - 50 - scrollbar_width);
            var y = Math.random() * (window.innerHeight - 30 - navabar_height - buttonGroup_height) + navabar_height;
            if (Math.random() > 0.5) {
                var dx = common_velocity;
            } else {
                var dx = -common_velocity;
            }
            if (Math.random() > 0.5) {
                var dy = common_velocity;
            } else {
                var dy = -common_velocity;
            }
            return {x: x, y: y, dx: dx, dy: dy};
        }
        var images = [];
        var mouse_radius = 100;

        var videoImg = new Image;
        videoImg.src = "/static/home/images/camera.png"; // 49 x 30
        var video_width = 49;
        var video_height = 30;
        videoImg.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: video_width, size_height: video_height, type: "video"});
        })

        var person_img = new Image;
        person_img.src = "/static/home/images/person.png"; // 30 x 30
        var person_width = 30;
        var person_height = 30;
        person_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: person_width, size_height: person_height, type: "person"});
        })

        var chat_img = new Image;
        chat_img.src = "/static/home/images/chat.png"; // 34 x 30
        var chat_width = 34;
        var chat_height = 30
        chat_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: chat_width, size_height: chat_height, type: "chat"});
        })

        var mic_img = new Image;
        mic_img.src = "/static/home/images/mic.png"; // 22 x 30
        var mic_width = 22;
        var mic_height = 35;
        mic_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: mic_width, size_height: mic_height, type: "mic"});
        })

        var share_img = new Image;
        share_img.src = "/static/home/images/share.png" // 37 x 30;
        var share_width = 37;
        var share_height = 30;
        share_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: share_width, size_height: share_height, type: "share"});
        })

        var call_img = new Image;
        call_img.src = "/static/home/images/call.png"; // 24 x 30
        var call_width = 32;
        var call_height = 40;
        call_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: call_width, size_height: call_height, type: "call"});
        })

        var headset_img = new Image;
        headset_img.src = "/static/home/images/headset.png"; // 27 x 30
        var headset_width = 31.5;
        var headset_height = 35;
        headset_img.addEventListener('load', function () {
            var random_vars = random_x_y_dx_dy();
            images.push({x: random_vars.x, y: random_vars.y, dx: random_vars.dx, dy: random_vars.dy,
                size_width: headset_width, size_height: headset_height, type: "headset"});
        })

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (var i = 0; i < images.length; i++) {
                var data = images[i];
                if (data.type === "video") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < video_width + 50 || data.size_height < video_height + 50) {
                                data.size_width += video_width / video_height;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > video_width - 1 || data.size_height > video_height - 1) {
                                data.size_width -= video_width / video_height;
                                data.size_height -= 1;
                            } else {
                                data.size_width = video_width;
                                data.size_height = video_height;
                            }
                        }
                    }
                    ctx.drawImage(videoImg, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "person") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < person_width + 50 || data.size_height < person_height + 50) {
                                data.size_width += 1;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > person_width - 1 || data.size_height > person_height - 1) {
                                data.size_width -= 1;
                                data.size_height -= 1;
                            } else {
                                data.size_width = person_width;
                                data.size_height = person_height;
                            }
                        }
                    }
                    ctx.drawImage(person_img, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "chat") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < chat_width + 50 || data.size_height < chat_height + 50) {
                                data.size_width += 1;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > chat_width - 1 || data.size_height > chat_height - 1) {
                                data.size_width -= 1;
                                data.size_height -= 1;
                            } else {
                                data.size_width = chat_width;
                                data.size_height = chat_height;
                            }
                        }
                    }
                    ctx.drawImage(chat_img, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "mic") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < mic_width + 50 || data.size_height < mic_height + 50) {
                                data.size_width += mic_width / mic_height;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > mic_width - 1 || data.size_height > mic_height - 1) {
                                data.size_width -= mic_width / mic_height;
                                data.size_height -= 1;
                            } else {
                                data.size_width = mic_width;
                                data.size_height = mic_height;
                            }
                        }
                    }
                    ctx.drawImage(mic_img, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "share") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < share_width + 50 || data.size_height < share_height + 50) {
                                data.size_width += share_width / share_height;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > share_width - 1 || data.size_height > share_height - 1) {
                                data.size_width -= share_width / share_height;
                                data.size_height -= 1;
                            } else {
                                data.size_width = share_width;
                                data.size_height = share_height;
                            }
                        }
                    }
                    ctx.drawImage(share_img, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "call") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < call_width + 50 || data.size_height < call_height + 50) {
                                data.size_width += call_width / call_height;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > call_width - 1 || data.size_height > call_height - 1) {
                                data.size_width -= call_width / call_height;
                                data.size_height -= 1;
                            } else {
                                data.size_width = call_width;
                                data.size_height = call_height;
                            }
                        }
                    }
                    ctx.drawImage(call_img, data.x, data.y, data.size_width, data.size_height);
                } else if (data.type === "headset") {
                    if (!is_on_phone) {
                        if (mouse.x - data.x < mouse_radius && mouse.x - data.x > -mouse_radius && mouse.y - data.y < mouse_radius &&
                            mouse.y - data.y > -mouse_radius) {
                            if (data.size_width < headset_width + 50 || data.size_height < headset_height + 50) {
                                data.size_width += headset_width / headset_height;
                                data.size_height += 1;
                            }
                        } else {
                            if (data.size_width > headset_width - 1 || data.size_height > headset_height - 1) {
                                data.size_width -= headset_width / headset_height;
                                data.size_height -= 1;
                            } else {
                                data.size_width = headset_width;
                                data.size_height = headset_height;
                            }
                        }
                    }
                    ctx.drawImage(headset_img, data.x, data.y, data.size_width, data.size_height);
                }

                if (data.x < 0 || data.x + data.size_width > window.innerWidth - scrollbar_width) {
                    if (data.x < 0) {
                        data.dx = common_velocity;
                    } else {
                        data.dx = -common_velocity;
                    }
                }
                if (data.y < navabar_height || data.y + data.size_height > window.innerHeight - buttonGroup_height) {
                    if (data.y < navabar_height) {
                        data.dy = common_velocity;
                    } else {
                        data.dy = -common_velocity;
                    }
                }

                data.x += data.dx;
                data.y += data.dy;
            }
        }
        animate();
        const urlParams = new URLSearchParams(window.location.search);
        const todo = urlParams.get('todo');
        if (todo === "join") {
            const meetingId = urlParams.get('id_');
            $("#join_meeting_name").val(meetingId);
            $("#joinCall").modal({
              keyboard: false
            });
        } else if (todo === "join-wrong") {
            const name = urlParams.get('name');
            $("#join_name").val(name);
            $("#join_meeting_name").addClass("is-invalid");
            $("#join_meeting_code").addClass("is-invalid");
            $(".join-input").change(function () {
                $("#join_meeting_name").removeClass("is-invalid");
                $("#join_meeting_code").removeClass("is-invalid");
                $("#join_meeting_name").removeClass("is-valid");
                $("#join_meeting_code").removeClass("is-valid");
                $("#join_name").removeClass("is-valid");
                $("#join_name").removeClass("is-invalid");
            });
            $("#joinCall").modal({
              keyboard: false
            });
        }
    }

    $("#features .card").hover(function () {
        $("#features .card").css("opacity", "0.8");
        $(this).css("opacity", "1");
    }, function () {
        $("#features .card").css("opacity", "1");
    })

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
            initEveryTime();
        } else {
            $("#user-sign").css("display", "none");
            initEveryTime();
        }
    }, function(error) {
        console.log(error);
    });
})
