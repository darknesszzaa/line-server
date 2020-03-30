const line = require('../utils/line');
const axios = require("axios");
const { URL_API } = require('../constants');
const url = URL_API;
const account = async (req, res) => {
  const replyToken = req.body.events[0].replyToken || 'no replyToken';
  try {
    const value = req.body.events[0].message.text || 'no text'
    const userData = await axios.get(url + '/authen/verify-line-login/' + req.body.events[0].source.userId);

    console.log(req.body.events[0])

    if (req.body.events[0].message.type && req.body.events[0].message.type === 'location') {
      await axios.post(url + '/timeline', {
        userId: req.body.events[0].source.userId, address: req.body.events[0].message.address,
        title: req.body.events[0].message.title, latitude: req.body.events[0].message.latitude, longitude: req.body.events[0].message.longitude
      }, {
        headers: { Authorization: "Bearer " + userData.data.token }
      });
      line.sendTextReplyToLine(replyToken, 'บันทึกข้อมูลเรียบร้อยแล้ว');
    }


    switch (value) {
      case 'Daily Health Report':
        body = getBodyDailyHealthReport(url, userData.data.token, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'Risk Report':
        body = getBodyRiskReport(url, userData.data.token, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'History':
        if (userData.data.isLeader) {
          body = getBodyHistoryLeaderReport(url, userData.data.token, userData.data.id, replyToken);
        } else {
          body = getBodyHistoryReport(url, userData.data.token, userData.data.id, replyToken);
        }
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'Notice':
        body = getBodyNews(url, userData.data.token, replyToken);
        line.sendReplyBodyToLine(replyToken, body);
        break;
      case 'Timeline':
        const timelineList = await axios.get(url + '/timeline/user', {
          headers: { Authorization: "Bearer " + userData.data.token }
        });
        body = getBodyTimeline(url, userData.data.token, replyToken);
        if (timelineList.data.length === 1) {
          if (!timelineList.data[0].title) {
            timelineList.data[0].title = '';
          }
          locationJounry = getLocationJounry(timelineList.data[0].date, timelineList.data[0].title, timelineList.data[0].address);
          body.messages[0].contents.body.contents.push(locationJounry);
        } else if (timelineList.data.length > 1) {
          if (!timelineList.data[0].title) {
            timelineList.data[0].title = '';
          }
          locationJounry = getLocationJounry(timelineList.data[0].date, timelineList.data[0].title, timelineList.data[0].address);
          body.messages[0].contents.body.contents.push(locationJounry);

          for (let index = 1; index < timelineList.data.length; index++) {
            const timeline = timelineList.data[index];
            lineJounry = getLineJounry();
            body.messages[0].contents.body.contents.push(lineJounry);
            if (!timeline.title) {
              timeline.title = '';
            }
            locationJounry = getLocationJounry(timeline.date, timeline.title, timeline.address);
            body.messages[0].contents.body.contents.push(locationJounry);
          }
        }
        line.sendReplyBodyToLine(replyToken, body);
        break;
      default:
        break;
    }
    res.status(200).send('success');
  } catch (e) {
    body = getBodySignIn(url, req.body.events[0].source.userId, replyToken);
    line.sendReplyBodyToLine(replyToken, body);
    res.status(200).send('success');
  }
};

function getBodyDailyHealthReport(url, token, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "health-report",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "รายงานสุขภาพ",
              uri: url + "/health-report/" + token
            },
            {
              type: "location",
              title: "My Location",
              label: "รายงานการเดินทาง",
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

function getLineJounry() {
  data = {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "filler"
          }
        ],
        flex: 1
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "filler"
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "filler"
                  }
                ],
                width: "2px",
                backgroundColor: "#6486E3"
              },
              {
                type: "filler"
              }
            ],
            flex: 1
          }
        ],
        width: "12px"
      },
      {
        type: "text",
        gravity: "center",
        flex: 4,
        size: "xs",
        color: "#8c8c8c",
        text: " "
      }
    ],
    spacing: "lg",
    height: "64px"
  };
  return data;
}

function getLocationJounry(date, title, address) {
  data = {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "text",
        text: new Date(date).toLocaleString('th-TH', {
          timeZone: 'asia/bangkok'
        }),
        size: "xxs",
        position: "relative",
        wrap: true
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "filler"
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "filler"
              }
            ],
            cornerRadius: "30px",
            height: "12px",
            width: "12px",
            borderColor: "#6486E3",
            borderWidth: "2px"
          },
          {
            type: "filler"
          }
        ],
        flex: 0
      },
      {
        type: "text",
        text: title + " " + address,
        gravity: "center",
        flex: 4,
        size: "xxs",
        wrap: true
      }
    ],
    spacing: "lg",
    cornerRadius: "0px",
    margin: "xl"
  };
  return data;
}

function getBodyTimeline(url, token, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: 'Timeline',
        contents: {
          type: "bubble",
          size: "giga",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ประวัติการเดินทางย้อนหลัง",
                    color: "#ffffff",
                    size: "lg",
                    flex: 1,
                    weight: "bold",
                    margin: "none"
                  }
                ]
              }
            ],
            paddingAll: "20px",
            backgroundColor: "#0367D3",
            spacing: "md",
            height: "60px",
            paddingTop: "22px"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: []
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "ดูแผนที่",
                  text: "แผนที่ - เร็วๆนี้ ไม่นานเกินรอ"
                },
                color: "#0367D3",
                flex: 1,
                style: "primary"
              }
            ]
          },
          styles: {
            footer: {
              backgroundColor: "#FFFFFF"
            }
          }
        }
      }
    ]
  };
  return body;
}

function getBodyRiskReport(url, token, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "risk-report",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "แบบประเมินความเสี่ยง",
              uri: url + "/risk-report/" + token
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

function getBodyHistoryReport(url, token, id, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "history",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "ประวัติของตนเอง",
              uri: url + "/history/" + token + '/' + id
            },
            {
              type: "message",
              label: "ประวัติการเดินทาง",
              text: "Timeline"
            }
          ],
          thumbnailImageUrl: "https://www.homeworkrecords.net/wp-content/uploads/2019/08/Information.jpg",
          title: "ประวัติการรายงาน",
          text: "History Report"
        }
      }
    ]
  };
  return body;
}

function getBodyHistoryLeaderReport(url, token, id, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "history",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "ประวัติของตนเอง",
              uri: url + "/history/" + token + '/' + id
            },
            {
              type: "message",
              label: "ประวัติการเดินทาง",
              text: "Timeline"
            },
            {
              type: "uri",
              label: "ประวัติของสมาชิกทีม",
              uri: url + "/history/teammember/" + token + '/' + id
            }
          ],
          thumbnailImageUrl: "https://www.homeworkrecords.net/wp-content/uploads/2019/08/Information.jpg",
          title: "ประวัติการรายงาน",
          text: "History Report"
        }
      }
    ]
  };
  return body;
}

function getBodyNews(url, token, replyToken) {
  body = {
    replyToken: replyToken,
    messages: [
      {
        type: "template",
        altText: "news",
        template: {
          type: "buttons",
          actions: [
            {
              type: "uri",
              label: "ดูรายการประกาศ",
              uri: url + "/news/" + token
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

function getBodySignIn(url, userId, replyToken) {
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
            url: 'https://yt3.ggpht.com/a/AGF-l7_zOh3DStGbUiDILMTVPPdvQ4XzACADFXvhNQ=s900-c-k-c0xffffffff-no-rj-mo',
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
                  uri: url + '/login-line/' + userId
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
