<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
      <%@ page session="false" %>
         <c:set value="${pageContext.request.contextPath}" var="contextPath" />
         <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
               <h4 class="fs-6 mb-0">관리자</h4>
               <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                     <li class="breadcrumb-item">신고 접수 관리</li>
                     <li class="breadcrumb-item" aria-current="page">상세보기</li>
                  </ol>
               </nav>
            </div>
         </div>

         <div class="row">
            <div class="col-lg-4">
               <div class="card">
                  <div class="card-body">
                     <div class="text-center">
                        <img src="/synerhub${adminDeclarationVO.dclrSubPrflimg}" width="110" class="rounded-3 mb-3"
                           alt="spike-img" />
                        <h5 class="mb-1">${adminDeclarationVO.dclrSubName}</h5>
                     </div>
                     <div class="mt-5">
                        <div class="pb-1 mb-2 border-bottom">
                           <h6>상세보기</h6>
                        </div>
                        <ul>
                           <li class="py-2">
                              <p class="fw-normal text-dark mb-0">
                                 이름 : <span class="fw-light ms-1">${adminDeclarationVO.dclrSubName}</span>
                              </p>
                           </li>
                           <li class="py-2">
                              <p class="fw-normal text-dark mb-0">
                                 주소 : <span class="fw-light ms-1">${adminDeclarationVO.dclrSubAddr1}
                                    ${adminDeclarationVO.dclrSubAddr2}
                                    (${adminDeclarationVO.dclrSubPstCd})</span>
                              </p>
                           </li>
                           <li class="py-2">
                              <p class="fw-normal text-dark mb-0">
                                 전화번호 : <span class="fw-light ms-1">${adminDeclarationVO.dclrSubPh}</span>
                              </p>
                           </li>
                           <li class="py-2">
                              <p class="fw-normal text-dark mb-0">
                                 이메일 : <span class="fw-light ms-1">${adminDeclarationVO.dclrSubEmail}</span>
                              </p>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <div class="col-lg-8">
               <div class="card">
                  <div class="card-body">
                     <div class="mb-4 pb-2 align-items-center">
                        <h4 class="card-title mb-0">최근 신고 내역</h4>
                     </div>
                     <div class="table-responsive overflow-x-auto">
                        <table class="table align-middle text-nowrap">
                           <thead>
                              <tr>
                                 <th scope="col" class="text-center">NO</th>
                                 <th scope="col" class="text-center">신고자</th>
                                 <th scope="col" class="text-center">신고 유형</th>
                                 <th scope="col" class="text-center">신고 접수일</th>
                                 <th scope="col" class="text-center">상태</th>
                                 <th scope="col" class="text-center"></th>
                              </tr>
                           </thead>
                           <c:choose>
                              <c:when test="${empty recentDclr}">
                                 <tr>
                                    <td colspan="6" class="text-center">조회하신 신고글이 존재하지 않습니다</td>
                                 </tr>
                              </c:when>
                           <c:otherwise>
                           <c:forEach var="AdminDeclarationVO" items="${recentDclr}" varStatus="status">
                              <tbody class="border-top">
                                 <tr>
                                    <td>
                                       <p class="text-dark mb-0 text-center">${status.index + 1}</p>
                                    </td>
                                    <td>
                                       <p class="text-dark mb-0 text-center">${AdminDeclarationVO.dclrWtrName}</p>
                                    </td>
                                    <td>
                                       <p class="text-dark mb-0 text-center">
                                          <c:choose>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 1}">
                                             	<span class="badge bg-info-subtle text-info">스팸 및 홍보</span>
                                             </c:when>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 2}">
                                             	<span class="badge bg-info-subtle text-info">욕설 신고</span>
                                             </c:when>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 3}">
                                             	<span class="badge bg-info-subtle text-info">음란물</span>
                                             </c:when>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 4}">
                                             	<span class="badge bg-info-subtle text-info">허위 정보</span>
                                             </c:when>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 5}">
                                             	<span class="badge bg-info-subtle text-info">불법 정보</span>
                                             </c:when>
                                             <c:when test="${AdminDeclarationVO.dclrSort == 6}">
                                             	<span class="badge bg-info-subtle text-info">기타</span>
                                             </c:when>
                                          </c:choose>
                                       </p>
                                    </td>
                                    <td>
                                       <p class="text-dark mb-0 text-center">${AdminDeclarationVO.dclrRcptYmd}</p>
                                    </td>
                                    <td class="text-center">
                                       	  <c:choose>
                                       	  	<c:when test="${AdminDeclarationVO.dclrState == 1}">
											    <span class="badge bg-success text-white">처리완료</span>
											</c:when>
											<c:otherwise>
											    <span class="badge bg-danger text-white">미처리</span>
											</c:otherwise>
                                       	  </c:choose>
                                     </td>
                                    <td class="text-center">
                                          <a href="#" class="text-primary" data-bs-toggle="modal"
                                             data-bs-target="#samedata-modal" data-bs-whatever="@mdo"
                                             onclick="populateModal(${AdminDeclarationVO.dclrNo})">
                                             <i class="ti ti-eye fs-7"></i>
                                          </a>
                                    </td>
                                 </tr>
                              </tbody>
                           </c:forEach>
                           </c:otherwise>
                           </c:choose>
                        </table>
                     </div>
                     <div class="d-flex justify-content-end">
                        <div class="ms-auto d-flex align-items-center gap-2">
                           <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                              href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top"
                              data-bs-title="Back" id="backBtn">
                              <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- 최근 신고내역 상세보기 모달창 시작 -->
		<div class="modal fade" id="samedata-modal" tabindex="-1" aria-labelledby="exampleModalLabel1">
		    <div class="modal-dialog" role="document" style="width: 350px; height: 1000px;">
		        <div class="modal-content">
		            <div class="modal-header d-flex align-items-center border">
		                <h4 class="modal-title" id="exampleModalLabel1">신고 내역 상세보기</h4>
		                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		            </div>
		            <div class="modal-body p-4 border-bottom">
		                <h5 class="fs-4 fw-semibold mb-4">접수 내용</h5>
		                <div id="modalDetails"></div> <!-- AJAX로 채울 내용 -->
		            </div>
		            <div class="modal-footer justify-content-center"> <!-- justify-content-center로 중앙 정렬 -->
		                <button type="button" class="btn bg-light-subtle text-dark mx-2" data-bs-dismiss="modal">Close</button>
