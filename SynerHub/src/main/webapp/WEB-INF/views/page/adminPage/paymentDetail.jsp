<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
								<li class="breadcrumb-item"><a href="../horizontal/index.html">서비스 관리</a></li>
								<c:if test="${adminPyamentDetail[0].planNm eq 'BRONZE'}">
									<li class="breadcrumb-item" aria-current="page">브론즈 매출상세보기</li>
								</c:if>
								<c:if test="${adminPyamentDetail[0].planNm eq 'SILVER'}">
									<li class="breadcrumb-item" aria-current="page">실버 매출상세보기</li>
								</c:if>
								<c:if test="${adminPyamentDetail[0].planNm eq 'GOLD'}">
									<li class="breadcrumb-item" aria-current="page">골드 매출상세보기</li>
								</c:if>
							</ol>
						</nav>
					</div>
				</div>

				<div class="col-lg-12">
					<!--  start Primary Table -->
					<div class="card">
						<div class="card-body">
							<div class="d-md-flex justify-content-between mb-9">
								<div class="mb-9 mb-md-0">
									<div style="display: flex;">
										<h3>${paymentDetail.planNm }매출상세보기</h3>
									</div>
								</div>
							</div>

							<!-- 고객센터 관리 모달창 -->
							<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
								<div class="modal-dialog modal-lg modal-dialog-centered">
									<div class="modal-content text-center">
										<!-- text-center 클래스 추가 -->
										<div class="modal-header text-center d-flex align-items-center justify-content-center">
											<!-- justify-content-center 추가 -->
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
																	<div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
																		<!-- margin: auto 추가 -->
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
																	<div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
																		<!-- margin: auto 추가 -->
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
																	<div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
																		<!-- margin: auto 추가 -->
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
										<div class="modal-footer justify-content-center">
											<!-- justify-content-center 추가 -->
											<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
							<!-- 고객센터 관리 모달창 끝 -->



							<div class="d-md-flex justify-content-between mb-9">
								<div class="mb-9 mb-md-0 ms-auto">
									<div style="display: flex;">
										<c:if test="${adminPyamentDetail[0].planNm eq 'BRONZE'}">
											<Strong style="font-weight: bold">브론즈 수입 : </Strong><Strong class="text-left me-4" style="color: red">${plusPrice.planPrice }</Strong>    
											<Strong style="font-weight: bold">브론즈 총 환불액 : </Strong><Strong style="color: blue">${planMinuse.planPrice.split("-")[1] }</Strong>  
										</c:if>
										<c:if test="${adminPyamentDetail[0].planNm eq 'SILVER'}">
											<Strong style="font-weight: bold">실버 수입 : </Strong><Strong class="text-left me-4" style="color: red">${plusPrice.planPrice }</Strong>
											<Strong style="font-weight: bold">실버 총 환불액 : </Strong><Strong style="color: blue">${planMinuse.planPrice.split("-")[1] }</Strong>
										</c:if>
										<c:if test="${adminPyamentDetail[0].planNm eq 'GOLD'}">
											<Strong style="font-weight: bold">골드 수입 : </Strong><Strong class="text-left me-4" style="color: red">${plusPrice.planPrice }</Strong>
											<Strong style="font-weight: bold">골드 총 환불액 : </Strong><Strong style="color: blue">${planMinuse.planPrice.split("-")[1] }</Strong>  
										</c:if>
									</div>
								</div>
							</div>
							<div class="table-responsive border rounded-4 mb-7">
								<table class="table mb-0 table-hover">
									<thead class="table-primary align-middle" style="display: table; width: 100%;">
										<tr>
											<th style="width: 10%" class="text-center">NO</th>
											<th style="width: 30%" class="text-center">채널 이름</th>
											<th style="width: 27%" class="text-center">금액</th>
											<th style="width: 32%" class="text-center">결제 날짜</th>
										</tr>
									</thead>
									<tbody style="display: block; max-height: 400px; overflow-y: scroll;">
										<c:forEach var="adminPyamentDetail" items="${adminPyamentDetail }" varStatus="i">
											<tr style="display: table; width: 100%;">
												<td style="width: 10%" class="text-center">&nbsp;${i.count }</td>
												<td style="width: 30%" class="text-center">${adminPyamentDetail.chTtl }</td>
												<td style="width: 30%" class="text-center">
													<c:if test="${adminPyamentDetail.planPrc > 0 }">
														<span style="color: red">${adminPyamentDetail.planIOExp}</span>
													</c:if>
													<c:if test="${adminPyamentDetail.planPrc < 0 }">
														<span style="color: blue">${adminPyamentDetail.planIOExp}</span>
													</c:if>
												</td>
												<td style="width: 30%" class="text-center">${adminPyamentDetail.pmntDate }</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
							<div class="text-center" style="font-weight: bold;">
								<c:if test="${adminPyamentDetail[0].planNm eq 'BRONZE'}">
									<Strong style="font-weight: bold">브론즈 총 매출 : </Strong><Strong style="color: green">${planPrice }</Strong>
								</c:if>
								<c:if test="${adminPyamentDetail[0].planNm eq 'SILVER'}">
									<Strong style="font-weight: bold">실버 총 매출 : </Strong><Strong style="color: green">${planPrice }</Strong>
								</c:if>
								<c:if test="${adminPyamentDetail[0].planNm eq 'GOLD'}">
									<Strong style="font-weight: bold">골드 순이익 : </Strong><Strong style="color: green">${planPrice }</Strong>
								</c:if>
							</div>
							<div class="ms-auto d-flex align-items-center gap-2">
                                 <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="/synerhub/admin/paymentList" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="뒤로가기" id="backBtn">
                                     <i class="ti ti-arrow-back-up fs-7 me-1"></i> 
                                 </a>
                             </div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>