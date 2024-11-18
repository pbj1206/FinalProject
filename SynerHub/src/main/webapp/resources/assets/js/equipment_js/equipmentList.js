
var comDetailCdId = null;
var eqpImgCheck = [];

// 페이지 번호 전역 변수 설정

function eqpList() {
  if (synerhubch == null) {
    swal.fire("채널을 먼저 입장해주세요!");
  }
  else {
    let now_utc = Date.now()
    let timeOff = new Date().getTimezoneOffset() * 60000;
    let today = new Date(now_utc - timeOff).toISOString().substring(0, 10);

    MAIN_CONTENTS.innerHTML = `
   	<div class="mb-3 overflow-hidden position-relative">
	  <div class="px-3">
	    <h4 class="fs-6 mb-0">자원</h4>
	    <nav aria-label="breadcrumb">
	      <ol class="breadcrumb mb-0">
	        <li class="breadcrumb-item">
	          <a href="../main/index.html">Home</a>
	        </li>
	        <li class="breadcrumb-item" aria-current="page">자원 목록</li>
	      </ol>
	    </nav>
	  </div>
	</div>
	<div class="col-12">
	  <div class="card mb-0">
	    <div class="card-body">
	      <div class="d-md-flex justify-content-between mb-9">
	        <div class="mb-9 mb-md-0">
	          <div style="display: flex;">
	            <h3 id="eqpTitle">자원 목록</h3>
	          </div>
	          <p class="card-subtitle mb-0"></p>
	        </div>
	        <div class="me-3" style="text-align: right;">
	          <button type="button" class="btn btn-dark" onclick="eqpLive()">
	            자원 현황
	          </button>
	        </div>
	      </div>
																				
	      <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px; cursor: pointer">
	        <div id="docMenuBar" class="card-body" style="margin: 0; padding: 0;">
	          <nav class="navbar navbar-expand-lg">
	            <div class="container-fluid"><a class="navbar-brand btn btn-light" onclick="eqpCateTagId(0)">전체 자원</a>
	              <div class="collapse navbar-collapse">
	                <ul class="nav nav-underline" role="tablist" id="eqpCateTag"></ul>
	              </div>
	            </div>
	            <div class="input-group me-3 mb-3" style="width: 35%;">
	              <input type="text" class="form-control" id="eqpSearchWord">
	              <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button"
	                style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" onclick="eqpSearch()">
	                <i class="ti ti-search fs-6"></i>
	              </button>
	            </div>
	          </nav>
	          <table class="table table-hover align-middle text-nowrap">
	            <thead class="text-dark fs-4">
	              <tr>
	                <th class="text-center">자원 번호</th>
	                <th class="text-center">자원 명</th>
	                <th class="text-center">자원 분류</th>
	                <th class="text-center">등록 날짜</th>
	                <th class="text-center">쓰레드</th>
	                <th class="text-center">담당자</th>
	                <th class="text-center">사용 여부</th>
	              </tr>
	            </thead>
	            <tbody id="EqpListContent" style="cursor: pointer">
	
	            </tbody>
	          </table>
	        </div>
	      </div>
	
	      <div class="align-items-center justify-content-between mt-10">
	        <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
	          <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" onclick="synerhubTheThread(${synerhubth})" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                <i class="ti ti-arrow-back-up fs-7 me-1"></i>
        	  </a>
	          <button type="button" class="btn bg-primary-subtle text-primary" onclick="EqpInsertCTCheck()">
	            <i class="ti ti-pencil fs-6 me-2"></i>
	            작성
	          </button>
	        </div>
	      </div>
	      <div class="text-center" id="pagingEqp">
	        <nav aria-label="Page navigation">
	          <ul class="pagination justify-content-center pagination-sm m-0">
	            <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
	            <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li>
	          </ul>
	        </nav>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- 모달 창 -->
	<div class="modal fade" id="EqpUsingInsertForm" tabindex="-1" aria-labelledby="vertical-center-modal"
	  aria-hidden="true">
	  <div class="modal-dialog modal-md">
	    <div class="modal-content">
	      <div class="modal-body p-4">
	        <div class="text-center text-dark">
	          <i class="ti ti-calendar-month fs-7"></i>
	          <h3 class="mt-2">자원 사용 등록</h3>
	          <hr />
	          <div class="container-fluid">
	            <div class="row mt-3">
	              <div class="form-group d-inline-flex text-nowrap">
	                <label for="recipient-name" class="form-label col-sm-3 col-form-label">자원명</label>
	                <input type="text" class="form-control" id="eqpUsingName" disabled />
	                <input type="hidden" id="eqpUsingNumber" />
	              </div>
	            </div>
	            <div class="row mt-3">
	              <div class="form-group d-inline-flex text-nowrap">
	                <label for="recipient-name" class="form-label col-sm-3 col-form-label">사용 시작 일시</label>
	                <input type="date" class="form-control" id="eqpStartDate" min="${today}" />
	              </div>
	            </div>
	            <div class="row mt-3">
	              <div class="form-group d-inline-flex text-nowrap">
	                <label for="recipient-name" class="form-label col-sm-3 col-form-label">예상 반납 일시</label>
	                <input type="date" class="form-control" id="eqpEndDate" min="${today}" />
	              </div>
	            </div>
	            <div class="mt-3">
	              <div class="form-group d-flex text-nowrap">
	                <label for="recipient-name" class="form-label col-sm-3 col-form-label">사용 목적</label>
	                <textarea class="form-control" style="height: 420px;" id="eqpUsingContent"></textarea>
	              </div>
	            </div>
	          </div>
	          <div class="mt-4">
	          	<input type="hidden" id="memThNo" />
	            <button type="button" class="btn btn-primary me-2" onclick="eqpUsingInsert()" id="eqpUsingInsertBtn">
	              등록
	            </button>
	            <button type="button" class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">
	              취소
	            </button>
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>`;


    // 장비 카테고리 태그 요청
    $.ajax({
      url: "/synerhub/equipment/cateList",
      type: "post",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token); // 인증 토큰 추가
      },
      data: JSON.stringify({ chNo: synerhubch }), // 채널 번호 전송
      contentType: "application/json; charset=utf-8",
      success: function (res) { // 성공 시
        // 응답 데이터로 리스트 항목 추가
        for (let i = 0; i < res.length; i++) {
          $("#eqpCateTag").append(`
            <li class="nav-item me-2">
              <a class="nav-link" data-bs-toggle="tab" role="tab" onclick="eqpCateTagId(${res[i].eqpmntCateNo})">
                <span>${res[i].eqpmntCateNm}</span>
              </a>
            </li>`);
        }
      }
    });
    EqpListData(1, 0, null);
  }
};

