var socket = io()


document.getElementById('form').addEventListener('submit', function(e) {        //메시지를 보낼 때
    e.preventDefault(); // 기본 폼 제출 방지
    var input = document.getElementById('input')
    console.log('msg:', input.value)
    socket.emit('send', input.value)
    input.value = ''
})

socket.on('update', function(data) {     //(본인 포함) 유저가 메세지를 보낸 것을 확인했을 때
    const li = document.createElement('li');   //리스트 생성
    const messagesContainer = document.getElementById('messages')
    li.textContent = `${data.uid}: ${data.msg}`    //메시지 내용 추가
    messagesContainer.appendChild(li);     //리스트에 추가
    window.scrollTo(0, document.body.scrollHeight)      // 스크롤 하단으로 이동
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
})