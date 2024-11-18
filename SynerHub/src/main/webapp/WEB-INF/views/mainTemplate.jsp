<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="shortcut icon" href="${contextPath }/resources/assets/images/logos/logo.png"/>
<link rel="apple-touch-icon" href="${contextPath }/resources/assets/images/logos/logo.png"/>
<meta id="_csrf" name="_csrf" content="${_csrf.token }">
<meta id="_csrf_header" name="_csrf_header" content="${_csrf.headerName }" />
<meta id="MEM_NO" name="MEM_NO" content="<sec:authentication property="principal.member.memNo"/>" />
<meta id="MEM_NAME" name="MEM_NAME" content="<sec:authentication property="principal.member.memName"/>" />
<meta id="MEM_EMAIL" name="MEM_EMAIL" content="<sec:authentication property="principal.member.memEmail"/>" />
<c:set var="JsPath" value="${pageContext.request.contextPath }/resources/assets/js" />
<c:set var="LibsPath" value="${pageContext.request.contextPath }/resources/assets/libs" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SynerHub</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css">

<!-- icon -->
<link class="theme" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />

<!-- Calendar 출력 -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>

<!-- google calendar api -->
<script src='https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@6.1.15/index.global.min.js'></script>

<!-- JQuery -->
<script type="text/javascript" src="http://code.jquery.com/jquery-3.5.1.min.js"></script>

<!-- bootstrap datepicker -->
<script src="${LibsPath }/bootstrap-datepicker/dist/js/datepicker.min.js"></script>
<link rel="stylesheet" href="${LibsPath }/bootstrap-datepicker/dist/css/datepicker.min.css"/>
<link rel="stylesheet" href="${LibsPath }/bootstrap-datepicker/dist/css/datepicker.standalone.min.css"/>
<link rel="stylesheet" href="${LibsPath }/bootstrap-datepicker/dist/css/datepicker3.min.css"/>
<link rel="stylesheet" href="${LibsPath }/bootstrap-datepicker/dist/css/datepicker.standalone3.min.css"/>
<!-- bootstrap datepicker -->

<!-- Favicon icon-->
<link class="theme" rel="shortcut icon" type="image/png" href="${contextPath}/resources/assets/images/logos/logo.png" />

<!-- Core Css -->
<link class="theme" rel="stylesheet" href="${contextPath}/resources/assets/css/styles.css" />
<!-- icon -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
<script src="${contextPath}/resources/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

<!-- jvectormap  -->
<link class="theme" rel="stylesheet" href="${contextPath}/resources/assets/libs/jvectormap/jquery-jvectormap.css">

<!-- toast Grid Api -->
<link class="theme" rel="stylesheet" href="https://uicdn.toast.com/grid/latest/tui-grid.css" />
<script src="https://uicdn.toast.com/grid/latest/tui-grid.js"></script>
<!-- toast Grid Api -->

<!-- toast Editor Api -->
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<!-- toast Editor Api -->

<!-- database Api -->
<link class="theme" rel="stylesheet" href="https://cdn.datatables.net/2.1.8/css/dataTables.dataTables.css" />
<script src="https://cdn.datatables.net/2.1.8/js/dataTables.js"></script>
<!-- database Api -->

<!--sweetalert2 -->
<link class="theme" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
<!--sweetalert2 -->

<!-- chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- chart.js -->

<script src="${LibsPath }/magnific-popup/dist/jquery.magnific-popup.min.js"></script>
<script src="${contextPath}/resources/assets/js/apps/chat.js"></script>

<script type="text/javascript">
	// 현재 페이지
	var cur_page;
	
	// 최대 목록 갯수
	var max_row;
	
	// 총 페이지
	var total_page;
	
	// 검색어
	var searchWord;
	
	// 검색위치
	var searchScope;
	
	// 목록 갯 수 버튼
	var row_btn;
	
	// 채널 번호
	var synerhubch;
	
	// 스레드 번호
	var synerhubth;
	
	// member번호
	var memNo;
	
	// 스레드 제목
	var thTtl;
	
	// 제목, 담당자 검색 분기
	var searchTitleFlag = true;

	// 분류코드
	var stat;
	
	// 검색기 요소
	var inputSearch;

