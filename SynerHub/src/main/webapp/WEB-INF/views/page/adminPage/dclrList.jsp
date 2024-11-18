<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
		<%@ page session="false" %>
			<c:set value="${list}" var="dclrList" />
			<c:set var="pageSize" value="10" />
			<c:set value="${pageContext.request.contextPath }" var="contextPath" />
			<div class="mb-3 overflow-hidden position-relative">
				<div class="px-3">
					<h4 class="fs-6 mb-0">관리자</h4>
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb mb-0">
							<li class="breadcrumb-item">신고 접수 관리</li>
							<li class="breadcrumb-item" aria-current="page">신고 통계 및 현황</li>
						</ol>
					</nav>
				</div>
			</div>


			<!-- 고객센터 관리 모달창 -->
			<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal"
				aria-hidden="true">
				<div class="modal-dialog modal-lg modal-dialog-centered">
					<div class="modal-content text-center"> <!-- text-center 클래스 추가 -->
						<div class="modal-header text-center d-flex align-items-center justify-content-center">
							<!-- justify-content-center 추가 -->
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
													<div class="card bg-danger-subtle d-flex align-items-center justify-content-center"
														style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
														<!-- margin: auto 추가 -->
														<iconify-icon icon="mage:megaphone-a-fill"
															style="color: #ff6e6e; font-size: 5rem;"></iconify-icon>
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
													<div class="card bg-success-subtle d-flex align-items-center justify-content-center"
														style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
														<!-- margin: auto 추가 -->
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
													<div class="card bg-primary-subtle d-flex align-items-center justify-content-center"
														style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
														<!-- margin: auto 추가 -->
														<iconify-icon icon="fluent-color:chat-bubbles-question-16"
															style="font-size: 5.5rem;"></iconify-icon>
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


			<div class="d-md-flex justify-content-between mb-9">
			</div>
			<div class="card">
				<div class="card-body">
					<div class="mb-9 mb-md-0">
						<div style="display: flex;">

						</div>
					</div>
					<!-- 토글 버튼 -->
					<div class="d-flex justify-content-between mb-3">
						<h3 class="mb-0">신고 접수 관리</h3>
						<div class="btn-group ms-auto" role="group" aria-label="Basic example">
							<button id="toggleMonthlyStats" class="btn btn-primary">연도별+월별 통계 보기</button>
							<button id="toggleYearlyStats" class="btn btn-secondary">연도별 통계 보기</button>
						</div>
					</div>

					<!-- 연도별 + 월별 통계 섹션 -->
					<div id="monthlyStats" class="card w-100 position-relative overflow-hidden">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center">
								<h5 class="me-2">신고 유형에 따른 연도 및 월별 접수된 신고 통계</h5>
								<div class="d-flex align-items-center">
									<div id="month_total_posts"
										style="font-size: 16px; font-weight: bold; text-align: center; margin-top: 15px; display: none;">
									</div>
									<select id="yearSelectMonth" class="form-select ms-3" aria-label="연도 선택" style="width: 130px;">
										<option value="0">연도 선택</option>
										<!-- <option value="2022">2022년</option> -->
										<option value="2023">2023년</option>
										<option value="2024">2024년</option>
									</select>
									<select id="monthSelect" class="form-select ms-3" aria-label="월 선택" style="width: 120px;">
										<option value="0">월 선택</option>
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
							<div class="position-relative overflow-hidden" id="chart_div" style="width: 100%; height: 400px"></div>
						</div>
					</div>

					<!-- 연도별 통계 섹션 -->
					<div id="yearlyStats" class="card w-100 position-relative overflow-hidden" style="display: none;">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center">
								<h5 class="me-2">신고 유형별 연도별 접수된 신고 통계</h5>
								<div class="d-flex align-items-center">
									<div id="year_total_posts"
										style="font-size: 16px; font-weight: bold; text-align: center; margin-top: 15px; display: none;">
									</div>
									<select id="yearSelectYear" class="form-select ms-3" aria-label="연도 선택" style="width: 120px;">
										<option value="0">선택</option>
										<!-- <option value="2022">2022년</option> -->
										<option value="2023">2023년</option>
										<option value="2024">2024년</option>
									</select>
								</div>
							</div>
							<div class="position-relative overflow-hidden" id="year_chart_div" style="width: 100%; height: 400px">
							</div>
						</div>
					</div>

					<div class="d-flex justify-content-between">
						<button type="button" class="btn btn-danger mb-3" id="blackListManage">블랙리스트 관리</button>
						<div class="mt-3">
							총 신고 대상자 : <strong id="dclrCount">${pagingVO.totalRecord }명</strong>
						</div>
						<div class="d-inline-flex">
							<form class="input-group input-group-sm" id="searchForm" style="width: 340px;"
								action="${contextPath}/admin/dclrList" method="get">
								<div class="mb-3 me-2">
									<input type="hidden" name="currentPage" id="currentPage" value="${currentPage }">
									<select class="form-select" id="dclrSearch" name="searchType" style="height: 41.6px;">
										<option value="writer" <c:if test="${searchType eq 'title'}">selected</c:if>>이름</option>
									</select>
								</div>
								<div class="input-group mb-3" style="width: 70%;">
									<input type="text" name="searchWord" value="${searchWord}" class="form-control" placeholder=""
										aria-label="" aria-describedby="basic-addon1">
									<button class="btn bg-info-subtle text-info d-flex align-items-center" type="button"
										style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
										<i class="ti ti-search fs-6"></i>
									</button>
								</div>
							</form>
						</div>
					</div>

					<div class="table-responsive pb-4">
						<table class="table table-bordered border table-striped align-middle">
							<thead>
								<tr>
									<th scope="col" class="text-center">신고 대상자</th>
									<th scope="col" class="text-center">신고 처리건수</th>
									<th scope="col" class="text-center">신고 미처리건수</th>
									<th scope="col" class="text-center">경고</th>
									<th scope="col" class="text-center">경고 횟수</th>
									<th scope="col" class="text-center">블랙 리스트</th>
									<th scope="col" class="text-center">최근 접수일</th>
									<th scope="col" class="text-center"></th>
								</tr>
							</thead>
							<c:choose>
								<c:when test="${empty list}">
									<tr>
										<td colspan="8" class="text-center">조회하신 게시글이 존재하지 않습니다</td>
									</tr>
								</c:when>
								<c:otherwise>
									<tbody>
										<c:forEach var="AdminDeclarationVO" items="${list}">
											<tr>
												<td class="text-center">
													<div class="text-center">
														<img src="/synerhub${AdminDeclarationVO.dclrSubPrflimg }" width="45" class="rounded-circle"
															alt="spike-img" />
													</div>
													<div>
														<h6 class="mb-1">${AdminDeclarationVO.dclrSubName}</h6>
													</div>
												</td>
												<td class="text-center">${AdminDeclarationVO.dclrHandledCount}</td>
												<td class="text-center">${AdminDeclarationVO.dclrUnHandledCount}</td>
												<td class="text-center">
													<button type="button" class="btn btn-warning" id="warnBtn"
														onclick="increaseWarningCount(${AdminDeclarationVO.dclrSubId}, this, '${AdminDeclarationVO.dclrSubName}')">경고</button>
												</td>
												<td class="text-center warning-count"
													style="${AdminDeclarationVO.dclrWarnNmtm >= 10 ? 'color: red;' : ''}">
													${AdminDeclarationVO.dclrWarnNmtm}
												</td>
												<td class="text-center">
													<c:if test="${AdminDeclarationVO.memShtot == 0 }">
														<button type="button" class="btn btn-primary blackBtn" id="setBtn"
															onclick="blackList('${AdminDeclarationVO.dclrSubNo}','insert', this)">설정</button>
													</c:if>
													<c:if test="${AdminDeclarationVO.memShtot == 1 }">
														<button type="button" class="btn btn-danger blackBtn" id="cancelBtn"
															onclick="blackList('${AdminDeclarationVO.dclrSubNo}','delete', this)">해제</button>
													</c:if>
												</td>
												<td class="text-center">${AdminDeclarationVO.dclrRcptYmd}</td>
												<td class="text-center">
													<a href="${contextPath}/admin/dclrDetail?dclrNo=${AdminDeclarationVO.dclrNo}"
														class="link-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="View Details">
														<i class="ti ti-eye fs-7"></i>
													</a>
												</td>
											</tr>
										</c:forEach>
									</tbody>
								</c:otherwise>
							</c:choose>
						</table>
					</div>
					<div class="text-center" id="pagingArea">
						${pagingVO.pagingHTML }
					</div>
				</div>
			</div>

			<c:set value="${list}" var="dclrList" />
			<c:set var="pageSize" value="10" />
			<!-- 페이지 당 게시글 수 설정 -->
			<c:set var="currentPage" value="${param.currentPage != null ? param.currentPage : 1}" />
			<!-- 현재 페이지 가져오기 -->
			<!-- 시작 인덱스 계산 부분 수정 -->
			<c:set var="startIndex" value="${(currentPage - 1) * pageSize + 1}" />
			<!-- 시작 인덱스 계산 -->

			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
			<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
			<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
			<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
			<script type="text/javascript">
				// Google Charts 로드
				// 페이지 로드 시 차트를 그리기
				const categories = [
					{ id: 1, name: "스팸 및 홍보" },
					{ id: 2, name: "욕설 및 부적절한 언어" },
					{ id: 3, name: "음란물" },
					{ id: 4, name: "허위 정보" },
					{ id: 5, name: "불법 정보" },
					{ id: 6, name: "기타" }
				];

				google.charts.load('current', { packages: ['corechart'] });
				google.charts.setOnLoadCallback(() => {
					const currentMonth = new Date().getMonth() + 1;
					const selectedYear = document.getElementById('yearSelectMonth').value || new Date().getFullYear();
					drawMonthlyChart(selectedYear, currentMonth);
				});

				document.getElementById('yearSelectMonth').addEventListener('change', function () {
					const selectedYear = this.value;
					const selectedMonth = document.getElementById('monthSelect').value;
					if (selectedYear !== "0" && selectedMonth !== "0") {
						drawMonthlyChart(selectedYear, selectedMonth);
						document.getElementById('month_total_posts').style.display = 'block';
					} else {
						document.getElementById('month_total_posts').style.display = 'none';
					}
				});

				document.getElementById('monthSelect').addEventListener('change', function () {
					const selectedYear = document.getElementById('yearSelectMonth').value;
					const selectedMonth = this.value;
					if (selectedYear !== "0" && selectedMonth !== "0") {
						drawMonthlyChart(selectedYear, selectedMonth);
						document.getElementById('month_total_posts').style.display = 'block';
					} else {
						document.getElementById('month_total_posts').style.display = 'none';
					}
				});

				document.getElementById('yearSelectYear').addEventListener('change', function () {
					const selectedYear = this.value;
					if (selectedYear !== "0") {
						drawYearlyChart(selectedYear);
					}
				});

				$(document).ready(function () {
					// 초기 상태 설정: 월별 통계 보이기, 연도별 통계 숨기기
					$('#monthlyStats').show();
					$('#yearlyStats').hide();

					// 현재 날짜 정보 가져오기
					const currentDate = new Date();
					const currentYear = currentDate.getFullYear();
					const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1

					// 연도 및 월 선택 초기화
					$('#yearSelectMonth').val(currentYear);
					$('#monthSelect').val(currentMonth);

					// 초기 차트 그리기
					drawMonthlyChart(currentYear, currentMonth);

					// 연도별+월별 통계 버튼 클릭 시
					$('#toggleMonthlyStats').click(function () {
						$('#monthlyStats').show();  // 월별 통계 표시
						$('#yearlyStats').hide();    // 연도별 통계 숨김
						$(this).addClass('btn-primary').removeClass('btn-secondary');
						$('#toggleYearlyStats').removeClass('btn-primary').addClass('btn-secondary');
					});

					// 연도별 통계 버튼 클릭 시
					$('#toggleYearlyStats').click(function () {
						$('#monthlyStats').hide();    // 월별 통계 숨김
						$('#yearlyStats').show();     // 연도별 통계 표시
						$(this).addClass('btn-primary').removeClass('btn-secondary');
						$('#toggleMonthlyStats').removeClass('btn-primary').addClass('btn-secondary');
						// 연도 선택 초기화
						$('#yearSelectYear').val(currentYear); // 현재 연도로 설정
						drawYearlyChart(currentYear); // 현재 연도에 대한 차트 그리기
					});
				});


				// 연도별 + 월별 차트
				function drawMonthlyChart(year, month) {
					$.ajax({
						type: 'GET',
						url: '/synerhub/admin/api/dclrdata/' + year + '/' + month,
						dataType: 'json',
						success: function (data) {
							const categoryCounts = {};
							categories.forEach(category => {
								categoryCounts[category.id] = 0;
							});

							// 데이터가 없을 경우 처리
							if (data.length === 0) {
								document.getElementById('month_total_posts').innerText = '조회된 데이터가 없습니다.';
								document.getElementById('month_total_posts').style.color = 'red'; // 빨간 글씨로 설정
								document.getElementById('month_total_posts').style.display = 'block'; // 메시지 표시
								document.getElementById('chart_div').style.display = 'none'; // 차트 숨기기
								return; // 함수 종료
							}

							// 데이터가 있을 경우 차트 데이터 업데이트
							data.forEach(declaration => {
								categoryCounts[declaration.dclrSort] = declaration.count; // 실제 게시글 수로 업데이트
							});

							// 차트 데이터 준비
							var chartData = new google.visualization.DataTable();
							chartData.addColumn('string', '신고 유형');
							chartData.addColumn('number', '게시글 수');

							// 차트 데이터 추가
							for (const category of categories) {
								chartData.addRow([category.name, categoryCounts[category.id]]);
							}

							// 차트가 그려질 요소를 보여줍니다.
							document.getElementById('chart_div').style.display = 'block';

							// 원형 차트
							var options = {
								pieHole: 0.4,
								legend: {
									position: 'right',
									alignment: 'center'
								},
								chartArea: {
									left: 20,
									top: 20,
									right: 20,
									bottom: 20
								}
							};

							var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
							chart.draw(chartData, options);

							// 총 게시글 수 업데이트
							const monthTotalPosts = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
							document.getElementById('month_total_posts').innerText = year + '년 ' + month + '월 접수된 신고 : ' + monthTotalPosts + ' 건';
							document.getElementById('month_total_posts').style.color = 'black';
							document.getElementById('month_total_posts').style.display = 'block';
						},
						error: function (xhr, status, error) {
							// 							console.error('Error fetching data: ', error);
							document.getElementById('month_total_posts').innerText = '데이터를 가져오는 데 실패했습니다.';
							document.getElementById('month_total_posts').style.color = 'black';
							document.getElementById('month_total_posts').style.display = 'block';
							document.getElementById('chart_div').style.display = 'none';
						}
					});
				}

				function drawYearlyChart(year) {
					$.ajax({
						type: 'GET',
						url: '/synerhub/admin/api/dclrdata/year/' + year,
						dataType: 'json',
						success: function (data) {
							const categoryCounts = {};
							categories.forEach(category => {
								categoryCounts[category.id] = 0;
							});

							// 데이터가 없을 경우 처리
							if (data.length === 0) {
								document.getElementById('year_total_posts').innerText = '조회된 데이터가 없습니다.';
								document.getElementById('year_total_posts').style.color = 'red';
								document.getElementById('year_total_posts').style.display = 'block';
								document.getElementById('year_chart_div').style.display = 'none';
								return;
							}

							// 데이터가 있을 경우 차트 데이터 업데이트
							data.forEach(declaration => {
								categoryCounts[declaration.dclrSort] = declaration.count; // 실제 게시글 수로 업데이트
							});

							// 차트 데이터 준비
							var chartData = new google.visualization.DataTable();
							chartData.addColumn('string', '신고 유형');
							chartData.addColumn('number', '게시글 수');

							// 차트 데이터 추가
							for (const category of categories) {
								chartData.addRow([category.name, categoryCounts[category.id]]);
							}

							document.getElementById('year_chart_div').style.display = 'block';

							// 원형 차트
							var options = {
								pieHole: 0.4,
								legend: {
									position: 'right',
									alignment: 'center'
								},
								chartArea: {
									left: 20,
									top: 20,
									right: 20,
									bottom: 20
								}
							};

							var chart = new google.visualization.PieChart(document.getElementById('year_chart_div'));
							chart.draw(chartData, options);

							// 총 게시글 수 업데이트
							const yearTotalPosts = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
							document.getElementById('year_total_posts').innerText = year + '년 접수된 신고 : ' + yearTotalPosts + ' 건';
							document.getElementById('year_total_posts').style.color = 'black'; // 검은 글씨로 설정
							document.getElementById('year_total_posts').style.display = 'block'; // 메시지 표시
						},
						error: function (xhr, status, error) {
							// 							console.error('Error fetching data: ', error);
							document.getElementById('year_total_posts').innerText = '데이터를 가져오는 데 실패했습니다.';
							document.getElementById('year_total_posts').style.color = 'black'; // 검은 글씨로 설정
							document.getElementById('year_total_posts').style.display = 'block'; // 메시지 표시
							document.getElementById('year_chart_div').style.display = 'none'; // 차트 숨기기
						}
					});
				}

				function blackList(memNo, type, button) {
					// 블랙리스트 해제 및 설정 버튼 클릭 시 확인 메시지 추가
					if (type == 'delete') {
						Swal.fire({
							title: '블랙리스트 해제',
							text: '정말로 블랙리스트에서 해제하시겠습니까?',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonText: '예',
							cancelButtonText: '아니요'
						}).then((result) => {
							if (result.isConfirmed) {
								let data = {
									dclrSubNo: memNo,
									blackType: type
								};
								$.ajax({
									url: "/synerhub/admin/blackList",
									type: "post",
									beforeSend: function (xhr) {
										xhr.setRequestHeader(header, token);
									},
									data: JSON.stringify(data),
									contentType: "application/json; charset=utf-8",
									success: function () {
										// 버튼 상태 변경
										$(button).closest('tr').find('.blackBtn').attr("class", "btn btn-primary blackBtn");
										$(button).closest('tr').find('.blackBtn').attr("onclick", "blackList('" + memNo + "','insert',this)");
										$(button).closest('tr').find('.blackBtn').text("설정");
										Swal.fire('해제되었습니다!', '', 'success');
									}
								});
							}
						});
					} else {
						Swal.fire({
							title: '블랙리스트 설정',
							text: '정말로 블랙리스트에 추가하시겠습니까?',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonText: '예',
							cancelButtonText: '아니요'
						}).then((result) => {
							if (result.isConfirmed) {
								// '예'를 클릭했을 경우 AJAX 요청
								let data = {
									dclrSubNo: memNo,
									blackType: type
								};
								$.ajax({
									url: "/synerhub/admin/blackList",
									type: "post",
									beforeSend: function (xhr) {
										xhr.setRequestHeader(header, token);
									},
									data: JSON.stringify(data),
									contentType: "application/json; charset=utf-8",
									success: function () {
										$(button).closest('tr').find('.blackBtn').attr("class", "btn btn-danger blackBtn");
										$(button).closest('tr').find('.blackBtn').attr("onclick", "blackList('" + memNo + "','delete',this)");
										$(button).closest('tr').find('.blackBtn').text("해제");
										Swal.fire('설정되었습니다!', '', 'success');
									}
								});
							}
						});
					}
				}

				// 경고 횟수 이벤트
				function increaseWarningCount(dclrSubId, button, userName) {
					Swal.fire({
						title: '경고 부여',
						text: userName + '에게 경고를 부여하시겠습니까?',
						icon: 'warning',
						showCancelButton: true,
						confirmButtonText: '예',
						cancelButtonText: '아니요'
					}).then((result) => {
						if (result.isConfirmed) {
							// '예'를 클릭했을 경우
							$.ajax({
								url: "/synerhub/admin/increaseWarningCount/" + dclrSubId,
								type: "post",
								contentType: "application/json; charset=utf-8",
								beforeSend: function (xhr) {
									xhr.setRequestHeader(header, token);
								},
								success: function () {
									// 현재 경고 횟수를 가져온 후 1 증가
									const warningCell = $(button).closest('tr').find('.warning-count');
									const currentCount = parseInt(warningCell.text(), 10); // 현재 경고 횟수 가져오기
									const newCount = currentCount + 1; // 경고 횟수 1 증가

									// 새로운 경고 횟수를 UI에 업데이트
									warningCell.text(newCount);

									// 경고 횟수가 10 이상일 경우 빨간색으로 변경
									if (newCount >= 10) {
										warningCell.css('color', 'red');
									} else {
										warningCell.css('color', '');
									}

									Swal.fire('경고가 부여되었습니다!', '', 'success');
								},
								error: function () {
									Swal.fire('경고 부여에 실패했습니다.', '', 'error');
								}
							});
						}
					});
				}

				$(document).on('click', "#blackListManage", function () {
					location.href = "/synerhub/admin/blackListManage";
				});

				$(function () {
					var searchForm = $("#searchForm");       // 검색 및 페이징 처리 위한 Form
					var pagingArea = $("#pagingArea");       // 페이징 처리 위한 div

					pagingArea.on("click", "a", function (event) {
						event.preventDefault();
						$(this).data("page");
						var currentPage = $(this).data("page");
						searchForm.find("#currentPage").val(currentPage);
						searchForm.submit();
					});
				});

				$(document).ready(function () {
					// 초기 상태: 월별 통계 보이기
					$('#monthlyStats').show();
					$('#yearlyStats').hide();

					// 월별 통계 버튼 클릭 시
					$('#toggleMonthlyStats').click(function () {
						$('#monthlyStats').show();
						$('#yearlyStats').hide();
					});

					// 연도별 통계 버튼 클릭 시
					$('#toggleYearlyStats').click(function () {
						$('#monthlyStats').hide();
						$('#yearlyStats').show();
					});
				});


			</script>