const togglebtn = document.getElementById('togglebtn1');

let o = 0;
togglebtn.addEventListener('click', () => {
    if (!o) {
        togglebtn.textContent = "v 채팅 채널"
        o = 1;
    }
    else {
        togglebtn.textContent = "> 채팅 채널"
        o = 0;
    }
    
})

const createbtn = document.getElementById('ch-create');

createbtn.addEventListener('click', () => {
    const modal = document.getElementById('chModal');
    modal.style.display= 'flex'
})

const elements = document.getElementsByClassName("close");

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (event) => {
        const modal = event.target.closest('.modal');       //closest로 가장 가까운 부모 모달 선택
        modal.style.display = "none";
    })
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


document.getElementById('openModalButton').addEventListener('click', () => {       //모달 열기
    modal.style.display = "block";
})
