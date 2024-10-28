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
/**state 값이 1이면 dm-state, 0이면 server-state로 바꿔주는 함수 */
function changeState(state) {
    const dmstate = document.querySelectorAll('.dm-state');
    const serverstate = document.querySelectorAll('.server-state');
    if (state){
        dmstate.forEach(elt => {
            elt.style.display = 'block';
        })
        serverstate.forEach(elt => {
            elt.style.display = 'none';
        })
    }
    else {
        dmstate.forEach(elt => {
            elt.style.display = 'none';
        })
        serverstate.forEach(elt => {
            elt.style.display = 'block';
        })
    }
    
}

changeState(1);

const dmButton = document.getElementById("dmButton");

dmButton.addEventListener('click', function () {
    //주소 변경
    history.pushState(null, '', '/channels/@me');
    changeState(1)
    //컨텐츠 로드
    //loadContent();
});


document.getElementById('openModalButton').addEventListener('click', () => {       //모달 열기
    modal.style.display = "block";
})

let icons = ['fa-solid fa-xmark'];
document.getElementById('server-header').addEventListener("click", (e) => {
    let icon = document.getElementById('server-header').querySelector('i');
    icons.push(icon.className);
    icon.className = icons.shift();
    const menu = document.getElementById('serverMenu');
    const btnp = document.getElementById('server-header').getBoundingClientRect();
    menu.style.display = "block";
    menu.style.top = `${btnp.bottom + 5}px`;
    menu.style.left = `${btnp.left + (btnp.width - menu.offsetWidth)/2}px`;
    menu.style.display = "none";
    if (icon.className == 'fa-solid fa-xmark') {
        menu.style.display = "flex";
        console.log("YYY", menu.style.display)
    }
    else {
        menu.style.display = "none";
    }
});

let icons2 = ['fa-solid fa-angle-down']
const togglebtn = document.getElementById('togglebtn1');
togglebtn.addEventListener("click", () => {
    let icon = togglebtn.querySelector('i');
    icons2.push(icon.className);
    icon.className = icons2.shift();
});
