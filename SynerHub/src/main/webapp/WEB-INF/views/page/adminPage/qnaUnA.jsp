<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<c:set  value="${qnaStats}" var="qnaStats"/> 
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
		                  <li class="breadcrumb-item" aria-current="page">Q&A</li>
		                </ol>
		              </nav>
		            </div>
		          </div>

                <div class="col-lg-12">
                  <!--  start Primary Table -->
                  <div class="card">
                    <div class="card-body">
                        <div class="d-md-flex justify-content-between mb-9">
                            <div class="mb-9 mb-md-0">
                                <div style="display: flex;">
                                    <h3>문의하기</h3>
                                </div>
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
			                                  	<a href="${contextPath }/admin/qna">
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
   
       					<!-- 문의 유형별 게시글 수 통계 --> 
                        <div class="card w-100 position-relative overflow-hidden">
                            <div class="card-body">
							    <div class="d-flex justify-content-between align-items-center">  
								    <h5 class="me-2">월별 문의 유형별 게시글 수 통계</h5>
								    <div class="d-flex align-items-center">
								        <div id="month_total_posts" style="font-size: 14px; font-weight: bold; margin-right: 20px; margin-top: 15px;"></div>
								        <div id="total_posts" style="font-size: 14px; font-weight: bold; margin-right: 20px; margin-top: 15px;">총 게시글 수: ${totalPosts} 개</div>
								        <select id="monthSelect" class="form-select ms-3" aria-label="월 선택" style="width: 100px;">
								            <option value="0">선택</option>
								            <option value="1">1월</option>
								            <option value="2">2월</option>
								            <option value="3">3월</option>
								            <option value="4">4월</option>
								            <option value="5">5월</option>
								            <option value="6">6월</option>
								            <option value="7">7월</option>
								            <option value="8">8월</option>
								            <option value="9">9월</option>
								            <option value="10">10월</option>
								            <option value="11">11월</option>
								            <option value="12">12월</option>
								        </select>
								    </div>
								</div>
							    <div class="position-relative overflow-hidden" id="chart_div" style="width: 100%; height: 250px"></div>
							</div>
                        </div>
       					<!-- 문의 유형별 게시글 수 통계 끝 --> 
                        

					<c:set value="${list}" var="qnaList" />
					<c:set var="pageSize" value="10" />
					<!-- 페이지 당 게시글 수 설정 -->
					<c:set var="currentPage" value="${param.currentPage != null ? param.currentPage : 1}" />
					<!-- 현재 페이지 가져오기 -->
					<!-- 시작 인덱스 계산 부분 수정 -->
					<c:set var="startIndex" value="${(currentPage - 1) * pageSize + 1}" />
					<!-- 시작 인덱스 계산 -->
                      <!-- <div class="card p-3"> -->
                      <div class="d-flex justify-content-between align-items-center"> 
                       	<a href="${contextPath}/admin/qna" id="unAnswerBtn" class="btn btn-light text-dark mb-3">
						   전체 Q&A 목록
						</a>
                        <div class="d-inline-flex">
				        	<form class="input-group input-group-sm" id="searchForm" style="width: 470px;" action="${contextPath}/admin/qna" method="get">
					            <div class="mb-3 me-2">
					                <input type="hidden" name="currentPage" id="currentPage" value="${currentPage}">
					                <select class="form-select" name="searchType" style="height: 39.1px;">
					                    <option value="title" <c:if test="${searchType eq 'title'}">selected</c:if>>제목</option>
					                    <option value="content" <c:if test="${searchType eq 'content'}">selected</c:if>>내용</option>
					                    <option value="writer" <c:if test="${searchType eq 'writer'}">selected</c:if>>작성자</option>
					                    <option value="category" <c:if test="${searchType eq 'category'}">selected</c:if>>문의 유형</option>
					                    <%-- <option value="both" <c:if test="${searchType eq 'both'}">selected</c:if>>게시글 + 댓글</option> --%>
					                </select>
					            </div>
					            <div class="input-group mb-3" style="width: 70%;">
					                <input type="text" name="searchWord" value="${searchWord}" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
					                <button class="btn bg-info-subtle text-info d-flex align-items-center" type="submit" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
					                    <i class="ti ti-search fs-6"></i>
					                </button>
					            </div>
					            <sec:csrfInput/>
					        </form>  
						</div>
                      </div>
                    
                    

                      <div class="table-responsive border rounded-4 mb-7">
                      	<form action="${contextPath}/admin/qnaDelete" method="post" id="qnaDelForm">
                      		<input type="hidden" name="selectedQnaNos" id="selectedQnaNos" value="" />
						    <table class="table mb-0">
						        <thead class="table-primary table-striped ext-nowrap align-middle">
						            <tr>
						                <th>
						                    <div class="n-chk align-self-center text-center ms-2">
						                        <div class="form-check">
						                            <input type="checkbox" class="form-check-input primary" id="contact-check-all" />
						                            <label class="form-check-label" for="contact-check-all"></label>
						                            <span class="new-control-indicator"></span>
						                        </div>
						                    </div>
						                </th>
						                <th>NO</th>
						                <th>문의 유형</th>
						                <th>제목</th>
						                <th>작성자</th>
						                <th>작성일</th>
						                <th class="text-center">답변</th>
						                <th class="text-center">
						                    <button type="button" id="del_${qnaVO.qnaNo}" class="btn bg-danger-subtle rounded-circle round d-inline-flex align-items-center justify-content-center px-2" data-bs-toggle="modal" data-bs-target="#qnaDel${qnaVO.qnaNo}" data-faq-no="${qnaVO.qnaNo}" disabled="disabled">
											    <i class="ti ti-trash fs-7" style="color: red;"></i>
											</button>
											
											<div class="modal fade" id="qnaDel${qnaVO.qnaNo}" tabindex="-1" aria-labelledby="qnaDel" aria-hidden="true"> <!-- 수정: # 제거 -->
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
											                <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="detailYesBtn" onclick="$('#qnaDelForm').submit()">
											                    예
											                </button>
											                <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
											                    아니오
											                </button>
											            </div>
											        </div>
											    </div>
											</div>
						                </th>
						            </tr>
						        </thead>  
						        <tbody id="qnaBoard">
						            <c:choose>  
						                <c:when test="${empty qnaList }">
						                    <tr style="text-align: center;">
						                        <td colspan="7">조회하신 게시글이 존재하지 않습니다.</td>
						                    </tr>
						                </c:when>
						                <c:otherwise>
						                    <c:forEach items="${qnaList }" varStatus="status" var="qnaVO">
						                        <tr>
						                            <td>
						                                <div class="n-chk align-self-center text-center ms-2">
						                                    <div class="form-check">
						                                        <input type="checkbox" class="form-check-input contact-chkbox primary" id="checkbox_${qnaVO.qnaNo}" />
						                                        <label class="form-check-label" for="checkbox_${qnaVO.qnaNo}"></label>
						                                    </div>
						                                </div>
						                            </td>
						                            <td class="align-middle">${startIndex + status.index}</td>
						                            <td class="align-middle">
						                                <c:choose>
						                                    <c:when test="${qnaVO.qnaCategory == 1}">
						                                        &ensp;<span class="badge bg-info-subtle text-info">서비스</span>
						                                    </c:when>
						                                    <c:when test="${qnaVO.qnaCategory == 2}">
						                                        &emsp;<span class="badge bg-info-subtle text-info">계정</span>
						                                    </c:when>
						                                    <c:when test="${qnaVO.qnaCategory == 3}">
						                                        <span class="badge bg-info-subtle text-info">결제·환불</span>
						                                    </c:when>
						                                    <c:when test="${qnaVO.qnaCategory == 4}">
						                                        <span class="badge bg-info-subtle text-info">오류 보고</span>
						                                    </c:when>
						                                    <c:when test="${qnaVO.qnaCategory == 5}">
						                                        <span class="badge bg-info-subtle text-info">신고 접수</span>
						                                    </c:when>
						                                    <c:when test="${qnaVO.qnaCategory == 6}">
						                                        &emsp;<span class="badge bg-info-subtle text-info">기타</span>
						                                    </c:when>
						                                </c:choose>
						                            </td>
						                            <td class="align-middle">${qnaVO.qnaTtl }</td>
						                            <td>
						                                <div class="d-flex align-items-center"> 
						                                    <div class="me-3">
						                                        <img src="${contextPath }${qnaVO.qnaWtrPrflimg}" alt="user-img" width="45" class="rounded-circle" />
						                                    </div>
						                                    <div>
						                                        <h6 class="mb-1">${qnaVO.qnaWtrName }</h6>
