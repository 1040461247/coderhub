class ResponseBody {
  constructor(code = 1, message = 'Success', data) {
    this.code = code
    this.message = message
    this.data = data
  }
}

module.exports = ResponseBody
