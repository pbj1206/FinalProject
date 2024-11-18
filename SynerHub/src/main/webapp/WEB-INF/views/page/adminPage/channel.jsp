<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />

<div class="body-wrapper">
	<div class="container-fluid">
		<div class="row">
			<div id="main_contents">
				<div class="mb-3 overflow-hidden position-relative">
					<div class="px-3">
						<h4 class="fs-6 mb-0">관리자</h4>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb mb-0">
								<li class="breadcrumb-item"><a href="../horizontal/index.html">Home</a></li>
								<li class="breadcrumb-item" aria-current="page">채널현황</li>
							</ol>
						</nav>
					</div>
				</div>

				<!-- 고객센터 관리 모달창 -->
				<div class="modal fade" id="vertical-center-modal" tabindex="-1"
					aria-labelledby="vertical-center-modal" aria-hidden="true">
					<div class="modal-dialog modal-lg modal-dialog-centered">
						<div class="modal-content text-center">
							<div class="modal-header text-center d-flex align-items-center justify-content-center">
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div class="mb-5">
									<h3>고객센터 관리</h3>
								</div>

								<div class="row">
									<div class="col-md-4">
										<a href="${contextPath }/admin/notice" class="card hover-img" style="cursor: pointer">
											<div class="card-body p-4 text-center">
												<div class="card bg-danger-subtle d-flex align-items-center justify-content-center"
													style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
													<iconify-icon icon="mage:megaphone-a-fill" style="color: #ff6e6e; font-size: 5rem;"></iconify-icon>
												</div>
												<h6 class="mt-3 fs-4">공지사항</h6>
											</div>
										</a>
									</div>
									<div class="col-md-4">
										<a href="${contextPath}/admin/faq" class="card hover-img"
											style="cursor: pointer; text-decoration: none; color: inherit;">
											<div class="card-body p-4 text-center">
												<div class="card bg-success-subtle d-flex align-items-center justify-content-center"
													style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
													<iconify-icon icon="flat-color-icons:faq" style="font-size: 5rem;"></iconify-icon>
												</div>
												<h6 class="mt-3 fs-4">FAQ</h6>
											</div>
										</a>
									</div>
									<div class="col-md-4">
										<a href="${contextPath}/admin/qna" class="card hover-img"
											style="cursor: pointer; text-decoration: none; color: inherit;">
											<div class="card-body p-4 text-center">
												<div class="card bg-primary-subtle d-flex align-items-center justify-content-center"
													style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
													<iconify-icon icon="fluent-color:chat-bubbles-question-16" style="font-size: 5.5rem;"></iconify-icon>
												</div>
												<h6 class="mt-3 fs-4">Q&A</h6>
											</div>
										</a>
									</div>
								</div>
							</div>
							<div class="modal-footer justify-content-center">
								<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
				<!-- 고객센터 관리 모달창 끝 -->

				<div class="col-lg-12">
					<div class="card">
						<div class="card-body">
							<div class="d-md-flex justify-content-between mb-9">
								<h3>채널 관리</h3>
							</div>

							<ul class="nav nav-tabs nav-tabs-user-profile mb-4" role="tablist">
								<li class="nav-item" role="presentation"><a class="nav-link shadow-none active"
									data-bs-toggle="tab" href="#chManage" role="tab" aria-selected="false" tabindex="-1"> <span>채널
											현황</span>
								</a></li>
								<li style="cursor:pointer;" id="channelStatisticsBtn" class="nav-item" role="presentation"><a class="nav-link shadow-none"
									data-bs-toggle="tab" href="#chStats" role="tab" aria-selected="false" tabindex="-1"> <span>채널
											통계</span>
								</a></li>
							</ul>
							
							<c:set value="${chList }" var="chList"/>
							<c:set var="pageSize" value="10"/>
							<c:set var="currentPage" value="${param.currentPage != null ? param.currentPage : 1}"/>
							<c:set var="startIndex" value="${(currentPage - 1) * pageSize + 1 }"/>
							<div class="tab-content">
								<div class="tab-pane active" id="chManage" role="tabpanel">
								    <div class="card border">
								        <div class="card-body p-4">
								            <form id="searchForm" method="get">
								                <div class="d-flex justify-content-end">
								                    <div class="d-inline-flex">
								                        <div class="mb-3 me-2">
								                            <input type="hidden" name="currentPage" id="currentPage" value="${pagingVO.currentPage}"/> <!-- 현재 페이지를 설정 -->
								                            <select class="form-select" id="location1" name="searchType">
								                                <option value="title" <c:if test="${searchType eq 'title' }">selected</c:if>>채널명</option>
