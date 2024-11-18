<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!--  Header Start -->
<header class="topbar sticky-top">
	<div class="with-vertical">
		<!-- ---------------------------------- -->
		<!-- Start Vertical Layout Header -->
		<!-- ---------------------------------- -->
		<nav class="navbar navbar-expand-lg p-0">
			<ul class="navbar-nav">
				<li class="nav-item nav-icon-hover-bg rounded-circle"><a class="nav-link sidebartoggler" id="headerCollapse" href="javascript:void(0)"> <iconify-icon icon="solar:list-bold-duotone" class="fs-7"></iconify-icon>
				</a></li>
			</ul>

			<div class="d-block d-lg-none py-3">
				<img src="${contextPath}/resources/assets/images/logos/logo2.png" class="dark-logo" alt="Logo-Dark" style="object-fit: cover; width: 100%; height: 100%;" /> <img src="${contextPath}/resources/assets/images/logos/logo2.png" class="light-logo" alt="Logo-light" style="object-fit: cover; width: 100%; height: 100%;" />
			</div>


			<a class="navbar-toggler p-0 border-0" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<p class="p-2">
					<i class="ti ti-dots fs-7"></i>
				</p>
			</a>
			<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
				<div class="d-flex align-items-center justify-content-between">
					<a href="javascript:void(0)" class="nav-link d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
						<div class="nav-icon-hover-bg rounded-circle ">
							<i class="ti ti-align-justified fs-7"></i>
						</div>
					</a>
					<ul class="navbar-nav flex-row ms-auto align-items-center justify-content-center">
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle d-flex d-lg-none"><a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false"> <iconify-icon icon="solar:magnifer-linear" class="fs-7"></iconify-icon>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Search Bar -->
								<div class="message-body p-3" data-simplebar="">
									<h5 class="mb-0 fs-5 p-1">Quick Page Links</h5>
									<ul class="list mb-0 py-2">
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
									</ul>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- start language Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown d-none d-lg-block"><a class="nav-link position-relative shadow-none" href="javascript:void(0)" id="drop3" aria-expanded="false"> </a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Search Bar -->

								<div class="message-body p-3" data-simplebar="">
									<h5 class="mb-0 fs-5 p-1">Quick Page Links</h5>
									<ul class="list mb-0 py-2">
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
									</ul>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end language Dropdown -->
						<!-- ------------------------------- -->

						<!-- 고객센터 버튼 -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle"><a class="nav-link position-relative" href="javascript:void(0)" id="drop2" aria-expanded="false"> <iconify-icon icon="mdi:customer-service" class="fs-7"></iconify-icon>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up pb-0 overflow-hidden" aria-labelledby="drop2">
								<!--  Shortcuts -->
								<div class="d-flex align-items-center py-3 px-7 gap-6">
									<h3 class="mb-0 fs-5">고객센터</h3>
								</div>
								<div class="row gx-0">
									<div class="col-4">
										<!-- col-4로 변경 -->
										<a class="dropdown-item px-7 border-top border-bottom border-end py-6 d-flex flex-column gap-2 justify-content-center text-center" style="cursor: pointer" id="ntcList">
											<div class="bg-danger-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="mage:megaphone-a-fill" class="fs-7" style="color: #ff6e6e"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">공지사항</h6>
										</a>
									</div>
									<div class="col-4">
										<!-- col-4로 변경 -->
										<a href="javascript:void(0)" class="dropdown-item px-7 border-top border-bottom py-6 d-flex flex-column gap-2 justify-content-center text-center" id="faqList">
											<div class="bg-success-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="flat-color-icons:faq" class="fs-7"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">FAQ</h6>
										</a>
									</div>
									<div class="col-4">
										<!-- col-4로 변경 -->
										<a href="javascript:void(0)" class="dropdown-item px-7 border-top border-start border-bottom py-6 d-flex flex-column gap-2 justify-content-center text-center" id="qnaList">
											<div class="bg-primary-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="fluent-color:chat-bubbles-question-16" class="fs-8"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Q&A</h6>
										</a>
									</div>
								</div>
							</div></li>


						<!-- 신고 버튼 추가 -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle" id="declaration"><a class="nav-link position-relative" style="cursor: pointer"> <iconify-icon icon="ant-design:alert-filled" class="fs-7"></iconify-icon>
						</a> <!-- 							<button type="button" data-bs-toggle="modal" data-bs-target="#reportModal" style="background: none; border: none; padding: 0; width: 30px;"> --> <!-- 								<svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 48 48"> --> <!-- 									<g fill="none" stroke="#000" stroke-linejoin="round" stroke-width="4"> --> <!-- 									<path fill="#ff2e2e" d="M36 35H12V21C12 14.3726 17.3726 9 24 9C30.6274 9 36 14.3726 36 21V35Z" /> --> <!-- 									<path stroke-linecap="round" d="M8 42H40" /> --> <!-- 									<path stroke-linecap="round" d="M4 13L7 14" /> --> <!-- 									<path stroke-linecap="round" d="M13 3.9999L14 6.9999" /> --> <!-- 									<path stroke-linecap="round" d="M10.0001 9.99989L7.00009 6.99989" /></g></svg> --> <!-- 							</button> --></li>

						<!-- ------------------------------- -->
						<!-- start Messages cart Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle"><a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false"> <iconify-icon icon="solar:chat-dots-line-duotone" class="fs-6"></iconify-icon>
								<div class="pulse">
									<p class="heartbit border-warning"></p>
									<p class="point text-bg-warning"></p>
								</div>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Messages -->
								<div class="d-flex align-items-center py-3 px-7">
									<h3 class="mb-0 fs-5">Messages</h3>
								</div>

								<div class="message-body" data-simplebar>
									<div id="alarmMessage">
										<%-- 									<a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6"> <p class="flex-shrink-0"> <img src="${contextPath}/resources/assets/images/profile/user-2.jpg" alt="user" width="45" class="rounded-circle" /> --%>
										<!-- 									</p> -->
										<!-- 										<div class="w-100 ps-3"> -->
										<!-- 											<div class="d-flex align-items-center justify-content-between"> -->
										<!-- 												<h5 class="mb-0 fs-3 fw-normal">Roman Joined the Team!</h5> -->
										<!-- 												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p> -->
										<!-- 											</div> -->
										<!-- 											<p class="fs-2 d-block mt-1 text-muted">Congratulate him</p> -->
										<!-- 										</div> -->
										<!-- 									</a> -->
									</div>

									<div class="py-6 px-7 mb-1">
										<button class="btn btn-primary w-100">See All Messages</button>
									</div>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end Messages cart Dropdown -->
						<!-- ------------------------------- -->

						<!-- ------------------------------- -->
						<!-- start shortcut Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle" onclick="openSidemenu()"><a class="nav-link position-relative" href="javascript:void(0)" id="drop2" aria-expanded="false"> <iconify-icon icon="solar:widget-add-line-duotone" class="fs-6"></iconify-icon>
						</a></li>
						<!-- ------------------------------- -->
						<!-- end shortcut Dropdown -->
						<!-- ------------------------------- -->

						<!-- ------------------------------- -->
						<!-- start profile Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown"><a class="nav-link position-relative ms-6" href="javascript:void(0)" id="drop1" aria-expanded="false">
								<div class="d-flex align-items-center flex-shrink-0">
									<div class="user-profile me-sm-3 me-2">
										<img id="memPrfl1" src="${contextPath}<sec:authentication property="principal.member.memPrflimg"/>" width="40" class="rounded-circle" alt="spike-img">
									</div>
									<p class="d-sm-none d-block">
										<iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon>
									</p>

									<div class="d-none d-sm-block">
										<h6 class="fs-4 mb-1 profile-name" id="memNm1">
											<sec:authentication property="principal.member.memName" />
										</h6>
										<p class="fs-3 lh-base mb-0 profile-subtext">Member</p>
									</div>
								</div>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop1">
								<div class="profile-dropdown position-relative" data-simplebar>
									<div class="d-flex align-items-center justify-content-between pt-3 px-7">
										<h3 class="mb-0 fs-5">사용자 프로필</h3>
									</div>

									<div class="d-flex align-items-center mx-7 py-9 border-bottom">
										<img id="memPrfl2" src="${contextPath}<sec:authentication property="principal.member.memPrflimg"/>" alt="user" width="90" class="rounded-circle" style="cursor: pointer" onclick="myProfile()" />
										<div class="ms-4">
											<h4 class="ms-2 mb-0 fs-5 fw-normal" id="memNm2">
												<sec:authentication property="principal.member.memName" />
											</h4>
											<p class="mt-1 mb-1 badge bg-primary-subtle text-primary">Member</p>
											<p class="text-muted mb-0 mt-1 d-flex align-items-center" id="memEm1">
												<iconify-icon icon="solar:mailbox-line-duotone" class="fs-4 me-1"></iconify-icon>
												<sec:authentication property="principal.member.memEmail" />
											</p>
										</div>
									</div>

									<div class="message-body">
										<a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6" onclick="myProfile()"> <strong class="btn px-3 py-2 bg-info-subtle rounded-1 text-info shadow-none" style="font-weight: normal;"> <i class="ti ti-user-circle fs-8"></i>
										</strong>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">나의 프로필</h5>
												<strong class="fs-3 d-block mt-1 text-muted" style="font-weight: normal;">Account Settings</strong>
											</div>
										</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6" id="headerDriveBtn"> <strong class="btn px-3 py-2 bg-success-subtle rounded-1 text-success shadow-none" style="font-weight: normal;"> <i class="ti ti-brand-onedrive fs-7"></i>
										</strong>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">나의 드라이브</h5>
												<strong class="fs-3 d-block mt-1 text-muted" style="font-weight: normal;">Messages & Emails</strong>
											</div>
										</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6" onclick="todoListLoad()"> <strong class="btn px-3 py-2 bg-danger-subtle rounded-1 text-danger shadow-none" style="font-weight: normal;"> <i class="ti ti-list-check fs-7"></i>
										</strong>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">나의 업무</h5>
												<strong class="fs-3 d-block mt-1 text-muted" style="font-weight: normal;">To-do and Daily Tasks</strong>
											</div>
										</a>
									</div>

									<div class="py-6 px-7 mb-1">
										<!--                               <a href="./main/authentication-login.html" class="btn btn-primary w-100">Log Out</a> -->
										<button class="btn btn-danger w-100" onclick="logoutBtn()">로그아웃</button>
										<!-- <form action="/synerhub/logout" method="post">
											<input type="submit" value="로그아웃" class="btn btn-primary w-100" />
											<sec:csrfInput />
										</form> -->
									</div>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end profile Dropdown -->
						<!-- ------------------------------- -->
					</ul>
				</div>
			</div>
		</nav>
		<!-- ---------------------------------- -->
		<!-- End Vertical Layout Header -->
		<!-- ---------------------------------- -->

		<!-- ------------------------------- -->
		<!-- apps Dropdown in Small screen -->
		<!-- ------------------------------- -->
		<!--  Mobilenavbar -->
		<div class="offcanvas offcanvas-start dropdown-menu-nav-offcanvas" data-bs-scroll="true" tabindex="-1" id="mobilenavbar" aria-labelledby="offcanvasWithBothOptionsLabel">
			<nav class="sidebar-nav scroll-sidebar">
				<div class="offcanvas-header justify-content-between">
					<img src="${contextPath}/resources/assets/images/logos/favicon.png" alt="spike-img" class="img-fluid" />
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body h-n80" data-simplebar>
					<ul id="sidebarnav">
						<li class="sidebar-item"><a class="sidebar-link gap-2 has-arrow" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:list-bold-duotone" class="fs-7"></iconify-icon>
								<p class="hide-menu">Apps</p>
						</a>
							<ul aria-expanded="false" class="collapse first-level my-3">
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-chat.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Chat Application</h6>
											<p class="fs-2 d-block fw-normal text-muted">New messages arrived</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-invoice.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Invoice App</h6>
											<p class="fs-2 d-block fw-normal text-muted">Get latest invoice</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-mobile.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Contact Application</h6>
											<p class="fs-2 d-block fw-normal text-muted">2 Unsaved Contacts</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-message-box.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Email App</h6>
											<p class="fs-2 d-block fw-normal text-muted">Get new emails</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-cart.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">User Profile</h6>
											<p class="fs-2 d-block fw-normal text-muted">learn more information</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-date.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Calendar App</h6>
											<p class="fs-2 d-block fw-normal text-muted">Get dates</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-lifebuoy.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Contact List Table</h6>
											<p class="fs-2 d-block fw-normal text-muted">Add new contact</p>
										</div>
								</a></li>
								<li class="sidebar-item py-2"><a href="javascript:void(0)" class="d-flex align-items-center">
										<div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
											<img src="${contextPath}/resources/assets/images/svgs/icon-dd-application.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
										</div>
										<div>
											<h6 class="mb-1 bg-hover-primary">Notes Application</h6>
											<p class="fs-2 d-block fw-normal text-muted">To-do and Daily tasks</p>
										</div>
								</a></li>
								<ul class="px-8 mt-6 mb-4">
									<li class="sidebar-item mb-3">
										<h5 class="fs-5 fw-semibold">Quick Links</h5>
									</li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">Pricing Page</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">Authentication Design</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">Register Now</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">404 Error Page</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">Notes App</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">User Application</a></li>
									<li class="sidebar-item py-2"><a class="fw-semibold text-dark" href="javascript:void(0)">Account Settings</a></li>
								</ul>
							</ul></li>
						<li class="sidebar-item"><a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:chat-round-unread-line-duotone" class="fs-6 text-dark"></iconify-icon>
								<p class="hide-menu">Chat</p>
						</a></li>
						<li class="sidebar-item"><a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:calendar-add-line-duotone" class="fs-6 text-dark"></iconify-icon>
								<p class="hide-menu">Calendar</p>
						</a></li>
						<li class="sidebar-item"><a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:mailbox-line-duotone" class="fs-6 text-dark"></iconify-icon>
								<p class="hide-menu">Email</p>
						</a></li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
	<div class="app-header with-horizontal">
		<nav class="navbar navbar-expand-xl container-fluid p-0">
			<ul class="navbar-nav">
				<li class="nav-item d-none d-xl-block"><a href="./main/index.html" class="text-nowrap nav-link"> <img src="${contextPath}/resources/assets/images/logos/logo-light.svg" class="dark-logo" width="180" alt="spike-img" /> <img src="${contextPath}/resources/assets/images/logos/logo-dark.svg" class="light-logo" width="180" alt="spike-img" />
				</a></li>
			</ul>
			<a class="navbar-toggler p-0 border-0" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<p class="p-2">
					<i class="ti ti-dots fs-7"></i>
				</p>
			</a>
			<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
				<div class="d-flex align-items-center justify-content-between">
					<a href="javascript:void(0)" class="nav-link d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
						<div class="nav-icon-hover-bg rounded-circle ">
							<i class="ti ti-align-justified fs-7"></i>
						</div>
					</a>
					<ul class="navbar-nav flex-row ms-auto align-items-center justify-content-center">
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle d-flex d-lg-none"><a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false"> <iconify-icon icon="solar:magnifer-linear" class="fs-7 text-dark"></iconify-icon>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Search Bar -->


								<div class="message-body p-3" data-simplebar="">
									<h5 class="mb-0 fs-5 p-1">Quick Page Links</h5>
									<ul class="list mb-0 py-2">
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
									</ul>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- start language Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown d-none d-lg-block"><a class="nav-link position-relative shadow-none" href="javascript:void(0)" id="drop3" aria-expanded="false"> </a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Search Bar -->

								<div class="message-body p-3" data-simplebar="">
									<h5 class="mb-0 fs-5 p-1">Quick Page Links</h5>
									<ul class="list mb-0 py-2">
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Modern</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard1</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Dashboard</p>
												<p class="fs-3 text-muted d-block">/dashboards/dashboard2</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Contacts</p>
												<p class="fs-3 text-muted d-block">/apps/contacts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Posts</p>
												<p class="fs-3 text-muted d-block">/apps/blog/posts</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Detail</p>
												<p class="fs-3 text-muted d-block">/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow</p>
										</a></li>
										<li class="p-1 mb-1 bg-hover-light-black rounded"><a href="javascript:void(0)">
												<p class="fs-3 text-dark d-block">Shop</p>
												<p class="fs-3 text-muted d-block">/apps/ecommerce/shop</p>
										</a></li>
									</ul>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end language Dropdown -->
						<!-- ------------------------------- -->

						<li class="nav-item nav-icon-hover-bg rounded-circle"><a class="nav-link moon dark-layout" href="javascript:void(0)"> <iconify-icon icon="solar:moon-line-duotone" class="moon fs-6"></iconify-icon>
						</a> <a class="nav-link sun light-layout" href="javascript:void(0)"> <iconify-icon icon="solar:sun-2-line-duotone" class="sun fs-6"></iconify-icon>
						</a></li>

						<!-- ------------------------------- -->
						<!-- start Messages cart Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle"><a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false"> <iconify-icon icon="solar:chat-dots-line-duotone" class="fs-6"></iconify-icon>
								<div class="pulse">
									<p class="heartbit border-warning"></p>
									<p class="point text-bg-warning"></p>
								</div>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
								<!--  Messages -->
								<div class="d-flex align-items-center py-3 px-7">
									<h3 class="mb-0 fs-5">Messages</h3>
									<p class="badge bg-info ms-3">5 new</p>
								</div>

								<div class="message-body" data-simplebar>
									<a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
										<p class="flex-shrink-0">
											<img src="${contextPath}/resources/assets/images/profile/user-2.jpg" alt="user" width="45" class="rounded-circle" />
										</p>
										<div class="w-100 ps-3">
											<div class="d-flex align-items-center justify-content-between">
												<h5 class="mb-0 fs-3 fw-normal">Roman Joined the Team!</h5>
												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p>
											</div>
											<p class="fs-2 d-block mt-1 text-muted">Congratulate him</p>
										</div>
									</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
										<p class="flex-shrink-0">
											<img src="${contextPath}/resources/assets/images/profile/user-3.jpg" alt="user" width="45" class="rounded-circle" />
										</p>
										<div class="w-100 ps-3">
											<div class="d-flex align-items-center justify-content-between">
												<h5 class="mb-0 fs-3 fw-normal">New message received</h5>
												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p>
											</div>
											<p class="fs-2 d-block mt-1 text-muted">Salma sent you new message</p>
										</div>
									</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
										<p class="flex-shrink-0">
											<img src="${contextPath}/resources/assets/images/profile/user-4.jpg" alt="user" width="45" class="rounded-circle" />
										</p>
										<div class="w-100 ps-3">
											<div class="d-flex align-items-center justify-content-between">
												<h5 class="mb-0 fs-3 fw-normal">New Payment received</h5>
												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p>
											</div>
											<p class="fs-2 d-block mt-1 text-muted">Check your earnings</p>
										</div>
									</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
										<p class="flex-shrink-0">
											<img src="${contextPath}/resources/assets/images/profile/user-5.jpg" alt="user" width="45" class="rounded-circle" />
										</p>
										<div class="w-100 ps-3">
											<div class="d-flex align-items-center justify-content-between">
												<h5 class="mb-0 fs-3 fw-normal">New message received</h5>
												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p>
											</div>
											<p class="fs-2 d-block mt-1 text-muted">Salma sent you new message</p>
										</div>
									</a> <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
										<p class="flex-shrink-0">
											<img src="${contextPath}/resources/assets/images/profile/user-6.jpg" alt="user" width="45" class="rounded-circle" />
										</p>
										<div class="w-100 ps-3">
											<div class="d-flex align-items-center justify-content-between">
												<h5 class="mb-0 fs-3 fw-normal">Roman Joined the Team!</h5>
												<p class="fs-2 text-nowrap d-block text-muted">9:08 AM</p>
											</div>
											<p class="fs-2 d-block mt-1 text-muted">Congratulate him</p>
										</div>
									</a>
								</div>

								<div class="py-6 px-7 mb-1">
									<button class="btn btn-primary w-100">See All Messages</button>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end Messages cart Dropdown -->
						<!-- ------------------------------- -->

						<!-- ------------------------------- -->
						<!-- start shortcut Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown nav-icon-hover-bg rounded-circle"><a class="nav-link position-relative" href="javascript:void(0)" id="drop2" aria-expanded="false"> <iconify-icon icon="solar:widget-add-line-duotone" class="fs-6"></iconify-icon>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up pb-0 overflow-hidden" aria-labelledby="drop2">
								<!--  Shortcuts -->
								<div class="d-flex align-items-center py-3 px-7 gap-6">
									<h3 class="mb-0 fs-5">Shortcuts</h3>
								</div>

								<div class="row gx-0">
									<div class="col-6">
										<a href="./main/app-invoice.html" class="dropdown-item px-7 border-top border-bottom border-end py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-secondary-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:checklist-minimalistic-bold-duotone" class="fs-7 text-secondary"></iconify-icon>
											</div>

											<h6 class="mb-0 fs-4">Invoice</h6>
											<p class="d-block text-body-color fs-3">Get latest invoice</p>
										</a>
									</div>
									<div class="col-6">
										<a href="./main/app-chat.html" class="dropdown-item px-7 border-top border-bottom py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-primary-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:chat-square-call-bold-duotone" class="fs-7 text-primary"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Chat</h6>
											<p class="d-block text-body-color fs-3">New messages</p>
										</a>
									</div>
									<div class="col-6">
										<a href="./main/app-contact2.html" class="dropdown-item px-7 border-bottom border-end py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-info-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:phone-calling-rounded-bold-duotone" class="fs-7 text-info"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Contact</h6>
											<p class="d-block text-body-color fs-3">2 Unsaved Contacts</p>
										</a>
									</div>
									<div class="col-6">
										<a href="./main/app-email.html" class="dropdown-item px-7 border-bottom py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-danger-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:mailbox-bold-duotone" class="fs-7 text-danger"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Email</h6>
											<p class="d-block text-body-color fs-3">Get new emails</p>
										</a>
									</div>
									<div class="col-6">
										<a href="./main/page-user-profile.html" class="dropdown-item px-7 border-end py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-warning-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:shield-user-bold-duotone" class="fs-7 text-warning"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Profile</h6>
											<p class="d-block text-body-color fs-3">More information</p>
										</a>
									</div>
									<div class="col-6">
										<a href="./main/app-calendar.html" class="dropdown-item px-7 py-6 d-flex flex-column gap-2 justify-content-center text-center">
											<div class="bg-success-subtle rounded-3 m-auto round d-flex align-items-center justify-content-center">
												<iconify-icon icon="solar:calendar-mark-bold-duotone" class="fs-7 text-success"></iconify-icon>
											</div>
											<h6 class="mb-0 fs-4">Calendar</h6>
											<p class="d-block text-body-color fs-3">Get dates</p>
										</a>
									</div>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end shortcut Dropdown -->
						<!-- ------------------------------- -->

						<!-- ------------------------------- -->
						<!-- start profile Dropdown -->
						<!-- ------------------------------- -->
						<li class="nav-item dropdown"><a class="nav-link position-relative ms-6" href="javascript:void(0)" id="drop1" aria-expanded="false">
								<div class="d-flex align-items-center flex-shrink-0">
									<div class="user-profile me-sm-3 me-2">
										<img src="${contextPath}/resources/assets/images/profile/user-1.jpg" width="40" class="rounded-circle" alt="spike-img">
									</div>
									<p class="d-sm-none d-block">
										<iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon>
									</p>

									<div class="d-none d-sm-block">
										<h6 class="fs-4 mb-1 profile-name">Mike Nielsen</h6>
										<p class="fs-3 lh-base mb-0 profile-subtext">Admin</p>
									</div>
								</div>
						</a>
							<div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop1">
								<div class="profile-dropdown position-relative" data-simplebar>
									<div class="d-flex align-items-center justify-content-between pt-3 px-7">
										<h3 class="mb-0 fs-5">User Profile</h3>

									</div>

									<div class="d-flex align-items-center mx-7 py-9 border-bottom">
										<img src="${contextPath}/resources/assets/images/profile/user-1.jpg" alt="user" width="90" class="rounded-circle" />
										<div class="ms-4">
											<h4 class="mb-0 fs-5 fw-normal">Mike Nielsen</h4>
											<p class="text-muted">super admin</p>
											<p class="text-muted mb-0 mt-1 d-flex align-items-center">
												<iconify-icon icon="solar:mailbox-line-duotone" class="fs-4 me-1"></iconify-icon>
												info@spike.com
											</p>
										</div>
									</div>

									<div class="message-body">
										<a href="./main/page-user-profile.html" class="dropdown-item px-7 d-flex align-items-center py-6">
											<p class="btn px-3 py-2 bg-info-subtle rounded-1 text-info shadow-none">
												<iconify-icon icon="solar:wallet-2-line-duotone" class="fs-7"></iconify-icon>
											</p>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">My Profile</h5>
												<p class="fs-3 d-block mt-1 text-muted">Account Settings</p>
											</div>
										</a> <a href="./main/app-email.html" class="dropdown-item px-7 d-flex align-items-center py-6">
											<p class="btn px-3 py-2 bg-success-subtle rounded-1 text-success shadow-none">
												<iconify-icon icon="solar:shield-minimalistic-line-duotone" class="fs-7"></iconify-icon>
											</p>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">My Inbox</h5>
												<p class="fs-3 d-block mt-1 text-muted">Messages & Emails</p>
											</div>
										</a> <a href="./main/app-notes.html" class="dropdown-item px-7 d-flex align-items-center py-6">
											<p class="btn px-3 py-2 bg-danger-subtle rounded-1 text-danger shadow-none">
												<iconify-icon icon="solar:card-2-line-duotone" class="fs-7"></iconify-icon>
											</p>
											<div class="w-100 ps-3 ms-1">
												<h5 class="mb-0 mt-1 fs-4 fw-normal">My Task</h5>
												<p class="fs-3 d-block mt-1 text-muted">To-do and Daily Tasks</p>
											</div>
										</a>
									</div>

									<div class="py-6 px-7 mb-1">
										<!--                                <a href="./main/authentication-login.html" class="btn btn-primary w-100">Log Out</a> -->
										<button class="btn btn-danger w-100" onclick="logoutBtn()">로그아웃</button>
										<!-- <form action="/logout" method="post">
											<input type="submit" value="Log out!" class="btn btn-primary w-100" />
											<sec:csrfInput />
										</form> -->
									</div>
								</div>
							</div></li>
						<!-- ------------------------------- -->
						<!-- end profile Dropdown -->
						<!-- ------------------------------- -->
					</ul>
				</div>
			</div>
		</nav>
	</div>
