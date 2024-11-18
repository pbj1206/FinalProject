 let driveChannelList;
let driveThreadList;
let driveList;
var driveChNo = 0;
var driveThNo = 0;
var driveNo = -1;
var driveMemNo = 0;

// 드라이브 화면 만들기
$(document).on('click', '#drive, #headerDriveBtn', function () {

  let data = {
    memNo: MEM_NO
  }



  $.ajax({
    url: "/synerhub/drive/getList",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {
      driveChannelList = res.chList;
      driveThreadList = res.thList;

      driveLoad(driveChannelList, driveThreadList);
    }
  })



});

// 드라이브 기본 양식
function driveLoad(channelList, threadList) {
  var html = "";

  html += `

		<div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">드라이브</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="../main/index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">Drive</li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="card overflow-hidden chat-application">
            <div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
              <button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
                <i class="ti ti-menu-2 fs-5"></i>
              </button>
            </div>
            <div class="d-flex w-100">
              <div class="left-part border-end w-20 flex-shrink-0 d-none d-lg-block">
                <div class="px-9 pt-4 pb-3">
                  <button id="uploadDriveFileBtn" class="btn btn-primary fw-semibold py-8 w-100"><i class="ti ti-upload me-2"></i>파일 업로드</button>
                  <input class="form-control" type="file" id="uploadFile" name="uploadFile" style="display: none;" multiple> 
                </div>
                <div class="accordion" id="accordionExample" style="overflow-y: scroll; max-height: 400px; scrollbar-width: none;">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          <i class="ti ti-bookmark fs-5 text-primary"></i>채널 저장소
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">`;
  for (let i = 0; i < channelList.length; i++) {
    html += `<div class="accordion-body channel" style="cursor: pointer;" id="${channelList[i].chNo}">`
    html += channelList[i].chTtl;
    html += `</div>`
  }
  html += `</div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                           <i class="ti ti-bookmark fs-5 text-warning"></i>스레드 저장소
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">`;
  for (let i = 0; i < threadList.length; i++) {
    html += `<div class="accordion-body thread" style="cursor: pointer;" id="${threadList[i].chMemThNo}">`
    html += threadList[i].thTtl;
    html += `</div>`
  }
  html += `</div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                          <div class="accordion-body my" style="cursor: pointer; font-size: .9rem; font-weight: 400;" id="${MEM_NO}">
                           <i class="ti ti-bookmark fs-5 text-success"></i>나의 저장소
                          </div>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body" style="cursor: pointer;">
                          채널1
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="d-flex w-100"  style="min-height: 500px;">
                <div style="min-width: 600px;">
                  <div class="border-end user-chat-box h-100">
                    <div class="px-4 pt-9 pb-6 d-none d-lg-flex">

                      <div class="ms-6" style="display : none;" id="driveVolumeDisp">
                        <h6 class="mb-1 fw-semibold chat-title" data-username="" id="driveVolumeTitle">드라이브 용량 (100TB)</h6>
                        <div class="progress border" style="height: 10px; width: 350px;">
                            <div class="progress-bar text-bg-info" style="width: 75%" role="progressbar" id="driveVolumeWidth">75%</div>
                        </div>
                        <div style="display: flex; font-size: x-small; color: gray; width: 350px;"> 
                            <strong class="mb-1 fw-semibold chat-title" style="font-weight: normal;" id="driveVolumeUse">75TB 사용 됨</strong>
                            <strong class="mb-1 fw-semibold chat-title ms-auto" style="font-weight: normal;" id="driveVolumeTotal">25TB 사용 가능</strong>
                        </div>
                      </div>

                      <div class="ms-auto">
                        <ul class="list-unstyled mb-0 d-flex align-items-center">
                          <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="다운로드">
                            <a class="text-dark px-3 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" id="selectFileDownLoad">
                              <i class="ti ti-download fs-7"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="app-chat">
                      <ul class="chat-users mh-n100" data-simplebar>
                        <li>
                          <div class="d-flex gap-3 my-3">
                            <div class="n-chk align-self-center text-center ms-4">
                              <div class="form-check">
                                <input type="checkbox" class="form-check-input primary" id="contact-check-all" />
                                <label class="form-check-label" for="contact-check-all"></label>
                                <span class="new-control-indicator"></span>
                              </div>
                            </div>
                            <div>종류</div>
                            <div class="ms-5 me-5">이름</div>
                            <div class="me-5" style="margin-left: 60px;">크기</div>
                            <div>작성자</div>
                            <div class="ms-auto me-5">등록일</div>
                          </div>
                        </li>
                        <div id="selectedFileList" style="overflow-y : scroll; max-height:370px; scrollbar-width: none;">
                            <div class="d-flex align-items-center justify-content-center pb-5" style="height: 360px;">
	                          	드라이브 저장소를 선택해주세요.
	                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="w-100">
                  <div class="chat-container h-100 w-100">
                    <div class="chat-box-inner-part h-100">
                      <div class="chatting-box app-email-chatting-box">
                        <div class="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                          <h5 class="text-dark mb-0 fs-5">파일 상세</h5>
                        </div>
                        <div class="position-relative overflow-hidden"> 
                          <div class="position-relative">
                            <div class="chat-box email-box d-flex justify-content-center mt-2" style="height: 440px; margin-left:140px;" data-simplebar="init" id="fileDetailList">
                                파일을 선택해주세요.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="offcanvas offcanvas-start user-chat-box" tabindex="-1" id="chat-sidebar" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel"> Contact </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="px-9 pt-4 pb-3">
                  <button class="btn btn-primary fw-semibold py-8 w-100">Add New Contact</button>
                </div>
                <ul class="list-group h-n150" data-simplebar>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-inbox fs-5"></i>All Contacts
                    </a>
                  </li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-star"></i>Starred
                    </a>
                  </li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-file-text fs-5"></i>Pening Approval
                    </a>
                  </li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-alert-circle"></i>Blocked
                    </a>
                  </li>
                  <li class="border-bottom my-3"></li>
                  <li class="fw-semibold text-dark text-uppercase mx-9 my-2 px-3 fs-2">CATEGORIES</li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-bookmark fs-5 text-primary"></i>Engineers
                    </a>
                  </li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-bookmark fs-5 text-warning"></i>Support Staff
                    </a>
                  </li>
                  <li class="list-group-item border-0 p-0 mx-9">
                    <a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)">
                      <i class="ti ti-bookmark fs-5 text-success"></i>Sales Team
                    </a>
                  </li>
                </ul>
              </div>
               <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header d-flex align-items-center">
                          <h4 class="modal-title mt-3" id="myLargeModalLabel">
                              &emsp;선택한 파일을 삭제하시겠습니까?
                          </h4>
                          <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp;※ 한 번 삭제한 자료는 복구할 수 없습니다. ※</h6>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="deletYesBtn">
                              예	
                          </button>
                          <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
                              아니오
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal fade" id="vertical2-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header d-flex align-items-center">
                          <h4 class="modal-title mt-3" id="myLargeModalLabel">
                              &emsp;선택한 파일을 수정하시겠습니까?
                          </h4>
                          <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <h6 class="ms-5" style="color: gray;">※ 잘못 수정 시 수정 버튼을 클릭 후 다시 수정이 가능합니다. ※</h6>
                        </div>
                       <div class="modal-footer d-flex">
                          <div class="me-auto d-flex align-items-center">
                            <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('inputFile').click();">
                                <i class="ti ti-paperclip me-2 fs-5"></i>
                                <span class="d-none d-sm-inline-flex">파일 첨부</span>
                                <input class="form-control" type="file" id="inputFile" name="inputFile" style="display: none;">
                            </a>
                            <div class="ms-4" style="white-space: nowrap; text-overflow: ellipsis; max-width: 100px; overflow: hidden; font-weight: normal;" id="fileName">
                            </div>
                          </div>
                          <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
                              아니오
                          </button>
                          <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="updateYesBtn">
                              예   
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
    
    `;
  $("#main_contents").html(html);
  driveNo = -1;
}

