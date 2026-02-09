const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let totalUsers = 0;

io.on('connection', (socket) => {
    totalUsers++;
    console.log(`User connected. ID: ${socket.id} | Total: ${totalUsers}`);

    socket.emit('assign_id', totalUsers);

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});