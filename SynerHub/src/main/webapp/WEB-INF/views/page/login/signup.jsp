<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${csrfToken}"/>
<title>Insert title here</title>
	<!-- SweetAlert2 CSS & JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
</head>
<body>
	<div class="card auth-card mb-0 mx-3">
		<div class="card-body">
			<a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-5 w-100">
				<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="light-logo" alt="Logo-Dark" /> 
				<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="dark-logo" alt="Logo-light" />
			</a>
			<div class="row">
				<form action="${contextPath }/login/signup.do" method="post" id="signupForm" name="member">
					<input type="hidden" name="memAgree" value="${member.memAgree}">
					<!-- 아이디 -->
					<div class="mb-4">
						<label for="exampleInputId1" class="form-label">아이디</label>
						<div class="input-group">
							<span class="input-group-text"> 
								<i class="ti ti-user fs-4"></i>
							</span> 
							<input type="text" class="form-control " id="memId" name="memId"
							 placeholder="아이디를 입력하세요" aria-label="Input group example" aria-describedby="btnGroupAddon" />
							<button class="btn btn-outline-secondary" type="button" id="idCheckBtn" 
								style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;">중복확인</button>
								<div class="valid-feedback" id="idv">사용 가능한 아이디 입니다!</div>
								<div class="invalid-feedback" id="idinv">이미 사용 중인 아이디 입니다!</div>
						</div>
					</div>

					<!-- 비밀번호 -->
					<div class="mb-4">
						<label for="exampleInputPassword1" class="form-label">비밀번호</label>
						<div class="input-group mb-2">
							<span class="input-group-text"> 
								<i class="ti ti-lock fs-4"></i>
							</span> 
							<input type="password" class="form-control" id="memPw" name="memPw" oninput="pwCheck()" onfocusout="validatePw()"
								placeholder="비밀번호 입력" style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
							<div class="invalid-feedback" id="pwc">8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요</div>
						</div>
						<div class="input-group">
							<input type="password" class="form-control" id="memPwCheck" name="memPwCheck" oninput="pwCheck()"
								placeholder="비밀번호 확인" style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
							<div class="valid-feedback" id="pwv">비밀번호가 일치합니다.</div>
							<div class="invalid-feedback" id="pwinv">비밀번호가 일치하지 않습니다.</div>
						</div>
					</div>

					<!-- 이름 -->
					<div class="mb-4">
						<label for="exampleInputName1" class="form-label">이름</label> 
						<input type="text" class="form-control" id="memName" name="memName"
							aria-describedby="textHelp">
					</div>

					<!-- 전화번호 -->
					<div class="mb-4">
						<label for="exampleInputEmail1" class="form-label">전화번호</label>
						<input class="form-control" type="hidden" id="memPh" name="memPh">
						<div class="input-group mb-2">
							<!-- 전화번호를 저장할 hidden 필드 추가 -->
							<select class="form-select" id="memPh1" name="memPh1">
								<option selected>선택</option>
								<option value="010">010</option>
								<option value="011">011</option>
								<option value="070">070</option>
							</select> 
							<span class="input-group-text">-</span> 
							<input type="text" class="form-control" id="memPh2" name="memPh2"
								placeholder="1234" aria-describedby="basic-addon1"> 
							<span class="input-group-text">-</span> 
							<input type="text" class="form-control" id="memPh3" name="memPh3"
								placeholder="5678" aria-describedby="basic-addon1">
							<button class="btn btn-outline-secondary" type="button" id="phSend"
								style="width: 10%; display: flex; justify-content: center; align-items: center; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
								<i class="ti ti-send fs-4"></i>
							</button>
						</div>
						<div class="input-group mb-2">
							<input type="text" class="form-control" disabled required maxlength="4"
								id="inputCertify">
							<button class="btn btn-outline-secondary" type="button" id="phCheck"
								style="display: flex; justify-content: center; align-items: center; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
								인증확인
							</button>
						</div>
						<div class="valid-feedback" id="phv">인증번호 입력 후 인증확인 버튼을 눌러주세요.</div>
						<div class="invalid-feedback" id="phinv">유효한 번호가 아닙니다!</div>
						<span class="point" id="phCtf"></span>
						<input type="hidden" id="doubleChk"/>
					</div>
					<!-- 전화번호2 -->
