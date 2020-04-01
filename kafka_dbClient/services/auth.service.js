const { log } = require("../helpers/logger");
const authDbController = require("../dbController/auth.controller");

function handleRequest(msg) {
  switch (msg.url) {
    case "/sign-up-kafka":
      return authDbController.signUp(msg);
  }
}

exports.handleRequest = handleRequest;