</script>
</head>
<body class="hold-transition sidebar-mini">

	<!-- Toast -->
	<div class="toast toast-onload align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="toast-body hstack align-items-start gap-6">
			<i class="ti ti-alert-circle fs-6"></i>
			<div>
				<h5 class="text-white fs-3 mb-1">Welcome to SynerHub</h5>
			</div>
			<button type="button" class="btn-close btn-close-white fs-2 m-0 ms-auto shadow-none" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
	</div>
	<!-- Preloader -->
	<div class="preloader">
		<img src="${contextPath}/resources/assets/images/logos/loader.svg" alt="loader" class="lds-ripple img-fluid" />
	</div>
	<div id="main-wrapper">
		<!-- aside 영역 -->
		<tiles:insertAttribute name="aside_left" />
		<tiles:insertAttribute name="aside_right" />
		<!-- header 영역 -->
		<div class="page-wrapper">
			<div class="body-wrapper">
				<div class="container-fluid">
					<tiles:insertAttribute name="header" />
					<!-- content 영역 -->
					<tiles:insertAttribute name="content" />
					<!-- channel 영역 -->
				</div>
			</div>
			<div style="display: none;">
				<tiles:insertAttribute name="setting"/>
			</div>
		</div>
	</div>
	<div id="modalArea"></div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.js" integrity="sha512-luUnkeG+uabiT2pZdi5ME5uADvq+FpDs2fK5V0nVXrHCND9F077fKaE9W//oJvGnWSmwQmCau63A6s3um1NZmg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script type="text/javascript">
		const contextPath = "/synerhub";
		const header = $("meta[name='_csrf_header']").attr('content');
		const token = $("meta[name='_csrf']").attr('content');
		const MAIN_CONTENTS = document.querySelector('#main_contents');
		const MEM_NO = $("meta[name='MEM_NO']").attr('content');
		const MEM_NAME = $("meta[name='MEM_NAME']").attr('content');
		const MEM_EMAIL = $("meta[name='MEM_EMAIL']").attr('content');
		const axiosHeaderJson = { headers: { [header]: token, "Content-Type": "application/json" }, };
		const axiosHeaderFile = { headers: { [header]: token } };
		// var logNo;
		// const logNoGetter = async () => {
		// 	let res = await axios.get('/synerhub/statuslogin/',{memNo:MEM_NO}, axiosHeaderJson);
		// 	console.log('login :', res.data);
		// 	return res.data;
		// }
		// window.onload = () => {
		// 	logNo = logNoGetter();
		// }
	</script>
	<script src="${JsPath }/plugins/bootstrap-treeview-init.js"></script>
	<script src="${JsPath }/coin_js/coin.js"></script>
	<script src="${JsPath }/facechat_js/facechat.js"></script>
	<script src="${JsPath }/paging.js"></script>
	<script src="${JsPath }/profile_js/myprofile.js"></script>
	<script src="${JsPath }/project_js/project.js"></script>
	<script src="${JsPath }/doc_js/doc.js"></script>
	<script src="${JsPath }/ch_tree_js/ch_tree.js"></script>
	<script src="${JsPath }/chat_js/chat.js"></script>
	<script src="${JsPath }/calendar_js/calendar.js"></script>
	<script src="${JsPath }/plan_js/plan.js"></script>
	<script src="${JsPath }/board_js/faq_js/faq.js"></script>
	<script src="${JsPath }/declaration/declaration.js"></script>
	<script src="${JsPath }/equipment_js/equipmentList.js"></script>
	<script src="${JsPath }/board_js/faq_js/faq2.js"></script>

	<script src="${JsPath }/channelthread_js/channelthread.js"></script>
	<script src="${JsPath }/channelthread_js/threadBoard.js"></script>
	<script src="${JsPath }/channelthread_js/dailyworkrboard.js"></script>
	<script src="${JsPath }/channel_js/channelBoard.js"></script>
	<script src="${JsPath }/channel_js/channelNotice.js"></script>
	


	<script src="${JsPath }/board_js/qna_js/qna.js"></script>
	<script src="${JsPath }/vendor.min.js"></script>
	<script src="${JsPath }/notice_js/notice.js"></script>
	<!-- Import Js Files -->
	<script src="${LibsPath }/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
	<script src="${LibsPath }/simplebar/dist/simplebar.min.js"></script>
	<script src="${JsPath }/theme/app.init.js"></script>
	<script src="${JsPath }/theme/theme.js"></script>
	<script src="${JsPath }/theme/app.min.js"></script>
	<script src="${JsPath }/theme/sidebarmenu.js"></script>
	<script src="${JsPath }/theme/feather.min.js"></script>

	<!-- solar icons -->
	<script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
	<script src="${LibsPath }/bootstrap-tree/dist/bootstrap-treeview.min.js"></script>
	<script src="${LibsPath }/jvectormap/jquery-jvectormap.min.js"></script>
	<script src="${LibsPath }/apexcharts/dist/apexcharts.min.js"></script>
	<script src="${JsPath }/extra-libs/jvectormap/jquery-jvectormap-us-aea-en.js"></script>
	<script src="${JsPath }/dashboards/dashboard.js"></script>
	<script src="${contextPath}/resources/assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
	<script src="${contextPath}/resources/assets/libs/jquery-validation/dist/jquery.validate.min.js"></script>
	<script src="${contextPath}/resources/assets/libs/jquery-ui/dist/jquery-ui.min.js"></script>
	<script src="${contextPath}/resources/assets/js/forms/form-wizard.js"></script>
	<script src="${JsPath }/channel_js/channel.js"></script>
	<script src="${JsPath }/equipment_js/equipmentUseList.js"></script>
	<script src="${JsPath }/todoList_js/todoList.js"></script>
	<script src="${JsPath }/contact_js/contact.js"></script>
	<script src="${JsPath }/drive_js/drive.js"></script>

</body>
</html>
