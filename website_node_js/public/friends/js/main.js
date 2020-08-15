const socket = io();
var connected_socket = false;
var editor_object = {}
var https_url = "https://" + window.location.hostname
if (window.location.port) {
    https_url = https_url + ":" + window.location.port
}

class FriendArea {
    constructor(uid_friend, friend_name, uid_user) {
        var html_template = `
        <nav class="navbar bg-warning p-1 pl-3 pr-3 main-chat-navbar">
            <button class="btn btn-sm goBack-button" onclick="goBack()"><i class="fas fa-arrow-left"></i></button>
            <span class="navbar-brand mb-0 h1">${friend_name}</span>
            <div>
                <button class="join-meeting-button btn btn-success btn-sm"><i class="fas fa-phone" style="margin-right: 3px;"></i> Call</button>
            </div>
        </nav>
        <div class="real-main-chat-area" id="real-chat-area-${uid_friend}">
            <div class="spinner-border text-secondary spinner-chat-area" id="spinner-chat-area-${uid_friend}" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="message-input-parent-parent">
            <div class="message-input" id="message-input-parent-${uid_friend}"></div>
            <button class="btn btn-light" onclick="sendMessage('${uid_friend}', '${uid_user}')"><i class="fas fa-paper-plane"></i></button>
        </div>
        `;
        var main_chat_area = document.createElement("div");
        main_chat_area.setAttribute("id", "chat-area-" + uid_friend);
        main_chat_area.className = "friend height-100 width-100";
        main_chat_area.innerHTML = html_template;
        document.getElementById("friends-chat-parent").appendChild(main_chat_area);
        var html_list_template = `
        <div onclick='openFriend("${uid_friend}", "chat-area-${uid_friend}", "friend-list-button-${uid_friend}", "${uid_user}");' style="width: 65%; cursor: pointer" class="d-flex align-items-center mr-auto">
            <span class="d-inline-block text-truncate">${friend_name}</span>
        </div>
        <div>
            <button class="join-meeting-button btn btn-success btn-sm"><i class="fas fa-phone" style="margin-right: 3px;"></i></button>
        </div>
        `;
        var friend_list = document.createElement("li");
        friend_list.className = "list-group-item list-friend-item d-flex justify-content-center pr-2";
        friend_list.setAttribute("id", "friend-list-button-" + uid_friend);
        friend_list.innerHTML = html_list_template;
        document.getElementById("friends-list").appendChild(friend_list);
        ClassicEditor
            .create(document.querySelector('#message-input-parent-' + uid_friend))
            .then(editor => {
                editor_object[uid_friend] = editor;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

class MessageClass {
    constructor(from_name, message, uid_friend, color_card) {
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
        document.getElementById('real-chat-area-' + uid_friend.toString()).appendChild(card);
    }
}

socket.on("connect", () => {
    console.log("Connected To server");
    connected_socket = true;
});

socket.on("disconnect", () => {
    console.log("Disconnected To server");
    connected_socket = false;
});

socket.on("newMessageYouRecv", (data) => {
    var our_uid = $("#user-uid").val();
    var from = data.from;
    var from_uid = data.from_account;
    var uid_friend = data.friend_id;
    var real_message = data.message;
    var color_card = "#eaeaea";
    if (from_uid.toString() === our_uid.toString()) {
        color_card = "#5cb3db";
        from = "You";
    }
    new MessageClass(from, real_message, uid_friend, color_card);
    $("#real-chat-area-" + uid_friend).animate({ scrollTop: $('#real-chat-area-' + uid_friend).prop("scrollHeight") }, 200);
});

$(document).ready(function () {
    $("#user-sign-out-navbar").click(function () {
        firebase.auth().signOut();
        window.location.href = https_url;
    });

    $("#searchFriends").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#friends-list li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    var main_height = $(window).height() - $("#navbar").outerHeight();
    $("#main-container").height(main_height.toString() + "px");

    $("#user-sign").css("display", "none");
    firebase.auth().onAuthStateChanged(function (user) {
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
            $(".uid-input").val(uid)
            var data_ajax = {
                userUID: uid,
            }
            $.ajax({
                url: https_url + "/user-api/user/friends/",
                type: "POST",
                data: data_ajax,
                error: function (err) {
                    console.log(err);
                }
            }).done(function (data) {
                console.log(data)
                data.forEach((item, i) => {
                    console.log(item.participants);
                    var friend_id = item.participants[0].toString();
                    $.ajax({
                        url: https_url + "/user-api/user/friends/name/",
                        type: "POST",
                        data: { friend_id: friend_id },
                        error: function (err) {
                            console.log(err);
                        }
                    }).then((data) => {
                        if (data) {
                            console.log(data);
                            new FriendArea(friend_id, data, uid);
                        }
                    })
                });

            });
            $.ajax({
                url: https_url + "/user-api/user/invitation-for-me/",
                type: "POST",
                data: { userId: uid },
                error: function (err) {
                    console.log(err);
                }
            }).then((list_of_invites) => {
                list_of_invites.forEach((invite, index) => {
                    $.ajax({
                        url: https_url + "/user-api/user/friends/name/",
                        type: "POST",
                        data: { friend_id: invite.from },
                        error: function (err) {
                            console.log(err);
                        }
                    }).then((data) => {
                        var html_template_invite_list = `
                            <span class="mr-auto"><b>${data}</b> sent you an invite</span>
                            <div>
                                <button onclick="acceptInvite('${invite.to}', '${invite.from}', '${invite._id}')" class="btn btn-success"><i class="fas fa-check"></i> Accept</button>
                                <button onclick="declineInvite('${invite.to}', '${invite.from}', '${invite._id}')" class="btn btn-danger"><i class="fas fa-times"></i>  Decline</button>
                            </div>
                        `
                        var li_invite = document.createElement("li");
                        li_invite.className = "list-group-item d-flex justify-content-center pr-2 invite-for-user";
                        li_invite.innerHTML = html_template_invite_list;
                        document.getElementById("invites-list").appendChild(li_invite);
                    })
                })
            });
            if (connected_socket) {
                socket.emit("join", { user_id: uid })
            }
        } else {
            window.location.replace(https_url + "/join_us/");
        }
    }, function (error) {
        console.log(error);
    });
});

function openFriend(uid_friend, id_open_friend, id_list_group_button, uid) {
    $(".friend").css("display", "none");
    $("#none-selected").css("display", "none");
    $("#" + id_open_friend).css("display", "flex");
    $(".list-friend-item").removeClass("active");
    $("#" + id_list_group_button).addClass("active");
    $("#friends").addClass("d-none");
    $("#friends").addClass("d-sm-block");
    $("#friends-chat-parent").removeClass("d-none");
    $("#friends-chat-parent").removeClass("d-sm-block");
    // $("#real-chat-area-" + uid_friend).animate({ scrollTop: $('#real-chat-area-' + uid_friend).prop("scrollHeight")}, 20);
    var real_chat_area = document.getElementById("real-chat-area-" + uid_friend);
    real_chat_area.scrollTop = real_chat_area.scrollHeight;
    if (!$("#chat-area-" + uid_friend.toString()).hasClass("chat-loaded")) {
        var data_ajax = {
            userId: uid,
            friend_UserId: uid_friend,
        };
        $.ajax({
            url: https_url + "/user-api/friends/chats/",
            type: "POST",
            data: data_ajax,
            error: function (err) {
                console.error(err);
            }
        }).done(function (messages) {
            console.log(messages)
            $("#spinner-chat-area-" + uid_friend.toString()).css("display", "none");
            $("#chat-area-" + uid_friend.toString()).addClass("chat-loaded");
            // var messages = JSON.parse(data);
            messages.forEach((message, i) => {
                var from = message.from;
                var from_uid = message.from_account;
                var real_message = message.message;
                var color_card = "#eaeaea";
                if (from_uid.toString() === uid.toString()) {
                    color_card = "#5cb3db";
                    from = "You";
                }
                new MessageClass(from, real_message, uid_friend, color_card);
            });
        });
    }
}

function goBack() {
    $("#friends").removeClass("d-none");
    $("#friends").removeClass("d-sm-block");
    $("#friends-chat-parent").addClass("d-none");
    $("#friends-chat-parent").addClass("d-sm-block");
}

function inviteUser() {
    var uid = $("#user-uid").val()
    var invite_email = $("#invite-email").val();
    var data_ajax = {
        userId: uid,
        friend_email: invite_email
    }
    $.ajax({
        url: https_url + "/user-api/make-invitation/",
        type: "POST",
        data: data_ajax,
        error: function (err) {
            console.log(err);
        }
    }).then((res) => {
        console.log("Done!");
        console.log(res);
    })
}

function acceptInvite(uid, from_uid, invite_id) {
    console.log(uid);
    $.ajax({
        url: https_url + "/user-api/accept-invitation/",
        type: "POST",
        data: { id_invite: invite_id, userId: uid, friend_id: from_uid },
        error: function (err) {
            console.log(err);
        }
    }).then((result) => {
        console.log(":)");
        console.log(result);
    })
}

function sendMessage(uid_friend, user_uid) {
    // var textarea_input = $("#message-input-" + uid_friend).val();
    var textarea_input = editor_object[uid_friend].getData();
    if (connected_socket) {
        var data_message = {
            from: user_uid,
            message: textarea_input,
            friend_id: uid_friend
        }
        socket.emit("newMessage", data_message);
        new MessageClass("You", textarea_input, uid_friend, "#5cb3db");
        $("#message-input-" + uid_friend).val("")
    }
    $("#real-chat-area-" + uid_friend).animate({ scrollTop: $('#real-chat-area-' + uid_friend).prop("scrollHeight") }, 200);
    editor_object[uid_friend].setData("");
}

function showInvites() {
    $(".friend").css("display", "none");
    $("#none-selected").css("display", "flex");
    $(".list-friend-item").removeClass("active");
    $("#invites-item-friends").addClass("active");
}