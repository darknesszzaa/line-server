const request = require('request')
const { LINE_TOKEN, LINE_API } = require('../constants')

function sendReplyBodyToLine(replyToken, body) {
  try {
    request({
      method: `POST`,
      uri: `${LINE_API}/reply`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer {${LINE_TOKEN}}`
      },
      body: JSON.stringify(body)
    },
    function (error, response, body) {
      if (error) {
        return console.error('failed:', error);
      }
      console.log('successful!  Server responded with:', body);
    })
    
  } catch (error) {
    console.log(error)
  }
}

function sendTextReplyToLine(replyToken, text) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: `text`,
        text: text
      }
    ]
  }
  sendReplyBodyToLine(replyToken, body)
}

module.exports = {
  sendReplyBodyToLine,
  sendTextReplyToLine
}
