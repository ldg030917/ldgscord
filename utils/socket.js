const { getUserServers } = require('../models/Server');
const { getServerChannels } = require('../models/Channel');
const { verifyToken } = require('./jwt');

const setupSocket = (io) => {
    io.on("connection", async (socket) => {
        const token = socket.handshake.auth.token;
        try {
            const user = verifyToken(token);
            console.log("Auth User: ", user);
            const servers = await getUserServers(user.id);
            //console.log(servers);
            servers.forEach(async (server) => {
                socket.join(server.id);
                const channels = await getServerChannels(BigInt(server.id));
                channels.forEach(channel => {
                    socket.join(channel.id);
                })
                console.log('socket joined in Server id: ', server.id);
            });
        } catch (error) {
            console.log("Auth Failed: ", error);
            socket.disconnect();
        }
        console.log("user connected");

        socket.on('SEND_MESSAGE', (data) => {
            const user_id = verifyToken(token).id;
            const server_data = {
                serverId: data.serverId,
                channelId: data.channelId,
                content: data.content,
                user_id: user_id,
                created_at: Date.now(),
            }
            io.to(data.serverId).to(data.channelId).emit('SEND_MESSAGE', server_data);
            console.log('SEND_MESSAGE : ', server_data);
        });

        

        socket.send('서버 연결됨');
    });
};

const defalutF = () => {

};

module.exports = { setupSocket };