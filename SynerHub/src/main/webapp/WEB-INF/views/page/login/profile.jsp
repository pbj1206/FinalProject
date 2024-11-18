<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
	
	<!-- SweetAlert2 CSS & JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
   
    
</head>
<body>
	<div class="auth-login-shape-box position-relative">
		<div class="d-flex align-items-center justify-content-center w-100 z-1 position-relative">
			<div class="card auth-card mb-0 mx-3">
				<div class="card-body">
					<a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-5 w-100">
						<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="light-logo" alt="Logo-Dark" /> 
						<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="dark-logo" alt="Logo-light" />
					</a>
					<div class="row">
<%-- 						<form action="${contextPath }/login/signup.do" method="post" id="profileForm" enctype="multipart/form-data"> --%>
						<form action="${contextPath }/login/signup_pf.do" method="post" id="profileForm" enctype="multipart/form-data">
							<input type="hidden" name="memAgree" value="${member.memAgree}">
						    <input type="hidden" name="memId" value="${member.memId}">
						    <input type="hidden" name="memPw" value="${member.memPw}">
						    <input type="hidden" name="memName" value="${member.memName}">
						    <input type="hidden" name="memEmail" value="${member.memEmail}">
						    <input type="hidden" name="memPh" value="${member.memPh}">
						    <input type="hidden" name="memPstCd" value="${member.memPstCd}">
						    <input type="hidden" name="memAddr1" value="${member.memAddr1}">
						    <input type="hidden" name="memAddr2" value="${member.memAddr2}">
							<div class="card mx-12 mt-n5">
								<div class="card-body pb-0">
									<div class="d-md align-items-center justify-content-between text-center">
										<div class="d-md align-items-center">
											<div class="rounded-circle position-relative mb-9 d-inline-block">
												<img src="${contextPath }/resources/assets/images/profile/user-default.jpg" id="profileImg"
													alt="spike-img" class="img-fluid rounded-circle" width="200" height="200"> 
<!-- 												<span class="text-bg-primary rounded-circle text-white d-flex align-items-center justify-content-center position-absolute bottom-0 end-0 p-2 border border-2 border-white" -->
<!-- 											          style="transform: translate(-15px, -10px); cursor: pointer;" onclick="document.getElementById('imgFile').click();"> -->
<!-- 											        <i class="ti ti-plus"></i> -->
<!-- 											    </span>  --> 
<!-- 												<input class="form-control" type="file" id="imgFile" name="imgFile" style="display: none;"> -->  
								                    <div class="btn-group">
								                      <span class="text-bg-primary rounded-circle text-white d-flex align-items-center justify-content-center position-absolute end-0 p-2 border border-2 border-white" 
								                      	id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" role="button" style="font-size: 1.5rem; width: 45px; height: 45px; bottom: -80px;
								                      	onclick="document.getElementById('imgFile').click();">
								                        <i class="ti ti-plus"></i>  
								                      </span> 
								                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
								                        <li id="camera"> 
								                          	<a class="dropdown-item" onclick="openCamera()">
														        <i class="ti ti-camera fs-6"></i>&emsp;사진 촬영
														    </a>
														</li>

								                        <div role="separator" class="dropdown-divider"></div>
								                        <li onclick="document.getElementById('imgFile').click();">
								                          <a class="dropdown-item" href="javascript:void(0)">
								                            <i class="ti ti-photo fs-6"></i>&emsp;파일 선택
								                          </a>
								                          <input class="form-control" type="file" id="imgFile" name="imgFile" style="display: none;">
								                        </li>
								                      </ul>
								                    </div>
											</div>
											
											
											<div class="ms-0 ms-md-3 mb-9">
												<div class="d-flex align-items-center justify-content-center mb-1">
													<h4 class="me-3 mb-0 fs-7">${member.memName}</h4>
													<span class="badge fs-2 fw-bold rounded-pill bg-primary-subtle text-primary border-primary border">Admin</span>
												</div>
												<p class="fs-4 mb-1">Member</p>
												<div class="d-flex align-items-center justify-content-center">
													<span class="bg-success p-1 rounded-circle"></span>
													<h6 class="mb-0 ms-2 me-md-3">Active</h6>
												</div>
											</div>
										</div>
