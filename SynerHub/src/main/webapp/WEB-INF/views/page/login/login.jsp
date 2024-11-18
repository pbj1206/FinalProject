<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
 		<div class="card auth-card mb-0 mx-3">
            <div class="card-body pt-5">
              <a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-5 w-100">
                <img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="light-logo" alt="Logo-Dark" />
                <img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="dark-logo" alt="Logo-light" />
              </a>
              <form action="/synerhub/login" method="post" id="loginForm">
              	<div class="form-floating mb-3">
                  <input type="text" class="form-control" placeholder="Username"  id="memId" name="username" value=""/>
                  
                  <div id="idError" style="display:none; color: red;"></div>
                  
                  <label>
                    <i class="ti ti-user me-2 fs-4"></i>ID
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" placeholder="Password"  name="password" id="memPw" value=""/>
                 
                 <div id="pwError" style="display:none; color: red;"></div>
                 
                  <label>
                    <i class="ti ti-lock me-2 fs-4"></i>Password
                  </label> 
                </div>
                <div class="d-md-flex align-items-center justify-content-between mb-2">
                  <div class="form-check mb-3 mb-md-0">
                    <input class="form-check-input primary" type="checkbox" name="remember-me" id="remember"  >
                    <label class="form-check-label text-dark" for="remember"> 아이디 저장 </label>
                  </div>
                  <a class="text-primary fw-medium" href="/synerhub/forget.do">아이디 찾기/비밀번호 찾기</a>
                </div>
                
                <!-- 아이디저장 -->
                 <div class="d-md-flex align-items-center justify-content-between mb-4">
                  <div class="form-check mb-3 mb-md-0">
                    <input class="form-check-input primary" type="checkbox" name="checkId" id="checkId"  >
                    <label class="form-check-label text-dark" for="checkId"> 로그인 정보 저장 </label>
                  </div>
                 </div>
                 <!-- 아이디저장 끝 -->
<!--                   <div id="loginError" style="color: red;"></div> -->
				
				<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
				    <div id="loginError" style="display:none; color:red;"></div>
				    <div id="logout" style="display:none; color:#4BD08B;"></div>
				</div>

                
                <button type="button" class="btn btn-primary w-100 mt-3 mb-4 rounded-pill" id="loginBtn">로그인</button>
                <div class="d-flex align-items-center justify-content-center">
                  <p class="fs-4 mb-0 fw-medium">계정이 없으신가요?</p>
                  <a class="text-primary fw-medium ms-2" href="/synerhub/login/signup_terms.do">회원 가입</a>
                </div>
             	<sec:csrfInput/>
              </form>
              
            </div>
          </div>
           <!-- jquery -->  
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>  
<script>
 $(function(){ 
	var loginForm=$("#loginForm");//로그인Form
	var loginBtn=$("#loginBtn"); //로그인버튼
	var login=$(".form-control");
	
	var para1 = document.location.href;

	// enter 이벤트
	login.on("keydown", function(event){
		if(event.keyCode == 13){
			loginForm.submit();
		}
	});
	
	$(document).ready(function() {
		// 로그인 버튼 이벤트
    $("#loginBtn").on("click", function() {
        let memId = $("#memId").val();
        let memPw = $("#memPw").val();
        
        // 아이디 
        if (memId == null || memId === "") {
            $("#idError").html("아이디를 입력해주세요").show();
            $("#loginError").hide(); // 로그인 에러 숨김
            return false;
        } else {
            $("#idError").hide();
        }

        // 비밀번호 
        if (memPw == null || memPw === "") {
            $("#pwError").html("비밀번호를 입력해주세요").show();
            $("#loginError").hide(); // 로그인 에러 숨김
            return false;
        } else {
            $("#pwError").hide();
        }

        $("#loginForm").submit();
    });

 //URL 
    const dongUrl = window.location.href;

    if (dongUrl == "http://localhost/synerhub/login.do?error") { 
        $("#loginError").html("아이디 또는 비밀번호를 잘못입력하였습니다.").show();
    } else if (dongUrl == "http://localhost/synerhub/main") {
        $("#loginError").hide(); 					// 로그인 성공시 에러숨김
    } else if (dongUrl == "http://localhost/synerhub/login.do") {
        $("#logout").html("로그인을 진행하세요.").show(); 	// 로그인 시작 메시지
    } else if (dongUrl == "http://localhost/synerhub/login.do?logout") {
        $("#logout").html("로그아웃되었습니다. 다시 로그인 해주세요.").show(); // 로그아웃 후 메시지
    }
});
	
	$(document).ready(function(){
		//쿠키값을 Id칸에 넣어줌, 없으면 공백
	    var key = getCookie("key");
	    $("#memId").val(key); 
	     
	    //페이지 로딩시 체크박스 체크
  	    if($("#memId").val() != ""){ 
	        $("#checkId").attr("checked", true); 
	    }
	     
	    $("#checkId").change(function(){ 
	        if($("#checkId").is(":checked")){ // 체크박스 체크시
	            setCookie("key", $("#memId").val(), 7); // 7일 동안 쿠키 보관
	        }else{ // ID 체크 해제 시,
	            deleteCookie("key");
	        }
	    });
	     
	    // id 저장하기 체크 상태에서 id입력하는 경우
	    $("#memId").keyup(function(){ // id 입력
	        if($("#checkId").is(":checked")){ // ID 저장하기를 체크한 상태
	            setCookie("key", $("#memId").val(), 7); // 7일 동안 쿠키 보관
	        }
	    });

	// 쿠키 저장하기 
	// setCookie => saveid함수에서 넘겨준 시간이 현재시간과 비교해서 쿠키를 생성하고 지워주는 역할
	
	function setCookie(cookieName, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value)
				+ ((exdays == null) ? "" : "; expires="
						+ exdate.toGMTString());
		document.cookie = cookieName + "=" + cookieValue;
	}

	// 쿠키 삭제
	function deleteCookie(cookieName) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = cookieName + "= " + "; expires="
				+ expireDate.toGMTString();
	}

	// 쿠키 가져오기
	function getCookie(cookieName) {
		cookieName = cookieName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cookieName);
		var cookieValue = '';
		if (start != -1) {
			start += cookieName.length;
			var end = cookieData.indexOf(';', start);
			if (end == -1)
				end = cookieData.length;
			cookieValue = cookieData.substring(start, end);
		}
		return unescape(cookieValue);
	}
});

	});
</script>