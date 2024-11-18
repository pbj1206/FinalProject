/* var hostIndex = location.href.indexOf(location.host) + location.host.length;
var contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1)); */
var listFlag = false;
var msgFlag = false;
var defaultChat = -1;
var chatList;
var lastMsgList;
var member;
var firstChatGroup = -1;
var roomId;
var chatMessageIn = [];

async function getChattingList() {

  let data = {
    memNo: MEM_NO
  }

  $.ajax({
    url: "/synerhub/chat/getChattingList",
    type: "post",
    async: false,
    beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {
      listFlag = true;
      chatList = res;
    }
  })
}

async function getLastMsgList() {

  $.ajax({
    url: "/synerhub/chat/getLastMsgList",
    type: "get",
    async: false,
    beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
      xhr.setRequestHeader(header, token);
    },
    success: async function (res) {
      msgFlag = true;
      lastMsgList = res;
    }
  })
}


async function chatopen() {
  defaultChat = -1;
  chatList = null;
  lastMsgList = null;
  member = null;
  firstChatGroup = -1;
  roomId = null;
  getChattingList();
  getLastMsgList();

  if (listFlag && msgFlag) {

    let data = {
      memNo: MEM_NO
    }

    $.ajax({
      url: "/synerhub/chat/getUser",
      type: "post",
      async: false,
      beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
        xhr.setRequestHeader(header, token);
      },
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: async function (res) {
        member = res;
        var html = "";
        html += `<div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">채팅</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <a href="{contextPath}/main/index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">Chat</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card overflow-hidden chat-application">
        <div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
          <button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
            <i class="ti ti-menu-2 fs-5"></i>
          </button>
          <form class="position-relative w-100">
            <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Contact" />
            <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
          </form>
        </div>
        <div class="d-flex">
          <div class="w-30 d-none d-lg-block border-end user-chat-box">
            <div class="px-4 pt-9 pb-6">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <div class="position-relative">
                    <img src="${contextPath}${res.memPrflimg}" alt="user1" width="54" height="54" class="rounded-circle" />
                  </div>
                  <div class="ms-3">
                    <h6 class="fw-semibold mb-2">`+ MEM_NAME + `</h6> 
                    <p class="mb-0 fs-2">`+ MEM_EMAIL + `</p>
                  </div>
                </div>
                <div class="dropdown" id="createBtn">
                  <a class="text-dark fs-6 nav-icon-hover" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ti ti-circle-plus fs-8"></i>
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-settings fs-4"></i>
                        </p>Setting
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-help fs-4"></i>
                        </p>Help
                        and feedback
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-layout-board-split fs-4"></i>
                        </p>Enable split View mode
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-table-shortcut fs-4"></i>
                        </p>Keyboard
                        shortcut
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-login fs-4"></i>
                        </p>Sign
                        Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <form class="position-relative mb-4">
                <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="채팅방 제목 입력..." />
                <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
              </form>
              <div class="dropdown">
                <a class="text-muted fw-semibold d-flex align-items-center" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Recent Chats<i class="ti ti-chevron-down ms-1 fs-5"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="javascript:void(0)">Sort by time</a>
                  </li>
                  <li>
                    <a class="dropdown-item border-bottom" href="javascript:void(0)">Sort by Unread</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="javascript:void(0)">Hide favourites</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="chatList">
              <ul class="chat-users mb-0 mh-n100" data-simplebar id="lastDisp">
              `;
        for (let i = 0; i < chatList.length; i++) {
          let flag = false;
          for (let z = 0; z < lastMsgList.length; z++) {
            if (chatList[i].groupNo == lastMsgList[z].groupNo) {
              flag = true;
            }
          }
          if (!flag) {
            if (firstChatGroup == -1) {
              firstChatGroup = i;
            }
            if (defaultChat == -1) {
              defaultChat = i;
            }
            html += `
              <li id="${chatList[i].groupNo}">
                <a class="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user" id="chat_user_1" data-user-id="1">
                  <div class="d-flex align-items-center">
                    <p class="position-relative">
                      <img src="${contextPath}${chatList[i].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                    </p>
                    <div class="ms-3 d-inline-block w-75" style="max-width : 170px;">
                      <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">
                        ${chatList[i].groupTitle}
                      </h6>
                      <p class="fs-3 text-truncate text-body-color d-block"></p>
                    </div>
                  </div>
              <p class="fs-2 mb-0 text-muted"></p>
                    </a>
                  </li>`;
          }


          for (let j = 0; j < lastMsgList.length; j++) {



            if (chatList[i].groupNo == lastMsgList[j].groupNo) {

              if (firstChatGroup == -1) {
                firstChatGroup = i;
              }
              var today = new Date();
              var date1 = new Date(lastMsgList[j].messageRegdate)
              if (defaultChat == -1) {
                defaultChat = i;
              }
              var deTime = (today.getTime() - date1.getTime()) / 1000;
              let year = date1.getFullYear(); // 년도
              let month = date1.getMonth() + 1;  // 월
              let date = date1.getDate();
              let hours = date1.getHours(); // 시
              let minutes = date1.getMinutes();
              html += `
                <li id="${chatList[i].groupNo}">
                  <a class="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user" id="chat_user_1" data-user-id="1">
                    <div class="d-flex align-items-center">
                      <p class="position-relative">
                        <img src="${contextPath}${chatList[i].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                      </p>
                      <div class="ms-3 d-inline-block w-75" style="max-width : 170px;">
                        <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">
                          ${chatList[i].groupTitle}
                        </h6>
                        <p class="fs-3 text-truncate text-body-color d-block">${lastMsgList[j].messageContent}</p>
                      </div>
                    </div>`;
              if (deTime >= 3600 * 24 && deTime <= 3600 * 24 * 2) {
                html += `<p class="fs-2 mb-0 text-muted">어제</p>
                      </a>
                    </li>`;
              } else if (deTime < 3600 * 24) {
                html += `<p class="fs-2 mb-0 text-muted">${hours}:${minutes}</p>
                      </a>
                    </li>`;
              } else {
                html += `<p class="fs-2 mb-0 text-muted">${year}/${month}/${date}</p>
                      </a>
                    </li>`;
              }
            }
          }
        }
        html += `</ul>
            </div>
          </div>
          <div class="w-70 w-xs-100 chat-container">
            <div class="chat-box-inner-part h-100">
              <div class="chat-not-selected h-100 d-none">
                <div class="d-flex align-items-center justify-content-center h-100 p-5">
                  <div class="text-center">
                    <p class="text-primary">
                      <i class="ti ti-message-dots fs-10"></i>
                    </p>
                    <h6 class="mt-2">Open chat from the list</h6>
                  </div>
                </div>
              </div>
              <div class="chatting-box d-block">
                <div class="p-9 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                  <div class="hstack gap-3 current-chat-user-name" id="ChatTitleDisp"> 
                    <div class="position-relative">`;
        if (defaultChat != -1) {
          html += `  <img src="${contextPath}${chatList[defaultChat].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                                  `;
        }
        html += `  
                    </div>
                    <div>
                      <h6 class="mb-1 name fw-semibold"></h6>`;
        if (defaultChat != -1) {
          html += `   <p class="mb-0">${chatList[defaultChat].groupTitle}</p>`;
        }
        html += `
                    </div>
                  </div> 
                 <div class="btn-group">
                  <button class="btn btn-light" type="button" id="ChattingDropBtn" data-bs-toggle="dropdown" aria-expanded="false" style="border-top-right-radius: 29.5px; border-bottom-right-radius: 29.5px;">
                    <i class="ti ti-menu-2"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="ChattingDropMenu">
                    <li id="in">
                      <a class="dropdown-item" href="javascript:void(0)">초대하기</a>
                    </li>
                    <li id="out">
                      <a class="dropdown-item" href="javascript:void(0)">나가기</a>
                    </li>
                  </ul>
                </div>
                </div>
                <div class="d-flex parent-chat-box">
                  <div class="chat-box w-xs-100">
                    <div class="chat-box-inner p-9" style="overflow: auto; height:650px;">
                      <div class="chat-list chat active-chat">

                      </div>
                    </div>
                    <div class="px-9 py-6 border-top chat-send-message-footer">
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2 w-85">
                          <a class="position-relative nav-icon-hover z-index-5" href="javascript:void(0)">
                            <i class="ti ti-mood-smile text-dark bg-hover-primary fs-7"></i>
                          </a>
                          <input type="text" id="messageInput" class="form-control message-type-box text-muted border-0 p-0 ms-2" placeholder="Type a Message" fdprocessedid="0p3op" />
                        </div>
                        <input id="fileInput" type="file" style="display: none;" multiple/>
                        <ul class="list-unstyledn mb-0 d-flex align-items-center">
                          <li>
                            <a class="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                              <i class="ti ti-paperclip" onclick="filePlus();"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="app-chat-offcanvas border-start">
                    <div class="custom-app-scroll mh-n100" data-simplebar>
                      <div class="offcanvas-body p-9">
                        <h6 class="fw-semibold mb-0 text-nowrap">
                          Media <p class="text-muted" id="imgCount"></p>
                        </h6>
                        <a class="chat-menu d-lg-none d-block text-dark fs-6 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                          <i class="ti ti-x"></i>
                        </a>

                        <div class="row mb-7 text-nowrap" id="imgFileDisp"> 
                          
                        </div>

                      </div>
                      <div class="offcanvas-body p-9">
                        <div class="files-chat">
                          <h6 class="fw-semibold mb-3 text-nowrap">
                            Files <p class="text-muted" id="fileCount"></p>
                          </h6>
                          <div class="row mb-7 text-nowrap" id="FileDisp"> 
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="offcanvas offcanvas-start user-chat-box chat-offcanvas" tabindex="-1" id="chat-sidebar" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                Chats
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="px-4 pt-9 pb-6">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <div class="position-relative">
                    <img src="${contextPath}${res.memPrflimg}" alt="user1" width="54" height="54" class="rounded-circle" />
                  </div>
                  <div class="ms-3">
                    <h6 class="fw-semibold mb-2">`+ MEM_NAME + `</h6>
                    <p class="mb-0 fs-2">`+ MEM_EMAIL + `</p>
                  </div>
                </div>
                <div class="dropdown">
                  <a class="text-dark fs-6 nav-icon-hover" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-settings fs-4"></i>
                        </p>Setting
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-help fs-4"></i>
                        </p>Help
                        and feedback
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-layout-board-split fs-4"></i>
                        </p>Enable split View mode
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2 border-bottom" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-table-shortcut fs-4"></i>
                        </p>Keyboard
                        shortcut
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:void(0)">
                        <p>
                          <i class="ti ti-login fs-4"></i>
                        </p>Sign
                        Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <form class="position-relative mb-4">
                <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Contact" />
                <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
              </form>
              <div class="dropdown">
                <a class="text-muted fw-semibold d-flex align-items-center" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Recent Chats<i class="ti ti-chevron-down ms-1 fs-5"></i>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="javascript:void(0)">Sort by time</a>
                  </li>
                  <li>
                    <a class="dropdown-item border-bottom" href="javascript:void(0)">Sort by Unread</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="javascript:void(0)">Hide favourites</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="app-chat">
              <ul class="chat-users mh-n100" data-simplebar>`;
        for (let j = 0; j < lastMsgList.length; j++) {
          for (let i = 0; i < chatList.length; i++) {
            if (chatList[i].groupNo == lastMsgList[j].groupNo) {
              var today = new Date();
              var date1 = new Date(lastMsgList[j].messageRegdate)
              var deTime = (today.getTime() - date1.getTime()) / 1000;
              let year = date1.getFullYear(); // 년도
              let month = date1.getMonth() + 1;  // 월
              let date = date1.getDate();
              let hours = date1.getHours(); // 시
              let minutes = date1.getMinutes();
              html += `
              <li id="chat${chatList[i].groupNo}">
                <a class="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user bg-light-subtle" id="chat_user_1" data-user-id="1">
                  <div class="d-flex align-items-center">
                    <p class="position-relative">
                      <img src="${contextPath}${chatList[i].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                    </p>
                    <div class="ms-3 d-inline-block w-75" style="max-width : 170px;">
                      <h6 class="mb-1 fw-semibold chat-title" data-username="">
                        ${chatList[i].groupTitle}
                      </h6>
                      <p class="fs-3 text-truncate text-body-color d-block">${lastMsgList[j].messageContent}</p>
                    </div>
                  </div>`;
              if (deTime >= 3600 * 24 && deTime <= 3600 * 24 * 2) {
                html += `<p class="fs-2 mb-0 text-muted">어제</p>
                      </a>
                    </li>`;
              } else if (deTime < 3600 * 24) {
                html += `<p class="fs-2 mb-0 text-muted">${hours}:${minutes}</p>
                      </a>
                    </li>`;
              } else {
                html += `<p class="fs-2 mb-0 text-muted">${year}/${month}/${date}</p>
                      </a>
                    </li>`;
              }
            }
          }
        }
        html += `</ul>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade chatting-modal" id="chatModal" tabindex="-1" aria-labelledby="chatModalLabel" aria-hidden="true">
         <div class="modal-dialog" style="width: 45%;">
               <div class="modal-content">
                     <div class="modal-header">
                           <h1 class="card-title mt-3 mb-0" style="color: black; font-size: 1.5rem; flex-grow: 1; text-align: center;">초대하기</h1>
                           <button type="button" class="btn-close" id="closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body" id="memberSearchBox">
                           <div class="mb-4 row align-items-center"> 
                                 <h5 class="fs-4 fw-semibold mb-3">사용자 검색</h5>
                                 <div class="input-group">
                                       <input type="text" class="form-control" id="ChattingSearchForm" />
                                       <button class="btn bg-primary-subtle text-primary" id="ChattingSearchButton" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                                             <i class="ti ti-search fs-6"></i>
                                       </button>
                                 </div>
                           </div>
                           <!-- 사용자 목록 출력 -->
                           <div class="mb-1 row align-items-center" style="max-height: 300px; overflow-y: auto;">
                              <table class="table align-middle text-nowrap" id="memList">
                                 <thead class="text-dark fs-4">
                                    <tr>
                                       <th class="text-center" colspan="2">검색된 사용자</th>
                                    </tr>
                                 </thead>
                                 <tbody id="ChattingSearchBody">
                                    <tr>
                                       <td class="text-center" colspan="2">※ 초대할 대상을 검색해주세요</td>
                                    </tr>
                                 </tbody>
                              </table>
                              <table class="table align-middle text-nowrap" id="memListInV">
                                 <thead class="text-dark fs-4">
                                    <tr>
                                       <th class="text-center" colspan="2">초대된 대상 목록</th>
                                    </tr>
                                 </thead>
                                 <tbody id="ChattingaddSearchBody">
                                 </tbody>
                              </table>
                           </div>
                           <div class="row mt-3">
                                 <div class="d-flex mb-3 align-items-center gap-6" style="justify-content: center;">
                                       <button class="btn btn-primary" id="submitChatting">초대</button>    
                                       <button class="btn bg-danger-subtle text-danger" id="backButton" data-bs-dismiss="modal">취소</button>
                                 </div>
                           </div>
                     </div>
               </div>
         </div>
      </div>

      <div class="modal fade chatting-modal" id="chatCreateModal" tabindex="-1" aria-labelledby="chatCreatModalLabel" aria-hidden="true">
          <div class="modal-dialog" style="width: 45%;">
                <div class="modal-content">
                      <div class="modal-header">
                            <h1 class="card-title mt-3 mb-0" style="color: black; font-size: 1.5rem; flex-grow: 1; text-align: center;">채팅방 생성하기</h1>
                            <button type="button" class="btn-close" id="closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="memberSearchBox">
                            <div class="row">
                              <div class="col-sm-12 col-md-6">
                                <div class="mb-3">
                                  <h5 class="fs-4 fw-semibold mb-3">채팅방 이름</h5>
                                  <input type="text" class="form-control" id="ChattingGroupName" style="height: 42.8px;"/>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-6">
                                <div class="mb-4 row align-items-center"> 
                                  <h5 class="fs-4 fw-semibold mb-3">채팅방 이미지 선택</h5>
                                  <div class="input-group">
                                        <input type="file" class="form-control" id="ChattingfileForm" />
                                  </div>
                                </div>
                              </div>
                              <div class="mb-4 row align-items-center"> 
                                 <h5 class="fs-4 fw-semibold mb-3">사용자 검색</h5>
                                 <div class="input-group">
                                       <input type="text" class="form-control" id="ChattingaddSearchForm" />
                                       <button class="btn bg-primary-subtle text-primary" id="ChattingaddSearchButton" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                                             <i class="ti ti-search fs-6"></i>
                                       </button>
                                 </div>
                              </div>
                            </div>
                            <!-- 사용자 목록 출력 -->
                            <div class="mb-1 row align-items-center" style="max-height: 300px; overflow-y: auto;">
                               <table class="table align-middle text-nowrap" id="memList">
                                  <thead class="text-dark fs-4">
                                     <tr>
                                        <th class="text-center" colspan="2">검색된 사용자</th>
                                     </tr>
                                  </thead>
                                  <tbody id="ChattingSearchBodyInV">
                                     <tr>
                                        <td class="text-center" colspan="2">※ 초대할 대상을 검색해주세요</td>
                                     </tr>
                                  </tbody>
                               </table>
                               <table class="table align-middle text-nowrap" id="memaddListInV">
                                 <thead class="text-dark fs-4">
                                    <tr>
                                       <th class="text-center" colspan="2">초대된 대상 목록</th>
                                    </tr>
                                 </thead>
                                 <tbody id="ChattingaddSearchBodyInV">
                                 </tbody>
                              </table>
                            </div>
                            <div class="row mt-3">
                                  <div class="d-flex mb-3 align-items-center gap-6" style="justify-content: center;">
                                        <button class="btn btn-primary" id="submitChattingCreat" data-bs-dismiss="modal">생성</button>    
                                        <button class="btn bg-danger-subtle text-danger" id="backButton" data-bs-dismiss="modal">취소</button>
                                  </div>
                            </div>
                      </div>
                </div>
          </div>
       </div>
      `;
        $("#main_contents").html("");
        $("#main_contents").html(html);
      }
    });


  }
  chatIn();
}
function chatIn() {
  if (member != null) {
    roomId = chatList[firstChatGroup].groupNo;
    const roomData = {
      "groupNo": roomId,
      "memName": member.memName,
      "type": "enter-room"
    }
    websocket.send(JSON.stringify(roomData));

    chatMessageList();
    loadFile(roomId);
  }
}
var chattingFileList = [];

