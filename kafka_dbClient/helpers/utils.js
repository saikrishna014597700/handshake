/**
 *
 * @param {Boolean} status HTTP Status Code
 * @param {*} result Response from DB
 */
function ResponseModel(status, result, error) {
  return {
    isSuccessful: false,
    result: result
  };
}

module.exports = ResponseModel;