</header>
<script type="text/javascript">
	function openSidemenu() {
		$(".right-sidebar").toggleClass('menu-on');
	};
	var websocket = null;
	// 웹소켓
	$(function() {

		connect();
		//입장 버튼을 눌렀을 때 호출되는 함수
		function connect() {
			// 웹소켓 주소
			var wsUri = "ws://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket/chat.do?memNo="
					+ MEM_NO;
			// 소켓 객체 생성
			websocket = new WebSocket(wsUri);
			//웹 소켓에 이벤트가 발생했을 때 호출될 함수 등록 (오버라이딩)
			websocket.onopen = function() {
				console.log('info: connection opened.');
			}
		}

	})
	$("#flexSwitchCheckDefault").on('click', function() {

	})

	$('#flexSwitchCheckDefault').on('change', 'input[type=checkbox]',
			function() {
				// retrieve values form the total input and the checkbox input
				var checkboxValue = $(this).val();

				// calculate on condition if the checkbox is checked
				if ($(this).is(":checked")) {
					console.log(checkboxValue);
				} else {
					console.log(checkboxValue);
				}
			})

	document.querySelector('#flexSwitchCheckDefault').addEventListener('click',
			function() {
				// 	console.log(this.bootstrapSwitch('state'));
			});
</script>
<!--  Header End -->