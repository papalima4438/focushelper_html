const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Simulate sending EEG data to the client every second
    setInterval(() => {
        const eegData = {
            value: Math.random() * 200 // Simulate EEG data value between 0 and 200
        };
        ws.send(JSON.stringify(eegData));
    }, 1000);

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
