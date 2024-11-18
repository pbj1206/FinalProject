<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<div class="card auth-card mb-0 mx-3">
	<div class="card-body pt-5">
		<a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-4 w-100"> <img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="light-logo" alt="Logo-Dark" /> <img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="dark-logo" alt="Logo-light" />
		</a>
		<div class="text-center mb-3">  
			<h5 id="title">아이디 찾기</h5>
		</div>
		<div class="mb-3">
			<label for="memNm" class="form-label">이름</label> <input type="text" class="form-control" id="memNm" aria-describedby="memName">
		</div>
		<div class="mb-3" style="display: none;" id="dispToId">
			<label for="memId" class="form-label">아이디</label> <input type="text" class="form-control" id="memId" aria-describedby="memId">
		</div>
		
		<div class="mb-3">
			<div class="input-group">
				<label id="input2" for="form-label" class="form-label">이메일</label>
				<div class="input-group">
					<button id="dropBtn" class="btn bg-danger-subtle text-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
						style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
						<i id="dropIcon" class="ti ti-mail fs-4"></i>
					</button>  
					<div class="dropdown-menu" id="dropUi">   
						<a class="dropdown-item" onclick="emailCheck()">이메일</a>
						<div role="separator" class="dropdown-divider"></div>
						<a class="dropdown-item" onclick="phoneCheck()">전화번호</a>
					</div>
					<input type="text" class="form-control" id="email" aria-label="Text input with dropdown button" aria-describedby="emailHelp">
				</div>
			</div>
		</div>
		
		<button onclick="find()" class="btn btn-primary w-100 mt-2 mb-3 rounded-pill">확인</button>
		<button id="changeBtn" onclick="change()" class="btn btn-secondary w-100 mb-3 rounded-pill">비밀번호 찾기</button>
		<button onclick="location.href='${contextPath }/main/'" class="btn bg-primary-subtle text-primary w-100 rounded-pill">로그인하러 가기</button>
	</div>
</div>
<script type="text/javascript">
	function change() {
		if ($("#dispToId").css("display") == 'none') {
			$("#dispToId").css("display", "block");
			$("#title").text("비밀번호 찾기");
			$("#changeBtn").text("아이디 찾기");
		} else {
			$("#dispToId").css("display", "none");
			$("#title").text("아이디 찾기");
			$("#changeBtn").text("비밀번호 찾기");
		}
		return false;
	}

	function emailCheck() {
		$("#dropIcon").attr("class", "ti ti-mail fs-4");
		$("#dropBtn").attr("aria-expanded", "false");
		$("#dropUi").attr("class", "dropdown-menu animated flipInX");
		$("#dropBtn").attr("class",
				"btn bg-danger-subtle text-danger dropdown-toggle");
		$("#input2").text("이메일");
	}

	function phoneCheck() {
		$("#dropIcon").attr("class", "ti ti-phone fs-4");
		$("#dropBtn").attr("aria-expanded", "false");
		$("#dropUi").attr("class", "dropdown-menu animated flipInX");
		$("#dropBtn").attr("class",
				"btn bg-success-subtle text-success dropdown-toggle");
		$("#input2").text("전화번호");
	}

	function find() {
		let name = $("#memNm").val();
		let email = $("#email").val();
		let Id = $("#memId").val();
		let checkType = $("label[for='form-label']").text();
		
		
		if(checkType == '전화번호' && !(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(email))){
			const cleanInput = email.replaceAll(/[^0-9]/g, "");
		    const length = cleanInput.length;
		    if(length === 8) {
		    	email = cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
		    } else if(cleanInput.startsWith("02") && (length === 9 || length === 10)) {
		    	email = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
		    } else if(!cleanInput.startsWith("02") && (length === 10 || length === 11)) {
		    	email = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
		    } else {
		    	email = undefined;
		    }
		}

		let data = {
			"name" : name,
			"Id": Id,
			"email" : email,
			"checkType" : checkType
		}

		$.ajax({
			url : "/synerhub/find",
			type : "post",
			beforeSend : function(xhr) { // 데이터 전송 전 헤더에 csrf값 설정
				xhr.setRequestHeader(header, token);
			},
			contentType : "application/json; charset=utf-8",
			dataType : "text",
			data : JSON.stringify(data),
			success : function(res) {
				console.log(res.length);
				console.log(res);
				if ($("#title").text() == "아이디 찾기" && res != '') {
					alert("당신의 아이디는 " + res + "입니다");
				}else if(res == 'password'){
					alert("이메일로 임시비밀번호가 발행되었습니다");
				}else if(res.length == 4){
					alert("SMS로 임시비밀번호가 발행되었습니다");
				}else {
					if (checkType == '이메일') {
						alert("이름 또는 이메일이 잘못 입력되었습니다.");
					} else {
						alert("이름 또는 전화번호를 잘못 입력되었습니다.");
					}
				}

			}
		})
		console.log(name, email, checkType)

	}
</script>