<!-- 										<a href="javascript:void(0)" class="btn btn-primary px-3 shadow-none" onclick="toggleTextarea()">자기 소개</a> -->
										<button type="button" class="justify-content-center w-45 btn mb-1 bg-primary-subtle text-primary align-items-center"
											onclick="toggleTextarea()">
				                        	<i class="ti ti-pencil fs-4 me-2"></i>
				                        	<strong>자기소개</strong>
				                      	</button>
								        	<div class="form-group mt-2">
								            	<textarea class="form-control mb-3" rows="3" style="display: none;" id="memIntr" name="memIntr"></textarea>
								          	</div>
									</div>
								</div>
							</div>
							<div style="text-align: center;">
							    <button type="button" class="btn btn-primary w-100 mb-4 rounded-pill" id="signupBtn" style="width: 100%;">Sign Up</button>
							</div>
							<div class="d-flex justify-content-center align-items-center">
							    <p class="fs-4 mb-0 text-dark">이미 계정이 있으신가요?</p>
							    <a class="text-primary fw-medium ms-2" href="${contextPath}/login.do">로그인</a>
							</div>
						<sec:csrfInput/>	
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
<!-- 카메라 모달창	 -->  
<!-- <div class="modal fade" id="cameraModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="cameraModalLabel" aria-hidden="true"> -->
<!--     <div class="modal-dialog modal-dialog-centered" style="max-width: 800px; width: 100%; height: auto;"> -->
<!--         <div class="modal-content" style="width: 100%; height: auto; background-color: black;"> -->
<!--             <div class="modal-header"> -->
<!--                 <h4 class="card-title mb-0" style="font-size: 1.5rem; flex-grow: 1;  -->
<!-- 					text-align: center;" id="cameraModalLabel"> -->
<!--                     <i class="ti ti-player-record-filled" style="color: red"></i> -->
<!-- 					REC -->
<!-- 				</h4> -->
<!--                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="color: white;"></button> -->
<!--             </div> -->
<!--             <div class="modal-body d-flex flex-column align-items-center" style="justify-content: center; padding: 0;"> -->
<!--                 <video id="video" width="100%" height="auto" autoplay muted style="max-width: 100%; max-height: 500px;"></video> -->
<!--                 <button id="downloadButton" class="btn btn-primary mt-3 mb-3"> -->
<!--                     <i class="ti ti-camera fs-9"></i>  -->
<!--                 </button> -->
<%--                 <canvas id="canvas" style="display:none;"></canvas> --%>
<!--             </div> -->
<!--         </div> -->
<!--     </div> -->
<!-- </div> -->

<!-- 얼굴인식 api -->
<script defer src="${pageContext.request.contextPath}/resources/assets/js/face-api.min.js"></script>
<script defer src="${pageContext.request.contextPath}/resources/assets/static/script.js"></script>	

</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript">
var captureFlag = false;
 
function toggleTextarea() {
    const textarea = document.getElementById('memIntr');
    if (textarea.style.display === 'none') {
        textarea.style.display = 'block'; // 텍스트 영역을 보이게 함
    } else {
        textarea.style.display = 'none'; // 텍스트 영역을 숨김
    }
}

$(function(){
	var profileForm = $("#profileForm");
	var signupBtn = $("#signupBtn");
	
	var imgFile = $("#imgFile"); 			// 프로필 이미지를 선택하기 위한 input element
	
	// 프로필 이미지를 선택했을 때 
	imgFile.on("change", function(event){
		var file = event.target.files[0];	// Open파일로 선택한 이미지 파일
		
		if(isImageFile(file)){	// 이미지 라면
			var reader = new FileReader();
			reader.onload = function(e) {
				$("#profileImg").attr("src", e.target.result);
			}
			reader.readAsDataURL(file);
		}else{					// 이미지 파일이 아닐 때
			alert("이미지 파일을 선택해주세요!")
		}
	});
	
	signupBtn.on("click", function(){
		
		event.preventDefault(); // 기본 폼 제출을 방지

        // SweetAlert2로 성공 메시지 표시
        Swal.fire({
            title: "회원가입이 완료되었습니다.",
            text: "SynerHUB에 오신 것을 환영합니다!",
            icon: "success",
            timer: 2000, // 3초 후에 자동으로 닫힘
            showConfirmButton: false // 확인 버튼 숨김
        }).then(() => {
            // SweetAlert2가 닫힌 후 폼 제출
            profileForm.submit();
            
        });
	});
});

function isImageFile(file){
	var ext = file.name.split(".").pop().toLowerCase();	// 파일명에서 확장자를 추출
	return ($.inArray(ext, ["jpg","jpeg","png","gif"]) === -1) ? false : true
}

 
$(document).ready(function() {
    const profileImg = $('#profileImg');
    const imgFileInput = $('#imgFile');
    const capturedImage = localStorage.getItem('capturedImage');
    console.log(capturedImage);

    if (capturedImage) {
        profileImg.attr('src', capturedImage); // 로컬 스토리지에서 이미지 데이터 가져오기

        // DataTransfer 객체를 사용하여 파일 리스트에 추가
        const dataTransfer = new DataTransfer();
        
        // Blob 객체를 생성하여 이미지를 파일로 변환
        const byteString = atob(capturedImage.split(',')[1]); // base64 문자열에서 데이터 추출
        const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0]; // MIME 타입 추출
        const ab = new Uint8Array(byteString.length);
        
        for (let i = 0; i < byteString.length; i++) {
            ab[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], 'capturedImage.png', { type: mimeString }); // 파일 생성

        dataTransfer.items.add(file);
        imgFileInput[0].files = dataTransfer.files; // input에 파일 추가
        
        localStorage.removeItem('capturedImage');
    }
});



function openCamera() {
    window.open('/synerhub/login/uploadImage', '_blank');
}
</script>
</html>