<!-- 		                <div id="modalActions" class="text-center" style="display: none;"> -->
<!-- 		                    <button id="processReportBtn" class="btn btn-primary mx-2" onclick="handleModalReport()">신고 처리</button> -->
<!-- 		                </div> -->
		            </div>
		        </div>
		    </div>
		</div>
		<!-- 최근 신고내역 상세보기 모달창 끝 -->


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script type="text/javascript">
function populateModal(dclrNo) {
    $.ajax({
        url: "/synerhub/admin/rctDclrDetail/" + dclrNo,
        type: "post",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (res) {
            let dclrSort = getReportReason(res.dclrSort);

            let html = 
                '<table class="table">' +
                    '<tbody>' +
                        '<tr>' +
                            '<th scope="row">이름:</th>' +
                            '<td>' + res.dclrWtrName + '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<th scope="row">아이디:</th>' +
                            '<td>' + res.dclrWtrId + '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<th scope="row">신고 유형:</th>' +
                            '<td>' + dclrSort + '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<th scope="row">접수일:</th>' +
                            '<td>' + res.dclrRcptYmd + '</td>' +
                        '</tr>';

	            // 신고 내용이 null이 아닐 경우 추가
	            if (res.dclrCn) {
                	html += '<tr>' +
	                            '<th scope="row">신고 내용:</th>' +
	                            '<td>' + res.dclrCn + '</td>' +
                            '</tr>';
                }

                html += '</tbody>' +
                    '</table>';

                // 이미지 클릭 시 새 창으로 열리도록 수정
                if (res.dclrAtchFilePath) {
                    html += '<a href="/synerhub' + res.dclrAtchFilePath + '" target="_blank" class="text-center rounded-4 border py-5 d-block">' +
                                '<img src="/synerhub' + res.dclrAtchFilePath + '" style="width: 300px; height: 230px; object-fit: cover;" alt="Attachment">' +
                             '</a>';
                }

                // 모달에 내용을 삽입
                $('#modalDetails').html(html);
                
             	// 신고 상태에 따라 처리 버튼 표시 여부 결정
                if (res.dclrState == 0) { // 미처리 상태일 때
                    $('#modalActions').show();
                } else {
                    $('#modalActions').hide();
                }
                
                $('#samedata-modal').modal('show'); 
            }
        });
    }
    



    // 신고 유형 숫자를 문자열로 변환
    function getReportReason(dclrSort) {
        switch (dclrSort) {
            case 1: return "스팸 및 홍보";
            case 2: return "욕설 및 부적절한 언어";
            case 3: return "음란물";
            case 4: return "허위 정보";
            case 5: return "불법 정보";
            case 6: return "기타";
            default: return "알 수 없음";
        }
    }

    $(document).on('click', "#backBtn", function () {
        window.history.back();
    });
</script>

