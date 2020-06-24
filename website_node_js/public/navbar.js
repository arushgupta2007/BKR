document.write('\
<nav class="navbar navbar-expand-sm navbar-dark bg-dark py-1" id="navbar">\
  <a class="navbar-brand" href="/">\
    <img src="/static/home/images/BKR.PNG" alt="Logo" width="60" height="30"/>\
  </a>\
  <button\
    class="navbar-toggler"\
    type="button"\
    data-toggle="collapse"\
    data-target="#navbarNavAltMarkup"\
    aria-controls="navbarNavAltMarkup"\
    aria-expanded="false"\
    aria-label="Toggle navigation"\
  >\
    <span class="navbar-toggler-icon"></span>\
  </button>\
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">\
    <div class="navbar-nav">\
      <a class="nav-item nav-link active" href="/"\
        ><i class="fa fa-home"></i> Home\
        <span class="sr-only">(current)</span></a\
      >\
      <a class="nav-item nav-link" href="#"\
        ><i class="fa fa-download" aria-hidden="true"></i> Download</a\
      >\
    </div>\
    <div class="ml-auto" id="user-join-account">\
      <a class="nav-item nav-link" id="joinUsLink" href="/join_us/"\
        ><i class="fas fa-sign-in-alt"></i> Join Us</a\
      >\
      <div class="dropdown" id="user-sign" style="display: none;">\
        <a href="#" class="dropdown-toggle nav-item nav-link" id="user-extra" data-toggle="dropdown"><img alt="You" style="border-radius: 50%;" id="user-profile-photo-navbar" width="27" height="27"> My Account</a>\
        <div class="dropdown-menu dropdown-menu-right" id="dropdown-user-data">\
          <a class="dropdown-item" href="/profile/"><i class="fas fa-user-circle"></i> Profile</a>\
          <div class="dropdown-divider"></div>\
          <button class="dropdown-item" id="user-sign-out-navbar"><i class="fas fa-sign-out-alt"></i> Sign Out</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</nav>\
');
