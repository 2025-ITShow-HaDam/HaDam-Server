const WebSocket = require('ws');
const cron = require('node-cron');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('클라이언트 웹소켓 연결됨');
  clients.add(ws);

  ws.on('close', () => {
    console.log('클라이언트 연결 종료');
    clients.delete(ws);
  });
});

cron.schedule('0 0 12 * * *', () => {
  const timestamp = new Date();
  const message = JSON.stringify({ type: 'EVENT_START', timestamp });

  console.log('이벤트 시작 메시지 전송 중');
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
});
