/* Reescrevi a função dessa forma porque o mocha estava conflitando com o babel
* contudo, são equivalentes
*/
function CovenantValidator(oauth) {
  this._validateOauth = async function (data) {
    var resultOauth = await oauth.validateTokenServer()
    if (data) data.accessToken = resultOauth.access_token
    return data
  }
}
module.exports = CovenantValidator