<%-- 						                                        <p class="fs-3 mb-0">${qnaVO.chMemNm }</p> --%>
						                                    </div>
						                                </div>
						                            </td> 
						                            <td class="align-middle">${qnaVO.qnaDt }</td>
						                            <td class="text-center align-middle">
						                            	<input type="hidden" name="ansState_${qnaVO.qnaNo}" value="${qnaVO.ansState}" />
						                            	<c:choose>
						                                    <c:when test="${qnaVO.ansState == 0}">
								                                <a href="${contextPath }/admin/qnaForm?qnaNo=${qnaVO.qnaNo }" class="btn bg-primary-subtle text-primary">
																    등록
																</a>
						                                    </c:when>
						                                    <c:when test="${qnaVO.ansState == 1}">
								                                <a href="${contextPath }/admin/qnaForm?qnaNo=${qnaVO.qnaNo }" class="btn bg-success-subtle text-success">
																    수정
																</a>
						                                    </c:when>
						                                </c:choose>
						                            </td>
						                            <td class="text-center align-middle"></td>
						                        </tr>
						                    </c:forEach>
						                </c:otherwise>
						            </c:choose>
						        </tbody>
						    </table>
						  <sec:csrfInput/>
						  </form>
						</div>
					 
						
						<div class="text-center" id="pagingArea">
							${pagingVO.pagingHTML }
						</div>



                    </div>
                  </div>
                </div>
				
			
			</div>
		</div> 
	</div>
