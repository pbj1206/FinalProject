<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<div class="body-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div id="main_contents">

                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                        <h4 class="fs-6 mb-0">관리자</h4>
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
                
                
                <!-- 고객센터 관리 모달창 -->
								<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
			                      <div class="modal-dialog modal-lg modal-dialog-centered">
			                        <div class="modal-content text-center"> <!-- text-center 클래스 추가 -->
			                          <div class="modal-header text-center d-flex align-items-center justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			                          </div>
			                          <div class="modal-body">
			                            <div class="mb-5">
			                              <h3>고객센터 관리</h3>
			                            </div>
			
			                            <div class="row">
			                              <div class="col-md-4">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                  	<a href="${contextPath }/admin/notice">
			                                    <div class="align-items-center">
			                                      <div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="mage:megaphone-a-fill" style="color: #ff6e6e; font-size: 5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">공지사항</h6>
			                                    </div>
			                                    </a>
			                                  </div>
			                                </div>
			                              </div>
			                              <div class="col-md-4">
			                              	<a href="${contextPath}/admin/faq" style="text-decoration: none; color: inherit;">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                    <div class="align-items-center">
			                                      <div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="flat-color-icons:faq" style="font-size: 5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">FAQ</h6>
			                                    </div>
			                                  </div>
			                                </div>
			                                </a>
			                              </div>
			                              <div class="col-md-4">
			                              	<a href="${contextPath}/admin/qna" style="text-decoration: none; color: inherit;">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                    <div class="align-items-center">
			                                      <div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="fluent-color:chat-bubbles-question-16" style="font-size: 5.5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">Q&A</h6>
			                                    </div>
			                                  </div>
			                                </div>
			                                </a>
			                              </div>
			                            </div>
			
			                          </div>
			                          <div class="modal-footer justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
			                              Close
			                            </button>
			                          </div>
			                        </div>
			                      </div>
			                    </div>
			                    <!-- 고객센터 관리 모달창 끝 -->
                

                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>문의하기 답변 작성</h3>
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
                                    	<c:choose>
		                                    <c:when test="${res.ansState == 0}">
		                                        <span class="mb-1 badge bg-warning-subtle text-warning">답변 대기</span>
		                                    </c:when>
		                                    <c:when test="${res.ansState == 1}">
		                                        <span class="mb-1 badge bg-success-subtle text-success">답변 완료</span>
		                                    </c:when>
		                                </c:choose>
                                    </div>
                                </div>
                                <div class="card-body p-4">
                                    <div class="table-responsive mb-4 border rounded-1">
                                        <table class="table text-nowrap mb-0 align-middle">
                                            <thead class="text-dark fs-4">
                                                <tr>
                                                    <th>
                                                        <h4 class="fs-4 fw-semibold mb-0">
                                                            <span class="mb-1 badge bg-info-subtle text-info">
																<c:choose>
								                                    <c:when test="${res.qnaCategory == 1}">
								                                        <span class="badge bg-info-subtle text-info">서비스</span>
								                                    </c:when>
								                                    <c:when test="${res.qnaCategory == 2}">
								                                        <span class="badge bg-info-subtle text-info">계정</span>
								                                    </c:when>
								                                    <c:when test="${res.qnaCategory == 3}">
								                                        <span class="badge bg-info-subtle text-info">결제·환불</span>
								                                    </c:when>
								                                    <c:when test="${res.qnaCategory == 4}">
								                                        <span class="badge bg-info-subtle text-info">오류 보고</span>
								                                    </c:when>
								                                    <c:when test="${res.qnaCategory == 5}">
								                                        <span class="badge bg-info-subtle text-info">신고 접수</span>
								                                    </c:when>
								                                    <c:when test="${res.qnaCategory == 6}">
								                                        <span class="badge bg-info-subtle text-info">기타</span>
								                                    </c:when>
								                                </c:choose>
															</span>
															&ensp;<strong>${res.qnaTtl}</strong>
                                                        </h4>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="height: 10em;">
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="ms-3">
                                                                <span class="fw-normal" style="line-height: 1.2;">${res.qnaConts}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="card-footer bg-white">
                                                            <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                                <c:forEach var="file" items="${res.fileSrcList}">
                                                                    <li>
                                                                        <div class="me-1 border">
                                                                            <p class="mailbox-attachment-icon">
                                                                                <c:choose>
                                                                                    <c:when test="${file.atchFileExtn == 'jpg'}">
                                                                                        <img src="${contextPath}${file.atchFilePath}" style="width: 150px; height: 150px; cursor: pointer;" id="fileImg"/>
                                                                                    </c:when>
                                                                                    <c:when test="${file.atchFileExtn == 'pdf'}">
                                                                                        <i class="ti ti-file-text"></i>
                                                                                    </c:when>
                                                                                </c:choose>
                                                                            </p>
                                                                            <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                                <p style="flex: 1; text-align: center;">${file.atchFileOrgnlNm}</p>
                                                                                <a href="${contextPath}/download/${file.atchFileId}" class="float-end mt-3">
                                                                                    <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
                                                                                        <i class="ti ti-download" style="font-size: 1.5em;"></i>
                                                                                    </button>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </c:forEach>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                            <a class="round-32 rounded-circle btn btn-secondary p-0 hstack justify-content-center" id="commentBtn" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="답변">
                                                <i class="ti ti-message-2 fs-7"></i>
                                            </a>
                                            <span class="text-dark fw-semibold me-3">${res.ansState }</span>
                                            <c:choose>
	                                   			<c:when test="${res.ansState == 1}">
	                                            <a class="round-32 rounded-circle btn btn-light p-0 hstack justify-content-center" id="cmtEditBtn" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="수정">
	                                                <i class="ti ti-edit fs-7"></i> 
	                                            </a>
	                                            </c:when>
	                                        </c:choose>
                                        </div>
                                        <div class="ms-auto d-flex align-items-center gap-2">
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="뒤로가기" id="backBtn">
                                                <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <form action="${contextPath }/admin/qnaInsert" method="post" id="commentForm">
	                                <c:choose>
	                                    <c:when test="${res.ansState == 0}"> 
	                                        <div id="comment1" style="display: none;">
			                                	<input type="hidden" value="" id="ansWtr" name="ansWtr"/> 
			                                	<input type="hidden" value="${res.qnaNo}" id="qnaNo" name="qnaNo"/> 
			                                    <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
			                                        <img src="${contextPath }/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="33" height="33"> 
			                                        <input type="text" class="form-control py-8" name="ansConts" id="exampleInputtext1" aria-describedby="textHelp" placeholder="답변을 입력해주세요..." style="width: 82%">
			                                        <button onclick="$('#commentForm').submit()" class="btn btn-primary">답변하기</button>
			                                    </div>
			                                </div>
	                                    </c:when>
	                                    <c:when test="${res.ansState == 1}">
	                                    <div class="align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap" id="comment2" style="display: none;">
						            	 	<div class="p-4 rounded-4 text-bg-light">
							                 	<div class="d-flex align-items-center gap-3">
							                     	<img src="/synerhub/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="33" height="33">
							                     	<h6 class="mb-0 fs-4">SynerHUB 고객센터</h6>
							                     	<span class="p-1 text-bg-muted rounded-circle d-inline-block"></span>
							                 	</div>
							                 	<p class="my-3" style="margin-left: 50px;">
											    	${res.ansConts}
											 	</p> 
					                 			<div class="d-flex align-items-center gap-2">
							                     	<a class="d-flex align-items-center justify-content-center text-bg-primary p-2 fs-4 rounded-circle" id="replyBtn" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reply">
							                         	<i class="ti ti-arrow-back-up"></i>
							                     	</a>
					                 			</div>
						               		</div> 
						               	</div>
						               	<div id="comment3" style="display: none;">
		                                	<input type="hidden" value="" id="ansWtr" name="ansWtr"/> 
		                                	<input type="hidden" value="${res.qnaNo}" id="qnaNo" name="qnaNo"/> 
		                                    <div class="d-flex align-items-center gap-6 flex-wrap p-3 flex-lg-nowrap">
		                                        <img src="${contextPath }/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="33" height="33">
		                                        <input type="text" class="form-control py-8" name="ansConts" id="exampleInputtext1" value="${res.ansConts}" aria-describedby="textHelp" style="width: 82%">
		                                        <button onclick="$('#commentForm').submit()" class="btn btn-primary">답변하기</button>
		                                    </div>
		                                </div>
	                                    </c:when>
	                                </c:choose>
                                    <sec:csrfInput/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div> 
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript">
$(function () {
	console.log(MEM_NO);
	$("#ansWtr").val(MEM_NO);
	
	
    $(document).on('click', "#commentBtn", function () {
        $('#comment1').toggle();
        $('#comment2').toggle();
        $('#comment3').hide();
    });
	 
    $(document).on('click', "#cmtEditBtn", function () {
    	console.log("수정 클릭");
        $('#comment2').hide(); // comment2를 숨김
        $('#comment3').toggle(); // comment3을 토글
    });

    $(document).on('click', "#backBtn", function () {
		location.href = "/synerhub/admin/qna";
    });
    
});

$('#fileImg').on("click",function(){
	window.open(this.src);
});


</script>