function EqpListData(EqpListPage, eqpmntCateNo, eqpSearchWord) {
  // 데이터 객체 생성
  let data = {
    chNo: synerhubch, // 채널 번호
    thNo: synerhubth, // 스레드 번호
    eqpmntCateNo: eqpmntCateNo, // 장비 카테고리 번호
    rowCnt: 10,
    page: EqpListPage,
    eqpSearchWord: eqpSearchWord
  };
  

  // 장비 목록 요청
  //var cnt = 0; // 카운터 초기화
  $.ajax({
    url: "/synerhub/equipment/eqpList",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token); // 인증 토큰 추가
    },
    data: JSON.stringify(data), // 데이터 전송
    contentType: "application/json; charset=utf-8",
    success: function (ch) { // 성공 시
      // eqpList 값들을 list로 변수 선언
      let list = ch.list;
      // 응답 데이터로 테이블 행 추가


      if (list.length == 0) {
        $("#EqpListContent").append("<tr><td class='text-center' colspan='7'>조회되는 자원이 없습니다.</td></tr>");// 테이블에 추가
      }
      else {
        for (let i = 0; i < list.length; i++) {
          let html = "";
          if (list[i].thNo == 0) {
            html += `<tr class="table-primary">`;
          }
          else if (list[i].thNo != 0) {
            html += `<tr>`;
          }
          html += `<td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center">${list[i].rnum}</td>
            <td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center">${list[i].eqpmntNm}</td>
            <td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center"><p class="mb-1 badge text-bg-light">${list[i].eqpmntCateNm}</p></td>
            <td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center">${list[i].eqpmntDt}</td>`;

          if (list[i].thNo == 0) {
            html += `
          <td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center"><p class="mb-1 badge text-bg-primary">채널 공용 자원</p></td>`;
          } else if (list[i].thNo != 0) {
            html += `<td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center">${list[i].thTtl}</td>`;
          }

          html += `<td onclick="EqpDetailForm(${list[i].eqpmntNo})" class="text-center">${list[i].memNm}</td>`;

          // 장비 사용 상태에 따른 내용 추가
          if (list[i].eqpmntUsing == 0) {
            html += `<td style="color:blue" class="text-center">사용 중</td></tr>`;
          }
          if (list[i].eqpmntUsing == 1) {
            html += `<td class="text-center"><button class="btn btn-rounded btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#EqpUsingInsertForm" onclick="eqpUsingInsertModal(${list[i].eqpmntNo}, '${list[i].eqpmntNm}')" id="eqpUsingInsertBtn">사용 신청</button></td></tr>`;
          }
          if (list[i].eqpmntUsing == 2) {
            html += `<td style="color:red" class="text-center">고장</td></tr>`;
          }
          $("#EqpListContent").append(html);// 테이블에 추가

        }
        // 페이징 처리를 위한 eqpUpdatePagin 함수 호출
        /**
         * 게시글 총수
         * 현재 페이지
         * 페이지당 게시글
         * 부서 번호
         */
        eqpUpdatePagin(ch.total, ch.page, ch.rowCnt)
      }
    }
  });
}

