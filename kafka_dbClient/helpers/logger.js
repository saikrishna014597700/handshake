function Logger() {
  logMessage = {
    tag: null,
    message: null,
    createdTime: new Date()
  };
  return logMessage;
}
log = (tag, msg, err, corrId) => {
  let log = new Logger();
  log.tag = tag;
  log.message = msg;
  if (!!err) {
    log.error = {};
    log.error.err = err;
    log.error.corrId = corrId;
  }
  console.log(JSON.stringify(logMessage));
};

module.exports = { Logger, log };
