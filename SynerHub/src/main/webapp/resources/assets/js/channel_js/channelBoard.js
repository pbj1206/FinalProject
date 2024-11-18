var channelFileList = [];

var chBoardPage = 1;
var searchWord = '';
function channelBoard(chNo) {
  console.log(chNo);
  synerhubch = chNo;

  let synerhubChannel = {
    "chNo": chNo,
    "rowCnt" : 10,
    "page" : chBoardPage,
    "brdSearchWord" : searchWord
  }

  console.log("synerhubChannel : ", synerhubChannel);
  
  $.ajax({
    url: "/synerhub/chBoard/chBlist",
    type: "post",
    beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(synerhubChannel),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        console.log("result : ", result);
        let res = result.chBoardList.list;
        chTtl = result.chTtl;
        /*
                chNo :  95
                page: 1
                chTtl : "리허설 채널"
        */

        var html = "";

        if (res.length == 0) {
            html += `
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                <h4 class="fs-6 mb-0">채널게시판</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <a>Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">${chTtl} 게시판</li>
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
                                    <h3>${chTtl} 게시판</h3>
                                </div>
                                <p class="card-subtitle mb-0"></p>
                            </div>

                            <div class="input-group me-3 mb-3" style="width:25%;"> 
                                <input type="text" class="form-control" id="chBoardSearch" placeholder="제목을 검색하세요">
                                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="chBoardschwr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="chboardSchBtn(${chNo})"></i>
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
                                <tbody id="brdListContent"> 
                                    <tr>
                                        <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="align-items-center justify-content-between mt-10">
                            <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" onclick="backToHome(${chNo})" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                                    <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                </a>
                                <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chBoardInsert(${chNo})">
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
                    <li class="breadcrumb-item" aria-current="page">${chTtl}</li>
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
                                    <h3>${chTtl} 게시판</h3>
                                </div>
                                <p class="card-subtitle mb-0"></p>
                            </div>

                            <div class="input-group me-3 mb-3" style="width:25%;"> 
                                <input type="text" class="form-control" id="chBoardSearch" placeholder="제목을 검색하세요">
                                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="chBoardschwr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="chboardSchBtn(${chNo})"></i>
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
                                <tbody id="brdListContent">`;

                    for (var i = 0; i < res.length; i++) {
                        html += `
                <tr id="chBoardtr${res[i].brdNo}" data-ch-no="${chNo}" data-ch-ttl="${chTtl}" onclick="chBoard(${res[i].brdNo})">
                    <td class="ps-0"><span style="padding-left: 40px" id="${res[i].brdNo}">${res[i].rnum}</span></td>
                    <td style="padding-left: 80px">${res[i].brdTtl}</td>
                    <td class="ps-4"><span class="mb-1 badge text-bg-light">${res[i].brdWrtrNm} </span></td>
                    <td style="padding-left: 70px">${res[i].formattedBrdRgdt}</td>
                    <td style="padding-left: 25px"><p class="mb-1 badge bg-indigo-subtle text-indigo">${res[i].brdHit}</p></td>
                </tr>`;
            }

            html += `
              </tbody>
            </table>
          </div>
          <div class="align-items-center justify-content-between mt-10">
              <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" onclick="backToHome(${chNo})" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                          <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                    </a>
                  <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chBoardInsert(${chNo})">
                      <i class="ti ti-pencil fs-6 me-2"></i>작성
                  </button>
              </div>
          </div>

          <div class="text-center" id="pagingChBoard">
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
        chBoardPaging(result.chBoardList.total, result.page, result.chBoardList.rowCnt, result.chNo);

        /*
            result.thboardFreeList.total : 11
            result.page : 1
            result.thboardFreeList.rowCnt : 10
            result.chNo: 66
            */


    },
    error: function (xhr, status, error) {
        console.error("AJAX 요청 실패:", error);
    }
  });
};

$(document).on("click", "#chBoardschwr", function(){
    searchWord = document.getElementById('chBoardSearch').ariaValueMax;
    channelBoard(synerhubch);
});

function chBoardPaging(total, currentPage, rowCnt, chNo) {
    console.log("chBoardPaging 호출됨 " ,chNo);
    if (rowCnt < 1) {
        return; // rowCnt가 1보다 작으면 종료
    }

    
    let chBoardTotalPages = Math.ceil(total / rowCnt); // 총 페이지 수 계산
    console.log(chBoardTotalPages);
    let chBoardPageContainer = $('#pagingChBoard .pagination');
    chBoardPageContainer.empty();
  
    // 이전 버튼
    if (currentPage > 1) {
        chBoardPageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" data-ch-no="${chNo}">이전</a></li>`);
    } else {
        chBoardPageContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true">이전</a></li>`);
    }   

    // 페이지 번호 생성
    for (let i = 1; i <= chBoardTotalPages; i++) { 
        if (i === currentPage) {
            chBoardPageContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)">${i}</a></li>`);
        } else {
            chBoardPageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}" data-ch-no="${chNo}">${i}</a></li>`);
        }
    }

    // 다음 버튼
    if (currentPage < chBoardTotalPages) {
        chBoardPageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" data-ch-no="${chNo}">다음</a></li>`);
    } else {
        chBoardPageContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true">다음</a></li>`);
    }
} 