$(document).on("click", ".chatList li", function () {
  $(".chat-list").addClass("active-chat");
  if (roomId != $(this).attr("id")) {
    chatMessageIn = [];
    chattingFileList = [];
    roomId = $(this).attr("id") // javaScript 객체에서 id 속성값 가져오기
    const roomData = {
      "groupNo": roomId,
      "memName": member.memName,
      "type": "enter-room"
    }
    websocket.send(JSON.stringify(roomData));

    chatMessageList();
    loadFile(roomId);

    $("#ChatTitleDisp").html("");
    let currentNo = -1;
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].groupNo == roomId) {
        currentNo = i;
      }
    }
    let html = `<div class="position-relative">
                  <img src="${contextPath}${chatList[currentNo].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                  </div>
                  <div>
                    <h6 class="mb-1 name fw-semibold"></h6>
                      <p class="mb-0">${chatList[currentNo].groupTitle}</p>
                  </div>`;
    $("#ChatTitleDisp").html(html);

  } else {
    return;
  }
})

// 채빙탕 파일 리스트 띄우기
function loadFile(roomId) {
  let data2 = {
    groupNo: roomId
  }

  $.ajax({
    url: "/synerhub/chat/getOnlyFile",
    type: "post",
    beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
      xhr.setRequestHeader(header, token);
    },
    async: false,
    data: JSON.stringify(data2),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      $(document).find("#imgFileDisp").html("");
      $(document).find("#FileDisp").html("");
      let imgCounts = 0;
      let fileCounts = 0;
      for (var i = 0; i < res.length; i++) {
        if ($.inArray(res[i].atchFileExtn.toLowerCase(), ["jpg", "jpeg", "gif", "png"]) === -1) {
          fileCounts = fileCounts + 1;
          let filePath;
          if ($.inArray(res[i].atchFileExtn.toLowerCase(), ["hwp", "word"]) != -1) {
            filePath = "/resources/assets/images/chat/word.png"
          } else if ($.inArray(res[i].atchFileExtn.toLowerCase(), ["pptx", "pptm"]) != -1) {
            filePath = "/resources/assets/images/chat/ppt.png"
          } else if ($.inArray(res[i].atchFileExtn.toLowerCase(), ["xlsx", "xlsm", "xlsb", "xltx"]) != -1) {
            filePath = "/resources/assets/images/chat/excel.png"
          } else if (res[i].atchFileExtn == "txt") {
            filePath = "/resources/assets/images/chat/txt.png"
          } else if (res[i].atchFileExtn == "pdf") {
            filePath = "/resources/assets/images/chat/pdf.png"
          } else {
            filePath = "/resources/assets/images/chat/etc.png"
          }

          let fileSize = Math.floor(res[i].atchFileSize / 1024);

          let html = $(document).find("#FileDisp").html();
          html = `<a href="javascript:void(0)" class="hstack gap-3 file-chat-hover justify-content-between text-nowrap mb-9">
                    <div class="d-flex align-items-center gap-3">
                      <div class="rounded-1 text-bg-light p-6">
                        <img src="${contextPath}${filePath}" alt="spike-img" width="24" height="24" />
                      </div>
                      <div>
                        <h6 class="fw-semibold">
                          ${res[i].atchFileOrgnlNm}
                        </h6>
                        <div class="d-flex align-items-center gap-3 fs-2 text-muted">
                          <p>${fileSize} KB</p>
                          <p>${res[i].strDt}</p>
                        </div>
                      </div>
                    </div>
                    <p class="position-relative nav-icon-hover download-file" id="fileDownBtn" url="${contextPath}${res[i].atchFilePath}" filename="${res[i].atchFileOrgnlNm}">
                      <i class="ti ti-download text-dark fs-6 bg-hover-primary"></i>
                    </p>
                  </a>`
          $(document).find("#FileDisp").html(html);
        } else {
          imgCounts = imgCounts + 1;
          let html = $(document).find("#imgFileDisp").html();
          html += `<div class="col-4 px-1 mb-2">
                  <img src="${contextPath}${res[i].atchFilePath}" width="88" height="65" alt="spike-img" class="rounded" />
                </div>`

          $(document).find("#imgFileDisp").html(html);
        }
      }
      $(document).find("#imgCount").text("(" + imgCounts + ")");
      $(document).find("#fileCount").text("(" + fileCounts + ")");


    }

  })
}

