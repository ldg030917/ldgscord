const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const { setupSocket } = require('./utils/socket');
const { authToken } = require('./utils/jwt');

//Routes
const authRouter = require('./routes/authRoutes');
const serverRouter = require('./routes/serverRoutes');
const channelRouter = require('./routes/channelRoutes');
const userRouter = require('./routes/userRoutes');

//server, io, app 설정
const app = express();
const server = http.createServer(app)

const corsOptions = {
    origin: ["http://3.25.29.33:5000", "http://localhost:3000"],
    credentials: true,
}
app.use(cors(corsOptions));

const io = socketIo(server, {cors: corsOptions});
setupSocket(io);

app.use(express.static(path.join(__dirname, 'public', 'build')));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRouter);
app.use('/api', authToken, serverRouter);
app.use('/api', authToken, channelRouter);
app.use('/api', authToken, userRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });

server.listen(5000,  () => {
    console.log("start server at port 5000");
});