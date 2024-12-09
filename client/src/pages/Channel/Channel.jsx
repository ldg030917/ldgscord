
// Channel.js
import React from 'react';

function ChannelPage() {
  return (
    <div>
      <h1>Welcome to the Channels Page</h1>
      {/* 여기에 채널 관련 UI 추가 */<div id="app">
  <div id="main-cont1">
    <button id="dmButton" className="round-button">
      <i className="fa-brands fa-discord fa-2x" />
    </button>
    <div id="channelsDiv" />
    <button id="openModalButton" className="round-button">
      <i className="fa-solid fa-plus" />
    </button>
  </div>
  <div id="main-cont2">
    <div className="server-state">
      <div id="server-header">
        <a>{/*서버 이름 들어갈 곳*/}</a>
        <i className="fa-solid fa-angle-down" />
      </div>
      <div className="channel-index-container">
        <div className="chancont-header">
          <span id="togglebtn1">
            <i className="fa-solid fa-angle-right" />
            <a>채팅 채널</a>
          </span>
          <i id="ch-create" className="fa-solid fa-plus" />
        </div>
        <div id="channel-index"></div>
      </div>
    </div>
    <div className="dm-state">
      <div>대화 찾기 또는 시작하기</div>
      <div>
        <button>친구</button>
      </div>
      <div id="friendlist"></div>
    </div>
  </div>
  <div id="main-cont3">
    <div id="chat-header">
      <div className="server-state">
        <a id="channel-name-header" />
        <span></span>
      </div>
      <div className="dm-state">
        <div>
          <a>친구</a>
          <button data-info="online" className="dmBtn">
            온라인
          </button>
          <button id="pending" data-info="pending" className="dmBtn">
            대기 중
          </button>
          <button data-info="addfriend" className="dmBtn">
            친구 추가하기
          </button>
        </div>
        <div></div>
      </div>
    </div>{" "}
    {/*채널 이름 담을 헤더*/}
    <div id="main-cont3-body">
      <div className="server-state">
        <div id="chat-container" />
        <form id="form" className="chatbox">
          <textarea
            id="input"
            className="chatinput"
            rows={1}
            autoComplete="off"
            required=""
            defaultValue={""}
          />
          <button type="submit" className="invBtn" />
        </form>
      </div>
      <div className="dm-state">
        <div data-info="online" className="content1" />
        <div data-info="pending" className="content1">
          <p>대기 중</p>
          <div id="pending-list" />
        </div>
        <div data-info="addfriend" className="content1">
          <div className="friend-request-container">
            <input
              id="addfriendinput"
              type="text"
              placeholder="사용자 id 번호를 사용하여 친구를 추가할 수 있어요."
            />
            <button id="addfriendBtn">친구 요청 보내기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close">×</span>
      <h2>서버를 만들어보세요</h2>
      <p>
        서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를
        시작해보세요.
      </p>
      <div className="mini-btn-container">
        <form id="serverform">
          <input id="servername" placeholder="My Server" required="" />
          <button id="actionButton" className="rect-button" type="submit">
            직접 만들기
          </button>
        </form>
      </div>
    </div>
  </div>
  <div id="chModal" className="modal">
    <div className="modal-content">
      <span className="close">x</span>
      <h2>채널 만들기</h2>
      <form id="channelform">
        <input id="channelname" placeholder="새로운 채널" required="" />
        <button className="" type="submit">
          채널 만들기
        </button>
      </form>
    </div>
  </div>
  <div id="channelMenu" className="customMenu">
    <div id="invchan" className="cmbtn">
      초대하기
    </div>
    <div className="cmbtn">채널 편집</div>
    <div className="cmbtn">채팅 채널 만들기</div>
    <div id="delchan" className="cmbtn">
      채널 삭제하기
    </div>
  </div>
  <div className="AcceptfriendreqBtn">
    <div className="user">{/*프론트 작업하면 좋을 듯?*/}</div>
    <div>
      <i className="fa-solid fa-check" />
    </div>
    <div>
      <i className="fa-solid fa-xmark" />
    </div>
  </div>
  <div id="serverMenu" className="customMenu">
    <div className="cmbtn">
      <a>초대하기</a>
      <i className="fa-solid fa-user-plus" />
    </div>
    <div className="cmbtn">
      <a>서버 설정</a>
      <i className="fa-solid fa-gear" />
    </div>
    <div className="cmbtn">
      <a>채널 만들기</a>
      <i className="fa-solid fa-circle-plus" />
    </div>
    <div className="cmbtn">
      <a>알림 설정</a>
      <i className="fa-solid fa-bell" />
    </div>
    <div className="cmbtn">
      <a>서버 프로필 편집</a>
      <i className="fa-solid fa-pen" />
    </div>
  </div>
  <div className="text-box" style={{ display: "none" }}></div>
</div>
}
    </div>
  );
}

export default ChannelPage;