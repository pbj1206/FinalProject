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
								<li class="breadcrumb-item"><a href="../main/index.html">Home</a></li>
								<li class="breadcrumb-item" aria-current="page">Administrator</li>
							</ol>
						</nav>
					</div>
				</div>
				<div class="course">
					<div class="card">
						<div class="card-body">
							<div class="mb-4 pb-2 d-flex align-items-center">
								<iconify-icon icon="clarity:administrator-solid" width="3em" height="3em"></iconify-icon>
								<h2 class="card-title mb-0 ms-4" style="transform: scale(1.7);">관리자</h2>
								<a href="${contextPath}/admin/management" class="btn btn-primary ms-auto"> <i class="ti ti-settings fs-4">&ensp;관리자 관리</i>
								</a>
							</div>


							<div class="row">
								<div class="col-lg-4 col-md-6" style="cursor: pointer">
									<div class="card hover-img overflow-hidden">

										<div class="connect-sorting" style="background-color: f5f8fb;">
											<div class="connect-sorting-content" data-sortable="true">
												<div data-draggable="true" class="card img-task">
													<div class="card-body">
														<a href="${contextPath}/admin/channel" style="text-decoration: none; color: inherit;">
															<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
																<div class="bg-primary-subtle p-3 rounded-circle">
																	<iconify-icon icon="jam:youtube-square" width="6em" height="6em" style="color: #0085db;"></iconify-icon>
																</div>
															</div>

															<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
																<div class="task-bottom">
																	<div class="tb-section-1">
																		<h5>채널 관리</h5>
																	</div>
																</div>
															</div>
														</a>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>


								<!-- 멤버십  -->
								<div class="col-lg-4 col-md-6" style="cursor: pointer">
									<a href="${contextPath}/admin/membership" style="text-decoration: none; color: inherit;">
										<div class="card hover-img overflow-hidden">

											<div class="connect-sorting" style="background-color: f5f8fb;">
												<div class="connect-sorting-content" data-sortable="true">
													<div data-draggable="true" class="card img-task">
														<div class="card-body">
															<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
																<div class="bg-indigo-subtle p-3 rounded-circle">
																	<iconify-icon icon="ri:medal-line" width="6em" height="6em" style="color: #8763da;"></iconify-icon>
																</div>
															</div>

															<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
																<div class="task-bottom">
																	<div class="tb-section-1">
																		<h5>멤버십 관리</h5>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</a>
								</div>
								<!-- 멤버십  -->



								<div class="col-lg-4 col-md-6" style="cursor: pointer">
									<div class="card hover-img overflow-hidden">
										<a href="${contextPath}/admin/users" style="text-decoration: none; color: inherit;">
											<div class="connect-sorting" style="background-color: f5f8fb;">
												<div class="connect-sorting-content" data-sortable="true">
													<div data-draggable="true" class="card img-task">
														<div class="card-body">
															<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
																<div class="bg-warning-subtle p-3 rounded-circle">
																	<iconify-icon icon="fa-solid:users" width="6em" height="6em" style="color: #f8c076;"></iconify-icon>
																</div>
															</div>

															<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
																<div class="task-bottom">
																	<div class="tb-section-1">
																		<h5>사용자 관리</h5>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</a>
									</div>
								</div>


								<!-- 신고 관리 시작 -->
								<div class="col-lg-4 col-md-6" style="cursor: pointer">
									<a href="${contextPath}/admin/dclrList" style="text-decoration: none; color: inherit;">
										<div class="card hover-img overflow-hidden">

											<div class="connect-sorting" style="background-color: f5f8fb;">
												<div class="connect-sorting-content" data-sortable="true">
													<div data-draggable="true" class="card img-task">
														<div class="card-body">
															<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
																<div class="bg-danger-subtle p-3 rounded-circle">
																	<iconify-icon icon="fluent:person-warning-16-filled" width="6em" height="6em" style="color: #fb977d;"></iconify-icon>
																</div>
															</div>

															<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
																<div class="task-bottom">
																	<div class="tb-section-1">
																		<h5>신고 접수 관리</h5>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</a>
								</div>
								<!-- 신고 관리 끝 -->


								<div class="col-lg-4 col-md-6" style="cursor: pointer">
									<a href="${contextPath}/admin/paymentList" style="text-decoration: none; color: inherit;">
										<div class="card hover-img overflow-hidden">

											<div class="connect-sorting" style="background-color: f5f8fb;">
												<div class="connect-sorting-content" data-sortable="true">
													<div data-draggable="true" class="card img-task">
														<div class="card-body">
															<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
																<div class="bg-success-subtle p-3 rounded-circle">
																	<iconify-icon icon="akar-icons:statistic-up" width="6em" height="6em" style="color: #4bd08b;"></iconify-icon>
																</div>
															</div>

															<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
																<div class="task-bottom">
																	<div class="tb-section-1">
																		<h5>매출 관리</h5>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</a>
								</div>



								<div class="col-lg-4 col-md-6" data-bs-toggle="modal" data-bs-target="#vertical-center-modal" style="cursor: pointer" id="csManage">
									<div class="card hover-img overflow-hidden">

										<div class="connect-sorting" style="background-color: f5f8fb;">
											<div class="connect-sorting-content" data-sortable="true">
												<div data-draggable="true" class="card img-task">
													<div class="card-body">
														<div class="task-header" style="display: flex; justify-content: center; align-items: center;">
															<div class="bg-secondary-subtle p-3 rounded-circle">
																<iconify-icon icon="mdi:customer-service" width="6em" height="6em" style="color: #46caeb;"></iconify-icon>
															</div>
														</div>

														<div class="task-body m-3" style="display: flex; justify-content: center; align-items: center;">
															<div class="task-bottom">
																<div class="tb-section-1">
																	<h5>고객센터 관리</h5>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
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

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>