<!-- 					<div class="mb-4"> -->
<!-- 						<label for="exampleInputEmail1" class="form-label">전화번호</label> -->
<!-- 						<div class="input-group mb-2"> -->
<!-- 							<input type="text" class="form-control" id="memPh" name="memPh" -->
<!-- 								placeholder="01012345678" aria-describedby="basic-addon1" required>  -->
<!-- 							<button class="btn btn-outline-secondary" id="phSend" -->
<!-- 								style="width: 10%; display: flex; justify-content: center; align-items: center; border-top-right-radius: 8px; border-bottom-right-radius: 8px;"> -->
<!-- 								<i class="ti ti-send fs-4"></i> -->
<!-- 							</button> -->
<!-- 						</div> -->
<!-- 						<div class="input-group mb-2"> -->
<!-- 							<input type="text" class="form-control" disabled required maxlength="4" -->
<!-- 								id="inputCertify"> -->
<!-- 							<button class="btn btn-outline-secondary" type="button" id="phCheck" -->
<!-- 								style="display: flex; justify-content: center; align-items: center; border-top-right-radius: 8px; border-bottom-right-radius: 8px;"> -->
<!-- 								인증확인 -->
<!-- 							</button> -->
<!-- 						</div> -->
<!-- 						<div class="valid-feedback" id="phv">인증번호 입력 후 인증확인 버튼을 눌러주세요.</div> -->
<!-- 						<div class="invalid-feedback" id="phinv">유효한 번호가 아닙니다!</div> -->
<!-- 						<span class="point" id="phCtf"></span> -->
<!-- 						<input type="hidden" id="doubleChk"/> -->
<!-- 					</div> -->


					<!-- 이메일 -->
					<div class="mb-4">
						<label for="exampleInputEmail1" class="form-label">이메일</label>
						<div class="input-group mb-2">
							<span class="input-group-text"> 
								<i class="ti ti-mail fs-4"></i>
							</span> 
							<input type="text" class="form-control" id="email" name="memEmail" 
							placeholder="example" aria-label="Username" aria-describedby="basic-addon1"> 
							<span class="input-group-text">@</span> 
							<select class="form-select" id="domain">
								<option selected>선택</option>
								<option value="gmail.com">gmail.com</option>
								<option value="naver.com">naver.com</option>
								<option value="daum.net">daum.net</option>
							</select>
						</div>
					</div>

					<!-- 우편번호 및 주소 -->
					<div class="mb-2">
						<label for="exampleInputId1" class="form-label">우편번호</label>
						<div class="input-group mb-2">
							<input type="text" class="form-control" id="memPstCd"
								name="memPstCd" placeholder="" aria-label="Input group example"
								aria-describedby="btnGroupAddon" />
							<button class="btn btn-outline-secondary" type="button" onclick="DaumPostcode()"
								style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
								우편번호 찾기
							</button>
						</div>
						<div class="input-group mb-2">
							<input type="text" class="form-control" id="memAddr1" name="memAddr1" 
							placeholder="주소" aria-label="Input group example" aria-describedby="btnGroupAddon" />
						</div>
						<div class="input-group mb-2 mt-md-0">
							<input type="text" class="form-control" id="memAddr2" name="memAddr2" 
							placeholder="상세주소" aria-label="Input group example" aria-describedby="btnGroupAddon" />
						</div>
					</div>

					<!-- 지도 -->
					<div class="input-group mb-4">
						<div id="map" style="width: 100%; height: 300px; display: none;"></div>
					</div>

					<!-- Next 버튼 -->
					<button type="button" class="btn btn-primary w-100 mb-4 rounded-pill" id="nextBtn">다음</button>
					
					<div class="d-flex justify-content-center align-items-center">
					    <p class="fs-4 mb-0 text-dark">이미 계정이 있으신가요?</p>
					    <a class="text-primary fw-medium ms-2" href="${contextPath}/login.do">로그인</a>
					</div>
				<sec:csrfInput/>
				</form>
			</div>
		</div>
	</div>
