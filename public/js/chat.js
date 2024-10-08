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

/*
socket.on('update', function(data) {     //(본인 포함) 유저가 메세지를 보낸 것을 확인했을 때
    const li = document.createElement('li');   //리스트 생성
    const messagesContainer = document.getElementById('chat-container')
    li.textContent = `${data.uid}: ${data.msg} ${data.date}`    //메시지 내용 추가
    messagesContainer.appendChild(li);     //리스트에 추가
    window.scrollTo(0, document.body.scrollHeight)      // 스크롤 하단으로 이동
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
})*/

socket.on('update', (data) => {
    //location.replace(location.href);    //메시지를 업데이트 했다는 신호를 받으면, 업데이트 된 페이지로 현재 페이지를 대체, 원래 목표랑 다른 기능
    loadChats(data.cid);    //그냥 채팅창 새로 로딩ㅋㅋ
});