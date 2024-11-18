//전역변수 이름다르게하기 이름 같게하면 오류생김
var threadfileList = [];

//페이지번호 전역변수 이름다르게하기 이름 같게하면 오류생김
let Freepage = 1;


function ThreadBoard(thNo) {
  //스레드 번호  
  synerhubth = thNo;
  thTtl = thTtl;

  //synerhubThread(thNo)   
  let synerhubThread = {
    "thNo": thNo,
    "thTtl": thTtl,
    "rowCnt": 10,
    "page": Freepage,
    "synerhub1": MEM_NO,
    "synerhub2": synerhubth
  }

  console.log("synerhubThread : ", synerhubThread);
  /*synerhubThread -> console    
          page : 1  
          rowCnt : 3   
          thNo : 238
          thTtl: "개발부" 
  */
  $.ajax({
    url: "/synerhub/thboard/list2",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(synerhubThread),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      console.log("/thboard/list2 : ", result);
      /*
          thboard/list2 -> console
              page : 1
              thNo : 238
              thTtl : "개발부"
      */
      // let resDaily = result.thboardDailyList.list;
      let res = result.thboardFreeList.list;
      thTtl = result.thTtl;

      var html = "";
      if (result.thboardAuthority == 0) {

        Swal.fire('해당 스레드에 권한이 없습니다 !', '', 'warning');
        synerhubTheThread(thNo);

      } else {
        if (res.length == 0) {
          html += `
        <div class="mb-3 overflow-hidden position-relative"> 
            <div class="px-3">
              <h4 class="fs-6 mb-0">게시판</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a>Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                  <li class="breadcrumb-item" aria-current="page">게시판</li>
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
                                <h3>${thTtl}</h3>
                            </div>
                            <p class="card-subtitle mb-0"></p>
                        </div>

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thboardSearch" placeholder="제목을 검색하세요">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" onclick="thboardSchBtn(${thNo})">
                                <i class="ti ti-search fs-6"></i>
                            </button>
                        </div> 


                    </div>  
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap text-center">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                 	<th class="ps-0">NO</th> 
                                    <th>제목</th>
                                    <th>작성자</th> 
                                    <th>작성일</th>
                                    <th>조회수</th> 
                                </tr>
                            </thead>  
                            <tbody> 
                                <tr>
                                    <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                </tr>
                            </tbody>
                </table> 
              </div> 
              <div class="align-items-center justify-content-between mt-10">  
                 <div class="mb-3 me-3" >
                      <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                        <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                          <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                        </a>
                        <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thboardinsert(${thNo})">
                            <i class="ti ti-pencil fs-6 me-2"></i>
                            작성
                        </button> 
                  </div>
              </div>   
            </div> 
          </div> 
        </div>`;
        } else {
          html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">게시판</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a>Home</a> 
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                  <li class="breadcrumb-item" aria-current="page">게시판</li>
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
                                <h3>${thTtl} 게시판</h3>
                            </div>
                            <p class="card-subtitle mb-0"></p>
                        </div>

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thboardSearch" placeholder="제목을 검색하세요">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="thboardSchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thboardSchBtn(${thNo})"></i>
                                <i class="ti ti-search fs-6"></i>
                            </button>
                        </div> 


                    </div>
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                    <th style="padding-left: 30px">NO</th>
                                    <th style="padding-left: 80px">제목</th>
                                    <th style="padding-left: 30px">작성자</th> 
                                    <th style="padding-left: 70px">작성일</th>
                                    <th>조회수</th>
                                </tr>
                            </thead> 
                            <tbody>`;

          for (var j = 0; j < res.length; j++) {
            html += ` 
            <tr  id="thBoardtr${res[j].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thBoard(${res[j].brdNo})">
                <td class="ps-0"><span style="padding-left: 40px" id="${res[j].brdNo}">${res[j].rnum}</span></td>
                <td style="padding-left: 80px"> ${res[j].brdTtl}</td> 
                <td class="ps-4"><span class="mb-1 badge text-bg-light">${res[j].brdWrtrNm} </span></td>
                <td style="padding-left: 70px"> ${res[j].formattedBrdRgdt}</td>
                <td style="padding-left: 25px" ><p class="mb-1 badge bg-indigo-subtle text-indigo"> ${res[j].brdHit} </p></td>
            </tr>`;
          }
          html += ` 
                  </tbody>
                </table> 
              </div>
              <div class="align-items-center justify-content-between mt-10">
                  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                        `;
          if (result.thboardAuthority > 0) {
            html += `
                        <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                          <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                        </a>
                        <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thboardinsert(${thNo})">
                            <i class="ti ti-pencil fs-6 me-2"></i>
                            작성
                        </button>
                            `;
          }
          html +=
            `
                   </div>
              </div>

                  <div class="text-center" id="pagingFree">
		                <nav aria-label="Page navigation">
		                    <ul class="pagination justify-content-center pagination-sm m-0">
		                        <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
		                        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li> 
		                    </ul>
		                </nav>
                 </div>

            </div>
          </div>
        </div>`;
        }
      }

      $("#main_contents").html(html);
      FreeupdatePaging(result.thboardFreeList.total, result.page, result.thboardFreeList.rowCnt, result.thNo);
      /*
      result.thboardFreeList.total : 2
      result.page : 1
      result.thboardFreeList.rowCnt : 3
      result.thNo: 238
      */
    },
    error: function (xhr, status, error) {
      console.error("AJAX 요청 실패:", error);
    }
  })
};


function FreeupdatePaging(total, currentPage, rowCnt, thNo) {
  console.log("FreeupdatePaging게시판 호출됨, thNo:", thNo);
  // ...
  /*
      total   :    2
  currentPage :    1
      rowCnt  :    3
        thNo  :    238
  */
  if (rowCnt < 1) {
    console.log("나누기 시 부모가 0일 수 없습니다");
    return;
  }
  let FreeTotalPages = Math.ceil(total / rowCnt);
  let FreePagingContainer = $('#pagingFree .pagination');
  FreePagingContainer.empty(); // 이전 내용 삭제

  if (currentPage > 1) {
    FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" data-th-no="${thNo}">이전</a></li>`);
  } else {
    FreePagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" data-th-no="${thNo}">이전</a></li>`);
  }

  // 페이지 번호 생성 
  for (let i = 1; i <= FreeTotalPages; i++) {
    if (i === currentPage) {
      FreePagingContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)" data-th-no="${thNo}">${i}</a></li>`);
    } else {
      FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}" data-th-no="${thNo}">${i}</a></li>`);
    }
  }

  // 다음 버튼
  if (currentPage < FreeTotalPages) {
    FreePagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" data-th-no="${thNo}">다음</a></li>`);
  } else {
    FreePagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" data-th-no="${thNo}">다음</a></li>`);
  }
}

