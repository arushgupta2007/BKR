class MeetingRoomChat {
    constructor(id_meeting, name_meeting, uid, meeting_code, name_user) {
        var html_template = `
        <nav class="navbar bg-warning p-1 pl-3 pr-3 main-chat-navbar">
            <button class="btn btn-sm goBack-button" onclick="goBack()"><i class="fas fa-arrow-left"></i></button>
            <span class="navbar-brand mb-0 h1">${name_meeting.toString()}</span>
            <div>
                <button class="btn btn-sm btn-danger" onclick="deleteMeeting(${id_meeting}, '${uid}', '${name_meeting}')"><i class="fas fa-trash-alt" style="margin-right: 3px;"></i> Delete</button>
                <form action="/session/" class="join-form" method="POST">
                    <input type="hidden" value="${uid}" name="userId">
                    <input type="hidden" value="${id_meeting}" name="meetingId">
                    <input type="hidden" value="${meeting_code}" name="meetingCode">
                    <input type="hidden" value="${name_user}" name="name">
                    <input type="hidden" name="obj" value="join-or-create">
                    <button class="join-meeting-button btn btn-success btn-sm" type="submit"><i class="fas fa-phone" style="margin-right: 3px;"></i> Join</button>
                </form>
            </div>
        </nav>
        <div class="real-main-chat-area" id="real-chat-area-${id_meeting.toString()}">
            <div class="spinner-border text-secondary spinner-chat-area" id="spinner-chat-area-${id_meeting}" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `;
        var main_chat_area = document.createElement("div");
        main_chat_area.setAttribute("id", "chat-area-" + id_meeting.toString());
        main_chat_area.className = "meeting-room height-100 width-100";
        main_chat_area.innerHTML = html_template;
        document.getElementById('meeting-rooms-parent').appendChild(main_chat_area);
        var html_list_template = `
        <div onclick='openMeeting(${id_meeting}, "chat-area-${id_meeting.toString()}", "meeting-list-button-${id_meeting.toString()}", "${uid}");' style="width: 65%; cursor: pointer" class="d-flex align-items-center">
            <span class="d-inline-block text-truncate">${name_meeting}</span>
        </div>
        <div>
            <button class="btn btn-sm btn-danger" onclick="deleteMeeting(${id_meeting}, '${uid}', '${name_meeting}')"><i class="fas fa-trash-alt"></i></button>
            <form action="/session/" class="join-form" method="POST">
                <input type="hidden" value="${uid}" name="userId">
                <input type="hidden" value="${id_meeting}" name="meetingId">
                <input type="hidden" value="${meeting_code}" name="meetingCode">
                <input type="hidden" value="${name_user}" name="name">
                <input type="hidden" name="obj" value="join-or-create">
                <button class="join-meeting-button btn btn-success btn-sm" type="submit"><i class="fas fa-phone"></i></button>
            </form>
        </div>
        `;
        var meeting_list = document.createElement("li");
        meeting_list.className = "list-group-item list-meeting-item d-flex justify-content-between align-items-center pr-2";
        meeting_list.setAttribute("id", "meeting-list-button-" + id_meeting.toString());
        meeting_list.innerHTML = html_list_template;
        // meeting_list.onclick = function () {
        //     openMeeting(id_meeting, "chat-area-" + id_meeting.toString(), "meeting-list-button-" + id_meeting.toString(), uid);
        // }
        document.getElementById('meetings-list').appendChild(meeting_list);
    }
}

class MessageClass {
    constructor(from_name, message, id_meeting, color_card) {
        message = message.replace("\n", "<br>");
        var html_template = `
        <div class="card-body p-2">
            <span class="from-name">${from_name}:</span> ${message}
        </div>
        `;
        var card = document.createElement("div");
        card.className = "card message";
        card.style.backgroundColor = color_card;
        card.innerHTML = html_template;
        document.getElementById('real-chat-area-' + id_meeting.toString()).appendChild(card);
    }
}