function chatMessageList() {
  let userCount = 0;
  // 해당 html에 추가되었던 동적 태그 전부 지우기
  if (chatMessageIn.length === 0) {
    $('.chat-list').html("");
  }
  // ajax를 이용하여 해당 방에 메시지 가져오기
  $.ajax({
    url: "/synerhub/chat/" + roomId + ".do",
    data: {
      memNo: MEM_NO
    },
    dataType: "json",
    success: async function (data) {
      for (var i = 0; i < data.length; i++) {
        // 채팅 목록 동적 추가 (내가 썼는지 안썼는지 판단 : 채팅 정렬 정하기)
        if (chatMessageIn.indexOf(data[i].messageId) < 0) {
          CheckLR(data[i]);
          chatMessageIn.push(data[i].messageId);
        }
      }
    }
  });
}

async function CheckLR(data) {
  // id가 로그인한 회원의 id와 다르면 left , 같으면 right
  const LR = (data.memNo != MEM_NO) ? "left" : "right";
  // 메시지 추가 함수 호출
  appendMessageTag(LR, data.memNo, data.messageContent, data.memName, data.messageRegdate, data.unreadCount, data.memPrflimg, data.msgFileId, data.messageId);
}

function appendMessageTag(LR_className, id, msg, name, rdate, unreadCount, memPrflimg, fileId, messageId) {

  const chatList = createMessageTag(LR_className, id, msg, name, rdate, unreadCount, memPrflimg, fileId);

  var chatting_box = $(document).find(".chat-box-inner");

  var chat_list = $(document).find(".chat-list");

  chat_list.append(chatList);
  // 스크롤바 아래 고정
  chatting_box.scrollTop(chat_list.height()); //선택한 요소의 scrollHeight 속성 값을 가져옴
  reloadLastMsg();
}


