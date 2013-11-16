(function(){
  var request = require("request"),
      jar = require("./jar"),
      url = "https://www.waze.com/login/create",
      login;

  module.exports = login = function(opts, cb) {
    var reqOpts = {
      form: {
        user_id: opts.user_id,
        password: opts.password
      },
      jar: jar
    };

    request.post(url, reqOpts, cb);
  }

})();
