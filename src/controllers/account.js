const line = require('../utils/line');
const axios = require("axios");
const { URL_COPY_PASSWORD, URL_LOGO, BOT_MSG } = require('../constants');
const url = 'http://covid.rvconnex.com';
const account = async (req, res) => {
  const replyToken = req.body.events[0].replyToken || 'no replyToken';
  try {
    const value = req.body.events[0].message.text || 'no text'
    await axios.get(url + '/authen/verify-line-login/' + req.body.events[0].source.userId);
    console.log('replyToken ', replyToken);
    switch (value) {
      case 'Daily Health Report':
        body = getBodyDailyHealthReport(url, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'Risk Report':
        body = getBodyRiskReport(url, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'History':
        body = getBodyHistoryReport(url, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'Notice':
        body = getBodyNews(url, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      default:
        break;
    }
    res.status(200).send('success')
  } catch (e) {
    body = getBodySignIn(url, replyToken)
    line.sendReplyBodyToLine(replyToken, body)
    res.status(200).send('success')
  }
};

function getBodyDailyHealthReport(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "this is a buttons template",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "รายงานสุขภาพ",
              uri: url + "/health-report"
            }
          ],
          thumbnailImageUrl: "https://c.pshere.com/photos/44/50/checking_checklist_daily_report_data_document_hand_health_healthcare-1001745.jpg!d",
          title: "รายงานสุขภาพ",
          text: "Daily Health Report"
        }
      }
    ]
  };
  return body;
}

function getBodyRiskReport(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "this is a buttons template",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "แบบประเมินความเสี่ยง",
              uri: url + "/risk-report"
            }
          ],
          thumbnailImageUrl: "https://png.pngtree.com/png-vector/20190622/ourlarge/pngtree-checklistcheckexpertiselistclipboard-flat-color-icon-vec-png-image_1490531.jpg",
          title: "แบบประเมินความเสี่ยง",
          text: "Risk Report"
        }
      }
    ]
  };
  return body;
}

function getBodyHistoryReport(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "this is a buttons template",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "ประวัติของตนเอง",
              uri: url + "/history"
            },
            {
              type: "uri",
              label: "ประวัติของสมาชิกทีม",
              uri: url + "/history"
            }
          ],
          thumbnailImageUrl: "https://png.pngtree.com/png-vector/20190622/ourlarge/pngtree-checklistcheckexpertiselistclipboard-flat-color-icon-vec-png-image_1490531.jpg",
          title: "ประวัติการรายงาน",
          text: "History Report"
        }
      }
    ]
  };
  return body;
}

function getBodyNews(url, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "this is a buttons template",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "ดูรายการประกาศ",
              uri: url + "/news"
            }
          ],
          thumbnailImageUrl: "https://cdn3.vectorstock.com/i/1000x1000/26/32/megaphone-announcement-vector-272632.jpg",
          title: "ประกาศข่าวสาร",
          text: "Announcement"
        }
      }
    ]
  };
  return body;
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
  };
  return body;
}

module.exports = {
  account
};
