var socket = io()

socket.on('connect', function() {
    var input = document.getElementById('input')
    input.value = 'connected'
    console.log('con')
})

function send() {
    var msg = document.getElementById('input').value
    document.getElementById('input').value = ''
    socket.emit('send', {msg: msg})
    console.log("SEND!!!")
}

/*
    <script>
        const socket = io();

        const form = document.getElementById('form');
        const input = document.getElementById('input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value) {
                socket.emit('send', input.value); // 메시지를 소켓으로 전송
                input.value = ''; // 입력란 초기화
            }
        });

        socket.on('send', (msg) => {
            const item = document.createElement('li'); // 새로운 리스트 아이템 생성
            item.textContent = msg; // 메시지 설정
            document.getElementById('messages').appendChild(item); // 리스트에 추가
            window.scrollTo(0, document.body.scrollHeight); // 스크롤 하단으로 이동
        });
    </script>
*/