</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

	<!-- map api -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=feb44c6aa0a3993eae2f9d646aa6b6f1&libraries=services"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<script type="text/javascript">
$(function(){

	var idCheckBtn = $("#idCheckBtn"); 	// 중복확인 버튼
	var memAddr2 = $("#memAddr2");	// 상세주소 Element
	var phSend = $("#phSend");
	var signupForm = $("#signupForm");
	var nextBtn = $("#nextBtn");
	
	var phCode = "";
	
	var idCheckFlag = false; 	// 중복확인 flag(진행안함)
	
	// CSRF Token과 Header 정의
    var header = 'X-CSRF-Token'; // CSRF 헤더 이름
    var token = $('meta[name="_csrf"]').attr('content'); // CSRF 토큰 가져오기

	// 아이디 중복확인
	idCheckBtn.on("click", function(){
		let id = $("#memId").val();	// 아이디 값
		
		if(id == null || id == ""){
			alert("아이디를 입력해주세요!");
			return false;
		}
		
		let data = {
			memId : id
		}
		
		$.ajax({
            url: "/synerhub/login/idCheck.do", // URL 수정
            type: "post",
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token); // CSRF 헤더 설정
            },
            data: JSON.stringify(data),
            success: function(res) {
                console.log("Response:", res);
				
                var err = $(".error")[0];
             	// 결과 처리
                if (res == "NOTEXIST") { // 사용 가능 아이디
                    $("#memId").removeClass("is-invalid");
                    $("#memId").addClass("is-valid");
                } else { // 사용 중인 아이디
                    $("#memId").removeClass("is-valid");
                    $("#memId").addClass("is-invalid");
                }
            },
		});
	});
	
    
// 	phSend.on("click", function() {
//     	var memPh1 = $("#memPh1").val();
//         var memPh2 = $("#memPh2").val();
//         var memPh3 = $("#memPh3").val();
//     	var memPh = memPh1 + "-" + memPh2 + "-" + memPh3;
    	
//     	// 휴대폰 번호 유효성 검사
//         if (memPh.length !== 13 || !/^\d{3}-\d{4}-\d{4}$/.test(memPh)) {
//             $("#memPh").removeClass("is-valid");
//             $("#memPh").addClass("is-invalid");
// 	        $("#memPh").attr("autofocus", true);
// 	        return false; // 유효하지 않으면 함수 종료
// 	    }
    	