function ThreadBoard2(thNo, page) {
  synerhubth = thNo;
  thTtl = thTtl;
  let searchTitleWord = $("#thboardSearch").val().trim();

  //synerhubThread(thNo)
  let synerhubThread = {
    "thNo": thNo,
    "thTtl": thTtl,
    "rowCnt": 10,
    "page": page,
    "searchTitle": searchTitleWord
  }

  console.log("ThreadBoard2 : ", synerhubThread);
  /*synerhubThread -> console
          page : 1
          rowCnt : 3
          thNo : 238
          thTtl: "개발부" 
  */
  $.ajax({
    url: "/synerhub/thboard/list2",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(synerhubThread),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      console.log("/thboard/list2 : ", result);
      /*
          thboard/list2 -> console
              page : 1
              thNo : 238
              thTtl : "개발부"
      */
      // let resDaily = result.thboardDailyList.list;
      let res = result.thboardFreeList.list;
      thTtl = result.thTtl;

      var html = "";

      if (res.length == 0) {
        html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">게시판</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <p>Home</p>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
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
                                <h3>${thTtl}</h3>
                            </div> 
                            <p class="card-subtitle mb-0"></p>
                        </div> 

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thboardSearch" placeholder="제목을 검색하세요" style="width:25%;"  value="${searchTitleWord}"> 
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="thboardSchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thboardSchBtn(${thNo})"></i>
                                <i class="ti ti-search fs-6"></i>
                            </button>
                        </div> 
                        
                    </div>  
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap text-center">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                 	<th class="ps-0">NO</th>
                                    <th>제목</th>
                                    <th>작성자</th> 
                                    <th>작성일</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr>
                                    <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                </tr>
                            </tbody>
                </table>
              </div>
              <div class="align-items-center justify-content-between mt-10">
                  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"">
                        <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                    </a>
                    <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thboardinsert(${thNo})">
                        <i class="ti ti-pencil fs-6 me-2"></i>
                        작성
                    </button>
                  </div>
              </div>    
            </div>
          </div> 
        </div>`;
      } else {
        html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">게시판</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <p>Home</p>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
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
                                <h3>${thTtl} 게시판</h3>
                            </div>
                            <p class="card-subtitle mb-0"></p>
                        </div>

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thboardSearch" placeholder="제목을 검색하세요" style="width:25%;"  value="${searchTitleWord}"> 
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="thboardSchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thboardSchBtn(${thNo})"></i>
                                <i class="ti ti-search fs-6"></i>
                            </button>
                        </div> 
                        
                    </div>
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap">
                            <thead class="table-primary text-dark fs-4">
                                <tr> 
                                    <th style="padding-left: 30px">NO</th>
                                    <th style="padding-left: 80px">제목</th>
                                    <th style="padding-left: 25px">작성자</th>  
                                    <th style="padding-left: 30px">작성일</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>`;

        for (var j = 0; j < res.length; j++) {
          html += `
            <tr  id="thBoardtr${res[j].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thBoard(${res[j].brdNo})">
                <td class="ps-0"><span style="padding-left: 35px" id="${res[j].brdNo}">${res[j].rnum}</span></td>
                <td style="padding-left: 80px"> ${res[j].brdTtl}</td> 
                <td style="padding-left: 25px"><span class="mb-1 badge text-bg-light">${res[j].brdWrtrNm} </span></td>
                <td style="padding-left: 30px"> ${res[j].formattedBrdRgdt}</td> 
                <td style="padding-left: 20px" ><p class="mb-1 badge bg-indigo-subtle text-indigo"> ${res[j].brdHit} </p></td>
            </tr>`;
        }
        html += ` 
                  </tbody>
                </table>
              </div>
              <div class="align-items-center justify-content-between mt-10">
                  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                        <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                    </a>
                    <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thboardinsert(${thNo})">
                        <i class="ti ti-pencil fs-6 me-2"></i>
                        작성
                    </button>
                  </div>
              </div>

                  <div class="text-center" id="pagingFree">
		                <nav aria-label="Page navigation">
		                    <ul class="pagination justify-content-center pagination-sm m-0">
		                        <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
		                        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li> 
		                    </ul>
		                </nav>
                 </div>

            </div>
          </div>
        </div>`;
      }

      $("#main_contents").html(html);
      FreeupdatePaging(result.thboardFreeList.total, result.page, result.thboardFreeList.rowCnt, result.thNo);
      /*
      result.thboardFreeList.total : 2
      result.page : 1
      result.thboardFreeList.rowCnt : 3
      result.thNo: 238
      */
    }
  });
}