var today = new Date();
var checkDate = new Date(today);
// * 4 메시지 태그 생성
function createMessageTag(LR_className, id, msg, name, rdate, unreadCount, memPrflimg, fileId) {
  var date1 = new Date(rdate)
  var deTime = (today.getTime() - date1.getTime()) / 1000;
  let year = date1.getFullYear(); // 년도
  let month = date1.getMonth() + 1;  // 월
  let date = date1.getDate();
  let hours = date1.getHours(); // 시
  let minutes = date1.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let ampm;

  if (hours - 12 < 0) {
    ampm = "오전";
  } else {
    ampm = "오후";
    hours = hours - 12;
  }

  // chatMiddle ul 안에 넣을 메시지 태그 생성
  let chatList = "";
  if (checkDate.getFullYear() != year || checkDate.getMonth() + 1 != month || checkDate.getDate() != date) {
    chatList += `
    <div class="mb-7 " style="display: flex; justify-content: center;">
        <button class="d-inline-flex ms-1 me-1 rounded-1 margin-2 border-0" style="align-items: center;">
            <i class="ti ti-calendar-month ms-4 fs-6"></i>
            &ensp;<p class="me-4" style="margin: 0;">${year} ${month}월 ${date}일</p>
        </button>
    </div>`;
    checkDate = date1;
  }

  if (LR_className == "left") {
    chatList += `<div class="hstack gap-3 align-items-start mb-7 justify-content-start" >
    <img src="${contextPath}${memPrflimg}" alt="user8" width="40" height="40" class="rounded-circle" />
      <div>
      <h6 class="fs-2 text-muted">
        ${name} &emsp; ${ampm} &nbsp;${hours}:${minutes}
      </h6>
      <div class="d-flex">
      <div class="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">`;
  } else {
    chatList += `<div class="hstack gap-3 align-items-start mb-7 justify-content-end">
     <div class="text-end">
      <h6 class="fs-2 text-muted">${ampm} &nbsp;${hours}:${minutes}</h6>
      <div class="d-flex">
      <div class="mt-3 me-2"><font color="#F8C076">`;
    if (unreadCount > 0) {
      chatList += `${unreadCount}`;
    }
    chatList += `</font></div>
      <div class="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">`;
  }
  if (fileId == 0 && msg != 'file') {
    chatList += `${msg}</div>`
    if (LR_className == "left") {
      chatList += `<div class="mt-3 ms-2"><font color="#F8C076">`;
      if (unreadCount > 0) {
        chatList += `${unreadCount}`;
      }
      chatList += `</font></div>`
    }
    chatList += `</div>
    </div>
  </div>`;
  } else {
    let data = {
      atchFileId: fileId
    }

    $.ajax({
      url: "/synerhub/chat/getFile",
      type: "post",
      beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
        xhr.setRequestHeader(header, token);
      },
      async: false,
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (res) {
        for (var i = 0; i < res.length; i++) {
          if ($.inArray(res[i].atchFileExtn.toLowerCase(), ["jpg", "jpeg", "gif", "png"]) === -1) {
            chatList += `<div class="d-flex align-items-center">
            		${res[i].atchFileOrgnlNm}
                    <p class="position-relative nav-icon-hover download-file mt-3 ms-2" id="fileDownBtn" url="${contextPath}${res[i].atchFilePath}" filename="${res[i].atchFileOrgnlNm}" style="cursor: pointer">
                      <i class="ti ti-download text-dark fs-7 bg-hover-primary"></i>
                    </p>
                    </div>`
          } else {
            chatList += `<img src="${contextPath}${res[i].atchFilePath}" style="width:50px; height:50px;" class="d-block position-relative w-100 imgFiles"></div>`;
          }
          if (LR_className == "left") {
            chatList += `<div class="mt-3 ms-2"><font color="#F8C076">`;
            if (unreadCount > 0) {
              chatList += `${unreadCount}`;
            }
            chatList += `</font></div>`
          }
        }
      },
      error: function (error) {
        alert("파일 로딩에 실패했습니다.");
      }
    });
  }
  return chatList;

}