</div>  
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript">
//Google Charts 로드
// 페이지 로드 시 차트를 그리기
const categories = [
    { id: 1, name: "서비스" },
    { id: 2, name: "계정" },
    { id: 3, name: "결제·환불" },
    { id: 4, name: "오류 보고" },
    { id: 5, name: "신고 접수" },
    { id: 6, name: "기타" }
];
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(() => {
    const currentMonth = new Date().getMonth() + 1; // 현재 달 (1부터 시작)
    drawBasic(currentMonth); // 현재 달 데이터 로드
});

// 월 선택 시 차트 업데이트
document.getElementById('monthSelect').addEventListener('change', function() {
    const selectedMonth = this.value;
    if (selectedMonth !== "0") {
        drawBasic(selectedMonth);
    }
});

function drawBasic(month) {
    $.ajax({
        type: 'GET',
        url: '/synerhub/admin/api/data/' + month,
        dataType: 'json',
        success: function(data) {
            // 모든 카테고리에 대한 기본 데이터 초기화
            const categoryCounts = {};
            categories.forEach(category => {
                categoryCounts[category.id] = 0; // 초기값 0 설정
            });

            // 반환된 데이터로 카테고리 카운트 업데이트
            data.forEach(qna => {
                categoryCounts[qna.qnaCategory] = qna.count; // 실제 게시글 수로 업데이트
            });

            // 차트 데이터 준비
            var chartData = new google.visualization.DataTable();
            chartData.addColumn('string', '문의 유형');
            chartData.addColumn('number', '게시글 수');
            chartData.addColumn({ type: 'string', role: 'annotation' });

            // 차트 데이터 추가
            for (const category of categories) {
                chartData.addRow([category.name, categoryCounts[category.id], categoryCounts[category.id].toString()]);
            }

            // 차트 그리기
            var options = {
                titleTextStyle: {
                    padding: 30 // 원하는 만큼의 여백 추가
                },
                hAxis: {
                    title: '문의 유형',
                    minValue: 0
                },
                vAxis: {
                    title: '게시글 수' 
                },
                legend: { position: 'none' }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(chartData, options);

            
            const monthTotalPosts = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
            document.getElementById('month_total_posts').innerText = '이번 달 게시글 수: ' + monthTotalPosts + ' 개';
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data: ', error);
        }
    });
}



$(document).on('click', "#qnaBoard tr", function () {
    if ($(event.target).closest('td').index() === 0 || 
        $(event.target).closest('td').index() === 6 || 
        $(event.target).closest('td').index() === 7) {
        return; // 0, 5, 6번째 td인 경우 아무 작업도 하지 않음
    }
    
    $('#qnaBoard tr').removeClass('selected');
    $(this).addClass('selected');
    selectedQnaNo = $(this).children('td:eq(0)').children('span').attr("id"); // 선택된 qnaNo
    console.log(selectedQnaNo);
});

$('#contact-check-all').change(function() {
    const isChecked = $(this).is(':checked');
    $('.contact-chkbox').prop('checked', isChecked); // 체크박스 상태를 모두 일치시킴

    // 체크된 경우 버튼 활성화, 그렇지 않으면 비활성화
    $('.btn.bg-danger-subtle').prop('disabled', !isChecked); // 체크된 경우 삭제 버튼 활성화

    // 선택된 qnaNo를 전부 가져오기
    const checkedQnaNos = [];
    if (isChecked) {
        $('.contact-chkbox').each(function() {
            const qnaNo = $(this).closest('tr').find('td:eq(1)').text().trim(); // 2번째 td에서 qnaNo 가져오기
            checkedQnaNos.push(qnaNo); // 배열에 추가
        });
        console.log("선택된 qnaNo:", checkedQnaNos); // 선택된 qnaNo 출력
        $('#selectedQnaNos').val(checkedQnaNos.join(',')); // 배열을 문자열로 변환하여 설정
    } else {
        $('#selectedQnaNos').val(''); // 체크 해제 시 숨겨진 필드 초기화
    }
});


// 개별 체크박스의 상태에 따라 삭제 버튼 활성화/비활성화
$('.contact-chkbox').change(function() {
    const anyChecked = $('.contact-chkbox:checked').length > 0; // 하나라도 체크되어 있는지 확인
    $('.btn.bg-danger-subtle').prop('disabled', !anyChecked); // 수정: 체크된 경우 삭제 버튼 활성화
});



$('.contact-chkbox').change(function() {
    const checkedQnaNos = []; // 선택된 qnaNo를 저장할 배열

    // 체크된 체크박스만 순회
    $('.contact-chkbox:checked').each(function() {
        const qnaNo = $(this).closest('tr').find('td:eq(1)').text().trim(); // 2번째 td에서 qnaNo 가져오기
        checkedQnaNos.push(qnaNo); // 배열에 추가
    });

    // 선택된 qnaNo를 로그로 출력
    console.log("선택된 qnaNo:", checkedQnaNos); // 선택된 qnaNo 출력

    // 선택된 qnaNo를 숨겨진 입력 필드에 설정
    $('#selectedQnaNos').val(checkedQnaNos.join(',')); // 배열을 문자열로 변환하여 설정

    // 체크된 경우 삭제 버튼 활성화/비활성화
    const anyChecked = $('.contact-chkbox:checked').length > 0; 
    $('.btn.bg-danger-subtle').prop('disabled', !anyChecked); // 체크된 경우 삭제 버튼 활성화
});

$('.btn.bg-danger-subtle').click(function() {
    // 선택된 qnaNo를 로그로 출력 (필요한 경우)
    const checkedQnaNos = [];
    $('.contact-chkbox:checked').each(function() {
        const qnaNo = $(this).closest('tr').find('td:eq(1)').text().trim(); // 선택된 ntcNo 가져오기
        checkedQnaNos.push(qnaNo); // 배열에 추가
    });
    console.log("선택된 qnaNo:", checkedQnaNos); // 로그에 선택된 qnaNo 출력
    
    // 숨겨진 입력 필드에 선택된 qnaNo 설정
    $('#selectedQnaNos').val(checkedQnaNos.join(',')); // 배열을 문자열로 변환하여 설정
});

// 모달 내 "예" 버튼 클릭 시 폼 제출
$('#confirmDeleteBtn').click(function() {
    $('#qnaDelForm').submit(); // 폼 제출
});

$(function(){
	var searchForm = $("#searchForm"); 		// 검색 및 페이징 처리 위한 Form
	var pagingArea = $("#pagingArea"); 		// 페이징 처리 위한 div
	
	pagingArea.on("click", "a", function(event){
		event.preventDefault();
		$(this).data("page");
		var currentPage = $(this).data("page");
		searchForm.find("#currentPage").val(currentPage);
		searchForm.submit();
	});
}); 

</script>