//     	$.ajax({
//     		type : "GET",
//     		url : "/synerhub/login/phoneCheck?memPh=" + memPh, 
//     		beforeSend: function(xhr) {
//             	xhr.setRequestHeader(header, token); // CSRF 헤더 설정
//             },
//     		cache : false,
//     		success : function(data) {
// 	    	alert("인증번호 전송 완료!");
//     			console.log("send:" ,data);
//     			if(data == "error") {
// 		            $("#memPh").removeClass("is-valid");
// 		            $("#memPh").addClass("is-invalid");
// 		            $("#phinv").show();
//     				$("#memPh").attr("autofocus", true); 
//     			} else {
//                     $("#inputCertify").attr("disabled", false);
//                     $("#phCheck").css("display", "inline-block");
//     				$("#memPh").removeClass("is-invalid");
// 		            $("#memPh").addClass("is-valid");
//     				phCode = data; 
//     			}
//     		}
//     	});
//     	return false;
//     });

	phSend.on("click", function() {
    var memPh1 = $("#memPh1").val();
    var memPh2 = $("#memPh2").val();
    var memPh3 = $("#memPh3").val();
    var memPh = memPh1 + "-" + memPh2 + "-" + memPh3;
    
    // 휴대폰 번호 유효성 검사
    if (memPh.length !== 13 || !/^\d{3}-\d{4}-\d{4}$/.test(memPh)) {
        $("#memPh").removeClass("is-valid");
        $("#memPh").addClass("is-invalid");
        $("#memPh").attr("autofocus", true);
        return false; // 유효하지 않으면 함수 종료
    }
    
    $.ajax({
        type: "GET",
        url: "/synerhub/login/phoneCheck?memPh=" + memPh, 
        beforeSend: function(xhr) {
            xhr.setRequestHeader(header, token); // CSRF 헤더 설정
        },
        cache: false,
        success: function(data) {
            // Swal.fire로 변경
            if (data == "error") {
                $("#memPh").removeClass("is-valid");
                $("#memPh").addClass("is-invalid");
                $("#phinv").show();
                $("#memPh").attr("autofocus", true);
            }else if(data == "phError"){
            	alert("이미 가입하신 전화번호입니다")
            	$("#memPh").removeClass("is-valid");
                $("#memPh").addClass("is-invalid");
                $("#phinv").show();
                $("#memPh").attr("autofocus", true);
            }else {
                $("#inputCertify").attr("disabled", false);
                $("#phCheck").css("display", "inline-block");
                $("#memPh").removeClass("is-invalid");
                $("#memPh").addClass("is-valid");
                phCode = data;
               	console.log("CODE:", data);

                // Swal.fire 설정
                let timerInterval;
                Swal.fire({
                    title: "인증번호가 전송되었습니다.",
                    html: "인증번호를 확인해주세요.",
                    timer: 1000,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            Swal.getContent().querySelector("strong").textContent =
                                Swal.getTimerLeft();
                        }, 100);
                    },
                    onClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("인증번호 전송 완료");
                    }
                });
            }
        }
    });
    return false;
});

	
 	// 숫자만 입력 가능하도록 체크
    $("#inputCertify").on("input", function() {
        var value = $(this).val();
        if (!/^\d*$/.test(value)) {
            alert("숫자만 입력가능합니다.");
            $(this).val(value.replace(/[^0-9]/g, '')); // 숫자가 아닌 문자를 제거
        }
    });
  	//휴대폰 인증번호 대조
    $("#phCheck").click(function(){
    	$("#phCtf").hide();
    	var inputCertify = $("#inputCertify").val();
    	if(inputCertify == phCode && inputCertify != ""){
			$("#phCtf").hide();
    		$("#inputCertify").removeClass("is-invalid");
            $("#inputCertify").addClass("is-valid");
    		$("#doubleChk").val("true");
    		$("#inputCertify").attr("disabled",true);
    		
    		// 인증 완료 메시지 변경
            $("#phv").text("인증이 완료되었습니다.").show();
            $("#phinv").hide(); // 인증 실패 메시지 숨기기
    	}else{
            $("#inputCertify").removeClass("is-valid");
            $("#inputCertify").addClass("is-invalid");
    		$("#doubleChk").val("false");
    		$("#inputCertify").attr("disabled",false);
			$("#phv").hide();
    		$(this).attr("autofocus",true);
    		
    		// 인증 실패 메시지 변경
            $("#phinv").text("인증번호가 일치하지 않습니다.").show(); // 인증 실패 메시지 표시
            $("#phinv").show(); // 유효하지 않은 번호 메시지 표시
    	}
    });
	
    
  	// 상세주소 입력 후 포커스 아웃될 때, 지도가 표시됨
	memAddr2.on("focusout", function() {
		var address1 = $("#memAddr1").val();	// 기본주소 값
		var address2 = $("#memAddr2").val();	// 상세주소 값
		
		if(address1 != null || address1 != ""){
			var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		    mapOption = {
		        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		        level: 3 // 지도의 확대 레벨
		    };  
        mapContainer.style.display = "block";

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address1, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
    
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">HOME</div>'
                });
                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });
			  $("#card-signup").css("top", "140px");
		}
	});
  	
	nextBtn.on("click", function(){
		var email = $("#email").val();
	    var domain = $("#domain").val();
	    var memPh1 = $("#memPh1").val();
	    var memPh2 = $("#memPh2").val();
	    var memPh3 = $("#memPh3").val();
	    
	    var memEmail = email + "@" + domain;	// 전체 이메일 주소 생성
	    var memPh = memPh1 + "-" + memPh2 + "-" + memPh3;

	    $("#email").val(memEmail);	// 이메일 필드에 값 설정
	    $("#memPh").val(memPh); // 전화번호 hidden 필드에 값 설정
		
	    
	    var form = document.member;
	    var regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		
		if(!regExpEmail.test(memEmail) || domain == "선택"){
			let timerInterval;
	        Swal.fire({
	        	html: `
	        		<div class="mb-3" style="display: flex; align-items: center; justify-content: center;">
	            		<i class="ti ti-mood-wrrr" style="margin-right: 10px; color: #FB977D; font-size: 3.5rem;"></i> <!-- 아이콘 크기 조정 -->
	            		<p style="font-size: 2rem; margin: 0; color: black;">
	                		<strong>이메일 형식 오류!</strong>
	            		</p>
	        		</div>
                	<p>이메일 형식에 맞춰서 입력해주세요.</p>
	            `,
	            timer: 2000,
	            onBeforeOpen: () => {
	                Swal.showLoading();
	                timerInterval = setInterval(() => {
	                    Swal.getContent().querySelector("strong").textContent =
	                        Swal.getTimerLeft();
	                }, 100);
	            },
	            onClose: () => {
	                clearInterval(timerInterval);
	            },
	        });
	        return false; // 폼 제출을 막음
		}
		signupForm.submit();
	});
});