function clearTextarea() {
  $('.parent-chat-box #messageInput').val("");
  return false;
};

$(document).on('keydown', '.parent-chat-box #messageInput', function (e) {
  if (e.keyCode == 13 && !e.shiftKey) { // enter와 shift키와 동시에 눌리지 않았을 때 동작
    e.preventDefault(); // 엔터키가 입력되는 것을 막아준다. enter누를 때 줄바꿈 동작 막음
    const message = $(this).val();  // 현재 입력된 메세지를 담는다.

    let search3 = $('.parent-chat-box #messageInput').val();

    // 공백 및 공백 문자열을 제거하고, 

    // 입력된 메시지가 공백 또는 문자열로만 이루어져 있을 때 함수 실행 멈춤
    if (search3.replace(/\s|  /gi, "").length == 0) {
      return false;
      $('.parent-chat-box #messageInput').focus();
    }

    sendMessage(message);
    // textarea 비우기
    clearTextarea();
  }
});

async function sendMessage(message) {
  const data = {
    "groupNo": roomId,
    "memNo": MEM_NO,
    "memName": MEM_NO,
    "messageContent": message,
    "type": "msg"
  };
  websocket.send(JSON.stringify(data));
}

$(function () {
  // 메세지 수신하기
  websocket.onmessage = function (evt) {

    if (evt.data == "reload") {
      // getChatList();
      // getChatCnt();
        chatMessageList();
    }
  }
})

