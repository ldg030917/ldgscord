//channel

// script.js
// DOM 요소 가져오기
const modal = document.getElementById('myModal')
const closeModalButton = document.getElementsByClassName("close")[0];

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
            serverBtn.id = 'sid' + server.id;
            serverBtn.addEventListener('click', async () => {
                //window.location.href = `/channels/${server.id}`  새로고침하는 방법
                let cid = await loadChannels(server.id);
                //history.pushState(null, '', `/channels/${server.id}`);
                document.getElementById(cid).click();       //서버 버튼 입력 시 자동으로 첫 번째 채널 접속 
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

const customMenu = document.getElementById('customMenu')      //채널 우클릭 시 뜰 팝업창
let selectedId = '';

async function loadChannels(sid) {       //채널 로드
    try {
        //서버의 채널 가져오기
        const Chan_res = await fetch(`/api/server/${sid}`)
        if (!Chan_res.ok) {
            throw new Error('채널을 가져오는데 실패했습니다.');
        }
        const channels = await Chan_res.json()

        const cont = document.getElementById('channel-index');
        cont.innerHTML = '';    //로딩 전 기존 버튼 삭제

        channels.forEach(channel => {
            const chanBtn = document.createElement('button');
            chanBtn.textContent = channel.name;
            chanBtn.id = channel.id;    //각 버튼마다 채널 id를 적용 => 서버 버튼 누를 시 채널 버튼 자동으로 눌리게 설정
            chanBtn.className = 'chan-btn';
            chanBtn.addEventListener('click', () => {
                history.pushState(null, '', `/channels/${sid}/${channel.id}`)
                loadChats(channel.id)
            })
            chanBtn.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                customMenu.style.display = 'flex';
                customMenu.style.left = `${event.pageX}px`  //마우스 x 위치
                customMenu.style.top = `${event.pageY}px`   //마우스 y 위치
                selectedId = event.target.id;
            });
            cont.appendChild(chanBtn)        
        });
        //console.log('cid:', channels[0].id)
        return channels[0].id        //첫번째 채널 id 반환
    }
    catch (error) {
        console.error("ERROR:", error);
        return null;
    }
}

document.addEventListener('click', () => {
    customMenu.style.display = 'none';
})

async function loadChats(cid) {     //채팅 로드
    try {
        //채널의 메시지 가져오기
        const Chat_res = await fetch(`/api/channel/${cid}`);
        if (!Chat_res.ok) {
            throw new Error('채팅을 불러오기 실패!');
        }
        const chat = await Chat_res.json()

        const cont = document.getElementById('chat-container');
        cont.innerHTML = '';

        chat.forEach(msg => {
            const box = document.createElement('div');
            box.textContent = `${msg.username}: ${msg.content}   ${msg.sent_at}`;
            box.className = 'text-box';
            cont.appendChild(box);
        })
    }
    catch (error) {
        console.error("ERROR:", error);
        return null;
    }
}

document.getElementById('channelform').addEventListener('submit', (event) => {
    event.preventDefault();     //폼 제출 기본 동작 방지

    const channelname = document.getElementById('channelname').value;
    //console.log(channelname, window.location.pathname.split('/')[2])
    urlparts = window.location.pathname.split('/');
    sid = urlparts[2]
    cid = urlparts[3]

    fetch('/api/create/channel', {
        method: 'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            channelname: channelname,
            sid: sid
        })
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("network error");
        }
        return response.json();
    })
    .then(data => {
        //데이터 받음
    })
    .catch(error => {
        //에러 발생 시
    });
    document.getElementById('chModal').style.display = "none";
    loadChannels(sid)
    document.getElementById(cid).click()
})

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

document.getElementById('delchan').addEventListener('click', () => {
    fetch(`/api/delete/${selectedId}`, {
        method: 'delete'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("오류가 발생했습니다.");
        }
        return response.json();
    })
    .then(data => {

    })
    sid = window.location.pathname.split('/')[2];
    document.getElementById('sid'+sid).click();
})