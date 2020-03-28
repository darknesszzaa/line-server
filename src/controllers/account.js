const line = require('../utils/line')
const axios = require("axios");
const { URL_COPY_PASSWORD, URL_LOGO, BOT_MSG } = require('../constants')
const url = 'http://covid.rvconnex.com';
const account = async (req, res) => {
  const replyToken = req.body.events[0].replyToken || 'no replyToken'
  try {
    const value = req.body.events[0].message.text || 'no text'
    await axios.get('http://covid.rvconnex.com/authen/verify-line-login/' + req.body.events[0].source.userId);

    switch (value) {
      case 'Daily Health Report':
        console.log(value)
        body = getBodyDailyHealthReport(url, replyToken)
        line.sendReplyBodyToLine(replyToken, body)
        break
      case 'Risk Report':
        console.log(value)
        break
      case 'History':
        console.log(value)
        break
      case 'Notice':
        console.log(value)
        break
      default:
        break
    }
    res.status(200).send('success')
  } catch (e) {
    body = getBodySignIn(url, replyToken)
    line.sendReplyBodyToLine(replyToken, body)
    res.status(200).send('success')
  }
}

function getBody(url, name, password, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: 'User Account',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: URL_LOGO,
            action: {
              type: 'uri',
              uri: url
            }
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            action: {
              type: 'uri',
              uri: url
            },
            contents: [
              {
                type: 'text',
                text: 'User Account',
                size: 'xl',
                weight: 'bold',
                align: 'center'
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'text',
                        text: 'Name',
                        weight: 'bold',
                        margin: 'sm',
                        flex: 0
                      },
                      {
                        type: 'text',
                        text: name,
                        size: 'sm',
                        align: 'end',
                        color: '#aaaaaa'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    contents: [
                      {
                        type: 'text',
                        text: 'Password',
                        weight: 'bold',
                        margin: 'sm',
                        flex: 0
                      },
                      {
                        type: 'text',
                        text: password,
                        size: 'sm',
                        align: 'end',
                        color: '#aaaaaa'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'spacer',
                size: 'xxl'
              },
              {
                type: 'button',
                style: 'primary',
                color: '#3949ab',
                action: {
                  type: 'uri',
                  label: 'Open Copy Password',
                  uri: url
                }
              }
            ]
          }
        }
      }
    ]
  }
  return body
}

function getBodyDailyHealthReport(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: 'Daily Health',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: URL_LOGO,
            action: {
              type: 'uri',
              uri: url
            }
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            action: {
              type: 'uri',
              uri: url
            },
            contents: [
              {
                type: 'text',
                text: 'Daily Health Report',
                size: 'xl',
                weight: 'bold',
                align: 'center'
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'spacer',
                size: 'xxl'
              },
              {
                type: 'button',
                style: 'primary',
                color: '#3949ab',
                action: {
                  type: 'uri',
                  label: 'Daily Health Report',
                  uri: url
                }
              }
            ]
          }
        }
      }
    ]
  }
  return body
}

function getBodySignIn(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: 'Sigin In',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: URL_LOGO,
            action: {
              type: 'uri',
              uri: url
            }
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            action: {
              type: 'uri',
              uri: url
            },
            contents: [
              {
                type: 'text',
                text: 'RV Health Monitoring',
                size: 'xl',
                weight: 'bold',
                align: 'center'
              }
            ]
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'spacer',
                size: 'xxl'
              },
              {
                type: 'button',
                style: 'primary',
                color: '#3949ab',
                action: {
                  type: 'uri',
                  label: 'Sign In',
                  uri: url
                }
              }
            ]
          }
        }
      }
    ]
  }
  return body
}

function getBodyAll(data, replyToken) {
  let contents = []
  for (let i in data) {
    contents.push({
      type: 'box',
      layout: 'baseline',
      contents: [
        {
          type: 'text',
          text: 'Name',
          weight: 'bold',
          margin: 'sm',
          flex: 0
        },
        {
          type: 'text',
          text: data[i].name,
          size: 'sm',
          align: 'end',
          color: '#aaaaaa'
        }
      ]
    })
  }

  body = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: 'User Account',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: URL_LOGO
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            contents: [
              {
                type: 'text',
                text: 'User Account',
                size: 'xl',
                weight: 'bold',
                align: 'center'
              },
              {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: contents
              }
            ]
          }
        }
      }
    ]
  }
  return body
}

module.exports = {
  account
}