/**
 * 자원 관리 부서별로 1번부터 10개까지 rowcnt는 10개씩
 * @param {*} total 게시글 총 수
 * @param {*} currentPage 현재 페이지
 * @param {*} rowCnt 페이지당 게시글
 * @param {*} thNo 부서 번호
 * @returns 
 */
function eqpUpdatePagin(total, currentPage, rowCnt) {
  // ...
  /*
      total   :    2
  currentPage :    1
      rowCnt  :    3
        thNo  :    238
  */
  // 현재 페이지에 게시판이 없을 떄
  if (rowCnt < 1) {
    return;
  }
  // 페이지 목록수 출력 (밑에 1,2,3...)
  // Math.ceil (total/rowCnt) : total/rowCnt를 나누어서 반올림 처리
  let FreeTotalPages = Math.ceil(total / rowCnt);
  // 
  let FreePagingContainer = $('#pagingEqp .pagination');
  FreePagingContainer.empty(); // 이전 내용 삭제

  if (currentPage > 1) {
    FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" >이전</a></li>`);
  } else {
    FreePagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" >이전</a></li>`);
  }

  // 페이지 번호 생성 
  for (let i = 1; i <= FreeTotalPages; i++) {
    if (i === currentPage) {
      FreePagingContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)" >${i}</a></li>`);
    } else {
      FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}">${i}</a></li>`);
    }
  }

  // 다음 버튼
  if (currentPage < FreeTotalPages) {
    FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" >다음</a></li>`);
  } else {
    FreePagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" >다음</a></li>`);
  }
}

// 페이지 번호 클릭 이벤트
$(document).on("click", "#pagingEqp .page-link", function () {

  // 클릭한 페이지의 번호를 page변호로 저장
  let EqpListPage = $(this).data('page');

  if (EqpListPage) {
    $("#EqpListContent").empty();
    EqpListData(EqpListPage, 0, null);
  }
})

// 검색 기능 이벤트
function eqpSearch() {
  var eqpSearchWord = $("#eqpSearchWord").val().trim();
  $("#EqpListContent").html("");
  EqpListData(1, 0, eqpSearchWord);
}


function eqpCateTagId(eqpCateTagId) {
  $("#EqpListContent").html("");
  EqpListData(1, eqpCateTagId, null);
}

$(document).on("change", "#eqpStartDate", function () {
  let now_utc = Date.now()
  let timeOff = new Date().getTimezoneOffset() * 60000;
  let today = new Date(now_utc - timeOff).toISOString().substring(0, 10);

  let useStdDt = new Date($("#eqpStartDate").val()).valueOf();
  let useEndDt = new Date(useStdDt - timeOff).toISOString().substring(0, 10);
  $("#eqpEndDate").attr("min", useEndDt);
})

function eqpUsingInsertModal(resUsingNo, resUsingName, edit) {
  let UsingData = {
    memNo: MEM_NO,
    chNo: synerhubch
  }
  
  $.ajax({
    url: "/synerhub/equipment/getChUser",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(UsingData),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      $("#eqpStartDate").val("");
      $("#eqpEndDate").val("");
      $("#eqpUsingContent").val("");
      $("#eqpUsingNumber").val(resUsingNo);
      $("#eqpUsingName").val(resUsingName);
      $("#memThNo").val(result.chMemThNo);
    }
  });
}