function channelBoard2(chNo, page) {
    console.log(chNo);
    synerhubch = chNo;
    chTtl = chTtl;
  
    let synerhubChannel = {
      "chNo": chNo,
      "chTtl" : chTtl,
      "rowCnt" : 10,
      "page" : page
    }
  
    console.log("synerhubChannel : ", synerhubChannel);
    
    $.ajax({
      url: "/synerhub/chBoard/chBlist",
      type: "post",
      beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token);
      },
      data: JSON.stringify(synerhubChannel),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
          console.log("result : ", result);
          let res = result.chBoardList.list;
          chTtl = result.chTtl;
          /*
                  chNo :  95
                  page: 1
                  chTtl : "리허설 채널"
          */
  
          var html = "";
  
          if (res.length == 0) {
              html += `
              <div class="mb-3 overflow-hidden position-relative">
                  <div class="px-3">
                  <h4 class="fs-6 mb-0">채널게시판</h4>
                  <nav aria-label="breadcrumb">
                      <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item">
                          <a>Home</a>
                      </li>
                      <li class="breadcrumb-item" aria-current="page">${chTtl} 게시판</li>
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
                                      <h3>${chTtl} 게시판</h3>
                                  </div>
                                  <p class="card-subtitle mb-0"></p>
                              </div>
                              <div class="input-group me-3 mb-3" style="width:20%;"> 
                                <input type="text" class="form-control" id="chBoardSearch" placeholder="Search">
                                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="chBoardschwr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="chboardSchBtn(${chNo})"></i>
                                    <i class="ti ti-search fs-6"></i>
                                </button>
                            </div>
                          </div> 
                          <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                              <table class="table align-middle text-nowrap text-center">
                                  <thead class="table-primary text-dark fs-4">
                                      <tr>
                                          <th style="padding-left: 30px">NO</th>
                                          <th style="padding-left: 80px">제목</th>
                                          <th style="padding-left: 25px">작성자</th> 
                                          <th style="padding-left: 30px">작성일</th>
                                          <th>조회수</th>
                                      </tr>
                                  </thead>
                                  <tbody id="brdListContent"> 
                                      <tr>
                                          <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                          <div class="align-items-center justify-content-between mt-10">
                              <div class="mb-3 me-3" style="text-align: right;">
                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" onclick="backToHome(${chNo})" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                                    <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                </a>
                                <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chBoardInsert(${chNo})">
                                      <i class="ti ti-pencil fs-6 me-2"></i>
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
                      <li class="breadcrumb-item" aria-current="page">${chTtl}</li>
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
                                      <h3>${chTtl} 게시판</h3>
                                  </div>
                                  <p class="card-subtitle mb-0"></p>
                              </div>
                              <div class="input-group me-3 mb-3" style="width:20%;"> 
                                <input type="text" class="form-control" id="chBoardSearch" placeholder="Search">
                                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;"id="chBoardschwr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="chboardSchBtn(${chNo})"></i>
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
                               
                      for (var i = 0; i < res.length; i++) {
                          html += `
                  <tr id="chBoardtr${res[i].brdNo}" data-ch-no="${chNo}" data-ch-ttl="${chTtl}" onclick="chBoard(${res[i].brdNo})">
                      <td class="ps-0"><span style="padding-left: 35px" id="${res[i].brdNo}">${res[i].rnum}</span></td>
                      <td style="padding-left: 80px">${res[i].brdTtl}</td>
                      <td style="padding-left: 25px"><span class="mb-1 badge text-bg-light">${res[i].brdWrtrNm} </span></td>
                      <td style="padding-left: 30px">${res[i].formattedBrdRgdt}</td>
                      <td style="padding-left: 20px"><p class="mb-1 badge bg-indigo-subtle text-indigo">${res[i].brdHit}</p></td>
                  </tr>`;
              }
  
              html += `
                </tbody>
              </table>
            </div>
            <div class="align-items-center justify-content-between mt-10 d-flex">
                <div class="mb-3 me-3" style="text-align: left;">
                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" onclick="backToHome(${chNo})" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                        <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                    </a>
                </div>
                <div>
                    <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chBoardInsert(${chNo})">
                        <i class="ti ti-pencil fs-6 me-2"></i>작성 
                    </button>
                </div>
            </div>
  
            <div class="text-center" id="pagingChBoard">
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
          chBoardPaging(result.chBoardList.total, result.page, result.chBoardList.rowCnt, result.chNo);
  
          /*
              result.thboardFreeList.total : 11
              result.page : 1
              result.thboardFreeList.rowCnt : 10
              result.chNo: 66
              */
  
  
      },
      error: function (xhr, status, error) {
          console.error("AJAX 요청 실패:", error);
      }
    });
  };
 

  
