<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />

<c:set value="등록" var="name"/>
<c:if test="${status eq 'u' }">
    <c:set value="수정" var="name"/>
</c:if>

<div class="body-wrapper">
    <div class="container-fluid">
        <div class="row">
            <div id="main_contents">
                <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                        <h4 class="fs-6 mb-0">관리자</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <a href="../main/index.html">Home</a>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">공지사항</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>공지사항 ${name }</h3>
                        </div>

                        <form action="${contextPath}/admin/noticeInsert" method="post" id="ntcForm">
                            <c:if test="${status eq 'u' }">
                                <input type="hidden" name="ntcNo" value="${notice.ntcNo }">
                            </c:if>
                            <div class="tab-content">
                                <div class="tab-pane active" id="feeds" role="tabpanel">
                                    <div class="card border">
                                        <div class="card-body p-4">
                                            <div class="userprofile mt-3 mb-3 d-flex flex-column-reverse border-top">
                                                <div class="mt-3">
                                                    <label class="form-label mt-6" for="title-3">제목</label>
                                                    <br />
                                                    <input id="ntcTtl" type="text" class="form-control" name="ntcTtl" value="${notice.ntcTtl }" required/>
                                                    <br />
                                                    <label class="form-label" for="text-3">내용</label>
                                                    <br />
                                                    <textarea id="ntcConts" rows="10" class="form-control" name="ntcConts" required>${notice.ntcConts }</textarea>
                                                </div>
                                            </div>

                                            <div class="d-flex align-items-center justify-content-end mt-3">
                                                <input type="button" id="ntcIns" class="btn btn-primary" value="${name }">
                                                <c:if test="${status eq 'u' }">
                                                    <input type="button" class="btn bg-danger-subtle text-danger ms-3" id="btnCan" value="취소">
                                                </c:if>
                                                <c:if test="${status ne 'u' }">
                                                    <input type="button" value="취소" id="ntcList" class="btn bg-danger-subtle text-danger ms-3"/>
                                                </c:if>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <sec:csrfInput/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>				
<script type="text/javascript">
$(function () {
    var ntcForm = $("#ntcForm"); // 등록 Form
    var list = $("#ntcList"); // 목록
	var cancel = $("#btnCan");
    var insert = $("#ntcIns");
    
 	// 페이지 로드 시 수정 상태인지 확인하여 버튼 클래스 설정
    if ("${status}" == "u") {
        insert.addClass("btn-success").removeClass("btn-primary");
    } else {
        insert.addClass("btn-primary").removeClass("btn-success");
    }
    
    insert.on("click", function(){
    	var title = $("#ntcTtl").val();
    	var content = $("#ntcConts").val();
    	
    	if(title == null || title == "") {
    		alert("제목 입력!");
    		return false;
    	}
    	if(content == null || content == "") {
    		alert("내용 입력!");
    		return false;
    	}
    	
    	if($(this).val() == "수정") {
    		ntcForm.attr("action", "/synerhub/admin/noticeUpdate");
    	}
    	
    	ntcForm.submit();	
    });
    
    cancel.on("click", function(){
    	location.href = "/synerhub/admin/noticeDetail?ntcNo=${notice.ntcNo}";
    });
    
    list.on("click", function() {
    	location.href = "/synerhub/admin/notice";
    })
});
</script>
