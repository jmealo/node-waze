var request = require("request"),
    jar = require("./jar"),
    async = require("async");

function requestHandler(error, response, body, callback) {
    if (!error) {
        try {
            body = JSON.parse(body).reply;
        } catch (e) {
            error = "Error parsing JSON response from Waze server.";
        }
    } else {
        error = "Error connecting to Waze server. (" + error.message + ")";
    }

    callback(error, body);
}

function login (opts, cb) {
    var reqOpts = {
        form: {
            user_id: opts.user_id,
            password: opts.password
        },
        jar: jar
    };

    async.auto({
        csrf_token: function (callback) {
            request.get("https://www.waze.com/login/get", reqOpts, function (error, response, body) {
                requestHandler(error, response, body, callback);
            });
        },
        login: ["csrf_token", function (callback, results) {

            jar.cookies.forEach(function (cookie) {
                if (cookie.name === "_csrf_token") {
                    reqOpts.headers = {
                        "X-CSRF-Token": cookie.value
                    };
                }
            });

            request.post("https://www.waze.com/login/create", reqOpts, function (error, response, body) {
                requestHandler(error, response, body, callback);
            });
        }]
    }, function (err, results) {
        if(results.login && results.login.login === false) {
            err = results.login.message;
        }

        cb(err, results);
    });
};

module.exports = login;