//등록버튼
function chBoardInsert(chNo) {
    console.log("chboardinsert");

    var html = "";
    html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">채널 게시물 작성</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">채널 게시물 등록</li>
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
                                        <input id="chBoardTtl" type="text" value="" class="form-control" />
                                        <br />
                                        <label class="form-label" for="text-3">내용</label>
                                        <br />
                                        <textarea id="chBoardConts" rows="10" class="form-control"></textarea>
                                    </div>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                                        <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                                            <li>
                                                <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('channelInputFile').click();">
                                                    <i class="ti ti-paperclip me-2 fs-5"></i>
                                                    <span class="d-none d-sm-inline-flex">파일 첨부</span>
                                                    <input class="form-control" type="file" id="channelInputFile" name="channelInputFile" style="display: none;" multiple>
                                                </a>
                                            </li>
                                            <li>
                                                <div class="uploadedList2"></div>
                                            </li>
                                        </ul>
                                    </form>
                                    <div>
                                        <button type="button" class="btn btn-primary" onclick="chBrdInsertBtn(${chNo})">등록</button>
                                        <button type="button" class="btn bg-danger-subtle text-danger ms-3" id="chBrdBackBtn" onclick="chBoardbackBtn(${chNo})">취소</button>
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

// 등록 버튼
function chBrdInsertBtn(chNo) {
    console.log("chBrdInsertBtn");

    let data = {
        chNo: synerhubch,
        brdWrtr: MEM_NO,
        brdTtl: $("#chBoardTtl").val(),
        brdConts: $("#chBoardConts").val()
    };

    let formData = new FormData();
    formData.append("chNo", synerhubch); 
	formData.append("brdWrtr", MEM_NO);
	formData.append("brdTtl",  $("#chBoardTtl").val());
	formData.append("brdConts", $("#chBoardConts").val());

    
    // 파일 첨부
    let fileInput2 = $('#channelInputFile')[0]; // 올바른 ID로 수정
    if (channelFileList.length > 0) {
        for (let i = 0; i < channelFileList.length; i++) {
            formData.append("chBoardFileList", channelFileList[i]);
        }
    }
    channelFileList = [];

    $.ajax({
        url: "/synerhub/chBoard/chBInsert",
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
                                    <a href="#">Home</a>
                                </li>
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
                                                            <a class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts}
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                 <tr> 
					                      <td>
					                      	<div class="card-footer bg-white">
											    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											        `;
                                                    for (var i = 0; i < res.chBoardFileDetail.length; i++) {
                                                        html += `
											                <li>
											                    <div class="me-1 border">
											                        <p class="mailbox-attachment-icon">
											                            `;
                                                                        if (res.chBoardFileDetail[i].atchFileExtn == "jpg" || res.chBoardFileDetail[i].atchFileExtn == "png") {
                                                                            html += `
											                                <img src="${contextPath}${res.chBoardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                                                                        } else if (res.chBoardFileDetail[i].atchFileExtn == "pdf") {
                                                                            html += `
											                                <i class="ti ti-file-text"></i>`;
                                                                        }
                                                                    html += `
											                        </p>
											                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
											                           <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.chBoardFileDetail[i].atchFileOrgnlNm}</p>
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
                                    `
                            let boardCheck = false;
                            if (res.brdWrtr == MEM_NO) {
                                html += `     
                                <div class="ms-auto d-flex align-items-center gap-2">
                                    <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thboardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-ch-no="${res.chNo}"  onclick="chBoardModBtn(${res.brdNo})">
                                        <i class="ti ti-edit fs-7 me-1"></i>
                                    </a>
                                    <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                        <i class="ti ti-trash fs-7 me-1"></i>
                                    </button>
                                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                    </a>
                                    `
                                    boardCheck = true
                                } else {
                                    html += `
                                     <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1" style="margin-left:108vh"></i>
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
                                                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="chBoardDelete" data-brd-no="${res.brdNo}" onclick="chBoardDeleteBtn(${res.chNo})">
                                                    예
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="comment" style="display: none;">
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


function chBackBtn(chNo) {
  console.log("detail back : ", chNo);
  channelBoard(chNo);
};

function chBoardbackBtn(chNo) {
  console.log("insert back : ", chNo);
  channelBoard(chNo);
}

// 채널 게시판 상세보기
function chBoard(brdNo) {

    let data = {
        "brdNo": brdNo
    }

    $.ajax({
        url: "/synerhub/chBoard/chSelect",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let res = result.chBoard;
            console.log("select : ", res);

            var html = "";
            html += `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                        <h4 class="fs-6 mb-0">게시판</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
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
                                            <a class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts} 
                                            </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr> 
                                                <td>
                                                    <div class="card-footer bg-white">
                                                        <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                            `;
                                                            for(var i = 0; i < res.chBoardFileDetail.length; i++) {
                                                                html += `
                                                                    <li>
                                                                        <div class="me-1 border">
                                                                            <p class="mailbox-attachment-icon">
                                                                                `;
                                                                                if(res.chBoardFileDetail[i].atchFileExtn == "jpg" || res.chBoardFileDetail[i].atchFileExtn == "png") {
                                                                                    html += `
                                                                                    <img src="${contextPath}${res.chBoardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                                                                                } else if(res.chBoardFileDetail[i].atchFileExtn == "pdf") {
                                                                                    html += `
                                                                                    <i class="ti ti-file-text"></i>`;
                                                                                }
                                                                                html += `
                                                                            </p>
                                                                            <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                            <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;"> ${res.chBoardFileDetail[i].atchFileOrgnlNm}</p>
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

                                        let boardCheck = false;
                                        if(res.brdWrtr == MEM_NO){ 
                                        html+=`     
                                        <div class="ms-auto d-flex align-items-center gap-2">
                                            <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="chBoardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-ch-no="${res.chNo}"  onclick="chBoardModBtn(${res.brdNo})">
                                                <i class="ti ti-edit fs-7 me-1"></i>
                                            </a>
                                            <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                                <i class="ti ti-trash fs-7 me-1"></i>
                                            </button>
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBrdBackBtn(${res.chNo})">
                                                <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                            </a>
                                            `
                                            boardCheck = true
                                        }else{
                                            html +=`
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBrdBackBtn(${res.chNo})">
                                                <i class="ti ti-arrow-forward-up fs-7 me-1" style="margin-left:108vh"></i>
                                            </a>`
                                        }
                                        html+=`
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
                                                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="chBoardDelete" data-brd-no="${res.brdNo}" onclick="chBoardDeleteBtn(${res.chNo})">
                                                    예	
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="comment" style="display: none;">
                                    <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                        <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#main_contents").html(html);
        }
    });
};