function eqpUsingInsert(event) {
  let std = new Date($("#eqpStartDate").val());
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  std.setHours(0, 0, 0, 0);
  const oneDayBefore = new Date(std);
  oneDayBefore.setDate(std.getDate() - 1);
  if ($("#eqpStartDate").val() == null || $("#eqpStartDate").val() == "") {
    swal.fire("시작 일시를 입력해주세요");
  }
  else if ($("#eqpEndDate").val() == null || $("#eqpEndDate").val() == "") {
    swal.fire("예상 반납일시를 입력해주세요")
  }
  else if ($("#eqpUsingContent").val() == null || $("#eqpUsingContent").val() == "") {
    swal.fire("사용 목적을 입력해주세요");
  }
  else if (std < today) {
    swal.fire("시작날은 오늘보다 늦게 설정할수 없습니다.")
  }
  else if (new Date($("#eqpEndDate").val()) < std == true) {
    swal.fire("예상 반납일시는 시작 일시 이후로 설정해주세요!!")
  } else {


    // 백드롭 제거
    let backdrop = $('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    let UsingData = {
      eqpmntNo: $("#eqpUsingNumber").val(),
      memNo: MEM_NO,
      useStrtDt: $("#eqpStartDate").val(),
      rtnEstmtDt: $("#eqpEndDate").val(),
      useFor: $("#eqpUsingContent").val(),
      thNo: $("#memThNo").val()
    }
    
    $.ajax({
      url: "/synerhub/equipment/eqpUsingInsert",
      type: "post",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token)
      },
      data: JSON.stringify(UsingData),
      contentType: "application/json; charset=utf-8",
      success: function () {
      	$(document).find(".modal-open").css("overflow", "visible"); 
        eqpLive();
      }
    });
  }
}

function EqpInsertCTCheck() {
  let chkUserData = {
    chNo: synerhubch,
    thNo: synerhubth,
    memNo: MEM_NO
  }
  $.ajax({
    url: "/synerhub/equipment/getChUser",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(chkUserData),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      if (synerhubth == null) {
        if (result.chPrp != "C") {
          swal.fire("채널장만 채널 비품 추가\n가능합니다")
        } else {
          EqpInsertForm();
        }
      }
      else {
        if (result.chPrp == "T" || result.chPrp == "C") {
          EqpInsertForm();
        }
        else {
          swal.fire("비품 추가는 채널장/스레드장만 \n등록 가능합니다.");
        }
      }
    }
  });
}


