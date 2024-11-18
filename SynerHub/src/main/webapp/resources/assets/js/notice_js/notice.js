$(function() {
    var ntcList = $("#ntcList");

    ntcList.on("click", function() {
        console.log("공지사항 리스트");

        $.ajax({
            url: "/synerhub/notice/list",
            type: "post",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            contentType: "application/json; charset=utf-8",
            success: function(res) {
                console.log("공지사항 테이블 생성");
                var html = "";
  
                // 공지사항 데이터가 존재하는지 확인
                if (res.length === 0) {
                    html += `
                    <div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">공지사항</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">Notice</li>
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
                                            <h3>공지사항</h3>
                                        </div>
                                        <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
                                    </div>
                                </div> 
                                <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                                <table class="table align-middle text-nowrap text-center">
                                    <thead class="text-dark fs-4">
                                        <tr>
                                            <th class="text-center">NO</th>
                                            <th>&emsp;제목</th> 
                                            <th>작성일</th> 
                                            <th class="text-center">조회수</th>
                                        </tr>
                                    </thead>
                                    <tbody id="ntcBoard">
                                        <tr>
                                            <td colp="5" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                        </tr>
                                    </tbody>
	                            </table>
	                          </div>
	                        </div>
	                      </div>
	                    </div>`;
                } else {
                    // 데이터가 존재할 경우 처리
                    html += `
                    <div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">공지사항</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">공지사항</li>
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
                                            <h3>공지사항</h3>
                                        </div>
                                        <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
                                    </div>
                                </div>  
                                <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                                    <table class="table align-middle text-nowrap">
                                        <thead class="text-dark fs-4">
                                            <tr>
                                                <th class="text-center">NO</th>
                                                <th>&emsp;&emsp;제목</th>
                                                <th>작성일</th>
                                                <th class="text-center">조회수</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ntcBoard">`;
   
                    for (var i = 0; i < res.length; i++) {
                        html += `
                        <tr onclick="ntcBoard(${res[i].ntcNo})">
                            <td class="text-center"><p style="margin-left: 5px;">${i + 1}</p></td>
                            <td>&emsp;&emsp;${res[i].ntcTtl}</td>
                            <td>${new Date(res[i].ntcRgdt).toLocaleDateString()}</td>
                            <td class="text-center"><p class="mb-1 badge bg-indigo-subtle text-indigo">${res[i].ntcHit}</p></td>
                        </tr>`;
                    }
  
                    html += `
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>`;
                }

                $("#main_contents").html(html); // HTML 업데이트
            },
            error: function(xhr, status, error) {
                console.error("공지사항 리스트 로드 오류", error);
                alert("공지사항 리스트를 불러오는 데 실패했습니다.");
            }
        });
    });
});

function ntcBoard(ntcNo) {
  console.log("공지사항 상세보기: ", ntcNo); // ntcNo 값 확인

  $.ajax({
      url: "/synerhub/notice/detail/" + ntcNo, // URL에 ntcNo 포함
      type: "post",
      contentType: "application/json; charset=utf-8",
      beforeSend: function(xhr) {
          xhr.setRequestHeader(header, token);
      },
      success: function(res) {
          console.log("공지사항 상세 내용: ", res);
          var html = `
              <div class="mb-3 overflow-hidden position-relative">
                  <div class="px-3">
                      <h4 class="fs-6 mb-0">공지사항</h4>
                      <nav aria-label="breadcrumb">
                          <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                  <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">공지사항</li>
                          </ol>
                      </nav>
                  </div>
              </div>
              <div class="card">
                  <div class="card-body">
                      <div class="mb-4" role="tablist">
                          <h3>공지사항 상세보기</h3>
                      </div>
                      <div class="card">
                          <div class="card-body border-bottom">
                              <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                              	  <img src="${contextPath}/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="40" height="40">
                                  <h6 class="mb-0">SynerHUB 고객센터</h6>
                              </div>
                              <div class="card-body p-4">
                                  <div class="table-responsive mb-4 border rounded-1">
                                      <table class="table text-nowrap mb-0 align-middle">
                                          <thead class="text-dark fs-4">
                                              <tr>
                                                  <th>
                                                      <div class="d-flex justify-content-between align-items-center">
                                                          <h4 class="fs-4 fw-semibold mb-0">
                                                              <strong>${res.ntcTtl}</strong>
                                                          </h4>
                                                          <p class="text-muted mb-0" style="margin-left: 20px; line-height: 1.5;">${new Date(res.ntcRgdt).toLocaleDateString()}</p>
                                                      </div>
                                                  </th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr style="height: 10em;"> 
                                                  <td>
                                                      <div class="d-flex align-items-center">
                                                          <div class="ms-3">
                                                              <p class="fw-normal" style="line-height: 1.2; white-space: pre-wrap;" class="clickable-text">${res.ntcConts}</p>
                                                          </div>
                                                      </div>
                                                  </td>
                                              </tr>					                    
                                          </tbody>
                                      </table>
                                  </div>
                                  <div class="d-flex justify-content-between">
                                      <div class="ms-auto d-flex align-items-center gap-2">
                                          <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="ntcBackBtn">
                                              <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                          </a>
                                      </div>
                                  </div>
                                  <div id="ntcCmnt" style="display: none;">
                                      <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
                                          <img src="${contextPath}/resources/assets/images/profile/user-1.jpg" alt="spike-img" class="rounded-circle" width="33" height="33">
                                          <input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp" placeholder="Comment">
                                          <button class="btn btn-primary">Comment</button>
                                      </div>
                                      <div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          $("#main_contents").html(html); // 상세보기 내용 업데이트

          // 클릭 이벤트를 방지하여 내용글이 안사라지게
          $(document).off('click', '#detail, #detail *'); // 이전 이벤트 리스너 제거
          $(document).on('click', '#detail, #detail *', function(e) {
              e.preventDefault();
              e.stopPropagation(); // 클릭 이벤트 전파를 중단
              
          });
      }
  });

  // 뒤로가기 버튼 클릭 이벤트
  $(document).on('click', '#ntcBackBtn', function() {
      $("#ntcList").trigger('click');
  });
}