function filePlus() {
  $("#fileInput").click();
}

$(document).on("change", "#fileInput", function () {
  let formData = new FormData();
  formData.append("groupNo", roomId);
  formData.append("memNo", MEM_NO);
  formData.append("memName", MEM_NAME);

  let inputFile = $("#fileInput")[0];
  if (inputFile.files.length > 0) {
    for (let i = 0; i < inputFile.files.length; i++) {
      if (inputFile.files[i].size > 5 * 1024 * 1024) {
        alert("5MB 이하만 첨부가능합니다")
        return;
      } else {
        formData.append("chatFileList", inputFile.files[i]);
      }
    }
  }

  $.ajax({
    url: "/synerhub/chat/saveFiles",
    type: "post",
    processData: false, // jQuery가 데이터를 처리하지 않도록 설정
    contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
    beforeSend: async function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: formData,
    success: function (res) {
      chatMessageList();
      const data = {
        "groupNo": roomId,
        "memNo": MEM_NO,
        "memName": MEM_NAME,
        "messageContent": "file",
        "type": "msg"
      };

      websocket.send(JSON.stringify(data));
    },
    error: function (error) {
      alert("게시글 등록에 실패했습니다.");
    }
  });
});

$(document).on("click", ".imgFiles", function () {
  let url = $(this).attr("src")
  window.open(url);
})

$(document).on("click", "#fileDownBtn", function () {
  const element = document.createElement('a');
  element.href = $(this).attr("url");
  element.download = $(this).attr("fileName");
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});

$(document).on('keydown', '#ChattingSearchForm', function (event) {
  var searchQuery = $('#ChattingSearchForm').val();
  if (event.keyCode == 13) {
    if (!searchQuery) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '이름을 입력하세요.',
        confirmButtonText: '확인'
      });
    } else {
      $('#ChattingSearchButton').click();
    }
    event.preventDefault(); // Enter 키로 인한 폼 제출 방지
  }
});