var driveClick;


// 선택한 저장소 파일 로드
$(document).on("click", ".accordion-body", function () {

  driveChNo = 0;
  driveThNo = 0;
  driveMemNo = 0;
  driveClick = $(this);

  if (driveNo == $(this).attr("id")) {
    return;
  } else if ($(this).hasClass("channel") === true) {
    driveNo = $(this).attr("id");
    driveChNo = $(this).attr("id");
  } else if ($(this).hasClass("thread") === true) {
    driveNo = $(this).attr("id");
    driveThNo = $(this).attr("id");
  } else if ($(this).hasClass("my") === true) {
    driveNo = $(this).attr("id");
    driveMemNo = $(this).attr("id");
  } else {
    return;
  }

  let data = {
    "chNo": driveChNo,
    "chMemThNo": driveThNo,
    "memNo": driveMemNo
  }

  let fileLocal = '';

  // 파일 위치 만들기
  if (driveMemNo != 0) {
    fileLocal = "내 저장소"
  } else {
    if (driveThNo == 0) {
      for (let i = 0; i < driveChannelList.length; i++) {
        if (driveChannelList[i].chNo == driveChNo) {
          fileLocal += driveChannelList[i].chTtl;
        }
      }
    }else{
      for (let i = 0; i < driveThreadList.length; i++) {
        if (driveThreadList[i].chMemThNo == driveThNo) {
          for (let j = 0; j < driveChannelList.length; j++) {
            if (driveChannelList[j].chNo == driveThreadList[i].chNo) {
              fileLocal += driveChannelList[j].chTtl + "/" + driveThreadList[i].thTtl;
            }
          }
        }
      }
      

    }
  }

  // 상세 요소 만들기
  fileListdetail(data, fileLocal);
});

