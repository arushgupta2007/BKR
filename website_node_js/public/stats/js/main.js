var https_url = "https://" + window.location.hostname
if (window.location.port) {
    https_url = https_url + ":" + window.location.port
}

var myChart;
function chartIt(data, type, color, fill, borderWidth, borderColor) {
    console.log(data);
    var ctx = document.getElementById('statsChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: data.name,
            datasets: [{
                label: 'No. Of meetings',
                data: data.count,
                fill: fill,
                backgroundColor: color,
                borderColor: borderColor,
                borderWidth: borderWidth
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    }
                }]
            }
        }
    });
}

function chartOpen(which, id_button) {
    $(".side-button-chart").removeClass("active")
    $("#" + id_button).addClass("active")
    var data_ajax = {
        userId: $("#uid-html").val(),
        timeFrame: which
    }
    $.ajax({
        url: https_url + "/user-api/stats/",
        type: "POST",
        data: data_ajax,
        error: function (err) {
            console.log(err);
        }
    }).done(function(data) {
        console.log("GOT DATA");
        console.log(data);
        myChart.destroy()
        if (which === '0') {
            chartIt(data, 'bar', 'rgb(255,204,0)', true, 0, '')
        } else if (which === '1') {
            chartIt(data, 'line', 'rgb(40,167,69)', false, 10, 'rgb(40,167,69, 0.5)')
        } else if (which === '2') {
            chartIt(data, 'line', 'rgb(0,123,255)', false, 10, 'rgb(0,123,255, 0.5)')
        }
    });
}

$(document).ready(function () {
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
            $("#uid-html").val(uid)
            var data_ajax = {
                userId: uid,
                timeFrame: 0
            }
            $.ajax({
                url: https_url + "/user-api/stats/",
                type: "POST",
                data: data_ajax,
                error: function (err) {
                    console.log(err);
                }
            }).done(function(data) {
                chartIt(data, 'bar', 'rgb(255,204,0)', true, 0, '')
            });
            // initEveryTime();
        } else {
            window.location.replace(https_url + "/join_us/")
        }
    }, function(error) {
        console.log(error);
    });
})