$(document).on('keydown', '#ChattingaddSearchForm', function (event) {
  var searchQuery = $('#ChattingaddSearchForm').val();
  if (event.keyCode == 13) {
    if (!searchQuery) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '이름을 입력하세요.',
        confirmButtonText: '확인'
      });
    } else {
      $('#ChattingaddSearchButton').click();
    }
    event.preventDefault(); // Enter 키로 인한 폼 제출 방지
  }
});

$(document).on('click', '#ChattingSearchButton', function () {
  var searchQuery = $('#ChattingSearchForm').val().trim();


  if (!searchQuery) {
    Swal.fire({
      icon: 'warning',
      title: '입력 오류',
      text: '이름을 입력하세요.',
      confirmButtonText: '확인'
    });
    return;
  }

  var data = {
    memNo: MEM_NO,
    memName: searchQuery
  };

  $.ajax({
    url: '/synerhub/declaration/memberSearch',
    type: 'post',
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (memberList) {
      var memberRows = '';

      if (memberList.length == 0) {
        memberRows = `<tr>
                             <td class="text-center" colspan="2">존재하지 않는 사용자입니다</td>
                          </tr>`;
      } else {
        memberList.forEach(function (member) {
          memberRows += `
                             <tr id="clickMemberChat">
                                <td class="text-center" style="width:100px; height: 100px;"><img id="chatMemImg" no="${member.memNo}" src="/synerhub${member.memPrflimg}" style="width: 100%; height: 100%; object-fit: cover;"></td>
                                <td class="text-center" style="width: 100% - 100px"> 이름 : <span id="chatMemName">${member.memName}</span><br> 아이디 : <span id="chatMemId">${member.memId}</span></td>
                             </tr>`;
        });
      }
      $('#ChattingSearchBody').empty();
      $('#ChattingSearchBody').html(memberRows);
    },
  });
});

$(document).on('click', '#ChattingaddSearchButton', function () {
  var searchQuery2 = $('#ChattingaddSearchForm').val().trim();

  if (!searchQuery2) {
    Swal.fire({
      icon: 'warning',
      title: '입력 오류',
      text: '이름을 입력하세요.',
      confirmButtonText: '확인'
    });
    return;
  }

  var data = {
    memNo: MEM_NO,
    memName: searchQuery2
  };

  $.ajax({
    url: '/synerhub/declaration/memberSearch',
    type: 'post',
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (memberList) {
      var memberRows = '';

      if (memberList.length == 0) {
        memberRows = `<tr>
                             <td class="text-center" colspan="2">존재하지 않는 사용자입니다</td>
                          </tr>`;
      } else {
        memberList.forEach(function (member) {
          memberRows += `
                             <tr id="clickMemberChatInV">
                                <td class="text-center" style="width:100px; height: 100px;"><img id="chatMemImg" no="${member.memNo}" src="/synerhub${member.memPrflimg}" style="width: 100%; height: 100%; object-fit: cover;"></td>
                                <td class="text-center" style="width: 100% - 100px"> 이름 : <span id="chatMemName">${member.memName}</span><br> 아이디 : <span id="chatMemId">${member.memId}</span></td>
                             </tr>`;
        });
      }
      $('#ChattingSearchBodyInV').empty();
      $('#ChattingSearchBodyInV').html(memberRows);
    },
  });
});

var inviteList = [];

$(document).on('click', '#clickMemberChat, #clickMemberChatInV', function () {
  selectedMemberId = $(this).find('#chatMemId').text();
  const selectedMemberName = $(this).find('#chatMemName').text(); // 클릭한 이름 텍스트 추출
  const memberPfImg = $(this).find('#chatMemImg').attr('src'); // 해당 이미지 URL 추출
  const memberNo = $(this).find('#chatMemImg').attr('no'); // 해당 memNo 추출

  Swal.fire({
    title: selectedMemberName,
    text: "초대하는 대상이 맞습니까?",
    imageUrl: memberPfImg,
    imageAlt: selectedMemberName + "의 프로필 이미지",
    showCancelButton: true,
    confirmButtonText: '네',
    cancelButtonText: '아니요'
  }).then((result) => {
    if (inviteList.indexOf(memberNo) < 0) {
      inviteList.push(memberNo);
      if (result.isConfirmed) {
        // 선택된 사용자만 표시 (추가된 부분)
        let html;
        if ($(this).attr("id") == 'clickMemberChat') {
          html = $('#ChattingaddSearchBody').html();
        } else {
          html = $('#ChattingaddSearchBodyInV').html();
        }

        html += `
        <tr id="clickMember">
              <td class="text-center" style="width:100px; height: 100px;"><img id="chatMemImg" no="${memberNo}" src="${memberPfImg}" style="width: 100%; height: 100%; object-fit: cover;"></td>
              <td  class="text-center" style="width: 100% - 100px"> 이름 : <span id="chatMemName">${selectedMemberName}</span><br> 아이디 : <span id="dclMemId">${selectedMemberId}</span></td>
           </tr>`;

        if ($(this).attr("id") == 'clickMemberChat') {
          $('#ChattingaddSearchBody').html(html);
          $('#ChattingSearchBody').html(`<tr>
                                          <td class="text-center" colspan="2">추가로 초대하고 싶다면 다시 검색해주세요</td>
                                        </tr>`)
        } else {
          $('#ChattingaddSearchBodyInV').html(html);
          $('#ChattingSearchBodyInV').html(`<tr>
                                          <td class="text-center" colspan="2">추가로 초대하고 싶다면 다시 검색해주세요</td>
                                        </tr>`)
        }
      }
    } else {
      swal.fire("이무 추가한 사용자입니다.");
    }
  });
});


