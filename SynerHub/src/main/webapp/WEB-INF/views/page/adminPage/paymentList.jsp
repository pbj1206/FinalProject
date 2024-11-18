<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
								<li class="breadcrumb-item"><a href="../horizontal/index.html">서비스 관리</a></li>
								<li class="breadcrumb-item" aria-current="page">매출 관리</li>
							</ol>
						</nav>
					</div>
				</div>

				<div class="col-lg-12">
					<!--  start Primary Table -->
					<div class="card">
						<div class="card-body">
							<div class="mb-9 mb-md-0">
								<div style="display: flex;"></div>
							</div>
							<div class="d-md-flex justify-content-between mb-9">
								<h3 class="mb-0">매출 관리</h3>
								<div class="btn-group ms-auto" role="group" aria-label="Basic example">
									<button id="PriceStats" class="btn btn-primary">순이익 통계 보기</button>
									<button id="JoinNumStats" class="btn btn-secondary">가입 채널 수 보기</button>
								</div>
							</div>

							<!-- 고객센터 관리 모달창 -->
							<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
								<div class="modal-dialog modal-lg modal-dialog-centered">
									<div class="modal-content text-center">
										<!-- text-center 클래스 추가 -->
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
																	<div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
																		<!-- margin: auto 추가 -->
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
																	<div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
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
																	<div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
																		<!-- margin: auto 추가 -->
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
										<div class="modal-footer justify-content-center">
											<!-- justify-content-center 추가 -->
											<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
							<!-- 고객센터 관리 모달창 끝 -->

							<!-- 매출 그래프 -->
							<div id="paymentStats" class="card w-100 position-relative overflow-hidden">
								<div class="card-body">
									<div class="d-flex justify-content-between align-items-center">
										<h5 class="me-2">멤버십에 따른 매출 통계</h5>
										<div class="d-flex align-items-center">
											<div id="paymentTotal" style="font-size: 16px; font-weight: bold; text-align: center; margin-top: 15px; display: none;"></div>
										</div>
									</div>
									<div class="position-relative overflow-hidden" id="paymentChart_div" style="width: 100%; height: 400px"></div>
								</div>
							</div>
							<!-- 매출 그래프 끝-->


							<div class="table-responsive border rounded-4 mb-7">
								<table class="table mb-0 table-hover">
									<thead class="table-primary table-striped ext-nowrap align-middle">
										<tr>
											<th></th>
											<th>NO</th>
											<th class="text-center">등급</th>
											<th class="text-center">멤버십 가입 채널 수</th>
											<th class="text-center">전년 대비 증가율</th>
											<th class="text-center">멤버십 별 순이익</th>
										</tr>
									</thead>
									<tbody>
										<c:forEach var="adminMemShipList" items="${adminMemShipList }" varStatus="i">
											<tr onclick="location.href='/synerhub/admin/paymentDetail/${adminMemShipList.planNm}/${adminMemShipList.planIOExp }'">
												<td></td>
												<td class="align-middle">&nbsp;${i.count }</td>
												<td class="align-middle"><img src="${contextPath}${adminMemShipList.url}" alt="spike-img" width="45" class="rounded-circle ms-5" /> <c:if test="${adminMemShipList.planNm eq 'BRONZE'}">브론즈</c:if> <c:if test="${adminMemShipList.planNm eq 'SILVER'}">실버</c:if> <c:if test="${adminMemShipList.planNm eq 'GOLD'}">골드</c:if></td>
												<td class="align-middle text-center">${adminMemShipList.planCnt }</td>
												<td class="align-middle text-center"><c:if test="${adminMemShipList.planNm eq 'BRONZE'}">
														<c:if test="${BronzePercent < 0}">
															<span style="co lor: blue">${BronzePercent }%</span>
														</c:if>
														<c:if test="${BronzePercent > 0}">
															<span style="color: red">${BronzePercent }%</span>
														</c:if>
													</c:if> <c:if test="${adminMemShipList.planNm eq 'SILVER'}">
														<c:if test="${SilverPercent < 0}">
															<span style="color: blue">${SilverPercent }%</span>
														</c:if>
														<c:if test="${SilverPercent > 0}">
															<span style="color: red">${SilverPercent }%</span>
														</c:if>
													</c:if> <c:if test="${adminMemShipList.planNm eq 'GOLD'}">
														<c:if test="${GoldPercent < 0}">
															<span style="color: blue">${GoldPercent }%</span>
														</c:if>
														<c:if test="${GoldPercent > 0}">
															<span style="color: red">${GoldPercent }%</span>
														</c:if>
													</c:if>
												<td class="align-middle text-center">${adminMemShipList.planIOExp }</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
							<div class="text-center" style="font-weight: bold;">
								총 매출 : <Strong style="color: green">${AllPrice.planPrice}</Strong>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	var memberShip = [
		{ id: 1, name: "BRONZE" },
		{ id: 2, name: "SILVER" },
		{ id: 3, name: "GOLD" }
	];
	
	google.charts.load('current', { packages: ['corechart'] });
	
	google.charts.setOnLoadCallback(() => {
		drawPriceChart(); 
	});
	
	// 멤버 수
	$('#JoinNumStats').click(function () {
		drawJoinNumChart();
	});
	
	// 가격별	
	$('#PriceStats').click(function () {
		drawPriceChart();
	});
	
	
	function drawJoinNumChart() {
		$.ajax({
			type: 'GET',
			url: '/synerhub/admin/paymentJoinNumAverage',
			dataType: 'json',
			success: function (data) {
				var categoryCounts = {};
				memberShip.forEach(category => {
					categoryCounts[category.id] = 0;
				});
				// 데이터가 없을 경우 처리
				if (data.length == 0) {
					document.getElementById('paymentTotal').innerText = '조회된 데이터가 없습니다.';
					document.getElementById('paymentTotal').style.color = 'red'; // 빨간 글씨로 설정
					document.getElementById('paymentTotal').style.display = 'block'; // 메시지 표시
					document.getElementById('paymentChart_div').style.display = 'none'; // 차트 숨기기
					return; // 함수 종료
				}
				
				// 데이터가 있을 경우 차트 데이터 업데이트
				data.forEach(payment => {
					console.log(payment.planWPrc);
					categoryCounts[payment.planNm] = payment.planCnt; // 실제 게시글 수로 업데이트
				});
				
				// 차트 데이터 준비
				var chartData = new google.visualization.DataTable();
				chartData.addColumn('string', '멤버십');
				chartData.addColumn('number', '채널 수');
				
				
				// 차트 데이터 추가
				for (const category of memberShip) {
					chartData.addRow([category.name, categoryCounts[category.name]]);  
				}

				document.getElementById('paymentChart_div').style.display = 'block';
				
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
				
				var chart = new google.visualization.PieChart(document.getElementById('paymentChart_div'));
				chart.draw(chartData, options);
				
				// 총 게시글 수 업데이트
				var totalJoinNum = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
				document.getElementById('paymentTotal').innerText = "총 멤버십 가입 채널 수 : "+totalJoinNum+"명";    
				document.getElementById('paymentTotal').style.color = 'black';
				document.getElementById('paymentTotal').style.display = 'block';
			}
		});
	}
	
	
	function drawPriceChart(){
		$.ajax({
			type: 'GET',
			url: '/synerhub/admin/paymentPriceAverage',
			dataType: 'json',
			success: function (data) {
				var categoryCounts = {};
				memberShip.forEach(category => {
					categoryCounts[category.id] = 0;
				});
				// 데이터가 없을 경우 처리
				if (data.length == 0) {
					document.getElementById('paymentTotal').innerText = '조회된 데이터가 없습니다.';
					document.getElementById('paymentTotal').style.color = 'red'; // 빨간 글씨로 설정
					document.getElementById('paymentTotal').style.display = 'block'; // 메시지 표시
					document.getElementById('paymentChart_div').style.display = 'none'; // 차트 숨기기
					return; // 함수 종료
				}
				
				// 데이터가 있을 경우 차트 데이터 업데이트
				data.forEach(payment => {
					console.log(payment.planWPrc);
					categoryCounts[payment.planNm] = payment.planPrc; // 실제 게시글 수로 업데이트
				});
				
				// 차트 데이터 준비
				var chartData = new google.visualization.DataTable();
				chartData.addColumn('string', '멤버십');
				chartData.addColumn('number', '순이익');
				
				
				// 차트 데이터 추가
				for (const category of memberShip) {
					console.log("categoryCounts : ", categoryCounts);
					chartData.addRow([category.name, categoryCounts[category.name]]);  
					console.log("[category.name] : ", category.name);
					console.log("categoryCounts[category.id] : ", categoryCounts[category.id]);
					console.log("data : " , chartData);
				}

				document.getElementById('paymentChart_div').style.display = 'block';
				
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
				
				var chart = new google.visualization.PieChart(document.getElementById('paymentChart_div')); 
				chart.draw(chartData, options);
				
				// 총 게시글 수 업데이트
				
				document.getElementById('paymentTotal').innerText = `총 매출 : ${AllPrice.planPrice}원`; 
				document.getElementById('paymentTotal').style.color = 'black';
				document.getElementById('paymentTotal').style.display = 'block';
			}
		});
	}
</script>