//channel

// script.js
// DOM 요소 가져오기
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementsByClassName("close")[0];

// 모달 열기
openModalButton.onclick = function() {
    modal.style.display = "block";
}

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