// 자원 등록 페이지
async function EqpInsertForm(eqpNo) {
  var now_utc = Date.now()
  var timeOff = new Date().getTimezoneOffset() * 60000;
  var today = new Date(now_utc - timeOff).toISOString().substring(0, 10);

  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
  $.ajax({
    url: "/synerhub/chat/getUser",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify({ memNo: MEM_NO }),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {

      MAIN_CONTENTS.innerHTML = `
      <div class="mb-3 overflow-hidden position-relative">
      <div class="px-3">
        <h4 class="fs-6 mb-0">자원</h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="../main/index.html">Home</a>
            </li>
            <li class="breadcrumb-item" aria-current="page">자원</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="mb-4" role="tablist">
          <h3>자원 등록</h3>
        </div>

        <div class="tab-content">
          <div class="tab-pane active" id="feeds" role="tabpanel">
            <div class="card border">
              <div class="card-body p-4" id="EqpInsertInputs">
                <div class="d-flex align-items-center mb-3">
                  <img src="${contextPath}${res.memPrflimg}" alt="spike-img" width="32" height="32" class="rounded-circle">
                  <h6 class="mb-0 ms-6">`+ MEM_NAME + `</h6>
                </div>
                <div class="userprofile mt-3 mb-3 d-flex flex-column-reverse border-top">
                  <div clas="mt-3">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mt-3 mb-3">
                          <label class="form-label">자원명</label>
                          <input type="text" class="form-control" id="EqpNameInput"></input>
                        </div>
                      </div>
                    </div>
                    <div class="row align-items-center">
                      <div class="d-flex">
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">자원 분류</label>
                            <div class="form-group d-flex">
                              <select class="form-select" id="EqpCategory">
                                <option value="0000">--자원을 선택해주세요--</option>
                              </select>
                            </div>
                          </div>  
                        </div>
                        <div class="col-md-6 ms-4">
                          <div class="mb-3" id="EqpCateBtns">
                            <label class="form-label">카테고리 버튼</label>
                            <div class="d-flex ms-auto">
                              <div class="me-2">
                                <button type="button" id="addBtn" class="btn bg-primary-subtle text-primary"
                                	data-bs-toggle="modal" data-bs-target="#EqpCateInsert" onclick="EqpCateInsertForm()">
                                      	추가
                                </button>
                              </div>
                              <div class="btn-group mb-2" role="group" aria-label="Basic example" id="groupBtn">
                                <button type="button" id="modifyBtn" class="btn bg-success-subtle text-success"
                                	data-bs-toggle="modal" data-bs-target="#EqpCateManage" id="EqpCateManageBtn" onclick="EqpCateManage('update')">
                                      	수정
                                </button>
                                <button type="button" id="cancelBtn" class="btn bg-danger-subtle text-danger"
                                	data-bs-toggle="modal" data-bs-target="#EqpCateManage" id="EqpCateManageBtn" onclick="EqpCateManage('delete')">
                                      	삭제
                                </button>
                              </div>
                            </div>
                          </div>  
                        </div>
                      </div>
                    </div>
                    <!--/row-->
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label">사용 연한</label>
                          <input type="date" class="form-control" id="EqpDueDateInput" min="${today}"/>
                        </div>
                      </div>
                      <!--/p-->
                      <div class="col-md-6" style="display: none" id="EqpCodeForm">
                        <div class="mb-3">
                          <label class="form-label">자원 코드</label>
                          <input type="text" class="form-control" disabled />
                        </div>
                      </div>
                    </div>
                    <!--/p-->
                    <div class="mb-3">
                      <label class="form-label">내용</label>
                      <textarea class="form-control" rows="5" id="EqpContentInput"></textarea>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                    <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                      <li>
                        <a class="text-muted fs-4" href="javascript:void(0)"
                          onclick="document.getElementById('eqpInputFile').click();">
                          <i class="ti ti-paperclip me-2 fs-5"></i>
                          <p class="d-none d-sm-inline-flex">파일 첨부</p>
                          <input class="form-control" type="file" id="eqpInputFile" name="eqpinputFile" style="display: none;" multiple>
                        </a>
                      </li>
                      <li>
                        <div class="eqpUploadedList"></div>
                      </li>
                    </ul>
                  </form>
                  <div id="eqpInsertBtn">
                    <button type="button" class="btn btn-primary me-3" onclick="EqpInsertCheck()">등록</button>
                    <button type="button" class="btn bg-danger-subtle text-danger" onclick="EqpCancel()">취소</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 카테고리 등록 모달 창 -->
    <div class="modal fade" id="EqpCateInsert" tabindex="-1" aria-labelledby="exampleModalLabel1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between align-items-center w-100">
            <div class="text-center w-100">
              <h3 class="modal-title" id="exampleModalLabel1">
                자원 분류 카테고리 등록
              </h3>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 text-center">
              <h5>카테고리명</h5>
            </div>

            <div class="mb-3 mt-4">
              <input type="text" class="form-control" id="EqpCateInsertName" />
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal" onclick="EqpCateInsert()">
              등록
            </button>
            <button type="button" class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 카테고리 수정/ 삭제 모달 창 -->
    <div class="modal fade" id="EqpCateManage" tabindex="-1" aria-labelledby="exampleModalLabel1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between align-items-center w-100">
            <div class="text-center w-100">
              <h3 class="modal-title" id="exampleModalLabel1">
                자원 분류 카테고리 관리
              </h3>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3 text-center">
                <h5>카테고리명</h5>
              </div>

              <!-- 수정 or 삭제 -->
              <div class="mb-3 mt-4">
                <div class="form-check form-check-inline d-flex align-items-center ms-3">
                  <div class="ms-auto mt-3 mt-md-0">
                    <select class="form-select bg-transparent border" id="EqpCateSelOne" style="width: 400px;">
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer justify-content-center" id="eqpCateBtn"></div>
        </div>
      </div>
    </div>`;

      //let chCreator = await getChData(synerhubch);
      let getUserData = {
        memNo: MEM_NO,
        chNo: synerhubch
      }
      $.ajax({
        url: "/synerhub/equipment/getChUser",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token)
        },
        data: JSON.stringify(getUserData),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
          if (result.chPrp == "C") {
            $("#groupBtn").css("visibility", "visible")
          } else {
            $("#groupBtn").css("visibility", "hidden")
          }
        }
      });
      $.ajax({
        url: "/synerhub/equipment/cateList",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token)
        },
        data: JSON.stringify({ chNo: synerhubch }),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
          for (let i = 0; i < res.length; i++) {
            $(document).find("#EqpCategory").append(`<option value='${res[i].eqpmntCateNo}'>${res[i].eqpmntCateNm}</option>`);
            $("#EqpCateSelOne").append(`<option value='${res[i].eqpmntCateNo}'>${res[i].eqpmntCateNm}</option>`);
          }
        }
      });

      if (eqpNo != null) {
        $.ajax({
          url: "/synerhub/equipment/eqpDetail",
          type: "post",
          beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token)
          },
          data: JSON.stringify({ eqpmntNo: eqpNo }),
          contentType: "application/json; charset=utf-8",
          success: function (res) {
            $("#EqpNameInput").val(res.eqpmntNm);
            $("#EqpCategory").val(res.eqpmntCateNo).prop("selected", true);
            $("#EqpDueDateInput").val(res.eqpmntDue.toString().split(" ")[0]);
            //$("#EqpDetailCate").val(res.eqpmntCateNm);
            $("#EqpContentInput").text(res.eqmntContent);
            for (let i = 0; i < res.fileEqpList.length; i++) {
              $(".eqpUploadedList").html(`
                    <div class="me-1" style="position: relative; display: inline-block;">
                      <img src="${contextPath}${res.fileEqpList[i].atchFilePath}" style="width: 100px; height: 100px" />
                    </div>
                    <input type="hidden" id="UpdBeforeImgId" value="${res.fileEqpList[i].atchDetailFileId}"/>`);
            }

            if (res.eqpmntUsing == 2) {
              $("#eqpInsertBtn").html(`
	              <button type="button" class="btn btn-warning ms-3" onclick="EqpUnable(${eqpNo}, 'fixed')">수리완료</button>
	              <button type="button" class="btn btn-success ms-3" onclick="EqpInsertCheck(${eqpNo})" id="EqpUpdateBtn">수정</button>
	              <button type="button" class="btn btn-danger ms-3" onclick="EqpDetailCancel(${eqpNo})">취소</button>`);
            } else {
              $("#eqpInsertBtn").html(`
	              <button type="button" class="btn btn-warning ms-3" onclick="EqpUnable(${eqpNo}, 'unable')">고장</button>
                  <button type="button" class="btn btn-success ms-3" onclick="EqpInsertCheck(${eqpNo})" id="EqpUpdateBtn">수정</button>
	              <button type="button" class="btn btn-danger ms-3" onclick="EqpDetailCancel(${eqpNo})">취소</button>`);
            }
          }
        });
      }
    }
  });
}

