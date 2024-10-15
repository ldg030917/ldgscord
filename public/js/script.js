async function loadServer () {
    try {
        const servers_res = await fetch('/api/servers');
        if (!servers_res.ok) {
            throw new Error('response not OK!');
        }
        const servers = await servers_res.json()

        console.log("servers:", servers);
        const channelsDiv = document.getElementById('channelsDiv');
        channelsDiv.innerHTML = ''

        //서버 정보를 div에 추가
        servers.forEach(server => {
            const serverBtn = document.createElement('button');
            serverBtn.textContent = server.servername;
            serverBtn.className = 'round-button';
            serverBtn.id = server.id;
            serverBtn.addEventListener('click', async () => {
                //window.location.href = `/channels/${server.id}`  새로고침하는 방법
                let cid = await loadChannels(server.id);
                //history.pushState(null, '', `/channels/${server.id}`);
                document.getElementById(cid).click();       //서버 버튼 입력 시 자동으로 첫 번째 채널 접속 
                console.log('s click:', serverBtn.id)
            })

            channelsDiv.appendChild(serverBtn);
        });
    }
    catch (error) {
        console.error(error)
    }
};

loadServer();

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
            chanBtn.textContent = channel.servername;
            chanBtn.id = channel.id;    //각 버튼마다 채널 id를 적용 => 서버 버튼 누를 시 채널 버튼 자동으로 눌리게 설정
            chanBtn.className = 'chan-btn';
            chanBtn.addEventListener('click', () => {
                console.log('c click');
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