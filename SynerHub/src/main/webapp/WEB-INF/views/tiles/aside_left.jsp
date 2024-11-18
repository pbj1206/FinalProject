<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!-- Sidebar Start -->
<aside class="left-sidebar with-vertical">
	<!-- ---------------------------------- -->
	<!-- Start Vertical Layout Sidebar -->
	<!-- ---------------------------------- -->
	<div class="brand-logo d-flex align-items-center justify-content-between">
		<a href="${contextPath }/main/" class="text-nowrap logo-img"> <img src="${contextPath }/resources/assets/images/logos/logo2.png" class="dark-logo" alt="Logo-Dark"  style="object-fit: cover; width: 100%; height: 100%;"/> <img src="${contextPath }/resources/assets/images/logos/logo2.png" class="light-logo" alt="Logo-light"  style="object-fit: cover; width: 100%; height: 100%;"/>
		</a> <a href="javascript:void(0)" class="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none"> <i class="ti ti-x"></i>
		</a>
	</div>

	<div class="scroll-sidebar left" data-simplebar>
		<!-- Sidebar navigation-->
		<nav class="sidebar-nav">
			<ul id="sidebarnav" class="mb-0">
				<a style="display: none;" href="" id="get-url" aria-expanded="false"> </a>
				<!-- ============================= -->
				<!-- Apps -->
				<!-- ============================= -->
				<li class="nav-small-cap"><iconify-icon icon="solar:menu-dots-bold-duotone" class="nav-small-cap-icon fs-5"></iconify-icon> <span class="hide-menu">채널</span></li>
				<li class="sidebar-item"><a class="sidebar-link success-hover-bg" href="javascript:void(0)" id="chInsert" aria-expanded="false"> <span class="aside-icon p-2 bg-success-subtle rounded-1"> <i class="ti ti-square-rounded-plus fs-6"></i>
					</span> <span class="hide-menu ps-1">채널 추가</span>
				</a></li>
				<div id="divChannelList"></div>
			</ul>
		</nav>
	</div>
	<div class="fixed-profile mx-3 mt-3">
		<div class="card bg-primary-subtle mb-0 shadow-none">
			<div class="card-body p-4">
				<div class="d-flex align-items-center justify-content-between gap-3">
					<div class="d-flex align-items-center gap-3">
						<img id="memPrfl3" src="${contextPath}<sec:authentication property="principal.member.memPrflimg"/>" width="45" height="45" class="img-fluid rounded-circle" alt="spike-img" />
						<div>
							<h5 class="mb-1" style="font-size: 90%" id="memNm3">
								<sec:authentication property="principal.member.memName" />
							</h5>
							<p class="mb-0" style="font-size: 90%">Member</p>
						</div>
					</div>
					<form action="/synerhub/logout" method="post" id="logoutFormLeft" style="cursor: pointer">
						<a onclick="logoutBtn()" class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Logout"> <iconify-icon icon="solar:logout-line-duotone" class="fs-8"></iconify-icon>
						</a> 
						<sec:csrfInput />
					</form>

				</div>
			</div>
		</div>
	</div>
</aside>
<script type="text/javascript">
function logoutBtn() {
	// axios.post('/synerhub/statuslogout/', {memNo:MEM_NO, logNo:logNo}, axiosHeaderJson);
	$("#logoutFormLeft").submit();
};
</script>
<!--  Sidebar End -->