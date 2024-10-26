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

    if (id === '') return;
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
            throw new Error('Response not ok!');
        }
        return response.json();
    })
    .then(response => {
        
    });
})