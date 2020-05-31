document.write('\
<nav class="navbar navbar-expand-sm navbar-dark bg-dark py-1" id="navbar">\
  <a class="navbar-brand" href="/">\
    <img src="/static/home/images/BKR.PNG" alt="Logo" width="52" height="28"/>\
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
    <div class="navbar-nav" style="width:100%;">\
      <a class="nav-item nav-link active" href="/"\
        ><i class="fa fa-home"></i> Home\
        <span class="sr-only">(current)</span></a\
      >\
      <a class="nav-item nav-link" href="#"\
        ><i class="fa fa-download" aria-hidden="true"></i> Download</a\
      >\
      <a class="nav-item nav-link" id="joinUsLink" href="/join_us/"\
        ><i class="fas fa-sign-in-alt"></i> Join Us</a\
      >\
      <div class="dropdown pull-right" id="user-sign">\
        <a href="#" class="dropdown-toggle nav-link" id="user-extra" data-toggle="dropdown"><img alt="You" style="border-radius: 50%;"></a>\
        <div class="dropdown-menu">\
          <button class="dropdown-item">Sign Out</button>\
        </div>\
      </div>\
    </div>\
  </div>\
</nav>\
');