function EqpInsertCheck(eqpNo) {
  if ($("#EqpNameInput").val() == "") {
    swal.fire("자원명을 입력해주세요.");
  } else if ($("#EqpCategory").val() == "0000") {
    swal.fire("자원 분류를 입력해주세요.")
  } else if ($("#EqpDueDateInput").val() == "") {
    swal.fire("사용 연한을 입력해주세요.")
  } else if ($("#EqpContentInput").val() == "") {
    swal.fire("내용을 입력해주세요.")
  } else {
    EqpInsert(eqpNo);
  }
}

function EqpCateManage(type) {
  if (type == "update") {
    $("#eqpCateBtn").html(`
    <button type="button" class="btn btn-success me-2" data-bs-dismiss="modal" onclick="EqpCateUpdate()">
      수정
    </button>
    <button type="button" class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">
      취소
    </button>`)
  } else {
    $("#eqpCateBtn").html(`
      <button type="button" class="btn btn-warning me-2" onclick="EqpCateDelete()" id="EqpCateDelBtn">
        삭제
      </button>
      <button type="button" class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">
        취소
      </button>`)
  }
}

$(document).on("change", "#eqpInputFile", function () {
  let input = $(this);
  if (input[0].files && input[0].files[0]) {
    $(".eqpUploadedList").html("");
    for (let i = 0; i < input[0].files.length; i++) {
      let file = input[0].files[i];
      eqpImgCheck[i] = file;
      var reader = new FileReader();
      reader.onload = function (e) {
        let html = `
        <div class="me-1" style="position: relative; display: inline-block;">
          <img src="${e.target.result}" style="width: 100px; height: 100px" />
        </div>`;
        $(".eqpUploadedList").append(html);
      };
      reader.readAsDataURL(file);
    }
  }
});


function EqpUnable(eqpNo, type) {
  if (type == "fixed") {
    UsingNo = 1;
  } else {
    UsingNo = 2;
  }

  let data = {
    eqpmntUsing: UsingNo,
    eqpmntNo: eqpNo
  }
  $.ajax({
    url: "/synerhub/equipment/eqpUnable",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function () {
      EqpDetailForm(eqpNo);

    }
  });
}

