$(function () {

	let Qnapage = 1;

	$(document).on('click', '#qnaList', function () {
		// console.log("qna click");

		// let data = {
		// 	"rowCnt": 10,       
        // 	"page": 1, 
		// 	"synerhub1": MEM_NO
		// }
		// /*
		// 	page :1
		// 	rowCnt: 10
		// 	synerhub1 : "1"
		// */

		// $.ajax({
		// 	url: "/synerhub/qna/list2",
		// 	type: "post",
		// 	beforeSend: function (xhr) {
		// 		xhr.setRequestHeader(header, token);
		// 	},
		// 	data: JSON.stringify(data),
		// 	contentType: "application/json; charset=utf-8",
		// 	success: function (res) {
		// 		console.log("qna 테이블 생성",res,res.qnaList.list.length);
		// 		var html = "";

		// 		// qna 데이터가 존재하는지 확인
		// 		if (res.qnaList.list.length === 0) {
		// 			html += `
        //             <div class="mb-3 overflow-hidden position-relative">
        //                 <div class="px-3">
        //                   <h4 class="fs-6 mb-0">Q&A</h4>
        //                   <nav aria-label="breadcrumb">
        //                     <ol class="breadcrumb mb-0">
        //                       <li class="breadcrumb-item">
        //                         <a href="../main/index.html">Home</a>
        //                       </li>
        //                       <li class="breadcrumb-item" aria-current="page">Q&A</li>
        //                     </ol>
        //                   </nav>
        //                 </div>
        //             </div>
        //             <div class="col-12">
        //                 <div class="card mb-0">
        //                     <div class="card-body">
        //                         <div class="d-md-flex justify-content-between mb-9">
        //                             <div class="mb-9 mb-md-0">
        //                                 <div style="display: flex;">
        //                                     <h3>문의하기</h3>
        //                                 </div>
        //                                 <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
        //                             </div>
        //                             <div class="input-group me-3 mb-3" style="width:25%;"> 
		// 	                            <input type="text" class="form-control" placeholder="제목을 검색하세요">
		// 	                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
		// 	                                <i class="ti ti-search fs-6"></i>
		// 	                            </button>
		// 	                        </div> 
        //                         </div> 
        //                         <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
        //                             <table class="table align-middle text-nowrap text-center">
        //                                 <thead class="text-dark fs-4">
        //                                     <tr>
        //                                         <th class="text-center">NO</th>
        //                                         <th>&emsp;제목</th> 
        //                                         <th>작성자</th>
        //                                         <th>작성일</th>
        //                                         <th>처리상태</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody id="qnaBoard">
        //                                     <tr>
        //                                         <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
        //                                     </tr>
        //                                 </tbody>
        //             				</table>
        //             			</div>
        //             			<div class="align-items-center justify-content-between mt-10">
        //                 			<div class="mb-3 me-3" style="text-align: right;">
        //                     			<button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="qnaInsert">
        //                         			<i class="ti ti-pencil fs-6 me-2"></i>
        //                         			작성
        //                     			</button>
        //                 			</div>
        //             			</div>
        //             		</div>
        //             	</div>
        //             </div>`;
		// 		} else {
		// 			// 데이터가 존재할 경우 처리
		// 			html += `
        //             <div class="mb-3 overflow-hidden position-relative">
        //                 <div class="px-3">
        //                   <h4 class="fs-6 mb-0">Q&A</h4>
        //                   <nav aria-label="breadcrumb">
        //                     <ol class="breadcrumb mb-0">
        //                       <li class="breadcrumb-item">
        //                         <a href="../main/index.html">Home</a>
        //                       </li>
        //                       <li class="breadcrumb-item" aria-current="page">Q&A</li>
        //                     </ol>
        //                   </nav>
        //                 </div>
        //             </div>
        //             <div class="col-12">
        //                 <div class="card mb-0">
        //                     <div class="card-body">
        //                         <div class="d-md-flex justify-content-between mb-9">
        //                             <div class="mb-9 mb-md-0">
        //                                 <div style="display: flex;">
        //                                     <h3>문의하기</h3>
        //                                 </div>
        //                                 <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
        //                             </div>
        //                             <div class="input-group me-3 mb-3" style="width:25%;"> 
		// 	                            <input type="text" class="form-control" placeholder="제목을 검색하세요">
		// 	                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
		// 	                                <i class="ti ti-search fs-6"></i>
		// 	                            </button>
		// 	                        </div> 
        //                         </div>
        //                         <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
        //                             <table class="table align-middle text-nowrap">
        //                                 <thead class="text-dark fs-4">
        //                                     <tr>
        //                                         <th class="text-center">NO</th>
        //                                         <th>&emsp;제목</th>
        //                                         <th>작성자</th>
        //                                         <th>작성일</th>
        //                                         <th>처리상태</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody id="qnaBoard">`;

		// 			for (var i = 0; i < res.qnaList.list.length; i++) {
		// 				html += `
        //                 <tr> 
        //                     <td class="text-center"><span style="margin-left: 5px;" id="${res.qnaList.list[i].qnaNo}">${res.qnaList.list[i].rowCnt}</span></td>
        //                     <td>&emsp;${res.qnaList.list[i].qnaTtl}</td>
        //                     <td><span class="mb-1 badge text-bg-light">${res.qnaList.list[i].qnaWtrName}</span></td>
        //                     <td>${new Date(res.qnaList.list[i].qnaDt).toLocaleDateString()}</td>
        //                     <td>
		// 					    ${res.qnaList.list[i].ansState === 1 
		// 					        ? '<span class="mb-1 badge bg-success-subtle text-success">답변 완료</span>' 
		// 					        : '&ensp;<span class="mb-1 badge bg-warning-subtle text-warning">미답변</span>'}
		// 					</td>
        //                 </tr>`;
		// 			}

		// 			html += `
        //             					</tbody>
        //             				</table>
        //             			</div>
		// 	                    <div class="align-items-center justify-content-between mt-10">
		// 	                        <div class="mb-3 me-3" style="text-align: right;">
		// 	                            <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="qnaInsert">
		// 	                                <i class="ti ti-pencil fs-6 me-2"></i>
		// 	                                	작성
		// 	                            </button>
		// 	                        </div>
		// 	                    </div>


		// 						<div class="text-center" id="pagingQna">
		// 							<nav aria-label="Page navigation">
		// 								<ul class="pagination justify-content-center pagination-sm m-0">
		// 									<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
		// 									<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li> 
		// 								</ul>
		// 							</nav>
		// 						</div>


        //             		</div>
        //             	</div>
        //             </div>`;
		// 		}

		// 		$("#main_contents").html(html);
		// 		qnaupdatePaging(res.qnaList.total, res.page, res.qnaList.rowCnt);
		// 		console.log("paging", res.qnaList.total, res.page, res.qnaList.rowCnt);
		// 	},
		// 	error: function (xhr, status, error) {
		// 		console.error("AJAX 요청 실패:", error);
		// 	} 
		// });

		// $(document).on('click', '#modCancel', function () {

		// });
		QnaList2(1);
	});


	function qnaupdatePaging(total, currentPage, rowCnt) {
		console.log("qnaupdatePaging 호출됨, qnaNo:");

		if (rowCnt < 1) {
			return;
		}
		let qnaTotalPages = Math.ceil(total / rowCnt);
		let qnaPagingContainer = $('#pagingQna .pagination');
		qnaPagingContainer.empty(); // 이전 내용 삭제
	
		if (currentPage > 1) {
			qnaPagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" >이전</a></li>`);
		} else {
			qnaPagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" >이전</a></li>`);
		}
	
		// 페이지 번호 생성 
		for (let i = 1; i <= qnaTotalPages; i++) {
			if (i === currentPage) {
				qnaPagingContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)" >${i}</a></li>`);
			} else {
				qnaPagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}" >${i}</a></li>`);
			}
		}
	
		// 다음 버튼
		if (currentPage < qnaTotalPages) {
			qnaPagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" >다음</a></li>`);
		} else {
			qnaPagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" >다음</a></li>`);
		}
	}


	function QnaList2(page) {
	
		let synerhubQna = {
			"synerhub1": MEM_NO,
			"rowCnt": 10,
			"page": page
		}
	
		console.log("QnaList2 : ", synerhubQna);
		
		$.ajax({
			url: "/synerhub/qna/list2",
			type: "post",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			data: JSON.stringify(synerhubQna),
			contentType: "application/json; charset=utf-8",
			success: function (result) {
				console.log("/qna/list2 : ", result);
				
				let res = result.qnaList.list;
	
				var html = "";
	
				if (res.length == 0) {
					html += `

					<div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">Q&A</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">Q&A</li>
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
                                            <h3>문의하기</h3>
                                        </div>
                                        <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
                                    </div>
                                    <div class="input-group me-3 mb-3" style="width:25%;"> 
			                            <input type="text" class="form-control" placeholder="제목을 검색하세요">
			                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
			                                <i class="ti ti-search fs-6"></i>
			                            </button>
			                        </div> 
                                </div> 
                                <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                                    <table class="table align-middle text-nowrap text-center">
                                        <thead class="text-dark fs-4">
                                            <tr>
                                                <th class="text-center">NO</th>
                                                <th>&emsp;제목</th> 
                                                <th>작성자</th>
                                                <th>작성일</th>
                                                <th>처리상태</th>
                                            </tr>
                                        </thead>
                                        <tbody id="qnaBoard">
                                            <tr>
                                                <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                            </tr>
                                        </tbody>
                    				</table>
                    			</div>
                    			<div class="align-items-center justify-content-between mt-10">
                        			<div class="mb-3 me-3" style="text-align: right;">
                            			<button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="qnaInsert">
                                			<i class="ti ti-pencil fs-6 me-2"></i>
                                			작성
                            			</button>
                        			</div>
                    			</div>
                    		</div>
                    	</div>
                    </div>`;
				} else {
					// 데이터가 존재할 경우 처리
					html += `
                    <div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">Q&A</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">Q&A</li>
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
                                            <h3>문의하기</h3>
                                        </div>
                                        <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
                                    </div>
                                    <div class="input-group me-3 mb-3" style="width:25%;"> 
			                            <input type="text" class="form-control" placeholder="제목을 검색하세요">
			                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
			                                <i class="ti ti-search fs-6"></i>
			                            </button>
			                        </div> 
                                </div>
                                <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                                    <table class="table align-middle text-nowrap">
                                        <thead class="text-dark fs-4">
                                            <tr>
                                                <th class="text-center">NO</th>
                                                <th>&emsp;제목</th>
                                                <th>작성자</th>
                                                <th>작성일</th>
                                                <th>처리상태</th>
                                            </tr>
                                        </thead>
                                        <tbody id="qnaBoard">`;

					for (var i = 0; i < res.length; i++) {
						html += `
                        <tr>
                            <td class="text-center"><span style="margin-left: 5px;" id="${res[i].qnaNo}">${res[i].rowCnt}</span></td>
                            <td>&emsp;${res[i].qnaTtl}</td>
                            <td><span class="mb-1 badge text-bg-light">${res[i].qnaWtrName}</span></td>
                            <td>${new Date(res[i].qnaDt).toLocaleDateString()}</td>
                            <td>
							    ${res[i].ansState === 1 
							        ? '<span class="mb-1 badge bg-success-subtle text-success">답변 완료</span>' 
							        : '&ensp;<span class="mb-1 badge bg-warning-subtle text-warning">미답변</span>'}
							</td>
                        </tr>`;
					}

					html += `
                    					</tbody>
                    				</table>
                    			</div>
			                    <div class="align-items-center justify-content-between mt-10">
			                        <div class="mb-3 me-3" style="text-align: right;">
			                            <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="qnaInsert">
			                                <i class="ti ti-pencil fs-6 me-2"></i>
			                                	작성
			                            </button>
			                        </div>
			                    </div>


								<div class="text-center" id="pagingQna">
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
				qnaupdatePaging(result.qnaList.total, result.page, result.qnaList.rowCnt);
			},
			error: function (xhr, status, error) {
				console.error("AJAX 요청 실패:", error);
			}
		});


	}


	// 페이지 번호 클릭 이벤트 등록
	$(document).on('click', "#pagingQna .page-link", function () {
		let page = $(this).data('page');

		QnaList2(page);
	});


	// 게시글 상세보기
	$(document).on('click', "#qnaBoard tr", function () {

		// 6번째 td 클릭 시 이벤트 무시
		if ($(event.target).closest('td').index() === 5) {
			return; // 6번째 td인 경우 아무 작업도 하지 않음
		}

		let hostIndex = location.href.indexOf(location.host) + location.host.length;
		let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

		$('#qnaBoard tr').removeClass('selected');
		$(this).addClass('selected');
		selectedQnaNo = $(this).children('td:eq(0)').children('span').attr("id"); // 선택된 qnaNo
		console.log(selectedQnaNo);

		$.ajax({
        url: "/synerhub/qna/" + selectedQnaNo,
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            console.log("qna 상세보기", res.fileSrcList);
            var detail = $("#main_contents").find("#detail");
            var html = "";

            let categoryName;
            switch (String(res.qnaCategory)) {
                case "1":
                    categoryName = "서비스";
                    break;
                case "2":
                    categoryName = "계정";
                    break;
                case "3":
                    categoryName = "결제·환불";
                    break;
                case "4":
                    categoryName = "오류 보고";
                    break;
                case "5":
                    categoryName = "신고 접수";
                    break;
                case "6":
                    categoryName = "기타";
                    break;
                default:
                    categoryName = "알 수 없음"; // 기본값 설정
            }

            html += `
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                    <h4 class="fs-6 mb-0">Q&A</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">Q&A</li>
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
                                <img src="${contextPath}${res.qnaWtrPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                                <h6 class="mb-0">${res.qnaWtrName}</h6>
                                <span class="fs-2">
                                    <span class="p-1 text-bg-light rounded-circle d-inline-block"></span>
                                    now
                                </span>
                                <div class="d-flex align-items-center gap-2 ms-auto">
								    ${res.ansState === 1 
								        ? '<strong class="mb-1 badge bg-success-subtle text-success" style="font-weight="normal">답변 완료</strong>' 
								        : '<strong class="mb-1 badge bg-warning-subtle text-warning" style="font-weight="normal">미답변</strong>'}
								</div>
                            </div>
                               <div class="card-body p-4">
                                 <div class="table-responsive mb-4 border rounded-1">
                                   <table class="table text-nowrap mb-0 align-middle">
                                     <thead class="text-dark fs-4">
                                       <tr>
                                          <th>
                                            <h4 class="fs-4 fw-semibold mb-0">
                                              <strong class="mb-1 badge bg-info-subtle text-info" style="font-weight="normal">${categoryName}</strong>&ensp;<strong>${res.qnaTtl}</strong>
					                        </h4>
					                      </th>
					                    </tr>
					                  </thead>
					                  <tbody>
					                    <tr style="height: 10em;"> 
					                      <td>
					                        <div class="d-flex align-items-center">
					                          <div class="ms-3">
					                            <strong class="fw-normal" style="line-height: 1.2;">${res.qnaConts}</strong>
					                          </div>
					                        </div>
					                      </td>  
					                    </tr>
					                    
					                    
					                    <tr> 
					                      <td>
					                      	<div class="card-footer bg-white">
											    <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
											        `;
											        for(var i = 0; i < res.fileSrcList.length; i++) {
											            html += `
											                <li>
											                    <div class="me-1 border">
											                        <p class="mailbox-attachment-icon">
											                            `;
											                            if(res.fileSrcList[i].atchFileExtn == "jpg") {
											                                html += `
											                                <img src="${contextPath}${res.fileSrcList[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
											                            } else if(res.fileSrcList[i].atchFileExtn == "pdf") {
											                                html += `
											                                <i class="ti ti-file-text"></i>`;
											                            }
											                            html += `
											                        </p>
											                        <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
											                            <p style="flex: 1; text-align: center;">${res.fileSrcList[i].atchFileOrgnlNm}</p>
											                            <a href="#" class="float-end mt-3"> 
											                                <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
											                                    <i class="ti ti-download" style="font-size: 1.5em;"></i>
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
		                				<a class="round-32 rounded-circle btn btn-secondary p-0 hstack justify-content-center" id="commentBtn" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Comment">
		                					<i class="ti ti-message-2 fs-7"></i>
		                				</a>
		                				<strong class="text-dark fw-semibold" style="font-weight: normal">${res.ansState}</strong>
		                			</div>
		                			<div class="ms-auto d-flex align-items-center gap-2">
					                    <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" gap-1" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="detailModBtn">
	                                      <i class="ti ti-edit fs-7 me-1"></i>
	                                    </a>
	                                    <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" gap-1" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
					                      <i class="ti ti-trash fs-7 me-1"></i>
					                    </button>
					                    <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" gap-1" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="backBtn">
	                                      <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
	                                    </a>
			                		</div>
		                		</div>
		                	</div>
		                	
		                	<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
		                      <div class="modal-dialog modal-dialog-centered">
		                        <div class="modal-content">
		                          <div class="modal-header d-flex align-items-center">
		                            <h4 class="modal-title mt-3" id="myLargeModalLabel">
		                              	&emsp;선택한 게시글을 정말 삭제하시겠습니까?
		                            </h4>
		                            <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
		                          </div>
		                          <div class="modal-body">
		                            <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp;※ 한 번 삭제한 자료는 복구할 수 없습니다. ※</h6>
		                          </div>
		                          <div class="modal-footer">
		                            <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="detailYesBtn">
		                              	예	
		                            </button>
		                            <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
		                              	아니오
		                            </button>
		                          </div>
		                        </div>
		                      </div>
		                    </div>
		                	
		                	<div id="comment" style="display: none;">
			                	
							        ${res.ansState === 1 
							            ? `<div class="align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
							            	 <div class="p-4 rounded-4 text-bg-light">
								                 <div class="d-flex align-items-center gap-3">
								                     <img src="${contextPath }/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="33" height="33">
								                     <h6 class="mb-0 fs-4">SynerHUB 고객센터</h6>
								                     <span class="p-1 text-bg-muted rounded-circle d-inline-block"></span>
								                 </div>
								                 <p class="my-3" style="margin-left: 50px;">
											    	${res.ansConts}
											 	 </p>
								               </div>
							               </div>` 
							            : `<div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
							            		<input type="hidden" value="${res.qnaNo}" id="qnaNo" name="qnaNo"/>
								            	<img src="${contextPath}${res.qnaWtrPrflimg}" alt="spike-img" class="rounded-circle" width="33" height="33">
								               	<input type="text" class="form-control py-8" id="exampleInputtext1" aria-describedby="textHelp" placeholder="Comment">
								               	<button class="btn btn-primary">Comment</button>
								           </div>`}
							    
			                <div>


							


		                </div>
		        	</div>
		        </div>`;

				$("#main_contents").html(html);
			}
		});
	});

	$(document).on('click', '#detailModBtn', function () {

		let hostIndex = location.href.indexOf(location.host) + location.host.length;
		let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
		console.log("qnaInsert");

		const qnaWtrName = $(this).data("qnaWtrName");
		const qnaTtl = $(this).data("qnaTtl");
		const qnaConts = $(this).data("qnaConts");
		console.log(qnaWtrName);
		console.log(qnaTtl);
		console.log(qnaConts);
		$.ajax({
			url: "/synerhub/qna/" + selectedQnaNo,
			type: "post",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			contentType: "application/json; charset=utf-8",
			success: function (res) {
				console.log("qna 수정 페이지");
				var html = "";
				html += `
	        <div class="mb-3 overflow-hidden position-relative">
	            <div class="px-3">
	              <h4 class="fs-6 mb-0">Q&A</h4>
	              <nav aria-label="breadcrumb">
	                <ol class="breadcrumb mb-0">
	                  <li class="breadcrumb-item">
	                    <a href="../main/index.html">Home</a>
	                  </li>
	                  <li class="breadcrumb-item" aria-current="page">Q&A</li>
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
	                                <div class="d-flex align-items-center mb-3">
	                                    <img src="${contextPath}${res.qnaWtrPrflimg}" alt="spike-img" width="32" height="32" class="rounded-circle">
	                                    <h6 class="mb-0 ms-6">${res.qnaWtrName}</h6>
	                                    <div class="ms-auto mt-3 mt-md-0" style="width: 15%;">
	                                        <select class="form-select bg-transparent border" id="qnaCategory" name="qnaCategory">
	                                            <option selected>문의 유형</option>
	                                            <option value="1">서비스</option>
	                                            <option value="2">계정</option>
	                                            <option value="3">결제·환불</option>
	                                            <option value="4">오류 보고</option>
	                                            <option value="5">신고 접수</option>
	                                            <option value="6">기타</option>
	                                        </select>
	                                    </div>
	                                </div>
	                                
	                                <div class="userprofile mt-3 mb-3 d-flex flex-column-reverse border-top">
	                                    <div class="mt-3">
	                                        <label class="form-label mt-6" for="title-3">제목</label>
	                                        <br />
	                                        <input id="modTtl" type="text" class="form-control" placeholder="${res.qnaTtl}" value="${res.qnaTtl}"/>
	                                        <br />
	                                        <label class="form-label" for="text-3">내용</label>
	                                        <br />
	                                        <textarea id="modConts" rows="10" class="form-control">${res.qnaConts}</textarea>
	                                    </div>
	                                </div>
	
	                                <div class="d-flex align-items-center justify-content-between">
	                                    <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
	                                        <li>
	                                            <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('inputFile').click();">
	                                                <i class="ti ti-paperclip me-2 fs-5"></i>
	                                                <span class="d-none d-sm-inline-flex">파일 첨부</span>
		                                            <input class="form-control" type="file" id="inputFile" name="inputFile" style="display: none;">
	                                            </a>
	                                        </li>
	                                        <li>
	                                        	<div class="uploadedList"></div>
	                                        </li>  
	                                    </ul>
	                                    <div>
	                                        <button type="button" class="btn btn-success me-3" id="modifyBtn">수정</button>
	                                        <button type="button" class="btn bg-danger-subtle text-danger" id="modCancel">취소</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>`;
				// HTML을 main_contents에 추가
				$("#main_contents").html(html);
			}
		});
	});
	
	




	// 게시글 수정
	$(document).on('click', '#modifyBtn', function () {
		let hostIndex = location.href.indexOf(location.host) + location.host.length;
		let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

		const qnaData = {
			qnaNo: selectedQnaNo,
			qnaWtr: MEM_NO,
			qnaTtl: $("#modTtl").val(),
			qnaConts: $("#modConts").val()
		};

		$.ajax({
			url: "/synerhub/qna/update",
			type: "post",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(qnaData),
			success: function (res) {
				// 서버에서 응답 받은 데이터 사용
				console.log("응답 데이터:", res); // 서버 응답을 콘솔에 출력
				console.log("qna 게시글 수정");
				// 성공 시 Q&A 리스트를 다시 로드
				$("#qnaList").trigger('click');
				Swal.fire({
			    	title: "게시글이 수정되었습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });
			},
			error: function (error) {
				Swal.fire({
			    	title: "게시글 수정에 실패했습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });
			}
		});
	});


	// 취소 버튼 클릭 시 qnaList 페이지로 돌아가기
	$(document).on('click', '#modCancel', function () {
		// Q&A 리스트를 다시 로드
		$("#qnaList").trigger('click');
	});


	// 게시글 삭제
	$(document).on('click', '#detailYesBtn', function () {

		// AJAX 요청으로 게시글 삭제
		$.ajax({
			url: "/synerhub/qna/delete/" + selectedQnaNo,
			type: "get",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			contentType: "application/json; charset=utf-8",
			success: function () {
				console.log("qna 게시글 삭제");
				Swal.fire({
			    	title: "게시글이 삭제되었습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });

				// selectedQnaNo에 해당하는 행을 찾아서 삭제
				$('#qnaBoard tr').each(function () {
					var qnaNo = $(this).children('td:eq(0)').text(); // 첫 번째 td에서 qnaNo 가져오기
					if (qnaNo === selectedQnaNo) {
						$(this).remove(); // 해당 행 삭제
					}
				});

				// Q&A 리스트를 다시 로드
				$("#qnaList").trigger('click');
			},
			error: function (xhr, status, error) {
				console.error("게시글 삭제 실패:", error);
				Swal.fire({
			    	title: "게시글 삭제에 실패했습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });
			}
		});
	});

	// 취소 버튼 클릭 시 qnaList 페이지로 돌아가기
	$(document).on('click', '#backBtn', function () {
		// Q&A 리스트를 다시 로드
		$("#qnaList").trigger('click');
	});

	$(document).ready(function() {
	    $(document).on('click', "#commentBtn", function () {
	        $('#comment').toggle();
	    });
});


});

$(function () {
	$(document).on('click', '#qnaInsert', function () {
		let hostIndex = location.href.indexOf(location.host) + location.host.length;
		let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
		console.log("qnaInsert");

		let data = {
			memNo: MEM_NO
		}

		$.ajax({
			url: "/synerhub/chat/getUser",
			type: "post",
			async: false,
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			success: function (res) {
				console.log("qna 등록 페이지");
				var html = "";
				html += `
	        <div class="mb-3 overflow-hidden position-relative">
	            <div class="px-3">
	              <h4 class="fs-6 mb-0">Q&A</h4>
	              <nav aria-label="breadcrumb">
	                <ol class="breadcrumb mb-0">
	                  <li class="breadcrumb-item">
	                    <a href="../main/index.html">Home</a>
	                  </li>
	                  <li class="breadcrumb-item" aria-current="page">Q&A</li>
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
	                                <div class="d-flex align-items-center mb-3">
	                                    <img src="${contextPath}${res.memPrflimg}" alt="spike-img" width="32" height="32" class="rounded-circle">
	                                    <h6 class="mb-0 ms-6">${res.memName}</h6>
	                                    <div class="ms-auto mt-3 mt-md-0" style="width: 15%;">
	                                        <select class="form-select bg-transparent border" id="qnaCategory" name="qnaCategory">
	                                            <option selected>문의 유형</option>
	                                            <option value="1">서비스</option>
	                                            <option value="2">계정</option>
	                                            <option value="3">결제·환불</option>
	                                            <option value="4">오류 보고</option>
	                                            <option value="5">신고 접수</option>
	                                            <option value="6">기타</option>
	                                        </select>
	                                    </div>
	                                </div>
	                                
	                                <div class="userprofile mt-3 mb-3 d-flex flex-column-reverse border-top">
	                                    <div class="mt-3">
	                                        <label class="form-label mt-6" for="title-3">제목</label>
	                                        <br />
	                                        <input id="insTtl" type="text" class="form-control" />
	                                        <br />
	                                        <label class="form-label" for="text-3">내용</label>
	                                        <br />
	                                        <textarea id="insConts" rows="10" class="form-control"></textarea>
	                                    </div>
	                                </div>
	
	                                <div class="d-flex align-items-center justify-content-between">
	                                	<form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
	                                    <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
	                                        <li>
	                                            <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('inputFile').click();">
	                                                <i class="ti ti-paperclip me-2 fs-5"></i>
	                                                <span class="d-none d-sm-inline-flex">파일 첨부</span>
		                                            <input class="form-control" type="file" id="inputFile" name="inputFile" style="display: none;" multiple>
	                                            </a>
	                                        </li>
	                                        <li>
												<div class="uploadedList"></div>
	                                        </li>
	                                    </ul>
	                                    </form>
	                                    <div>
	                                        <button type="button" class="btn btn-primary me-3" id="insertBtn">등록</button>
	                                        <button type="button" class="btn bg-danger-subtle text-danger" id="insCancel">취소</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>`;

				// HTML을 main_contents에 추가
				$("#main_contents").html(html);
			}
		});
	});


	// 게시글 등록
	$(document).on('click', '#insertBtn', function () {
		let formData = new FormData();
		formData.append("qnaWtr", MEM_NO);
		formData.append("qnaTtl", $("#insTtl").val());
		formData.append("qnaConts", $("#insConts").val());
		formData.append("qnaCategory", $("#qnaCategory").val());
		
		// 파일 첨부
		let inputFile = $("#inputFile")[0];
		if (inputFile.files.length > 0) {
			for (let i = 0; i < inputFile.files.length; i++) {
				formData.append("qnaFileList", inputFile.files[i]);
			}
		}

		$.ajax({
			url: "/synerhub/qna/insert",
			type: "post",
			processData: false, // jQuery가 데이터를 처리하지 않도록 설정
			contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			data: formData,
			success: function (res) {
				console.log("응답 데이터:", res); // 서버 응답을 콘솔에 출력
				Swal.fire({
			    	title: "게시글이 등록되었습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });
				$("#qnaList").trigger('click');
			},
			error: function (error) {
				console.error("게시글 등록 실패:", error);
				Swal.fire({
			    	title: "게시글 등록에 실패했습니다.",
			        timer: 1500,
			        showConfirmButton: true,
			    });
			}
		});
	});

	// 업로드 한 파일목록의 'X' 클릭
	$(document).on("click", ".uploadedList span", function () {
		$(this).parent("div").remove();
	});

	$(document).on("change", "#inputFile", function () {
		let input = $(this);
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

	// 취소 버튼 클릭 시 qnaList 페이지로 돌아가기
	$(document).on('click', '#insCancel', function () {
		// Q&A 리스트를 다시 로드
		$("#qnaList").trigger('click');
	});
});