$(document).on("click","#deletYesBtn", async function(){
  let data = {
    "chNo": driveChNo,
    "chMemThNo": driveThNo,
    "memNo": driveMemNo,
    "cldFileNo" : $(document).find(".active-chat").attr("data-user-id")
  }
  $.ajax({
    url: "/synerhub/drive/deletFile",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {
      if(res == "success"){
        driveNo = -1;
        driveClick.trigger("click");
      }

    }
  })
});


$(document).on("click","#updateYesBtn",function(){
  let formData = new FormData();
  formData.append('chNo', driveChNo);
  formData.append('chMemThNo', driveThNo);
  formData.append('memNo', driveMemNo);
  formData.append('cldFileNo', $(document).find(".active-chat").attr("data-user-id"));
  formData.append('updateMem',MEM_NO)

  
  let file = $(document).find("#inputFile");
  let inputFile = file[0];
  formData.append("updateFile", inputFile.files[0]);

  $.ajax({
    url: "/synerhub/drive/updateFile",
    type: "post",
    processData: false, // jQuery가 데이터를 처리하지 않도록 설정
    contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: formData,
    success: async function (res) {
      if(res == "success"){
        driveNo = -1;
        driveClick.trigger("click");
      }
    }
  })
});

// 이미지 파일인지
function checkImageType(fileName) {
  var pattern = /jpg|gif|png|jepg/i;
  return fileName.match(pattern);
}

// 전체 체크 해제/설정
$(document).on("change", '#contact-check-all', function () {
  var isChecked = $(this).is(':checked');
  // 모든 체크박스의 체크 상태 변경
  $('.contact-chkbox').prop('checked', isChecked).trigger('change');
});

// 선택한 파일 가져와 다운
$(document).on("click", "#selectFileDownLoad", function () {
  let options = $(document).find($("input[id=selectDriveFileCkb]:checked"));
  for (let i = 0; i < options.length; i++) {
    let id = options.eq(i).parents(".chat-user").attr("data-user-id");
    for (let j = 0; j < driveList.length; j++) {
      if (driveList[j].atchDetailFileId == id) {
        download_file(driveList[j].atchFilePath, driveList[j].atchFileOrgnlNm);
      }
    }
  }

})

