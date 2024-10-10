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
