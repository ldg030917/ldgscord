const socket = io()


document.getElementById('form').addEventListener('submit', function(e) {        //메시지를 보낼 때
    e.preventDefault(); // 기본 폼 제출 방지
    var input = document.getElementById('input')

    const urlparts = window.location.pathname.split('/');
    const server_id = urlparts[2];
    const channel_id = urlparts[3]; 
    console.log('cid:', channel_id);
    console.log('msg:', input.value);
    socket.emit('send', {
        sid: server_id,
        cid: channel_id,
        msg: input.value
    });
    input.value = ''
})

socket.on('connect', () => {
    console.log('connected to server!');
});

socket.on('update', (data) => {
    //location.replace(location.href);    //메시지를 업데이트 했다는 신호를 받으면, 업데이트 된 페이지로 현재 페이지를 대체, 원래 목표랑 다른 기능
    loadChats(data.cid);    //그냥 채팅창 새로 로딩ㅋㅋ
});