function DaumPostcode() {
    new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
          } 
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('memPstCd').value = data.zonecode;
          document.getElementById("memAddr1").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("memAddr2").focus();
      }
    }).open();
}

$(document).ready(function() {
    $("#nextBtn").on("click", function() {
        // 입력 필드와 선택된 도메인 값을 가져옴
        var email = $("#email").val();
        var domain = $("#domain").val();

        // 전체 이메일 주소 생성
        var memEmail = email + "@" + domain;

        // 콘솔에 출력
        console.log("이메일:", memEmail);
    });
});

// 비밀번호 유효성 검사 기능
function validatePw() {
    const memPw = $('#memPw').val(); 
    const memPwCheck = $('#memPwCheck').val();
    const $invalidFeedback = $('#pwc');

    // 비밀번호의 유효성 검사 (8~16자, 영문 대/소문자, 숫자, 특수문자 포함)
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!pattern.test(memPw)) {
        $("#memPw").removeClass("is-valid").addClass("is-invalid"); // 유효하지 않으면 is-invalid 추가
        $invalidFeedback.show(); // 오류 메시지 표시
        $("#memPwCheck").attr("disabled", true);
    } else {
        $("#memPw").removeClass("is-invalid").addClass("is-valid"); // 유효하면 is-valid 추가
        $invalidFeedback.hide(); // 오류 메시지 숨김
        $("#memPwCheck").attr("disabled", false); // 비밀번호 확인 필드 활성화
        $("#memPwCheck").focus(); // memPwCheck에 포커스 맞추기
    }
}

function pwCheck() {
    const memPw = $('#memPw').val();
    const memPwCheck = $('#memPwCheck').val();
    
    if (memPwCheck.length > 0) { // 비밀번호 확인 필드에 입력이 있는 경우에만 체크
        if (memPwCheck === memPw) {
            $("#memPw").removeClass("is-invalid").addClass("is-valid");
            $("#memPwCheck").removeClass("is-invalid").addClass("is-valid");
            $("#pwv").show();
            $("#pwinv").hide();
        } else {
            $("#memPw").removeClass("is-valid").addClass("is-invalid");
            $("#memPwCheck").removeClass("is-valid").addClass("is-invalid");
            $("#pwv").hide();
            $("#pwinv").show();
        }
    } else {
        // 비밀번호 확인 필드가 비어있을 경우
        $("#memPw").removeClass("is-valid is-invalid");
        $("#pwv").hide();
        $("#pwinv").hide();
    }
}
// 비밀번호 입력 시 pwCheck() 호출
$('#memPw').on('input', function() {
    pwCheck(); // 비밀번호 입력 시 pwCheck 호출
});

</script>
</html>