$(document).on('click', '#submitChatting', function () {

  const checkedValues = [];
  checkedValues.push(roomId);
  $.each(inviteList, function (index, value) {
    checkedValues.push(value);
  })

  var data = checkedValues;

  $.ajax({
    type: "post",
    url: "/synerhub/join",
    contentType: "application/json;charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    success: function (res) {
      if (res == "SUCCESS") {
        inviteList = [];
      }
    }
  })
});

var ChattingDropMenuFlag;

$("#main_contents").on("click", "#ChattingDropBtn", function () {
  $("#main_contents").find("#ChattingDropMenu").show();
  ChattingDropMenuFlag = false;
});

$("#main_contents").on("click", "#ChattingDropMenu li", function () {
  $("#main_contents").find("#ChattingDropMenu").hide();
  ChattingDropMenuFlag = true;

  var data = {
    roomId: roomId,
    memNo: MEM_NO
  }

  if ($(this).attr("id") == 'out') {
    $.ajax({
      type: "post",
      url: "/synerhub/outChatting",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token);
      },
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(data),
      success: function (res) {
        if (res == "SUCCESS") {
          chatopen();
        }
      }
    })
  } else {
    $(document).find("#chatModal").modal("show");
  }
});

$(document).on("click", "#createBtn", function () {
  $(document).find("#chatCreateModal").modal("show");
});


// inviteList

$(document).on("click", "#submitChattingCreat", function () {

  let formData = new FormData();
  formData.append('groupTitle', $("#ChattingGroupName").val());
  formData.append('memNo', MEM_NO);
  formData.append('memList', inviteList);

  let file = $(document).find("#ChattingfileForm");
  let inputFile = file[0];
  formData.append("imgFile", inputFile.files[0]);

  $.ajax({
    url: "/synerhub/CreateChattingGroup",
    type: "post",
    processData: false, // jQuery가 데이터를 처리하지 않도록 설정
    contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: formData,
    success: function (res) {
      if (res == "success") {
        chatopen();
      }
    }
  })


});



function reloadLastMsg(){
  getChattingList();
  getLastMsgList();

  $("#lastDisp").html('');

  let html ='';

  for (let i = 0; i < chatList.length; i++) {
    let flag = false;
    for (let z = 0; z < lastMsgList.length; z++) {
      if (chatList[i].groupNo == lastMsgList[z].groupNo) {
        flag = true;
      }
    }
    if (!flag) {
      if (firstChatGroup == -1) {
        firstChatGroup = i;
      }
      if (defaultChat == -1) {
        defaultChat = i;
      }
      html += `
        <li id="${chatList[i].groupNo}">
          <a class="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user" id="chat_user_1" data-user-id="1">
            <div class="d-flex align-items-center">
              <p class="position-relative">
                <img src="${contextPath}${chatList[i].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
              </p>
              <div class="ms-3 d-inline-block w-75" style="max-width : 170px;">
                <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">
                  ${chatList[i].groupTitle}
                </h6>
                <p class="fs-3 text-truncate text-body-color d-block"></p>
              </div>
              <p class="fs-2 mb-0 text-muted"></p>
            </div>
              </a>
            </li>`;
    }


    for (let j = 0; j < lastMsgList.length; j++) {



      if (chatList[i].groupNo == lastMsgList[j].groupNo) {

        if (firstChatGroup == -1) {
          firstChatGroup = i;
        }
        var today = new Date();
        var date1 = new Date(lastMsgList[j].messageRegdate)
        if (defaultChat == -1) {
          defaultChat = i;
        }
        var deTime = (today.getTime() - date1.getTime()) / 1000;
        let year = date1.getFullYear(); // 년도
        let month = date1.getMonth() + 1;  // 월
        let date = date1.getDate();
        let hours = date1.getHours(); // 시
        let minutes = date1.getMinutes();
        html += `
          <li id="${chatList[i].groupNo}">
            <a class="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user" id="chat_user_1" data-user-id="1">
              <div class="d-flex align-items-center">
                <p class="position-relative">
                  <img src="${contextPath}${chatList[i].groupImg}" alt="user1" width="48" height="48" class="rounded-circle" />
                </p>
                <div class="ms-3 d-inline-block w-75" style="max-width : 170px;">
                  <h6 class="mb-1 fw-semibold chat-title" data-username="James Anderson">
                    ${chatList[i].groupTitle}
                  </h6>
                  <p class="fs-3 text-truncate text-body-color d-block">${lastMsgList[j].messageContent}</p>
                </div>
              </div>`;
        if (deTime >= 3600 * 24 && deTime <= 3600 * 24 * 2) {
          html += `<p class="fs-2 mb-0 text-muted">어제</p>
                </a>
              </li>`;
        } else if (deTime < 3600 * 24) {
          html += `<p class="fs-2 mb-0 text-muted">${hours}:${minutes}</p>
                </a>
              </li>`;
        } else {
          html += `<p class="fs-2 mb-0 text-muted">${year}/${month}/${date}</p>
                </a>
              </li>`;
        }
      }
    }
  }

  $("#lastDisp").html(html);
}
// $(document).on("click",function(e){
//   // 드롭다운 버튼이나 메뉴가 클릭되지 않았으면
//   if (!($('#ChattingDropMenu').is(':visible'))) {
//     $("#main_contents").find("#ChattingDropMenu").hide();
//   }
// });