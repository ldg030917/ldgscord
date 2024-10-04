//channel

// script.js
// DOM 요소 가져오기
const modal = document.getElementById("myModal");
const closeModalButton = document.getElementsByClassName("close")[0];

// 모달 닫기
closeModalButton.onclick = function() {
    modal.style.display = "none";
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// 행동하기 버튼 클릭 시 처리
document.getElementById("actionButton").onclick = function() {
    //서버를 만드는 행동 추가

    alert("행동이 수행되었습니다!"); // 원하는 행동 추가
}


const dmButton = document.getElementById("dmButton");

dmButton.addEventListener('click', function () {
    //주소 변경
    history.pushState(null, '', '/channels/@me');

    //컨텐츠 로드
    //loadContent();
});

fetch('/api/servers')
    .then(response => {
        if (!response.ok) {
            throw new Error('response not OK!')
        }   
        return response.json();
    })
    .then(servers => {
        console.log(servers);
        const channelsDiv = document.getElementById('channels');

        //서버 정보를 div에 추가
        servers.forEach(server => {
            const serverBtn = document.createElement('button');
            serverBtn.textContent = server.servername;
            serverBtn.className = 'round-button';
            serverBtn.addEventListener('click', () => {
                //window.location.href = `/channels/${server.id}`  새로고침하는 방법
                
                history.pushState(null, '', `/channels/${server.id}`);

                loadChannels(server)
            })

            channelsDiv.appendChild(serverBtn);
        });

        const pButton = document.createElement('button')
        pButton.textContent = '+'
        pButton.classList = 'round-button'
        pButton.id = 'openModalButton'
        pButton.addEventListener('click', () => {       //모달 열기
            modal.style.display = "block";
        })

        channelsDiv.appendChild(pButton)
    })
    .catch(error => {
        console.error(error)
    });

async function loadChannels(server) {
    try {
        //서버의 채널 가져오기
        const Chan_res = await fetch(`/api/server/${server.id}`)
        if (!Chan_res.ok) {
            throw new Error('채널을 가져오는데 실패했습니다.');
        }
        const channels = await Chan_res.json()

        const cont = document.getElementById('chat-container');
        cont.innerHTML = '';    //로딩 전 기존 버튼 삭제

        channels.forEach(channel => {
            const chanBtn = document.createElement('button');
            chanBtn.textContent = channel.name;
            chanBtn.className = 'chan-btn';
            chanBtn.addEventListener('click', () => {
                history.pushState(null, '', `/channels/${server.id}/${channel.id}`)
            })
            cont.appendChild(chanBtn)

        });
    }
    catch (error) {
        console.error("ERROR:", error);
    }
}

/*
document.getElementById('channel').addEventListener('click', function() {      //채널 객체 클릭 시
    console.log('click')
    //fetch API를 사용해 서버로부터 데이터 가져옴
    fetch('/')
        .then(response => response.text)    //응답을 텍스트로 변환
        .then(data => {
            console.log(data)
            document.getElementById('channel-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
*/