function chBrdBackBtn(chNo) {
    channelBoard(chNo);
}

function chBoardModBtn(brdNo) {
    console.log("brdNo : ", brdNo);
    console.log("chBoardModBtn 클릭");

    let brdTtl = $("#chBoardMod").data("brdTtl");
    let brdConts = $("#chBoardMod").data("brdConts");
    let chNo = $("#chBoardMod").data("chNo");
    console.log("brdTtl : ", brdTtl);
    console.log("brdConts : ", brdConts);
    console.log("chNo : ", chNo);

    var html = "";

    html += `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                      <h4 class="fs-6 mb-0">게시물 수정</h4>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                          <li class="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>
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
                                                <input id="chBoardTtl" type="text" value="${brdTtl}" class="form-control" />
                                                <br />
                                                <label class="form-label" for="text-3">내용</label>
                                                <br />
                                                <textarea id="chBoardConts" value="" rows="10" class="form-control">${brdConts}</textarea>
                                            </div>
                                        </div>
        
                                        <div class="d-flex align-items-center justify-content-between">
                                            <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                                                <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                                                    <li>
                                                        <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('channelInputFile').click();">
                                                            <i class="ti ti-paperclip me-2 fs-5"></i>
                                                            <span class="d-none d-sm-inline-flex">파일 첨부</span>
                                                            <input class="form-control" type="file" id="channelInputFile" name="channelInputFile" style="display: none;">
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div class="uploadedList2"></div>
                                                    </li>  
	                                            </ul>
                                            </form>
                                            <div>
                                                <button type="button" class="btn btn-success" id="" onclick="chBoardUpdateBtn(${brdNo})">수정</button>
                                                <button type="button" class="btn bg-danger-subtle ms-3 text-danger" onclick="chBoardbackBtn(${chNo})">취소</button>
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

function chBoardUpdateBtn(brdNo) {
    let chNo = $("#chBoardMod").data("chNo");
    let brdTtl = $("#chBoardTtl").val();
    let brdConts = $("#chBoardConts").val();

    let data = {
        chNo: chNo,
        brdNo: brdNo,
        brdTtl: brdTtl,
        brdConts: brdConts
    };

    console.log(data);
    $.ajax({
        url: "/synerhub/chBoard/chBUpdate",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log("update : ", result);
            var res = result.chBoard;
            var html = "";
            html += ` <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">게시판</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
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
                                        <a class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts}
                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr> 
                                            <td>
                                                <div class="card-footer bg-white">
                                                    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                        `;
                                                        for (var i = 0; i < res.chBoardFileDetail.length; i++) {
                                                            html += `
                                                                <li>
                                                                    <div class="me-1 border">
                                                                        <p class="mailbox-attachment-icon">
                                                                            `;
                                                                            if (res.chBoardFileDetail[i].atchFileExtn == "jpg" || res.chBoardFileDetail[i].atchFileExtn == "png") {
                                                                                html += `
                                                                                <img src="${contextPath}${res.chBoardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                                                                            } else if (res.chBoardFileDetail[i].atchFileExtn == "pdf") {
                                                                                html += `
                                                                                <i class="ti ti-file-text"></i>`;
                                                                            }
                                                                            html += `
                                                                        </p>
                                                                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                            <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.chBoardFileDetail[i].atchFileOrgnlNm}</p>
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
                                let boardCheck = false;
                                if (res.brdWrtr == MEM_NO) { 
                                    html += `     
                                    <div class="ms-auto d-flex align-items-center gap-2">
                                        <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="chBoardMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-ch-no="${res.chNo}"  onclick="chBoardModBtn(${res.brdNo})">
                                            <i class="ti ti-edit fs-7 me-1"></i>
                                        </a>
                                        <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                            <i class="ti ti-trash fs-7 me-1"></i>
                                        </button>
                                        <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                            <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                        </a>
                                    `
                                    boardCheck = true;
                                } else {
                                    html += `
                                     <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                        <i class="ti ti-arrow-forward-up fs-7 me-1" style="margin-left:108vh"></i>
                                    </a>`;
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
                                        <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="chBoardDelete" data-brd-no="${res.brdNo}" onclick="chBoardDeleteBtn(${res.chNo})">
                                          	  예	
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="comment" style="display: none;">
                            <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
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

function chBoardDeleteBtn(chNo) {
    console.log("삭제할 번호 : ", chNo);
    let brdNo = $("#chBoardDelete").data("brdNo");
    console.log(brdNo, brdNo);

    data = {
        chNo: chNo,
        brdNo: brdNo
    }

    $.ajax({
        url: "/synerhub/chBoard/chBDelete",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            console.log(res);
            Swal.fire('게시물 삭제 완료 !', '', 'success');
            channelBoard(chNo);
        }
    });
}

// 페이지 번호 클릭 이벤트 등록
$(document).on('click', "#pagingChBoard .page-link", function () {
    const page = $(this).data('page');
    const chNo = $(this).data('chNo');
    console.log(" const chNo : >>" ,chNo);
    console.log(" const page : >>" ,page);

    if (page) {
        channelBoard2(chNo, page);
    }
});


function backToHome(chNo) {

    chHome(chNo);
    
}



$(document).on("click", ".uploadedList2 span", function () {
    $(this).parent("div").remove();
});

$(document).on("change", "#channelInputFile", function () {
    let input2 = $(this);
    
    if (input2[0].files && input2[0].files.length > 0) {
			for (let i = 0; i < input2[0].files.length; i++) {
				let file = input2[0].files[i];

                channelFileList.push(file);
            }
        }
        
		if (input2[0].files && input2[0].files.length > 0) {
			for (let i = 0; i < input2[0].files.length; i++) {
				let file = input2[0].files[i];
				var reader = new FileReader();
				reader.onload = function (e) {
                    console.log("aaaaaaaaaaaaaa",reader.onload);
					let html = `
					<div class="me-1" style="position: relative; display: inline-block;">
						<img src="${e.target.result}" style="width: 100px; height: 100px" />
						<span style="position: absolute; top: 0; right: 0; background: white; cursor: pointer;">X</span>
					</div>`;
					$(".uploadedList2").append(html);
				};
				reader.readAsDataURL(file);
			}
		} else {
			document.getElementById('EqpUploadFileList').src = "";
		}
	});

