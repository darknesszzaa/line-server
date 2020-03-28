const line = require('../utils/line')
const axios = require("axios");
const { URL_COPY_PASSWORD, URL_LOGO, BOT_MSG } = require('../constants')
const url = 'http://covid.rvconnex.com';
const account = async (req, res) => {
  try {
    const replyToken = req.body.events[0].replyToken || 'no replyToken'
    const value = req.body.events[0].message.text || 'no text'

    const response = await axios.get('http://covid.rvconnex.com/authen/verify-line-login/' + req.body.events[0].source.userId);
    const data = response.data;

    if (data) {
      body = getBodySignIn(url, replyToken)
      line.sendReplyBodyToLine(replyToken, body)
      res.sendStatus(200)
      res.send('success')
    }




    switch (value.toLocaleUpperCase()) {
      case 'Daily Health Report':
        body = getBodyDailyHealthReport(url, replyToken)
        line.sendReplyBodyToLine(replyToken, body)
        break
      case 'Risk Report':
        break
      case 'History':
        break
      case 'Notice':
        break
      default:
        break
    }

    res.sendStatus(200)
    res.send('success')
  } catch (e) {
    console.log(e)
    res.sendStatus(200)
    res.send('success')
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
        type: "template",
        altText: "This is a buttons template",
        template: {
            type: "buttons",
            thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
            imageAspectRatio: "rectangle",
            imageSize: "cover",
            imageBackgroundColor: "#FFFFFF",
            title: "Menu",
            text: "Please select",
            defaultAction: {
                type: "uri",
                label: "View detail",
                uri: url
            },
            actions: [
                {
                  type: "postback",
                  label: "Buy",
                  uri: url
                },
                {
                  type: "postback",
                  label: "Add to cart",
                  uri: url
                },
                {
                  type: "uri",
                  label: "View detail",
                  uri: url
                }
            ]
        }
      }
    ]
  }
  return body
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