//등록 폼
function thboardinsert(thNo) {

  var html = "";
  html += `
			<div class="mb-3 overflow-hidden position-relative">
	            <div class="px-3">
	              <h4 class="fs-6 mb-0">게시물 작성</h4>
	              <nav aria-label="breadcrumb">
	                <ol class="breadcrumb mb-0">
	                  <li class="breadcrumb-item">
	                    <p>Home</p>
	                  </li>
	                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
	                  <li class="breadcrumb-item" aria-current="page">게시물 작성</li>
	                </ol>
	              </nav>
	            </div>
	        </div>  
	
	        <div class="card">
	            <div class="card-body">
	                <div class="mb-4" role="tablist">
	                    <h3>게시글 작성</h3>
	                </div>
	
	                <div class="tab-content">
	                    <div class="tab-pane active" id="feeds" role="tabpanel">
	                        <div class="card border">
	                            <div class="card-body p-4">
	                                
	                                <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
	                                    <div class="mt-3">
	                                        <label class="form-label mt-10" for="title-3">제목</label>
	                                        <br />
	                                        <input id="ThBoardTtl" type="text" value="" class="form-control" />
	                                        <br />
	                                        <label class="form-label" for="text-3">내용</label>
	                                        <br />
	                                        <textarea id="ThBoardConts" value="" rows="10" class="form-control"></textarea>
	                                    </div>
	                                </div>
	
	                                <div class="d-flex align-items-center justify-content-between">
	                                	<form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
	                                    <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
	                                        <li>
	                                            <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('threadinputFile').click();">
	                                                <i class="ti ti-paperclip me-2 fs-5"></i>
	                                                <span class="d-none d-sm-inline-flex">파일 첨부</span>
		                                            <input class="form-control" type="file" id="threadinputFile" name="threadinputFile" style="display: none;">
	                                            </a>
	                                        </li>
	                                        <li>
												<div class="uploadedList"></div>
	                                        </li>
	                                    </ul>
	                                    </form>
	                                    <div>
                                      <button type="button" class="btn btn-primary" onclick="thbrdinsertBtn(${thNo})">등록</button>
	                                        <button type="button" class="btn bg-danger-subtle text-danger ms-3" id="thbrdinsert" onclick="thboardbackBtn(${thNo})">취소</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>`;
  $("#main_contents").html(html);
};
//등록버튼
function thbrdinsertBtn(thNo) {

  // 게시글 정보를 포함한 데이터 객체 생성
  let data = {
    chNo: synerhubch,
    thNo: thNo,
    brdWrtr: MEM_NO,
    brdTtl: $("#ThBoardTtl").val(),
    brdConts: $("#ThBoardConts").val()
  }

  // FormData 객체 생성
  let formData = new FormData();
  formData.append("chNo", synerhubch);
  formData.append("thNo", thNo);
  formData.append("brdWrtr", MEM_NO);
  formData.append("brdTtl", $("#ThBoardTtl").val());
  formData.append("brdConts", $("#ThBoardConts").val());


  // 파일 첨부
  let fileInput = $('#threadinputFile')[0];
  if (threadfileList.length > 0) {
    for (let i = 0; i < threadfileList.length; i++) {
      formData.append("thboardFileList", threadfileList[i]);
    }
  }
  threadfileList = [];

  $.ajax({
    url: "/synerhub/thboard/insert",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: formData, // FormData
    processData: false,
    contentType: false,
    success: function (res) {
      console.log("insert : ", res);

      // 게시물 등록 완료 
      var html = `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                        <h4 class="fs-6 mb-0">게시판</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <p>Home</p>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                                <li class="breadcrumb-item" aria-current="page">게시물</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>게시글 상세 보기</h3>
                        </div>
                        <div class="card">
                            <div class="card-body border-bottom">
                                <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                                    <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                                    <h5 class="mb-0">${res.brdWrtrNm}</h5>
                                </div>
                                <div class="card-body p-4">
                                    <div class="table-responsive mb-4 border rounded-1">
                                        <table class="table text-nowrap mb-0 align-middle">
                                            <thead class="text-dark fs-4">
                                                <tr>
                                                    <th>
                                                        <h4 class="fs-4 fw-semibold mb-0">
                                                            <strong>&ensp;${res.brdTtl}</strong>
                                                        </h4>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="height: 10em;"> 
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="ms-3">
                                            <p class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 <tr> 
					                      <td>
					                      	<div class="card-footer bg-white">
											    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											        `;
      for (var i = 0; i < res.thboardFileDetail.length; i++) {
        html += `
											                <li>
											                    <div class="me-1 border">
											                        <p class="mailbox-attachment-icon">
											                            `;
        if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
          html += `
											                                <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
        } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
          html += `
											                                <i class="ti ti-file-text"></i>`;
        }
        html += `
											                        </p>
											                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
											                           <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
											                            <a href="#" class="float-end mt-3"> 
											                                <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
											                                </button>
											                            </a>
											                        </div>
											                    </div>
											                </li>`;
      }
      html += `
											    </ul>
											</div>

					                      </td>
					                    </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                        </div>`
      let brdCheck = false;
      if (res.brdWrtr == MEM_NO) {
        html += `     
                                <div class="ms-auto d-flex align-items-center gap-2">
                                    <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thboardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-th-no="${res.thNo}"  onclick="thboardModBtn(${res.brdNo})">
                                        <i class="ti ti-edit fs-7 me-1"></i>
                                    </a>
                                    <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                        <i class="ti ti-trash fs-7 me-1"></i>
                                    </button>
                                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>
                                    `
        brdCheck = true
      } else {
        html += `
                                     <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>`
      }
      html += `
                                        </div> 
                                    </div>
                                </div>
                                <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header d-flex align-items-center">
                                                <h4 class="modal-title mt-3" id="">
                                                    &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                                </h4>
                                                <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물은 복구할 수 없습니다.</h6>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
                                                    아니오
                                                </button>
                                                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thBoardDelete" data-brd-no="${res.brdNo}" onclick="thBoardDeleteBtn(${res.thNo})">
                                                    예
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="comment" style="display: none;">
                                    <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                        <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
                                        <input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp" placeholder="Comment">
                                        <button class="btn btn-primary">Comment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      Swal.fire('게시물 등록 완료 !', '', 'success');
      $("#main_contents").html(html);
    },
    error: function (xhr, status, error) {
      console.error("Error occurred: ", error);
      Swal.fire('게시물 등록 실패!', '다시 시도해 주세요.', 'error');
    }
  });
}

function thBoard(brdNo) {

  let data = {
    brdNo: brdNo,
    synerhub1: MEM_NO,
    synerhub2: synerhubth
  }

  $.ajax({
    url: "/synerhub/thboard/select",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      let res = result.thboardVO;
      console.log("select : ", result);
      console.log("thTtl : ", thTtl);

      var html = "";

      if (result.thboardAuthority == 0) {

        Swal.fire('해당 스레드에 권한이 없습니다 !', '', 'warning');
        synerhubTheThread(thNo);

      } else {
        html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">게시판</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <p>Home</p>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                        <li class="breadcrumb-item" aria-current="page">게시물</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="mb-4" role="tablist">
                    <h3>게시글 상세 보기</h3>
                </div>
                <div class="card">
                    <div class="card-body border-bottom">
                        <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                            <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                            <h5 class="mb-0">${res.brdWrtrNm} </h5>
                        </div>
                        <div class="card-body p-4">
                            <div class="table-responsive mb-4 border rounded-1">
                                <table class="table text-nowrap mb-0 align-middle">
                                    <thead class="text-dark fs-4">
                                        <tr>
                                            <th>
                                                <h4 class="fs-4 fw-semibold mb-0">
                                                    <strong>&ensp;${res.brdTtl}</strong>
                                                </h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="height: 10em;"> 
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="ms-3">
                                    <p class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts} 
                                    </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr> 
					                      <td>
					                      	<div class="card-footer bg-white">
											    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											        `;
        for (var i = 0; i < res.thboardFileDetail.length; i++) {
          html += `
											                <li>
											                    <div class="me-1 border">
											                        <p class="mailbox-attachment-icon">
											                            `;
          if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
            html += `
											                                <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
          } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
            html += `
											                                <i class="ti ti-file-text"></i>`;
          }
          html += `
											                        </p>
											                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
											                          <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;"> ${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
											                            <a href="#" class="float-end mt-3"> 
											                                <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
											                                </button>
											                            </a>
											                        </div>
											                    </div>
											                </li>`;
        }
        html += `
											    </ul>
											</div>

					                      </td>
					                    </tr>



                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex align-items-center">
                              `

        let brdCheck = false;
        if (res.brdWrtr == MEM_NO) {
          html += `     
                                <div class="ms-auto d-flex align-items-center gap-2">
                                    <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thboardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-th-no="${res.thNo}"  onclick="thboardModBtn(${res.brdNo})">
                                        <i class="ti ti-edit fs-7 me-1"></i>
                                    </a>
                                    <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                        <i class="ti ti-trash fs-7 me-1"></i>
                                    </button>
                                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>
                                    `
          brdCheck = true
        } else {
          html += `
                                     <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>`
        }
        html += `
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header d-flex align-items-center">
                                        <h4 class="modal-title mt-3" id="">
                                            &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                        </h4>
                                        <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물는 복구할 수 없습니다.</h6>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
     	 								   아니오
                                        </button>
                                        <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thBoardDelete" data-brd-no="${res.brdNo}" onclick="thBoardDeleteBtn(${res.thNo})">
                                          	  예	
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="comment" style="display: none;">
                            <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
                                <input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp" placeholder="Comment">
                                <button class="btn btn-primary">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
      }
      $("#main_contents").html(html);
    }
  });
};

function thbackBtn(thNo) {
  ThreadBoard(thNo);
};

function thboardbackBtn(thNo) {
  ThreadBoard(thNo);
}

function threadHomeBtn(thNo) {
  synerhubTheThread(thNo);
}



function thboardModBtn(brdNo) {
  console.log("brdNo : ", brdNo);
  console.log("thboardModBtn 클릭");

  let brdTtl = $("#thboardMod").data("brdTtl");
  let brdConts = $("#thboardMod").data("brdConts");
  let thNo = $("#thboardMod").data("thNo");

  var html = "";
  html += `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                      <h4 class="fs-6 mb-0">게시물 수정</h4>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                          <li class="breadcrumb-item">
                            <p>Home</p>
                          </li>
                          <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                          <li class="breadcrumb-item" aria-current="page">게시물 수정</li>
                        </ol>
                      </nav>
                    </div>
                </div>  
        
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>게시글 수정</h3>
                        </div>
        
                        <div class="tab-content">
                            <div class="tab-pane active" id="feeds" role="tabpanel">
                                <div class="card border">
                                    <div class="card-body p-4">
                                        
                                        <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
                                            <div class="mt-3">
                                                <label class="form-label mt-10" for="title-3">제목</label>
                                                <br />
                                                <input id="ThBoardTtl" type="text" value="${brdTtl}" class="form-control" />
                                                <br />
                                                <label class="form-label" for="text-3">내용</label>
                                                <br />
                                                <textarea id="ThBoardConts" value="" rows="10" class="form-control">${brdConts}</textarea>
                                            </div>
                                        </div>
        
                                        <div class="d-flex align-items-center justify-content-between">
                                            <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                                                <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                                                <li>
                                                    <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('threadinputFile').click();">
                                                        <i class="ti ti-paperclip me-2 fs-5"></i>
                                                        <span class="d-none d-sm-inline-flex">파일 첨부</span>
                                                        <input class="form-control" type="file" id="threadinputFile" name="threadinputFile" style="display: none;">
                                                    </a>
                                                </li>
                                                <li> 
                                                    <div class="uploadedList"></div>
                                                </li>  
	                                    </ul>
                                            </form>
                                            <div>
                                            <button type="button" class="btn btn-success" id="" onclick="thBoardUpdateBtn(${brdNo})">수정</button>
                                                <button type="button" class="btn bg-danger-subtle text-danger ms-3" onclick="thboardbackBtn(${thNo})">취소</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
  $("#main_contents").html(html);
}

