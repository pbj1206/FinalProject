<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
				          <a href="../main/index.html">서비스 관리</a>
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

				
				
				
				<div class="card">
				  <div class="card-body">
				    <div class="mb-4" role="tablist">
				          <h3>자주 묻는 질문</h3>
				    </div>
				 
				        <div class="card">
				        	<form action="${contextPath}/admin/faqDelete" method="post" id="faqDelForm">
							<input type="hidden" name="faqNo" value="">
							<ul class="nav nav-pills user-profile-tab" id="pills-tab" role="tablist">
							    <li class="nav-item" role="presentation">
							        <button class="nav-link position-relative active rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3" 
							                id="pills-tab-${faqCategory[0]}" 
							                data-bs-toggle="pill" 
							                data-bs-target="#pills-${faqCategory[0]}" 
							                type="button" 
							                role="tab" 
							                aria-controls="pills-${faqCategory[0]}" 
							                aria-selected="true">
							            <c:choose>
							               <c:when test="${faqCategory[0] == 1}">
				                                <i class="ti ti-heart-handshake me-2 fs-6"></i> <!-- 서비스 아이콘 -->
				                            </c:when>
				                            <c:when test="${faqCategory[0] == 2}">
				                            	<i class="ti ti-user-circle me-2 fs-6"></i> <!-- 계정 아이콘 -->
				                            </c:when>
				                             <c:when test="${faqCategory[0] == 3}">
				                                <i class="ti ti-coin me-2 fs-6"></i> <!-- 결제 아이콘 -->
				                            </c:when>
				                            <c:when test="${faqCategory[0] == 4}">
				                                <i class="ti ti-bug me-2 fs-6"></i> <!-- 오류 보고 아이콘 -->
				                            </c:when>
				                            <c:when test="${faqCategory[0] == 5}">
				                                <i class="ti ti-user-exclamation me-2 fs-6"></i> <!-- 신고 접수 아이콘 -->
				                            </c:when>
				                            <c:when test="${faqCategory[0] == 6}">
				                                <i class="ti ti-line-dotted me-2 fs-6"></i> <!-- 기타 아이콘 -->
				                            </c:when>
							            </c:choose>
							            <span class="d-md-block">
							                <c:choose>
							                    <c:when test="${faqCategory[0] == 1}">서비스</c:when>
				                                <c:when test="${faqCategory[0] == 2}">계정</c:when>
				                                <c:when test="${faqCategory[0] == 3}">결제·환불</c:when>
				                                <c:when test="${faqCategory[0] == 4}">오류 보고</c:when>
				                                <c:when test="${faqCategory[0] == 5}">신고 접수</c:when>
				                                <c:when test="${faqCategory[0] == 6}">기타</c:when>
							                </c:choose>
							            </span>
							        </button>
							    </li>
							    <c:forEach var="faqCate" items="${faqCategory}" varStatus="status">
							        <c:if test="${faqCate ne faqCategory[0]}">
							                <li class="nav-item" role="presentation">
							                    <button class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3" 
							                            id="pills-tab-${faqCate}" 
							                            data-bs-toggle="pill" 
							                            data-bs-target="#pills-${faqCate}" 
							                            type="button" 
							                            role="tab" 
							                            aria-controls="pills-${faqCate}" 
							                            aria-selected="false">
							                        <c:choose> 
							                            <c:when test="${faqCate == 1}">
							                                <i class="ti ti-heart-handshake me-2 fs-6"></i> <!-- 서비스 아이콘 -->
							                            </c:when>
							                            <c:when test="${faqCate == 2}">
							                            	<i class="ti ti-user-circle me-2 fs-6"></i> <!-- 계정 아이콘 -->
							                            </c:when>
							                             <c:when test="${faqCate == 3}">
							                              	<i class="ti ti-coin me-2 fs-6"></i> <!-- 결제 아이콘 -->
							                            </c:when>
							                            <c:when test="${faqCate == 4}">
							                                <i class="ti ti-bug me-2 fs-6"></i> <!-- 오류 보고 아이콘 -->
							                            </c:when>
							                            <c:when test="${faqCate == 5}">
							                                <i class="ti ti-user-exclamation me-2 fs-6"></i> <!-- 신고 접수 아이콘 -->
							                            </c:when>
							                            <c:when test="${faqCate == 6}">
							                                <i class="ti ti-line-dotted me-2 fs-6"></i> <!-- 기타 아이콘 -->
							                            </c:when>
							                        </c:choose>
							                        <span class="d-md-block">
							                            <c:choose>
							                                <c:when test="${faqCate == 1}">서비스</c:when>
							                                <c:when test="${faqCate == 2}">계정</c:when>
							                                <c:when test="${faqCate == 3}">결제·환불</c:when>
							                                <c:when test="${faqCate == 4}">오류 보고</c:when>
							                                <c:when test="${faqCate == 5}">신고 접수</c:when>
							                                <c:when test="${faqCate == 6}">기타</c:when>
							                            </c:choose>
							                        </span>
							                    </button>
							                </li>
							            </c:if>
							    </c:forEach>
							</ul>




				          <div class="card-body">
				            <div class="tab-content" id="pills-tabContent">
				
				              <!-- 탭1 -->
						        <c:forEach var="faqVO" items="${faqList}" varStatus="status">
								    <div class="tab-pane fade ${status.index == 0 ? 'show active' : ''}" id="pills-${faqVO.faqCategory}" role="tabpanel" aria-labelledby="pills-tab-${faqVO.faqCategory}" tabindex="${status.index }">
								        <div class="accordion accordion-flush mb-2 card position-relative overflow-hidden border" id="accordionFlushExample">
									        <c:forEach var="faqVO2" items="${faqList}" varStatus="status">
									       		<c:if test="${faqVO.faqCategory eq faqVO2.faqCategory}">
									            <div class="accordion-item">
									                <h2 class="accordion-header" id="flush-heading-${faqVO2.faqNo}">
									                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${faqVO2.faqNo}" aria-expanded="false" aria-controls="flush-collapse-${faqVO2.faqNo}">
									                        ${faqVO2.faqTtl}
									                    </button>
									                </h2>
									                <div id="flush-collapse-${faqVO2.faqNo}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${faqVO2.faqNo}" data-bs-parent="#accordionFlushExample">
									                    <div class="accordion-body fw-normal" style="line-height: 1.5; white-space: pre-line; margin: 0;">
									                        ${faqVO2.faqConts}
									                    </div>
									                    
									                    <div id="f2" class="d-flex justify-content-end align-items-center gap-2 mb-3 me-4">
		                                                     <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="${contextPath}/admin/faqUpdate?faqNo=${faqVO2.faqNo}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="수정" id="detailModBtn">
		                                                         <i class="ti ti-edit fs-7"></i>
		                                                     </a>
		                                                     <button type="button" class="btn text-dark bg-hover-primary p-2 fs-4" data-bs-toggle="modal" data-bs-target="#faqDel${faqVO2.faqNo}" data-faq-no="${faqVO2.faqNo}" data-bs-placement="top" data-bs-title="삭제">
		                                                         <i class="ti ti-trash fs-7 me-1"></i>
		                                                     </button>
		                                                     
		                                                     <div class="modal fade" id="faqDel${faqVO2.faqNo}" tabindex="-1" aria-labelledby="faqDel" aria-hidden="true">
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
		                                                              </div >
		                                                              <div class="modal-footer">
		                                                                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="detailYesBtn" onclick="$('#faqDelForm').submit()">
		                                                                     	예   
		                                                                </button>
		                                                                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
		                                                                     	아니오
		                                                                </button>
		                                                              </div>
		                                                           </div>
		                                                     	</div>
		                                                     </div>
		                                                        
		                                                 </div> 
									                    
									                </div>
									            </div>
									            </c:if>
								            </c:forEach>
								        </div>
								    </div>
								</c:forEach>
				              <!-- 탭1 끝 -->
				
				              </div> 
				            </div>
				
				            <div class="mb-3 me-3" style="text-align: right;">
				              <a href="${contextPath}/admin/faqForm" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="qnaInsert">
							    <i class="ti ti-pencil fs-6 me-2"></i>
							        작성
							  </a>
				            </div>
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
<script>
$(document).on('click', '[data-bs-target^="#faqDel"]', function() {
    var faqNo = $(this).data('faq-no');
    $('#faqDelForm').find('input[name="faqNo"]').val(faqNo);
});
</script>
