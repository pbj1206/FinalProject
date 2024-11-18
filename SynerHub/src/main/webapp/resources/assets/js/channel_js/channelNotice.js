let ChNoticePage = 1;

function channelNtc(chNo) {
  console.log("channelNtc 클릭@@!@");
  synerhubch = chNo;

  let synerhubChNotice = {
    "chNo": chNo,
    "rowCnt" : 10,
    "page" : ChNoticePage
  }

  $.ajax({ 
    url: "/synerhub/chNotice/chNlist",
    type: "post",
    beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(synerhubChNotice),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        console.log("result : ", result);
        let res = result.chNoticeList.list;
        console.log(res);
        chTtl = result.chTtl;
        

        var html = "";

        if (res.length == 0) {
            html += `
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                <h4 class="fs-6 mb-0">채널 공지사항</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <a>Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">${chTtl} 공지사항</li>
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
                                    <h3>${chTtl} 공지사항</h3>
                                </div>
                                <p class="card-subtitle mb-0"></p>
                            </div>
                           
                            <div class="input-group me-3 mb-3" style="width:25%;">  
                                <input type="text" class="form-control" id="chNoticeSearch" placeholder="제목을 검색하세요">
                                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" onclick="chNoticeSearch(${chNo})">
                                    <i class="ti ti-search fs-6"></i>
                                </button>
                            </div>
                            
                        </div> 
                        <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                            <table class="table align-middle text-nowrap text-center">
                                <thead class="text-dark fs-4">
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
                                <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chNoticeInsert(${chNo})">
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
                <h4 class="fs-6 mb-0">공지사항</h4>
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
                                    <h3>${chTtl} 공지사항</h3>
                                </div>
                                <p class="card-subtitle mb-0"></p>
                            </div>
                            
                                <div class="input-group me-3 mb-3" style="width:25%;"> 
                                    <input type="text" class="form-control" id="chNoticeSearch" placeholder="제목을 검색하세요">
                                    <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" onclick="chNoticeSearch(${chNo})">
                                        <i class="ti ti-search fs-6"></i>
                                    </button>
                                </div>
                            
                        </div>
                        <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                            <table class="table align-middle text-nowrap">
                                <thead class="text-dark fs-4">
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
                <tr id="chNoticetr${res[i].brdNo}" data-ch-no="${chNo}" data-ch-ttl="${chTtl}" onclick="chNotice(${res[i].brdNo})">
                    <td class="ps-0"><span style="padding-left: 40px" id="${res[i].brdNo}">${i + 1}</span></td>
                    <td style="padding-left: 80px">${res[i].brdTtl}</td>
                    <td class="ps-4"><span class="mb-1 badge text-bg-light">${res[i].brdWrtrNm}</span></td>
                    <td class="text-center">${res[i].formattedBrdRgdt}</td>
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
                    <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="chNoticeInsert(${chNo})">
                        <i class="ti ti-pencil fs-6 me-2"></i>
                                            작성
                    </button>
                </div>
            </div>

          <div class="text-center" id="pagingchNotice">
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
        chNoticePaging(result.chNoticeList.total, result.page, result.chNoticeList.rowCnt, result.chNo);

        /*
            result.chNoticeList.total : 11
            result.page : 1
            result.chNoticeList.rowCnt : 10
            result.chNo: 66
            */


    },
    error: function (xhr, status, error) {
        console.error("AJAX 요청 실패:", error);
    }
  });
};

function chNoticePaging(total, currentPage, rowCnt, chNo) {
    console.log("chNoticePaging 호출됨 " ,chNo);
    if (rowCnt < 1) {
        return; // rowCnt가 1보다 작으면 종료
    }

    
    let chNoticeTotalPages = Math.ceil(total / rowCnt); // 총 페이지 수 계산
    console.log(chNoticeTotalPages);
    let chNoticePageContainer = $('#pagingchNotice .pagination');
    chNoticePageContainer.empty();
  
    // 이전 버튼
    if (currentPage > 1) {
        chNoticePageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" data-ch-no="${chNo}">이전</a></li>`);
    } else {
        chNoticePageContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true">이전</a></li>`);
    }   

    // 페이지 번호 생성
    for (let i = 1; i <= chNoticeTotalPages; i++) { 
        if (i === currentPage) {
            chNoticePageContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)">${i}</a></li>`);
        } else {
            chNoticePageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}" data-ch-no="${chNo}">${i}</a></li>`);
        }
    }

    // 다음 버튼
    if (currentPage < chNoticeTotalPages) {
        chNoticePageContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" data-ch-no="${chNo}">다음</a></li>`);
    } else {
        chNoticePageContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true">다음</a></li>`);
    }
} 
  
  
//등록버튼
function chNoticeInsert(chNo) {
    console.log("chNoticeinsert");

    var html = "";
    html += `
        <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
                <h4 class="fs-6 mb-0">채널 공지사항 작성</h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">채널 공지사항 등록</li>
                    </ol>
                </nav>
            </div>
        </div>  

        <div class="card">
            <div class="card-body">
                <div class="mb-4" role="tablist">
                    <h3>채널 공지사항 작성</h3>
                </div>

                <div class="tab-content">
                    <div class="tab-pane active" id="feeds" role="tabpanel">
                        <div class="card border">
                            <div class="card-body p-4">
                                <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
                                    <div class="mt-3">
                                        <label class="form-label mt-10" for="title-3">제목</label>
                                        <br />
                                        <input id="chNoticeTtl" type="text" value="" class="form-control" />
                                        <br />
                                        <label class="form-label" for="text-3">내용</label>
                                        <br />
                                        <textarea id="chNoticeConts" rows="10" class="form-control"></textarea>
                                    </div>
                                </div> 

                                <div class="d-flex align-items-center justify-content-end">
                                    <div>
                                        <button type="button" class="btn btn-primary" onclick="chNtcInsertBtn(${chNo})">등록</button>
                                        <button type="button" class="btn bg-danger-subtle text-danger ms-3" id="chNtcBackBtn" onclick="chNoticebackBtn(${chNo})">취소</button>
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
function chNtcInsertBtn(chNo) {
    console.log("chNtcInsertBtn");

    let data = {
        chNo: synerhubch,
        brdWrtr: MEM_NO,
        brdTtl: $("#chNoticeTtl").val(),
        brdConts: $("#chNoticeConts").val()
    };

    let formData = new FormData();
    formData.append("chNo", synerhubch); 
    formData.append("brdWrtr", MEM_NO);
    formData.append("brdTtl",  $("#chNoticeTtl").val());
    formData.append("brdConts", $("#chNoticeConts").val());

    $.ajax({
        url: "/synerhub/chNotice/chNinsert",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        }, 
        data: formData, // FormData
        processData: false,
        contentType: false,
        success: function (res) {
            Swal.fire({
                title: '게시물 등록 완료 !',
                icon: 'success',
                confirmButtonText: '확인'
            }).then((result) => {
                if (result.isConfirmed) {
                    channelNtc(chNo); // 확인 버튼 클릭 시 호출
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Error occurred: ", error);
            Swal.fire('게시물 등록 실패!', '다시 시도해 주세요.', 'error');
        }
    });
}


function chBackBtn(chNo) {
  console.log("detail back : ", chNo);
  channelNtc(chNo);
};

function chNoticebackBtn(chNo) {
  console.log("insert back : ", chNo);
  channelNtc(chNo);
}

// 채널 공지 상세보기
function chNotice(brdNo) {

    let data = {
        "brdNo": brdNo
    }

    $.ajax({
        url: "/synerhub/chNotice/chNselect",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let res = result.chNotice;
            console.log("select : ", res);

            var html = "";
            html += `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                        <h4 class="fs-6 mb-0">채널 공지사항</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">채널 공지사항</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>채널공지 상세 보기</h3>
                        </div>
                        <div class="card">
                            <div class="card-body border-bottom">
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
                                            <a class="fw-normal" style="line-height: 1.2; white-space: pre-wrap; word-wrap: break-word; display: inline;">${res.brdConts}</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                        </div>`

                                        let boardCheck = false;
                                        if(res.brdWrtr == MEM_NO){ 
                                        html+=`     
                                        <div class="ms-auto d-flex align-items-center gap-2">
                                            <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="chNoticeMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-ch-no="${res.chNo}"  onclick="chNoticeModBtn(${res.brdNo})">
                                                <i class="ti ti-edit fs-7 me-1"></i>
                                            </a>
                                            <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                                <i class="ti ti-trash fs-7 me-1"></i>
                                            </button>
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                                <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                            </a>
                                        </div>
                                            `
                                            boardCheck = true
                                        }else{
                                            html +=`
                                           <div class="ms-auto d-flex align-items-center gap-2">
                                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="chBackBtn(${res.chNo})">
                                                    <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                                </a>
                                            </div>`;
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
                                                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="chNoticeDelete" data-brd-no="${res.brdNo}" onclick="chNoticeDeleteBtn(${res.chNo})">
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
            $("#main_contents").html(html);
        }
    });
};

function chNoticeModBtn(brdNo) {
    console.log("brdNo : ", brdNo);
    console.log("chNoticeModBtn 클릭");

    let brdTtl = $("#chNoticeMod").data("brdTtl");
    let brdConts = $("#chNoticeMod").data("brdConts");
    let chNo = $("#chNoticeMod").data("chNo");
    console.log("brdTtl : ", brdTtl);
    console.log("brdConts : ", brdConts);
    console.log("chNo : ", chNo);

    var html = "";

    html += `
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                      <h4 class="fs-6 mb-0">채널 공지사항 수정</h4>
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                          <li class="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>
                          <li class="breadcrumb-item" aria-current="page">채널 공지사항 수정</li>
                        </ol>
                      </nav>
                    </div>
                </div>  
        
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>채널 공지사항 수정</h3>
                        </div>
        
                        <div class="tab-content">
                            <div class="tab-pane active" id="feeds" role="tabpanel">
                                <div class="card border">
                                    <div class="card-body p-4">
                                        
                                        <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
                                            <div class="mt-3">
                                                <label class="form-label mt-10" for="title-3">제목</label>
                                                <br />
                                                <input id="chNoticeTtl" type="text" value="${brdTtl}" class="form-control" />
                                                <br />
                                                <label class="form-label" for="text-3">내용</label>
                                                <br />
                                                <textarea id="chNoticeConts" value="" rows="10" class="form-control">${brdConts}</textarea>
                                            </div>
                                        </div>
        
                                        <div class="d-flex align-items-center justify-content-between">
                                            <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                                                <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                                                    <li>
                                                        <div class="uploadedList2"></div>
                                                    </li>  
	                                            </ul>
                                            </form>
                                            <div>
                                                <button type="button" class="btn btn-success" id="" onclick="chNoticeUpdateBtn(${brdNo})">수정</button>
                                                <button type="button" class="btn bg-danger-subtle text-danger ms-3" onclick="chNoticebackBtn(${chNo})">취소</button>
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

function chNoticeUpdateBtn(brdNo) {
    let chNo = $("#chNoticeMod").data("chNo");
    let brdTtl = $("#chNoticeTtl").val();
    let brdConts = $("#chNoticeConts").val();

    let data = {
        chNo: chNo,
        brdNo: brdNo,
        brdTtl: brdTtl,
        brdConts: brdConts
    };

    console.log(data);
    $.ajax({
        url: "/synerhub/chNotice/chNUpdate",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log("update : ", result);
            Swal.fire({
                title: '게시물 수정 완료 !',
                icon: 'success',
                confirmButtonText: '확인'
            }).then((result) => {
                if (result.isConfirmed) {
                    chNotice(brdNo); // 확인 버튼 클릭 시 호출
                }
            });
        }
    });
}

function chNoticeDeleteBtn(chNo) {
    console.log("삭제할 번호 : ", chNo);
    let brdNo = $("#chNoticeDelete").data("brdNo");
    console.log(brdNo, brdNo);

    data = {
        chNo: chNo,
        brdNo: brdNo
    }

    $.ajax({
        url: "/synerhub/chNotice/chNDelete",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            console.log(res);
            Swal.fire({
                title: '게시물 삭제 완료 !',
                icon: 'success',
                confirmButtonText: '확인'
            }).then((result) => {
                if (result.isConfirmed) {
                    channelNtc(chNo); // 확인 버튼 클릭 시 호출
                }
            });
        }
    });
}