$(document).ready(function () {
    // if (true) {  // local or not
    //     meetingApiUrl = "https://" + window.location.hostname + ":" + window.location.port + ":5442/user-api/user/prevMeetings/";
    // } else {
    //     meetingApiUrl = "https://" + window.location.hostname + "/user-api/user/prevMeetings/";
    // }

    $("#user-sign-out-navbar").click(function () {
        firebase.auth().signOut();
        window.location.href = "https://" + window.location.hostname + ":" + window.location.port;
    });

    $("#searchMeetings").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#meetings-list li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    var main_height = $(window).height() - $("#navbar").outerHeight();
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
            var data_ajax = {
                userUID: uid,
            }
            $.ajax({
                url: "https://" + window.location.hostname + ":" + window.location.port + "/user-api/user/prevMeetings/",
                type: "POST",
                data: data_ajax,
                error: function (err) {
                    console.log(err);
                }
            }).done(function(data) {
                data.forEach((item, i) => {
                    var meetingName = item.meeting_name;
                    var meetingId = item.meeting_id;
                    var meeting_code = item.meeting_code;
                    var meetingsObject = new MeetingRoomChat(meetingId, meetingName, uid, meeting_code, displayName);
                });

            });
        } else {
            window.location.replace("https://" + window.location.hostname + ":" + window.location.port + "/join_us/");
        }
    }, function(error) {
        console.log(error);
    });
});

function openMeeting(id_meeting, id_open_meeting, id_list_group_button, uid) {
    $(".meeting-room").css("display", "none");
    $("#none-selected").css("display", "none");
    $("#" + id_open_meeting).css("display", "block");
    $(".list-meeting-item").removeClass("active");
    $("#" + id_list_group_button).addClass("active");
    $("#meetings").addClass("d-none");
    $("#meetings").addClass("d-sm-block");
    $("#meeting-rooms-parent").removeClass("d-none");
    $("#meeting-rooms-parent").removeClass("d-sm-block");
    if (!$("#chat-area-" + id_meeting.toString()).hasClass("chat-loaded")) {
        var data_ajax = {
            userId: uid,
            meetingId: id_meeting
        };
        $.ajax({
            url: "https://" + window.location.hostname + ":" + window.location.port + "/user-api/prevMeeting/chats/",
            type: "POST",
            data: data_ajax,
            error: function (err) {
                console.log(err);
            }
        }).done(function(data) {
            $("#spinner-chat-area-" + id_meeting.toString()).css("display", "none");
            $("#chat-area-" + id_meeting.toString()).addClass("chat-loaded");
            var messages = JSON.parse(data);
            messages.forEach((message, i) => {
                var from = message.from;
                var from_uid = message.from_account;
                var real_message = message.message;
                var color_card = "#eaeaea";
                if (from_uid.toString() === uid.toString()) {
                    color_card = "#5cb3db";
                    from = "You";
                }
                var messageInstance = new MessageClass(from, real_message, id_meeting, color_card);
            });
        });
    }
}

function goBack() {
    $("#meetings").removeClass("d-none");
    $("#meetings").removeClass("d-sm-block");
    $("#meeting-rooms-parent").addClass("d-none");
    $("#meeting-rooms-parent").addClass("d-sm-block");
}

function deleteMeeting(id_meeting, uid, name_meeting) {
    $("#delete-modal-text").text("Do You really want to delete meeting: " + name_meeting + "?");
    document.getElementById('delete-meeting-for-sure').onclick = function () {
        realDeleteMeeting(id_meeting, uid);
        $("#deleteConfirmation").modal("hide");
    };
    $("#deleteConfirmation").modal("show");
}

function realDeleteMeeting(id_meeting, uid) {
    document.getElementById("chat-area-" + id_meeting.toString()).remove();
    if ($("#meeting-list-button-" + id_meeting.toString()).hasClass("active")) {
        $(".meeting-room").css("display", "none");
        $("#none-selected").css("display", "block");
        $(".list-meeting-item").removeClass("active");
    }
    document.getElementById("meeting-list-button-" + id_meeting.toString()).remove();
    var data_del_meeting = {
        userId: uid,
        meetingId: id_meeting
    };
    $.ajax({
        url: "https://" + window.location.hostname + ":" + window.location.port + "/user-api/prevMeeting/delete",
        type: "POST",
        data: data_del_meeting,
        error: function (err) {
            console.log(err);
        }
    });
}
