async function loadfriends() {
    const f_res = await fetch('/api/friend');
    if(!f_res.ok) {
        throw new Error('response not OK!');
    }
    const friends = await f_res.json();

    const flist = document.getElementById("friendlist");

    friends.forEach(friend => {
        const friendBtn = document.createElement('button');
        friendBtn.id = 'u' + friend.fid;
        friendBtn.className = 'round-button';
        friendBtn.textContent = friend.fname;
        friendBtn.addEventListener('click', () => {
            history.pushState(null, '', `/channels/@me/${friend.fid}`);
        })
        flist.appendChild(friendBtn);
    });
}

loadfriends();

document.addEventListener("click", (event) => {
    if (event.target.matches("button[data-info]")) {
        const contentId = event.target.getAttribute("data-info");
        showContent(contentId);
    }
});
  
function showContent(contentId) {
    // 모든 콘텐츠 숨기기
    document.querySelectorAll(".content1").forEach(content => {
        content.style.display = "none";
    });
    // 선택된 콘텐츠만 표시
    const selectedContent = document.querySelector(`.content1[data-info="${contentId}"]`);
    if (selectedContent) {
        selectedContent.style.display = "flex";
    }
}

const afi = document.getElementById('addfriendinput');
const afb = document.getElementById('addfriendBtn');

afb.addEventListener('click', async () => {
    const receiver_id = afi.value.trim();
    afi.value = '';

    if (receiver_id === '') return;
    fetch('/api/friend_req', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiver_id: receiver_id
        })
    })
    .then(response => {
        if(!response.ok) {
            console.log(response);
            throw new Error('Response not ok!');
        }
        return response.json();
    })
    .then(response => {

        console.log(response);
        alert('친구 요청이 전송되었습니다.');
    });
    console.log("Y");
})

const pbtn = document.getElementById("pending");
const AcceptfriendreqBtn = document.querySelector(".AcceptfriendreqBtn");
const pendinglist = document.getElementById("pending-list");

pbtn.addEventListener('click', () => {
    pendinglist.innerHTML = '';
    fetch('/api/friend_req')
    .then(res => {
        if(!res.ok) {
            console.log(res);
            throw new Error('Response not ok!');
        }
        return res.json();
    })
    .then(requests => {
        requests.forEach(request => {
            let clone = AcceptfriendreqBtn.cloneNode(true);
            clone.children[0].textContent = request.username;
            clone.children[1].addEventListener("click", () => {
                ReactionbyRequest(1, request.id);
                clone.style.display = "none";
                loadfriends();
            });
            clone.children[2].addEventListener("click", () => {
                ReactionbyRequest(0, request.id);
                clone.style.display = "none";
                loadfriends();
            });
            clone.style.display = "flex";
            pendinglist.appendChild(clone);
        })
    })
})

function ReactionbyRequest(isaccept, sender_id) {
    fetch('/api/friend_req', {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isaccept: isaccept,
            sender_id: sender_id
        })
    })
}

