<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath}" var="contextPath" />

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
                                    <a href="../horizontal/index.html">서비스 관리</a>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">공지사항</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-md-flex justify-content-between mb-9">
                                <div class="mb-9 mb-md-0">
                                    <h3>공지사항 관리</h3>
                                </div>
                            </div>
                            
                                    <!-- 고객센터 관리 모달창 -->
								<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
			                      <div class="modal-dialog modal-lg modal-dialog-centered">
			                        <div class="modal-content text-center"> <!-- text-center 클래스 추가 -->
			                          <div class="modal-header text-center d-flex align-items-center justify-content-center"> <!-- justify-content-center 추가 -->
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
			                                      <div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                                      <div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                                      <div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                          <div class="modal-footer justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
			                              Close
			                            </button>
			                          </div>
			                        </div>
			                      </div>
			                    </div>
			                    <!-- 고객센터 관리 모달창 끝 -->

                            

							 <div class="table-responsive border rounded-4 mb-7">
							 	<form action="${contextPath}/admin/noticeDelete" method="post" id="ntcDelForm">
							 		<input type="hidden" name="selectedNtcNos" id="selectedNtcNos" value=""/>
							        <table class="table mb-0">
							            <thead class="table-primary table-striped ext-nowrap align-middle">
							                <tr>
							                    <th>
							                        <div class="n-chk align-self-center text-center ms-2">
							                            <div class="form-check">
							                                <input type="checkbox" class="form-check-input primary" id="contact-check-all">
							                                <label class="form-check-label" for="contact-check-all"></label>
							                                <span class="new-control-indicator"></span>
							                            </div>
							                        </div>
							                    </th>
							                    <th>NO</th>
							                    <th>제목</th>
							                    <th>작성자</th>
							                    <th>&emsp;작성일</th>
							                    <th class="text-center">
							                        <button type="button" id="del_${notice.ntcNo}" class="btn bg-danger-subtle rounded-circle round d-inline-flex align-items-center justify-content-center px-2" data-bs-toggle="modal" data-bs-target="#ntcDel${notice.ntcNo}" data-faq-no="${notice.ntcNo}" disabled="disabled">
							                            <i class="ti ti-trash fs-7" style="color: red;"></i>
							                        </button>
							                        
							                        <div class="modal fade" id="ntcDel${notice.ntcNo}" tabindex="-1" aria-labelledby="ntcDel" aria-hidden="true"> <!-- 수정: # 제거 -->
													    <div class="modal-dialog modal-dialog-centered">
													        <div class="modal-content">
													            <div class="modal-header d-flex align-items-center">
													                <h4 class="modal-title mt-3" id="myLargeModalLabel">
													                    &emsp;선택한 게시글을 정말 삭제하시겠습니까?
													                </h4>
													                <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
													            </div>
													            <div class="modal-body">  
													                <h6 class="text-center" style="color: gray;">※ 한 번 삭제한 자료는 복구할 수 없습니다. ※</h6>
													            </div>
													            <div class="modal-footer">
													                <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
													                    아니오
													                </button>
													                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="detailYesBtn" onclick="$('#ntcDelForm').submit()">
													                    예
													                </button>
													            </div>
													        </div>
													    </div>
													</div>
							                        
							                    </th>
							                </tr>
							            </thead>
							            <tbody id="ntcBoard">
							                <c:choose>
							                    <c:when test="${empty paging.dataList}">
							                        <tr>
							                            <td align="center" colspan="6">공지사항이 존재하지 않습니다.</td>
							                        </tr>
							                    </c:when>
							                    <c:otherwise>
							                        <c:forEach items="${paging.dataList}" varStatus="status" var="notice">
							                            <tr class="clickable-row" data-ntc-no="${notice.ntcNo}">
							                                <td>
							                                    <div class="n-chk align-self-center text-center ms-2">
							                                        <div class="form-check">
							                                            <input type="checkbox" class="form-check-input contact-chkbox primary" id="ntcCheck_${notice.ntcNo}">
							                                        </div>
							                                    </div>
							                                </td>
							                                <td class="align-middle">&ensp;${status.index + 1}</td>
							                                <td class="align-middle">${notice.ntcTtl}</td>
							                                <td class="align-middle"><h6 class="mb-1">${notice.ntcWtrDisplay}</h6></td>
							                                <td class="align-middle">&emsp;${notice.ntcRgdtFormatted}</td>
							                                <td class="text-center align-middle"></td> <!-- 삭제 아이콘 제거 -->
							                            </tr>
							                        </c:forEach>
							                    </c:otherwise>
							                </c:choose>
							            </tbody>
							        </table>
							        <sec:csrfInput/>
							      </form>
							</div>
                            <div class="align-items-center justify-content-between mt-10">
                                <div class="mb-3 me-3" style="text-align: right;">
                                    <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" id="ntcInsert">
                                        <i class="ti ti-pencil fs-6 me-2"></i> 작성
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>		
            </div>
        </div>
    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>				
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
$(function() {
	
	var ntcInsert = $("#ntcInsert");
	
	ntcInsert.on("click", function(){
		location.href = "/synerhub/admin/noticeForm";
	});
	
    // 공지사항 목록 행 클릭 이벤트
    $(document).on('click', "#ntcBoard tr", function (event) {
        // 체크박스나 특정 열 클릭 시 아무 작업도 하지 않음
        if ($(event.target).closest('td').index() === 0 || 
            $(event.target).closest('td').index() >= 5) {
            return; 
        }
        
        // 선택된 행 강조 표시
        $('#ntcBoard tr').removeClass('selected');
        $(this).addClass('selected');

        // 선택된 ntcNo 가져오기
        const selectedNtcNo = $(this).data('ntc-no'); // data-ntc-no 속성에서 ntcNo 가져오기
        console.log(selectedNtcNo);
    });

    
 // 클릭 이벤트 추가
    $(document).on('click', '.clickable-row', function() {
        var ntcNo = $(this).data('ntc-no'); // data-ntc-no에서 공지사항 번호 가져오기
        
        if ($(event.target).closest('.form-check').length) {
            return; // 체크박스를 클릭했을 때는 아무 동작도 하지 않음
        }
        
        location.href = '${contextPath}/admin/noticeDetail?ntcNo=' + ntcNo; // 상세보기 페이지로 이동
    });
    
    // 전체 체크박스 클릭 이벤트
    $('#contact-check-all').change(function() {
        const isChecked = $(this).is(':checked');
        $('.contact-chkbox').prop('checked', isChecked); // 모든 체크박스 상태를 일치시킴

        // 체크된 경우 버튼 활성화, 그렇지 않으면 비활성화
        $('.btn.bg-danger-subtle').prop('disabled', !isChecked);

        // 선택된 ntcNo를 전부 가져오기
        const checkedNtcNos = [];
        if (isChecked) {
            $('.contact-chkbox:checked').each(function() {
                const ntcNo = $(this).closest('tr').data('ntc-no'); // data-ntc-no 속성에서 ntcNo 가져오기
                checkedNtcNos.push(ntcNo); // 배열에 추가
            });
            console.log("선택된 ntcNo:", checkedNtcNos);
            $('#selectedNtcNos').val(checkedNtcNos.join(',')); // 배열을 문자열로 변환하여 설정
        } else {
            $('#selectedNtcNos').val(''); // 체크 해제 시 숨겨진 필드 초기화
        }
    });

    // 개별 체크박스의 상태에 따라 삭제 버튼 활성화/비활성화
    $('.contact-chkbox').change(function() {
        const anyChecked = $('.contact-chkbox:checked').length > 0; // 하나라도 체크되어 있는지 확인
        $('.btn.bg-danger-subtle').prop('disabled', !anyChecked); // 체크된 경우 삭제 버튼 활성화

        // 선택된 ntcNo를 로그로 출력
        const checkedNtcNos = [];
        $('.contact-chkbox:checked').each(function() {
            const ntcNo = $(this).closest('tr').data('ntc-no'); // data-ntc-no 속성에서 ntcNo 가져오기
            checkedNtcNos.push(ntcNo); // 배열에 추가
        });
        console.log("선택된 ntcNo:", checkedNtcNos); // 선택된 ntcNo 출력
        $('#selectedNtcNos').val(checkedNtcNos.join(',')); // 배열을 문자열로 변환하여 설정
    });

    // 삭제 버튼 클릭 이벤트
    $('.btn.bg-danger-subtle').click(function() {
        // 선택된 ntcNo를 로그로 출력 (필요한 경우)
        const checkedNtcNos = [];
        $('.contact-chkbox:checked').each(function() {
            const ntcNo = $(this).closest('tr').data('ntc-no'); // data-ntc-no 속성에서 ntcNo 가져오기
            checkedNtcNos.push(ntcNo); // 배열에 추가
        });
        console.log("선택된 ntcNo:", checkedNtcNos); // 로그에 선택된 ntcNo 출력
        
        // 숨겨진 입력 필드에 선택된 ntcNo 설정
        $('#selectedNtcNos').val(checkedNtcNos.join(',')); // 배열을 문자열로 변환하여 설정
    });

    // 모달 내 "예" 버튼 클릭 시 폼 제출
    $('#confirmDeleteBtn').click(function() {
        $('#ntcDelForm').submit(); // 폼 제출
    });
});
</script>