function EqpDetailForm(EqpNo) {

  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

  MAIN_CONTENTS.innerHTML = `
  <div class="mb-3 overflow-hidden position-relative">
    <div class="px-3">
        <h4 class="fs-6 mb-0">자원</h4>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                    <a href="../main/index.html">Home</a>
                </li>
                <li class="breadcrumb-item" aria-current="page">자원</li>
            </ol>
        </nav>
    </div>
</div>
<div class="card">
    <div class="card-body">
        <div class="mb-4" role="tablist">
            <h3>자원 상세 보기</h3>
        </div>
        <div class="card">
            <div class="card-body border-bottom">
                <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                    <img src="#" alt="spike-img" class="rounded-circle" width="40" height="40" id="EqpMngPrf">
                    <h6 class="mb-0" id="EqpMngNm"></h6>
                    <p class="fs-2"></p>
                </div>
                <div class="card-body p-4">
                    <div class="table-responsive mb-4 border rounded-1">
                        <table class="table text-nowrap mb-0 align-middle">
                            <thead class="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h4 class="fs-4 fw-semibold mb-0">
                                            <strong id="EqpDetailItemNm"></strong>
                                        </h4>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="height: 10em;">
                                    <td>
                                        <div class="row align-items-center">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">자원 분류</label>
                                                    <input type="text" class="form-control" id="EqpDetailCate" disabled>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/row-->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">사용 연한</label>
                                                    <input type="date" class="form-control" id="EqpDetailDue" disabled />
                                                </div>
                                            </div>
                                            <!--/p-->
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">자원 코드</label>
                                                    <input type="text" class="form-control" id="EqpDetailNo" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <!--/p-->
                                        <div class="mb-3">
                                            <label class="form-label">내용</label>
                                            <textarea class="form-control" rows="5" disabled id="EqpDetailContent"></textarea>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">자원사진</label><br />
                                                    <div class="card-footer bg-white">
	                                                    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											                <li>
        		                                            	<div class="me-1 border" id="EqpDetailImg" />
											                </li>
													    </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center gap-2">
                        </div>
                        <div class="ms-auto d-flex align-items-center gap-2">
                            <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle
                                gap-1" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Back" onclick="EqpInsertForm('update')" id="EqpUpdateBtn">
                                <i class="ti ti-edit fs-7 me-1"></i>
                            </a>
                            <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4 gap-1"
                                data-bs-toggle="modal" data-bs-target="#vertical-center-modal" id="EqpDelBtn">
                                <i class="ti ti-trash fs-7 me-1"></i>
                            </button>
                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle
                                gap-1" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-title="Back" onclick="EqpCancel()">
                                <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header d-flex align-items-center">
                                <h4 class="modal-title mt-3" id="myLargeModalLabel">
                                    &emsp;선택한 자원을 정말 삭제하시겠습니까?
                                </h4>
                                <button type="button" class="btn-close mb-4" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp;※ 한 번 삭제한 자원은 복구할 수 없습니다.
                                    ※</h6>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn bg-primary-subtle text-primary me-2" data-bs-dismiss="modal"
                                    onclick="EqpDelete()" id="EqpDeleteBtn">
                                   	예
                                </button>
                                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start"
                                    data-bs-dismiss="modal">
                                    아니오
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="comment" style="display: none;">
                    <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                        <img src="../resources/assets/images/profile/user-1.jpg" alt="spike-img" class="rounded-circle"
                            width="33" height="33">
                        <input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp"
                            placeholder="Comment">
                        <button class="btn btn-primary">Comment</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

  $.ajax({
    url: "/synerhub/equipment/eqpDetail",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify({ eqpmntNo: EqpNo }),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      $("#EqpDetailItemNm").text(res.eqpmntNm);
      $("#EqpDetailDue").val(res.eqpmntDue.toString().split(" ")[0]);
      $("#EqpDetailNo").val(res.eqpmntNo);
      $("#EqpDetailCate").val(res.eqpmntCateNm);
      $("#EqpDetailContent").text(res.eqmntContent);
      for (let i = 0; i < res.fileEqpList.length; i++) {
        $("#EqpDetailImg").html(`
	        <p class="mailbox-attachment-icon">
	        	<img src="${contextPath}${res.fileEqpList[i].atchFilePath}" style="width: 150px; height: 150px">
			</p>
			<div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
	            <p style="flex: 1; text-align: center;">${res.fileEqpList[i].atchFileOrgnlNm}</p>
	        </div>`);
      }

      $("#EqpUpdateBtn").removeAttr("onclick");
      $("#EqpUpdateBtn").attr("onclick", `EqpInsertForm(${res.eqpmntNo})`);
      $("#EqpDeleteBtn").removeAttr("onclick");
      $("#EqpDeleteBtn").attr("onclick", `EqpDelete(${res.eqpmntNo})`);

      let getUserData = {
        memNo: res.eqpmntMngr,
        chNo: synerhubch
      }
      $.ajax({
        url: "/synerhub/equipment/getChUser",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token)
        },
        data: JSON.stringify(getUserData),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
          $("#EqpMngNm").text(result.memNm);
          $("#EqpMngPrf").attr("src", contextPath + result.memPrflimg)
        }
      });

      let OwnerCehck = {
        memNo: MEM_NO,
        chNo: synerhubch
      }
      $.ajax({
        url: "/synerhub/equipment/getChUser",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token)
        },
        data: JSON.stringify(OwnerCehck),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
          if (result.chPrp == "C") {
            $("#EqpUpdateBtn").css("visibility", "visible");
            $("#EqpDelBtn").css("visibility", "visible");
          }
        }
      });

      // 작성자 외에는 수정 / 삭제 불가
      if (MEM_NO != res.eqpmntMngr) {
        $("#EqpUpdateBtn").css("visibility", "hidden");
        $("#EqpDelBtn").css("visibility", "hidden");
      }

    }

  });
}

function EqpUseRequest() {
  eqpLive();
}

function EqpCancel() {
  eqpList();
}

function EqpDetailCancel(eqpNo){
  EqpDetailForm(eqpNo);
}

function EqpDelete(no) {
  $.ajax({
    url: "/synerhub/equipment/eqpDelete",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify({ eqpmntNo: no }),
    contentType: "application/json; charset=utf-8",
    success: function () {
      eqpList();
    }
  });
}

function EqpInsert(eqpNo) {
  var formdata = new FormData();
  formdata.append("eqpmntMngr", MEM_NO);
  formdata.append("eqpmntNm", $("#EqpNameInput").val());
  formdata.append("eqpmntUsing", 2);
  formdata.append("eqpmntDue", $("#EqpDueDateInput").val());

  let eqpInsertFile = $("#eqpInputFile")[0];
  if (eqpInsertFile.files.length > 0) {
    for (let i = 0; i < eqpInsertFile.files.length; i++) {
      formdata.append("eqpFileList", eqpInsertFile.files[i]);
    }
  }

  formdata.append("eqmntContent", $("#EqpContentInput").val());
  formdata.append("eqpmntCateNo", $("#EqpCategory").val());
  formdata.append("chNo", synerhubch);
  if (synerhubth != null) {
    formdata.append("thNo", synerhubth);
  }

  if (eqpNo == null) {
    formdata.append("type", "insert");
  } else {
    formdata.append("eqpmntNo", eqpNo);
    formdata.append("type", "update");
  }
  
  
  $.ajax({
    url: "/synerhub/equipment/eqpInsert",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: formdata,
    contentType: false,
    processData: false,
    success: function () {
      if (eqpNo == null) {
        Swal.fire('등록이 완료되었습니다.', '감사합니다~!', 'success');
        eqpList();
      }
      else {
        Swal.fire('수정이 완료되었습니다.', '감사합니다~!', 'success');
        EqpDetailForm(eqpNo);
      }
    }
  });
}


$(document).on("change", "#EqpImgInput", function () {
  let input = $(this);
  if (input[0].files && input[0].files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('EqpUploadFileList').innerHTML += `
      <div class="me-1" style="position: relative; display: inline-block;">
      	<img src="${e.target.result}" style="width: 100px; height: 100px" />
        <p style="position: absolute; top: 0; right: 0; background: white; cursor: pointer;">X</p>
      </div`;
    };
    reader.readAsDataURL(input[0].files[0]);
  } else {
    document.getElementById('EqpUploadFileList').src = "";
  }
});

function EqpCateInsertForm() {
  $("#EqpCateInsertName").html("");
}

function EqpCateDelete() {
  let no = $("#EqpCateSelOne option:selected").val();
  Swal.fire({
    title: '정말로 그렇게 하시겠습니까?',
    text: '다시 되돌릴 수 없습니다.',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
    cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
    confirmButtonText: '승인', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정

  }).then(result => {
    // 만약 Promise리턴을 받으면,
    if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
      Swal.fire('승인이 완료되었습니다.').then((results) => {
        if (results.isConfirmed) {
          $.ajax({
            url: "/synerhub/equipment/cateDelete",
            type: "post",
            beforeSend: function (xhr) {
              xhr.setRequestHeader(header, token)
            },
            data: JSON.stringify({ eqpmntCateNo: no }),
            contentType: "application/json; charset=utf-8",
            success: function () {
              EqpInsertForm();
              $(".modal-backdrop").remove();
            }
          });
        }
      });
    }
  });
}

function EqpCateInsert() {

  let eqpCateCont = $(document).find("#EqpCateInsertName").val();
  let data = {
    eqpmntCateNm: eqpCateCont,
    chNo: synerhubch
  };

  $.ajax({
    url: "/synerhub/equipment/cateInsert",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      EqpInsertForm();
    }
  });
};


// 수정
function EqpCateUpdate() {
  let no = $("#EqpCateSelOne option:selected").val();
  let name = $("#EqpCateSelOne option:selected").text();
  (async () => {
    const { value: getName } = await Swal.fire({
      title: '자원 분류 카테고리 수정',
      text: name,
      input: 'text',
      inputPlaceholder: '변경할 카테고리 이름을 적어주세요'
    })

    // 이후 처리되는 내용
    if (getName) {
      let data = {
        eqpmntCateNo: no,
        eqpmntCateNm: getName
      }
      $.ajax({
        url: "/synerhub/equipment/cateUpdate",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
          EqpInsertForm();
        }
      });
    }
  })()
}