<%-- 								                                <option value="membership" <c:if test="${searchType eq 'membership' }">selected</c:if>>멤버십</option> --%>
								                            </select>
								                        </div>
								                        <div class="input-group mb-3" style="width: 70%;">
								                            <input type="text" class="form-control" placeholder="검색" aria-describedby="basic-addon1" name="searchWord" value="${searchWord}">
								                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="submit" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
								                                <i class="ti ti-search fs-6"></i>
								                            </button>
								                        </div>
								                    </div>
								                </div>
								            </form>
											
											
								            <div class="table-responsive border rounded-4 mb-7">
								                <table class="table mb-0">
								                    <thead class="table-primary table-striped ext-nowrap align-middle">
								                        <tr>
								                            <th></th>
								                            <th>NO</th>
								                            <th>채널명</th>
								                            <th>채널인원</th>
								                            <th class="text-center">멤버십여부</th>
								                            <th>삭제</th> 
								                        </tr> 
								                    </thead>
								                    <tbody>
								                        <c:choose>
								                            <c:when test="${empty pagingVO.dataList}">
								                                <tr>
								                                    <td align="center" colspan="5">채널이 존재하지 않습니다.</td>
								                                </tr>
								                            </c:when>
								                            <c:otherwise>
								                                <c:forEach items="${pagingVO.dataList}" varStatus="status" var="channel">
								                                    <tr>
								                                        <td></td>
								                                        <td class="align-middle">&nbsp;${startIndex + status.index}</td>
								                                        <td class="align-middle">${channel.chTtl}</td>
								                                        <td class="align-middle">
								                                            <h6 class="mb-1">${channel.channelTotal}/ ${channel.planMax}</h6>
								                                        </td>
								                                        <td class="align-middle text-center"> <!-- 중앙 정렬 추가 -->
																		    <c:choose>
																		        <c:when test="${channel.planNm != null}">
																		            <div class="membership-info"> <!-- 플렉스 컨테이너 추가 -->
																		                <img src="${contextPath}${channel.planPic}" alt="Plan Picture" width="35" class="rounded-circle" />
																		                <c:choose>
																		                    <c:when test="${channel.planNm == 'BRONZE'}"><b>브론즈</b></c:when>
																		                    <c:when test="${channel.planNm == 'SILVER'}"><b>실버</b></c:when>
																		                    <c:when test="${channel.planNm == 'GOLD'}"><b>골드</b></c:when>
																		                </c:choose>
																		            </div>
																		        </c:when>
																		        <c:otherwise>
																		            <b>-</b>
																		        </c:otherwise>
																		    </c:choose>
																		</td>
																		<td>
																		<form id="chDelForm_${channel.chNo}" action="${contextPath}/channel/delete/${channel.chNo}" method="post" style="display: inline;">
																			<button type="button" 
																			        class="btn text-dark bg-hover-primary d-flex align-items-center justify-content-center p-2 fs-4" 
																			        data-bs-toggle="tooltip" 
																			        data-bs-target="tooltip" 
																			        data-bs-title="채널 삭제" 
																			        onclick="delChannel(${channel.chNo})">
																			    <i class="ti ti-trash fs-5 me-1"></i>
																			</button>
																			<sec:csrfInput />
														                </form>
																		</td>
								                                    </tr>
								                                </c:forEach>
								                            </c:otherwise>
								                        </c:choose>
								                    </tbody>
								                </table>
								            </div>
								
								            <div class="pagination-container" id="pagingArea">
								                ${pagingVO.getPagingHTML()}
								            </div>
								        </div>
								    </div>
								</div>

								<div class="tab-pane" id="chStats" role="tabpanel">
									<div class="card border">
										<div class="card-body p-4">
											<div class="row">
												<div class="d-flex justify-content-begin">
													<div class="d-inline-flex">
														<div class="input-group mb-3">
															<input type="text" class="form-control" placeholder="채널명을 입력하세요" aria-label=""
																aria-describedby="basic-addon1">
															<button class="btn bg-info-subtle text-info d-flex align-items-center" type="button"
																style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
																<i class="ti ti-search fs-6"></i>
															</button>
														</div>
													</div>
												</div>

												<div class="col-7">
													<div class="table-responsive border rounded-4 mb-7">
														<table class="table mb-0 table-hover">
															<thead class="table-primary table-striped ext-nowrap align-middle">
																<tr>
																	<th>채널명</th>
																	<th>채널 코드</th>
																	<th>채널 가입자</th>
																	<th>현재 접속자</th>
																	<th>드라이브 용량</th>
																</tr>
															</thead>
															<tbody id="channelChartTbody">

															</tbody>
														</table>
													</div>
												</div>

												<div class="col-5 justify-content">
													<!-- 통계 그래프 -->
													<div class="card position-relative overflow-hidden">
														<canvas id="myChart"></canvas>
													</div>
													<!-- 통계 그래프 끝 -->
 
													<!-- 총 계 -->
													<div class="card position-relative overflow-hidden" id="divCountingTable">
														<!-- 총 계 내용 추가 가능 -->
													</div>
													<!-- 총 계 끝 -->
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script	src="${pageContext.request.contextPath }/resources/assets/js/channel_js/channelstatistics.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js"></script>
<script>
$(function(){
    var searchForm = $("#searchForm");
    var pagingArea = $("#pagingArea");

    // 페이지 번호 클릭 시
    pagingArea.on("click", ".page-link", function(event){
    	event.preventDefault();
        var pageNo = $(this).data("page"); // 클릭한 페이지 번호 가져오기
        searchForm.find("#currentPage").val(pageNo); // 현재 페이지 번호 설정
        searchForm.submit(); // 폼 제출
    });
});



function delChannel(chNo) {
    Swal.fire({
        title: '채널 삭제',
        text: "정말로 이 채널을 삭제하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "${contextPath}/channel/delete/" + chNo, // contextPath 사용
                type: 'POST',
                beforeSend: function(xhr) {
                    const token = $("meta[name='_csrf']").attr("content");
                    const header = $("meta[name='_csrf_header']").attr("content");
                    xhr.setRequestHeader(header, token);
                },
                success: function(response) {
                    if (response === "Delete") {
                        console.log("상태 업데이트 완료");
                        Swal.fire('삭제 완료!', 'success').then(() => {
                            // 페이지 새로고침
                            location.reload();
                        });
                    }
                },
                error: function(xhr, status, error) {
                    Swal.fire('오류', '업데이트 중 오류가 발생했습니다.', 'error');
                }
            });
        }
    });
}



</script>