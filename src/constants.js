module.exports = {
  LINE_TOKEN: 'rRCKBIVwMVVEe3dQMbV/mugeNPyukd4oAi7Y4Pk9NSWceZvM3YcD6X1Yrubv6X4YdTMPTXBo8dd7FV6CvAVicXT76dQ/aoTPRhFXOfJ4CEMYI7OU/B/D+8TUjBfSlBRm5iR9ijosVGrx5pDQKamwagdB04t89/1O/w1cDnyilFU=', // ใส่ Channel access token
  LINE_API: 'https://api.line.me/v2/bot/message',
  FIREBASE: {
    PROJECT_ID: 'rv-health-monitor', // ใส่ projectId fore Firebase
    KEY_PATH: './src/key.json' // ที่อยู่ของ key json ของ firebase ไฟล์
  },
  URL_COPY_PASSWORD: 'https://example.com/v1/api/copy?text=', // แก้ไข url ที่ deploy เพื่อใช้งานจริงได้เลย
  URL_LOGO: 'https://images2.imgbox.com/7e/0b/Cz8AV24h_o.png',
  BOT_MSG: {
    ACCOUNT: 'กรุณาระบุชื่อ Account ที่ต้องการ',
    CONFIRM: 'คุณยืนยันทำรายการหรือไม่',
    DELETE: 'ลบ {name} เรียบร้อยแล้ว'
  }
}
