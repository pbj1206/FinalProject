<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<meta id="_csrf" name="_csrf" content="${_csrf.token }"/>
<meta id="_csrf_header" name="_csrf_header" content="${_csrf.headerName }" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta id="MEM_NO" name="MEM_NO" content="<sec:authentication property="principal.member.memNo"/>" />
<meta id="MEM_NAME" name="MEM_NAME" content="<sec:authentication property="principal.member.memName"/>" />
<meta charset="utf-8">
<title>SynerHub</title>

<!-- JQuery -->
<script type="text/javascript" src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<!-- Favicon icon-->
<link rel="shortcut icon" type="image/png"	href="${contextPath}/resources/assets/images/logos/logo.png" />

<!-- Core Css -->
<link rel="stylesheet" href="${contextPath}/resources/assets/css/styles.css" />

<!-- jvectormap  -->
<link rel="stylesheet" href="${contextPath}/resources/assets/libs/jvectormap/jquery-jvectormap.css">

<!-- chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- chart.js -->

<script src="${contextPath}/resources/assets/js/apps/chat.js"></script>

<!-- Axios -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.js" integrity="sha512-luUnkeG+uabiT2pZdi5ME5uADvq+FpDs2fK5V0nVXrHCND9F077fKaE9W//oJvGnWSmwQmCau63A6s3um1NZmg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- Axios -->
</head>
<body class="hold-transition sidebar-mini">

	<!-- Toast -->
	<div class="toast toast-onload align-items-center text-bg-primary border-0" role="alert"
		aria-live="assertive" aria-atomic="true">
		<div class="toast-body hstack align-items-start gap-6">
			<i class="ti ti-alert-circle fs-6"></i>
			<div>
				<h5 class="text-white fs-3 mb-1">Welcome to Spike</h5>
				<h6 class="text-white fs-2 mb-0">Easy to costomize the Template!!!</h6>
			</div>
			<button type="button" class="btn-close btn-close-white fs-2 m-0 ms-auto shadow-none"
				data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
	</div>
	<!-- Preloader -->
	<div class="preloader">
		<img src="${contextPath}/resources/assets/images/logos/loader.svg" alt="loader"
			class="lds-ripple img-fluid" />
	</div>
	<div id="main-wrapper">
		<!-- aside 영역 -->
		<tiles:insertAttribute name="aside" />
		<!-- header 영역 -->
		<div class="body-wrapper">
			<div class="container-fluid">
				<tiles:insertAttribute name="header" />
				<div class="content-wrapper">
					<!-- content 영역 -->
					<tiles:insertAttribute name="content" />
					<!-- setting 영역 -->
					<div style="display: none;">
						<tiles:insertAttribute name="setting"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		const header = $("meta[name='_csrf_header']").attr('content');
		const token = $("meta[name='_csrf']").attr('content');
		const MEM_NO = $("meta[name='MEM_NO']").attr('content');
		const MEM_NAME = $("meta[name='MEM_NAME']").attr('content');
		const axiosHeaderJson = { headers: { [header]: token, "Content-Type": "application/json" }, };
		const axiosHeaderFile = { headers: { [header]: token } };
	</script>
	<script src="${contextPath }/resources/assets/js/vendor.min.js"></script>
	<!-- Import Js Files -->
	<script src="${contextPath }/resources/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
	<script src="${contextPath }/resources/assets/libs/simplebar/dist/simplebar.min.js"></script>
	<script src="${contextPath }/resources/assets/js/theme/app.init.js"></script>
	<script src="${contextPath }/resources/assets/js/theme/theme.js"></script>
	<script src="${contextPath }/resources/assets/js/theme/app.min.js"></script>
	<script src="${contextPath }/resources/assets/js/theme/admin_sidebarmenu.js"></script>
	<script src="${contextPath }/resources/assets/js/theme/feather.min.js"></script>

	<!-- solar icons -->
	<script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
	<script src="${contextPath }/resources/assets/libs/jvectormap/jquery-jvectormap.min.js"></script>
	<script src="${contextPath }/resources/assets/libs/apexcharts/dist/apexcharts.min.js"></script>
	<script src="${contextPath }/resources/assets/js/jvectormap/jquery-jvectormap-us-aea-en.js"></script>
	<script src="${contextPath }/resources/assets/js/dashboards/dashboard.js"></script>
		<script src="${contextPath}/resources/assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
	<script src="${contextPath}/resources/assets/libs/jquery-validation/dist/jquery.validate.min.js"></script>
	<script src="${contextPath}/resources/assets/libs/jquery-ui/dist/jquery-ui.min.js"></script>
	
</body>
</html>