// 다운로드 함수
function download_file(url, fileName) {
  const element = document.createElement('a');
  element.href = contextPath + url;
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


function fileListdetail(data, fileLocal){
  $.ajax({
    url: "/synerhub/drive/getFileList",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {
      if(res.length != 0){
        let totalSize = res[0].totalSize;

        let sumFileSize = 0;

        for(let i = 0; i < res.length; i++){
          sumFileSize += res[i].atchFileSize;
        }

        $("#driveVolumeWidth").css("width" , Math.floor((sumFileSize / totalSize) *100) + "%");
        if(Math.floor((sumFileSize / totalSize) *100) >= 100){
          $("#driveVolumeWidth").text("100%");
        }else{
          $("#driveVolumeWidth").text(Math.floor((sumFileSize / totalSize) *100) + "%");
        }


        let filesize ="";

        if(totalSize / 1024 < 1024){
          filesize = Math.floor(totalSize / 1024) + " KB";
        }else if(totalSize / 1024 / 1024 < 1024){
          filesize = Math.floor(totalSize / 1024 / 1024) + " MB";
        }else if(totalSize / 1024 / 1024  / 1024 < 1024){
          filesize = Math.floor(totalSize / 1024 / 1024 / 1024) + " GB";
        }else{
          filesize = Math.floor(totalSize / 1024 / 1024 / 1024 / 1024) + " TB";
        }

        let useFileSize;

        if(sumFileSize / 1024 < 1024){
          useFileSize = Math.floor(sumFileSize / 1024) + " KB";
        }else if(sumFileSize / 1024 / 1024 < 1024){
          useFileSize = Math.floor(sumFileSize / 1024 / 1024) + " MB";
        }else if(sumFileSize / 1024 / 1024  / 1024 < 1024){
          useFileSize = Math.floor(sumFileSize / 1024 / 1024 / 1024) + " GB";
        }else{
          useFileSize = Math.floor(sumFileSize / 1024 / 1024 / 1024 / 1024) + " TB";
        }
        
        $("#driveVolumeTitle").text("드라이브 용량 ("+filesize+")")
        $("#driveVolumeUse").text(useFileSize+" 사용 됨")
        $("#driveVolumeTotal").text(filesize+" 사용 가능")
      }
      

      driveList = null;
      driveList = res;
      let selectedFileList = $(document).find("#selectedFileList");
      selectedFileList.html("");

      let fileDetailList = $(document).find("#fileDetailList");
      fileDetailList.html("");

      if (res.length == 0) {
        $("#driveVolumeDisp").css("display","none");
        selectedFileList.html(` 
          <div class="d-flex align-items-center justify-content-center pb-5" style="height: 360px;">
            드라이브에 저장된 파일이 없습니다.
          </div>`);

        fileDetailList.html(`파일을 선택해주세요`);
        fileDetailList.css("margin-left","140px");
        fileDetailList.css("height","440px");
        fileDetailList.removeClass("p-4");
      } else {
        $("#driveVolumeDisp").css("display","block")
        fileDetailList.css("margin-left","0px"); // p-4 랑 높이 제거
        fileDetailList.css("height","");
        fileDetailList.addClass("p-4");
        let html = ""
        let filesize;
        for (let i = 0; i < res.length; i++) {
          filesize = ""
          if(res[i].atchFileSize / 1024 < 1024){
            filesize = Math.ceil(res[i].atchFileSize / 1024) + " KB";
          }else if(res[i].atchFileSize / 1024 / 1024 < 1024){
            filesize = Math.ceil(res[i].atchFileSize / 1024 / 1024) + " MB";
          }else{
            filesize = Math.ceil(res[i].atchFileSize / 1024 / 1024 / 1024) + " GB";
          }




          html += `<li>
                  <a href="javascript:void(0)" class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user" id="chat_user_1" data-user-id="${res[i].atchDetailFileId}">
                    <div class="n-chk align-self-center text-center me-2" onclick="event.stopPropagation();">
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input contact-chkbox primary" id="selectDriveFileCkb" />
                        <label class="form-check-label" for="checkbox1"></label>
                      </div>
                    </div>
                    <span class="position-relative me-3">
                      <div style="width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: #f0f0f0;">`;
          if (checkImageType(res[i].atchFileExtn)) {
            html += `<i class="ti ti-photo" style="font-size: 20px;"></i>`
          } else {
            html += `<i class="ti ti-file" style="font-size: 20px;"></i>`
          }
          html += `</div>
                    </span>
                    <div class="ms-6 d-inline-block" style="width: 33%;">
                      <h6 class="mb-1 fw-semibold chat-title" data-username="" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 155px;">${res[i].atchFileOrgnlNm}
                      </h6>
                    </div>
                    <div class="me-5" style="width: 8%;">
                      ${filesize}
                    </div>
                    <div class="ms-2 me-5"  style="width: 8%;">
                      ${res[i].memName}
                    </div>
                    <div>
                      ${res[i].strDt}
                    </div>
                  </a>
                </li>`
        }
        selectedFileList.html(html);

        html = "";
        for (let i = 0; i < res.length; i++) {
          //   for (let j = 0; j < )
          if (i == 0) {
            html += `<div class="chat-list chat active-chat" data-user-id="${res[i].atchDetailFileId}">`;
          } else {
            html += `<div class="chat-list chat" data-user-id="${res[i].atchDetailFileId}">`;
          }
          html += `<div class="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-3">
                      <div style="width: 72px; height: 72px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: #f0f0f0;">
                        <i class="ti ti-file" style="font-size: 36px;"></i>
                      </div>
                      <div style="max-width: 70%;">
                        <h6 class="fs-4 mb-0" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 280px;">${res[i].atchFileOrgnlNm}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="row" style="margin-left: 8%;">
                    <div class="col-6 mb-7">
                      <p class="mb-1 fs-2">유형</p>
                      <h6 class="fw-semibold mb-0">${res[i].atchFileExtn}</h6>
                    </div>
                    <div class="col-4 mb-7">
                      <p class="mb-1 fs-2">크기</p>
                      <h6 class="fw-semibold mb-0">${filesize}</h6>
                    </div>
                    <div class="col-12 mb-9">
                      <p class="mb-1 fs-2">위치</p>
                      <h6 class="fw-semibold mb-0">${fileLocal}</h6>
                    </div>
                    <div class="col-6 mb-7">
                      <p class="mb-1 fs-2">생성 날짜</p>
                      <h6 class="fw-semibold mb-0">${res[i].atchFileRegDtStr}</h6>
                    </div>
                     <div class="col-4 mb-7">
                      <p class="mb-1 fs-2">작성자</p>
                      <h6 class="fw-semibold mb-0">${res[i].memName}</h6>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-6 justify-content-center" style="margin-top: 45px; margin-right: 8%;">
                    <button class="btn btn-success" style="width: 120%;" fdprocessedid="pk6kl8" data-bs-toggle="modal" data-bs-target="#vertical2-center-modal">수정</button>
                    <button class="btn bg-danger-subtle text-danger" style="width: 120%;" fdprocessedid="83zpb" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">삭제</button>
                  </div>
                </div>`
        }
        fileDetailList.html(html);
      }
    }
  })
}

$(document).on("click","#uploadDriveFileBtn",function(){
  if(driveNo == -1){
    swal.fire("드라이브를 선택해주세요");
    return;
  }else{
    document.getElementById('uploadFile').click();
  }
})

$(document).on("change","#uploadFile",function(){

  let widthText = $("#driveVolumeWidth").text();

  if(widthText.indexOf("100") != -1){
    swal.fire("드라이브의 용량이 초과되어 \n지금은 업로드 할 수 없습니다.");
    return;
  }

  let formData = new FormData();
  formData.append('chNo', driveChNo);
  formData.append('chMemThNo', driveThNo);
  formData.append('memNo', MEM_NO);

  let inputFile = $("#uploadFile")[0];
  if (inputFile.files.length > 0) {
    for (let i = 0; i < inputFile.files.length; i++) {
      formData.append("fileList", inputFile.files[i]);
    }
  }

  $.ajax({
    url: "/synerhub/drive/uploadFile",
    type: "post",
    processData: false, // jQuery가 데이터를 처리하지 않도록 설정
    contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: formData,
    success: async function (res) {
      if(res == "success"){
        swal.fire("파일 업로드에 성공했습니다");
        driveNo = -1;
        driveClick.trigger("click");
        $("#uploadFile").val("");
      }else if(res == "false"){
        swal.fire("파일 업로드에 실패했습니다");
        driveNo = -1;
        driveClick.trigger("click");
      }else{
        if(res < 1024){
          res = res + " KB";
        }else if(res / 1024 < 1024){
          res = Math.ceil(res / 1024) + " MB";
        }else{
          res = Math.ceil(res / 1024 / 1024) + " GB";
        }

        swal.fire(`드라이브 용량이 ${res} 남아 파일 업로드에 실패했습니다`);
        driveNo = -1;
        driveClick.trigger("click");
      }

    }
  })

})

$(document).on("change","#inputFile",function(){
  $("#fileName").text($("#inputFile")[0].files[0].name);
})