<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
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
				          <li class="breadcrumb-item" aria-current="page">FAQ</li>
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
				 
				
				<c:set value="작성" var="name"/>
				<c:if test="${status eq 'u' }">
					<c:set value="수정" var="name"/>
				</c:if>
				
				<div class="card">
				    <div class="card-body">
				        <div class="mb-4" role="tablist">
				            <h3>게시글 ${name }</h3>
				        </div>
						
						<c:set value="${contextPath}/admin/faqInsert" var="formAction" />
						<c:if test="${status eq 'u' }">
						    <c:set value="${contextPath}/admin/faqUpdate" var="formAction" />
						</c:if>
						
						<form action="${formAction}" method="post" id="faqForm" enctype="multipart/form-data">
							<c:if test="${status eq 'u' }">
								<input type="hidden" name="faqNo" value="${faqVO.faqNo }">
							</c:if>
				        <div class="tab-content">
				            <div class="tab-pane active" id="feeds" role="tabpanel">
				                <div class="card border">
				                    <div class="card-body p-4">
				                        <div class="d-flex align-items-center mb-3">
				                            <img src="/synerhub/resources/assets/images/logos/logo5.png" alt="spike-img" width="32" height="32" class="rounded-circle">
				                            <h6 class="mb-0 ms-6">SynerHUB 고객센터</h6>
				                            <div class="ms-auto mt-3 mt-md-0" style="width: 15%;">
				                                <select class="form-select bg-transparent border" id="faqCategory" name="faqCategory">
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
				                                <input id="faqTtl" type="text" class="form-control" name="faqTtl" value="${faqVO.faqTtl }"/>
				                                <br />
				                                <label class="form-label" for="text-3">내용</label>
				                                <br />
				                                <textarea id="faqConts" rows="10" class="form-control" name="faqConts">${faqVO.faqConts }</textarea>
				                            </div>
				                        </div>
				
										<c:choose>
											<c:when test="${status eq 'u' }">
					                        <div class="d-flex align-items-center justify-content-between">
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
					                            <div>
													<input type="button" class="btn btn-success me-3" id="modifyBtn" value="${name }">
				                                	<input type="button" class="btn bg-danger-subtle text-danger" id="insCancel" value="취소">
					                            </div>
					                        </div>
					                        </c:when>
										    <c:otherwise>
											<div class="d-flex align-items-center justify-content-between">
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
					                            <div>
													<input type="button" class="btn btn-primary me-3" id="insertBtn" value="등록">
				                                	<input type="button" class="btn bg-danger-subtle text-danger" id="insCancel" value="취소">
					                            </div>
					                        </div>
					                      	</c:otherwise>
				                    	</c:choose>
				                    </div>
				                </div>
				            </div>
				        </div>
				        <sec:csrfInput/>
				        </form>
				    </div>
				</div>
				
	  		</div>
		</div>
	</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>				
<script type="text/javascript">
$(function () {
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
	
	
	var insertBtn = $("#insertBtn"); 			// 등록 버튼
	var insCancel = $("#insCancel"); 			// 취소 버튼
	var modifyBtn = $("#modifyBtn"); 			// 수정 버튼
	
	var faqForm = $("#faqForm"); 	// 등록 Form
	
	// 등록 버튼 이벤트
	insertBtn.on("click", function(){
		console.log("수정클릭");
		
		var title = $("#faqTtl").val();		
		var content = $("#faqConts").val();	// 일반적인 input 요소를 이용한 값 얻어오기
		
		if(title == null || title == ""){
			alert("제목을 입력해주세요!");
			return false;
		}
		
		if(content == null || content == ""){
			alert("내용을 입력해주세요!");
			return false;
		}
		
// 		if($(this).val() == "수정"){
// 			faqForm.attr("action", "${contextPath}/admin/faqUpdate");
// 		}
		
		faqForm.submit();
	});
	
	insCancel.on("click", function(){
		history.go(-1);
	});
	
	// 수정 버튼 이벤트
	modifyBtn.on("click", function(){
	    console.log("수정 클릭");
	    faqForm.attr("action", "${contextPath}/admin/faqUpdate"); // 수정 시
	    faqForm.submit();
	});

	
});
</script>