function thBoardUpdateBtn(brdNo) {
  console.log(brdNo);
  console.log("thBoardUpdateBtn 클릭");

  let thNo = $("#thboardMod").data("thNo");
  let brdTtl = $("#ThBoardTtl").val();
  let brdConts = $("#ThBoardConts").val();


  let data = {
    thNo: thNo,
    brdNo: brdNo,
    brdTtl: brdTtl,
    brdConts: brdConts
  }

  console.log(data);
  $.ajax({
    url: "/synerhub/thboard/update",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      console.log("update : ", result);
      var res = result.thboardVO;
      var html = "";
      html += ` <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">게시판</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <p>Home</p>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                        <li class="breadcrumb-item" aria-current="page">게시물</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="mb-4" role="tablist">
                    <h3>게시글 상세 보기</h3>
                </div>
                <div class="card">
                    <div class="card-body border-bottom">
                        <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                            <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                            <h5 class="mb-0">${res.brdWrtrNm} </h5>
                        </div>
                        <div class="card-body p-4">
                            <div class="table-responsive mb-4 border rounded-1">
                                <table class="table text-nowrap mb-0 align-middle">
                                    <thead class="text-dark fs-4">
                                        <tr>
                                            <th>
                                                <h4 class="fs-4 fw-semibold mb-0">
                                                    <strong>&ensp;${res.brdTtl}</strong>
                                                </h4>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="height: 10em;"> 
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div class="ms-3">
                                        <p class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts}
                                        </p> 
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                         <tr> 
					                      <td>
					                      	<div class="card-footer bg-white">
											    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											        `;
      for (var i = 0; i < res.thboardFileDetail.length; i++) {
        html += `
											                <li>
											                    <div class="me-1 border">
											                        <p class="mailbox-attachment-icon">
											                            `;
        if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
          html += `
											                                <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
        } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
          html += `
											                                <i class="ti ti-file-text"></i>`;
        }
        html += `
											                        </p>
											                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
											                           <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
											                            <a href="#" class="float-end mt-3"> 
											                                <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
											                                </button>
											                            </a>
											                        </div>
											                    </div>
											                </li>`;
      }
      html += `
											    </ul>
											</div>
					                      </td>
					                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="d-flex align-items-center">
                               `
      let brdCheck = false;
      if (res.brdWrtr == MEM_NO) {
        html += `     
                                <div class="ms-auto d-flex align-items-center gap-2">
                                    <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thboardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-th-no="${res.thNo}"  onclick="thboardModBtn(${res.brdNo})">
                                        <i class="ti ti-edit fs-7 me-1"></i>
                                    </a>
                                    <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                        <i class="ti ti-trash fs-7 me-1"></i>
                                    </button>
                                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>
                                    `
        brdCheck = true
      } else {
        html += `
                                     <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thbackBtn(${res.thNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>`
      }
      html += `
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header d-flex align-items-center">
                                        <h4 class="modal-title mt-3" id="">
                                            &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                        </h4>
                                        <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물는 복구할 수 없습니다.</h6>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
     	 								   아니오
                                        </button>
                                        <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thBoardDelete" data-brd-no="${res.brdNo}" onclick="thBoardDeleteBtn(${res.thNo})">
                                          	  예	
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="comment" style="display: none;">
                            <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
                                <input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp" placeholder="Comment">
                                <button class="btn btn-primary">Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
      Swal.fire('게시물 수정 완료 !', '', 'success');
      $("#main_contents").html(html);
    }
  });
}

function thBoardDeleteBtn(thNo) {
  console.log("삭제할 번호 : ", thNo);
  let brdNo = $("#thBoardDelete").data("brdNo");
  console.log(brdNo, brdNo);

  data = {
    thNo: thNo,
    brdNo: brdNo
  }

  $.ajax({
    url: "/synerhub/thboard/delete",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      console.log(res);
      Swal.fire('게시물 삭제 완료 !', '', 'success');
      ThreadBoard(thNo);
    }
  });
}

// 페이지 번호 클릭 이벤트 등록
$(document).on('click', "#pagingFree .page-link", function () {
  const page = $(this).data('page');
  const thNo = $(this).data('thNo');

  if (page) {
    console.log("page : " + page);
    console.log("thNo : " + thNo);
    ThreadBoard2(thNo, page);
  }
});


// 업로드 한 파일목록의 'X' 클릭
$(document).on("click", ".uploadedList span", function () {
  $(this).parent("div").remove();
});

$(document).on("change", "#threadinputFile", function () {
  let input = $(this);

  if (input[0].files && input[0].files.length > 0) {
    for (let i = 0; i < input[0].files.length; i++) {
      let file = input[0].files[i];

      threadfileList.push(file);
    }
  }

  if (input[0].files && input[0].files.length > 0) {
    for (let i = 0; i < input[0].files.length; i++) {
      let file = input[0].files[i];
      var reader = new FileReader();
      reader.onload = function (e) {
        let html = `
					<div class="me-1" style="position: relative; display: inline-block;">
						<img src="${e.target.result}" style="width: 100px; height: 100px" />
						<span style="position: absolute; top: 0; right: 0; background: white; cursor: pointer;">X</span>
					</div>`;
        $(".uploadedList").append(html);
      };
      reader.readAsDataURL(file);
    }
  } else {
    document.getElementById('EqpUploadFileList').src = "";
  }
});


function thboardSchBtn(thNo) {
  ThreadBoard2(thNo, 1);
};


function threadTeams() {
  console.log("threadTeams 클릭!!");
  var html = "";
  html += `
	<div class="tab-pane fade" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabindex="0">
  <div class="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
    <h3 class="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friends <span class="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span>
    </h3>
    <form class="position-relative">
      <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends">
      <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
    </form>
  </div>
  <div class="row">
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-2.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Betty Adams</h5>
          <span class="text-dark fs-2">Medical Secretary</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-3.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Inez Lyons</h5>
          <span class="text-dark fs-2">Medical Technician</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-4.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Lydia Bryan</h5>
          <span class="text-dark fs-2">Preschool Teacher</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-5.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Carolyn Bryant</h5>
          <span class="text-dark fs-2">Legal Secretary</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-6.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Paul Benson</h5>
          <span class="text-dark fs-2">Safety Engineer</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-7.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Robert Francis</h5>
          <span class="text-dark fs-2">Nursing Administrator</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-8.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Billy Rogers</h5>
          <span class="text-dark fs-2">Legal Secretary</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-9.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Rosetta Brewer</h5>
          <span class="text-dark fs-2">Comptroller</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-10.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Patrick Knight</h5>
          <span class="text-dark fs-2">Retail Store Manager</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-2.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Francis Sutton</h5>
          <span class="text-dark fs-2">Astronomer</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-3.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Bernice Henry</h5>
          <span class="text-dark fs-2">Security Consultant</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-4.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Estella Garcia</h5>
          <span class="text-dark fs-2">Lead Software Test Engineer</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-5.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Norman Moran</h5>
          <span class="text-dark fs-2">Engineer Technician</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-6.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Jessie Matthews</h5>
          <span class="text-dark fs-2">Lead Software Engineer</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-7.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Elijah Perez</h5>
          <span class="text-dark fs-2">Special Education Teacher</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-8.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Robert Martin</h5>
          <span class="text-dark fs-2">Transportation Manager</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-9.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Elva Wong</h5>
          <span class="text-dark fs-2">Logistics Manager</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-10.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Edith Taylor</h5>
          <span class="text-dark fs-2">Union Representative</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-2.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Violet Jackson</h5>
          <span class="text-dark fs-2">Agricultural Inspector</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-6 col-lg-4">
      <div class="card hover-img overflow-hidden">
        <div class="card-body p-4 text-center border-bottom">
          <img src="../assets/images/profile/user-3.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
          <h5 class="fw-semibold mb-0">Phoebe Owens</h5>
          <span class="text-dark fs-2">Safety Engineer</span>
        </div>
        <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
          <li class="position-relative">
            <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-github"></i>
            </a>
          </li>
          <li class="position-relative">
            <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
        </ul> 
      </div>
    </div>
  </div>
</div>`
}

