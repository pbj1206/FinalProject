$(document).on("click", "#thInsert", function (event) {
	MAIN_CONTENTS.innerHTML = ` 
  		 
  		 <div id="thModal" class="modal fade" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-scrollable modal-lg">
                        <div class="modal-content">   
                          <div class="modal-body">      
                            <div class="text-center mt-2 mb-4">  
                                <a><h2>스레드 생성하기</h2></a>  
    
	                            <h3 class ="fs-4 fw-semibold mt-3 mb-3">스레드 정보를 입력해주세요 !</h3>
                              </a>       
                            </div>                         
                <div class="mb-4">               
                  <label for="threadname">스레드명</label> 
                  <input class="form-control" type="text" value="" id="threadname"/>
                </div>               
                <label for="password">컬러 선택</label>     
              	<input class="form-control mt-2" type="color" id="threadclr" style="width: 60px; height: 45px;" />
       
              <div class="mb-3 text-center">   
                <button class="btn bg-warning-subtle text-warning" id="threadback" >취소</button>
                <button class="btn btn-rounded bg-success-subtle" id="threadinsert">생성하기</button>
             </div>    
         </div>   
	    `;
	$('#thModal').modal('show');
});

// $(document).on('change', '#flexCheckDefault' ,function () {
//     if ($(this).is(':checked')) {
//       $('#passwordthread').show(); // 체크 시 입력 필드 보이기
//     } else {
//       $('#passwordthread').hide(); // 체크 해제 시 입력 필드 숨기기
//     }
//   });

//취소 클릭시 이벤트
$(document).on('click', '#threadback', function () {
	$('#thModal').modal('hide');
});

// 스레드 생성 클릭시 이벤트
$(document).on('click', '#threadinsert', function () {

	var Thname = $("#threadname").val();
	var Thpw = $("#passwordthread").val();
	var Thcolor = $("#threadclr").val();

	let date = {
		chNo: synerhubch,
		thTtl: Thname,
		thClr: Thcolor
	};

	$.ajax({
		url: "/synerhub/thread/insert",
		type: "post",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(date),
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token);
		},
		success: function (res) {

			channelLoad();
			// loadChannelList(); 
		},
		error: function (err) {
			console.error("스레드 생성 중 오류 발생:", err);
		}
	});
	Swal.fire('스레드 생성 완료 !', '', 'success');

	$('#thModal').modal("hide");
});


//스레드 메인화면
function synerhubTheThread(thNo) {
	if (thNo == null) {
		backToHome(synerhubch);
	} else {
		console.log(thNo);
		synerhubth = thNo;

		let synerhubThread = {
			thNo: thNo,
			"synerhub1": MEM_NO,
			"synerhub2": synerhubth
		}
		let date = new Date()
		let dateStr = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
		console.log(dateStr);

		$.getJSON("https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=oG2aa7BOAnm12tkIUfXkeDFPYYaHbGzi4ZXQrSiE1DwurK6f843fuJs1zuHjqshV9NClgIokeB2VEhQ0I41gXg%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + dateStr + "&base_time=0500&nx=68&ny=100", function (data) {
			console.log(data);


			console.log("synerhubThread =>>", synerhubThread);

			$.ajax({
				url: "/synerhub/thread/select",
				type: "post",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: JSON.stringify(synerhubThread),
				contentType: "application/json; charset=utf-8",
				success: function (res) {
					console.log("res>>>>", res);
					var threadFreeBoard = res.threadFreeBoard;
					var threadDailyBoard = res.threadDailyBoard;
					var threadMemberList = res.thraedMemberList;
					/* 날짜 */
					// var weather = data.response.body.items.item;
					let today = new Date();
					let day = today.getDay();
					console.log(res)
					let dayName;
					if (day === 0) {
						dayName = "일요일";
					} else if (day === 1) {
						dayName = "월요일";
					} else if (day === 2) {
						dayName = "화요일";
					} else if (day === 3) {
						dayName = "수요일";
					} else if (day === 4) {
						dayName = "목요일";
					} else if (day === 5) {
						dayName = "금요일";
					} else if (day === 6) {
						dayName = "토요일";
					}

					let fcstValue = data.response.body.items.item[5].fcstValue; //skt 0~5:맑음 /6~8: 구름많음 /9: 흐림
					let weatherCondition;
					if (fcstValue >= 0 && fcstValue <= 5) {
						weatherCondition = "☀️";
					} else if (fcstValue >= 6 && fcstValue <= 8) {
						weatherCondition = "🌥️";
					} else if (fcstValue >= 9 && fcstValue <= 10) {
						weatherCondition = "☁️";
					} else {
						weatherCondition = "날씨 미정";
					}

					let REHfcstValue = data.response.body.items.item[70].fcstValue; //습도
					let TMPfcstValue = data.response.body.items.item[60].fcstValue; //현재온도

					let TMPfcstValue1 = data.response.body.items.item[48].fcstValue; //9시 온도
					let TMPfcstValue2 = data.response.body.items.item[60].fcstValue; //11시 온도
					let TMPfcstValue3 = data.response.body.items.item[84].fcstValue; //13시 온도
					let TMPfcstValue4 = data.response.body.items.item[108].fcstValue; //15시 온도

					let WSDfcstValue = data.response.body.items.item[64].fcstValue //풍속

					var html = "";
					html += `
          <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">${res.thTtl}</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">  
                  <li class="breadcrumb-item">
                    <p>Home</p>
                  </li>
                  <li class="breadcrumb-item" aria-current="page" id="threadTtl">${res.chTtl}</li>
                  <li class="breadcrumb-item" aria-current="page" id="threadTtl">${res.thTtl}</li>
                </ol>
              </nav>
            </div>
          </div>
          <div class="position-relative overflow-hidden">
            <div class="position-relative overflow-hidden rounded-3" style="width: 1275px; height: 240px;">
			    <img src="${contextPath}${res.chLmg}" alt="spike-img" class="w-100" style="width: 973px; height: 255px; object-fit: fill;">
			</div>
            <div class="card mx-9 mt-n5">
              <div class="card-body pb-0">
                 
                <div class="d-md-flex align-items-center justify-content-between text-center text-md-start">
                  <div class="d-md-flex align-items-center">

                    <div class="ms-0 ms-md-3 mb-9 mb-md-0">
                      <div class="d-flex align-items-center justify-content-center justify-content-md-start mb-1">
                        `;
					if (res.thboardAuthority == 1) {
						html += `
						<h3 class="me-7 mb-0 fs-7">${res.thTtl} ⭐</h3>
						`;
					} else {
						html += `
							<h3 class="me-7 mb-0 fs-7">${res.thTtl}</h3>
						`;
					} html +=
						`
                      </div>
                      <p class="fs-4 mb-1">채널명 : ${res.chTtl}</p>

                    </div> 
                       <div class="col-lg-4 order-lg-2 order-2" style="position: absolute; padding-left: 60%;">
                        <div class="d-flex align-items-center justify-content-around m-4">
                            <div class="text-center me-4" onclick="myPjtMainCallback()" style="align-text:center; padding-left: 100px; cursor: pointer;">
                                <i class="ti ti-file-description fs-6 d-block mb-2"></i>
                                <h4 class="mb-0 lh-1 text-nowrap" >${res.pjtOnGoingCnt} 건</h4> 
                                <p class="mb-0 text-nowrap" >프로젝트 수</p>  
                            </div>  
                             <div class="text-center ms-4 me-4" style="align-text:center; padding-right:20px;"> 
                              <i class="ti ti-users fs-6 d-block mb-2"></i>  
                              `
					if (res.threadTotal == 0) {
						html += `
                                 <h4 class="mb-0 lh-1 text-nowrap">1 명</h4> `
					} else {
						html += `
                                 <h4 class="mb-0 lh-1 text-nowrap">${res.threadTotal} 명</h4> `
					}
					html +=
						`
                              <p class="mb-0 text-nowrap">스레드 인원</p>
                            </div> 
                        </div>
                    </div>
                    </div>`
					if (res.threadTotal == 1 || res.threadTotal == 0) {
						html +=
							`                       
                    <button class="btn btn-danger px-3 shadow-none" onclick="threadDelete1(${thNo})">
                     <iconify-icon icon="solar:exit-bold-duotone"></iconify-icon>
                    삭제하기
                    </button>`
					}
					html +=
						`</div>
                <ul class="nav nav-pills user-profile-tab mt-4 justify-content-center justify-content-md-start" id="pills-tab" role="tablist">
                  <li class="nav-item me-2 me-md-3" role="presentation">
                    <button class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
                      <i class="ti ti-home me-0 me-md-6  fs-6"></i>
                      <span class="d-none d-md-block">Home</span>
                    </button>
                  </li>
                  <li class="nav-item me-2 me-md-3" role="presentation">
                    <button class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent py-6" id="pills-followers-tab" data-bs-toggle="pill" data-bs-target="#pills-followers" type="button" role="tab" aria-controls="pills-followers" aria-selected="false">
                      <i class="ti ti-users me-0 me-md-6  fs-6"></i>
                      <span class="d-none d-md-block">Teams</span>
                    </button> 
                  </li> 
                  <li class="nav-item me-2 me-md-3" role="presentation">
				  
					</li>
                </ul> 
              </div>
            </div>  
          </div>
          
          
          <div class="tab-content mx-10" id="pills-tabContent">
	        <!-- 탭1 시작 -->
	        <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
	          <!-- 첫 로우 시작 -->
	          <div class="row">
	            <!-- 스레드 목록 & 프로젝트 현황 -->
	            <div class="col-lg-6">
	            	<div class="d-flex">
	            		<div class="col-lg-6">
			              <!-- 스레드 목록 카드 -->
			              <div class="card overflow-hidden" style="height: 325px;">
			                <div class="card-body p-4 hover">
			                  <div class="d-flex justify-content-between mb-4">
			                    <p class="text-warning fw-bold fs-3 mb-0 text-nowrap ms-auto">
			                      #이 달의 우수 사원
			                    </p>
			                  </div>  
			                  <div class="d-flex justify-content-center mb-4" style="margin-top: 30px">
			                    <img src="${contextPath}${threadMemberList[0].memPrflimg}" class="rounded-circle" alt="spike-img" width="150" height="150"/>
				              </div>  
			                  <h4 class="card-title mb-2 d-flex justify-content-center">${threadMemberList[0].memName}</h4>
			                  <p class="card-subtitle d-flex justify-content-center">${res.thTtl}</p>
			                </div>
			              </div> 
			              <!-- 스레드 목록 카드 끝 -->
			        	</div>
			        	
	            		<div class="row" style="margin-left: 20px;">
							<!-- 비품 목록 -->
							<div class="col-md-12" onclick="eqpList()" style="cursor: pointer">
								<div class="card overflow-hidden" style="height: 150px;">
									<div class="card-body p-4 hover">
										<div class="mb-3">
										<p class="text-dark fw-bold fs-3 mb-0 text-nowrap">
											자원 목록
										</p> 
										</div>
										<div class="d-flex align-items-center">
										<div>
											<h6 class="card-title fs-7" id="eqpCount"></h6>
											<p class="card-subtitle">전체 자원 수</p>
										</div>
										<div class="ms-auto">
											<div class="bg-indigo-subtle text-indigo p-6 fs-8 rounded-circle d-flex align-items-center justify-content-center">
											<i class="ti ti-archive"></i>
											</div>
										</div>
										</div>
									</div>
								</div> 
							</div>
							<!-- 비품 목록 끝 -->
			
							<!-- 비품 현황 -->
							<div class="col-md-12" onclick="eqpLive()" style="cursor: pointer">
								<div class="card overflow-hidden" style="height: 150px;">
									<div class="card-body p-4 hover">
										<div class="mb-3 text-info">
										<p class="text-dark fw-bold fs-3 mb-0 text-nowrap">
											자원 현황
										</p>
										</div>
										<div class="d-flex align-items-center">
										<div>
											<h6 class="card-title fs-7" id="eqpUsingCount"></h6>
											<p class="card-subtitle">사용 중</p>
										</div>
										<div class="ms-auto">
											<div class="bg-warning-subtle text-warning p-6 fs-8 rounded-circle d-flex align-items-center justify-content-center">
											<!-- <i class="ti ti-rosette-discount-check"></i> -->
											<iconify-icon icon="lucide:badge-check" width="2rem" height="2rem"></iconify-icon>
											</div>
										</div>
										</div>
									</div>
								</div> 
							</div>
							<!-- 비품 현황 끝 -->
						</div>
				    </div>
	              <!-- 프로젝트 현황 카드 -->
	              <div style="height:300px;" class="card ">
	                <div class="card-body position-relative">
	                  <h4 class="card-title mb-1">프로젝트 현황</h4>
	                  <div id="divPjtInfoList" class="mt-6">
											
	                  </div>
	                </div>
									  <button id="pjtInfoPrev" onclick="pjtInfoPrev()" class="btn pe-0 ps-0 position-absolute top-50 start-0 translate-middle-y" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
											<iconify-icon icon="grommet-icons:previous" width="30" height="280" style="color: black"></iconify-icon>	
											<span class="visually-hidden">Previous</span>
										</button>
										<button id="pjtInfoNext" onclick="pjtInfoNext()" class="btn pe-0 ps-0 position-absolute top-50 end-0 translate-middle-y" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
											<iconify-icon icon="grommet-icons:next" width="30" height="280" style="color: black"></iconify-icon>
											<span class="visually-hidden">Next</span>
										</button>
	              </div>
	              <!-- 프로젝트 현황 카드 -->
	            </div>
	            <!-- 스레드 목록 & 프로젝트 현황 끝 -->
	
	
	            <!-- 결재 카드 & 일일 업무 보고 -->
	            <div class="col-lg-6">
	              <!-- 결재 카드 1,2,3 -->
	              <div class="row">
	                <!-- 결재 카드1 -->
	                <div class="col">
	                  <div class="card">
	                    <div class="card-body p-4 hover" style="cursor: pointer;" id="threadMainToApprove">
	                      <div class="d-flex align-items-center">
	                        <div class="bg-primary-subtle text-primary p-6 fs-7 rounded-circle d-flex align-items-center justify-content-center">
	                          <i class="ti ti-clipboard-text"></i>
	                        </div>
	                        <div class="ms-6">
	                          <h6 class="mb-1 fs-6">${res.docToApprovalCnt} 건</h6>
	                          <p class="mb-0">결재 요청</p>
	                        </div>
	                      </div>
	                    </div>
	                  </div>
	                </div> 
	                <!-- 결재 카드1 끝 -->
	 
	                <!-- 결재 카드2 -->
	                <div class="col">
	                  <div class="card">
	                    <div class="card-body p-4" id="threadMainToOngoing" style="cursor: pointer;">
	                      <div class="d-flex align-items-center">
	                        <div class="bg-success-subtle text-success p-6 fs-7 rounded-circle d-flex align-items-center justify-content-center">
	                          <i class="ti ti-loader"></i>
	                        </div> 
	                        <div class="ms-6">
	                          <h6 class="mb-1 fs-6">${res.docOnGoingCnt} 건</h6>
	                          <p class="mb-0">처리 중</p>
	                        </div>
	                      </div>
	                    </div>
	                  </div>
	                </div>
	                <!-- 결재 카드2 끝 -->
	
	              </div>
	              <!-- 결재 카드 1,2,3 끝 --> 
	
	              <!-- 일일 업무 보고 현황 -->
	              <div class="card" style="overflow: hidden; height: 522px;">
	                `
					if (threadDailyBoard.length == 0) {
						html += ` 
	                <div class="card-body p-4" onclick="DailyWorkr(${thNo})" style="cursor:pointer;">
	                  <div class="d-flex mb-4 justify-content-between align-items-center">
	                    <h4 class="card-title mb-0">일일 업무 보고 현황</h4>
	                  </div>
	                  <div class="table-responsive" data-simplebar>
	                    <table class="table table-borderless align-middle text-nowrap mb-1">
	                        <thead class="table-primary">
	                            <tr>
	                                <th scope="col">제목</th>
	                                <th scope="col">작성자</th>
	                                <th scope="col">작성일</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <tr>
	                                <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
	                            </tr>
	                        </tbody>
	                    </table>  
	                  </div>
	                </div>
	                  `
					} else {
						html += ` 
	                <div class="card-body p-4">
	                  <div class="d-flex mb-4 justify-content-between align-items-center" onclick="DailyWorkr(${thNo})" style="cursor: pointer;">
	                    <h4 class="card-title mb-0">${res.thTtl} 일일 업무 보고 현황</h4>
						<h6 style="padding-right: 35px;">더보기</h6>
	                  </div>  
	                  <div class="table-responsive" data-simplebar>
	                    <table class="table table-borderless align-middle text-nowrap mb-1" >
	                        <thead class="table-primary">
	                            <tr>
	                                <th scope="col" style="padding-left: 40px;">제목</th>
	                                <th scope="col" style="padding-left: 40px;">작성자</th>
	                                <th scope="col" style="padding-left: 50px;">작성일</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                  `
						for (var j = 0; j < Math.min(threadDailyBoard.length, 7); j++) {
							html += `  
	                            <tr id="thBoardtr${threadDailyBoard[j].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thDaily(${threadDailyBoard[j].brdNo})" style="cursor: pointer;">
	                                <td style="padding-left: 40px;">${threadDailyBoard[j].brdTtl}</td>
	                                <td class="ps-0"><span class="mb-1 badge text-bg-light" style="margin-left:35px;">${threadDailyBoard[j].brdWrtrNm}</span></td>
	                                <td class="ps-4"><span style="margin-left:25px;">${threadDailyBoard[j].formattedBrdRgdt}</span></td>
	                            </tr>
	                      `;
						}
						html += `    
	                        </tbody>
	                    </table>
	                  </div>
	                </div>
	                `;
					}
					html += `
	              </div>
	              <!-- 일일 업무 보고 현황 끝 -->
	            </div>
	            <!-- 결재 카드 & 일일 업무 보고 끝 -->
	          </div>
	          <!-- 첫 로우 끝 -->
	
	
	          <!-- 두번째 로우 시작 -->
	          <div class="row">
	            <!-- 날씨 -->
	            <div class="col-lg-4">
	              <div class="card acedamic">
                    <div class="card-body">
                      <div class="d-flex align-items-center">  
                        <h3 class="card-title mb-0">날씨 정보</h3>
                        <select class="form-select w-auto ms-auto">
                          <option selected="">오늘</option>
                        </select>
                      </div>
                      <div class="d-flex align-items-center flex-row mt-4">
                        <div class="p-2 display-5 text-primary">
                          <i class="ti ti-cloud"></i> 
						  <span>${TMPfcstValue}<sup>°C</sup>	
                          </span> 
                        </div>
                        <div class="p-2">
                          <h3 class="mb-0">${dayName}</h3>
                          <small>대전광역시 중구 오류동</small>
                        </div>
                      </div>
                      <table class="table table-borderless">
                        <tbody>
                          <tr>
                            <td>바람</td>
                            <td class="fw-medium">5 km/h</td>
                          </tr>
                          <tr>
                            <td>습도</td>
                            <td class="fw-medium">${REHfcstValue}%</td>
                          </tr>
                          <tr>
                            <td>시야</td>
                            <td class="fw-medium">50 Km</td>
                          </tr>
                          <tr>
                            <td>기압</td>
                            <td class="fw-medium">1019 mb</td>
                          </tr>
                          <tr>
                            <td>이슬점</td>
                            <td class="fw-medium">10°</td>
                          </tr>
                        </tbody>
                      </table>
                      <hr />
                      <ul class="list-unstyled row text-center city-weather-days">
                        <li class="col">
                          <span>09:00</span>
                          <h3 class="mb-0 fs-14 lh-base">${TMPfcstValue1}<sup>°C</sup>
                          </h3>
                        </li>
                        <li class="col">
                          <span>11:00</span>
                          <h3 class="mb-0 fs-14 lh-base">${TMPfcstValue2}<sup>°C</sup>
                          </h3>
                        </li>
                        <li class="col">
                          <span>13:00</span>
                          <h3 class="mb-0 fs-14 lh-base">${TMPfcstValue3}<sup>°C</sup>
                          </h3>
                        </li>
                        <li class="col">
                          <span>15:00</span>
                          <h3 class="mb-0 fs-14 lh-base">${TMPfcstValue4}<sup>°C</sup>
                          </h3>
                        </li>
                      </ul>
                    </div>
                  </div>
	            </div>
	            <!-- 날씨 끝 -->
	 
	            <!-- 스레드 게시판 -->  
	            <div class="col-lg-8">
	              <div class="card" style="height: 528px;">
	                `
					if (threadFreeBoard.length == 0) {
						html += `
	                <div class="card-body p-4" id="divThreadBoard" data-th-ttl="${res.thTtl}" onclick="ThreadBoard(${thNo})" style="cursor: pointer;"> 
	                  <div class="d-flex mb-4 justify-content-between align-items-center">
	                    <h4 class="card-title mt-3 ms-2">${res.thTtl} 게시판</h4>
	                  </div>
	                  <div class="table-responsive" data-simplebar> 
	                    <table class="table table-borderless align-middle text-nowrap mb-1">
	                        <thead class="table-primary table-striped ext-nowrap align-middle">
	                            <tr>
	                                <th scope="col" style="padding-left: 30px;">제목</th>
	                                <th scope="col">작성자</th>
	                                <th scope="col" style="padding-left: 50px;">작성일</th>
	                                <th scope="col">조회수</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <tr>
	                                <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
	                            </tr>
	                        </tbody>
	                    </table>
	                  </div>
	                </div>
	                 `;
					} else {
						html += ` 
	                <div class="card-body p-4" id="divThreadBoard" data-th-ttl="${res.thTtl}">
	                  <div class="d-flex mb-4 justify-content-between align-items-center" onclick="ThreadBoard(${thNo})" style="cursor: pointer;">
	                    <h4 class="card-title mt-3 ms-2">${res.thTtl} 게시판</h4>
						<h6 style="padding-right: 32px;">더보기</h6>  
	                  </div>
	                  <div class="table-responsive" data-simplebar> 
	                    <table class="table table-borderless align-middle text-nowrap mb-1">
	                        <thead class="table-primary table-striped ext-nowrap align-middle">
	                            <tr>
	                                <th scope="col" style="padding-left: 30px;">제목</th>
	                                <th scope="col">작성자</th>
	                                <th scope="col" style="padding-left: 20px;">작성일</th>
	                                <th scope="col">조회수</th>
	                            </tr>
	                        </thead> 
	                        <tbody>
	                  `;
						for (var j = 0; j < Math.min(threadFreeBoard.length, 7); j++) {
							html += `
	                            <tr id="thBoardtr${threadFreeBoard[j].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thBoard(${threadFreeBoard[j].brdNo})" style="cursor: pointer;">
	                                <td style="padding-left: 30px;">${threadFreeBoard[j].brdTtl}</td>
	                                <td class="ps-0"><span class="mb-1 badge text-bg-light" style="margin-left: 10px;">${threadFreeBoard[j].brdWrtrNm}</span></td>
	                                <td class="ps-4"><span style="margin-right: 50px;">${threadFreeBoard[j].formattedBrdRgdt}</span></td>
	                                <td style="padding-left: 20px"><p class="mb-1 badge bg-indigo-subtle text-indigo">${threadFreeBoard[j].brdHit}</p></td>
	                            </tr>`;
						}
						html += `
	                        </tbody>
	                    </table>
	                  </div>
	                </div>
	                `;
					}
					html += `
	
	              </div>
	            </div>
	            <!-- 스레드 게시판 끝 -->
	          </div>
	          <!-- 두번째 로우 끝 -->
	        </div> 
	        <!-- 탭1 끝 -->
	
	
	        <!-- 탭2 시작 -->
	         <div class="tab-pane fade" id="pills-followers" role="tabpanel" aria-labelledby="pills-followers-tab" tabindex="0"> 
                <div class="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
                  <h3 class="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">${res.thTtl} 인원 <span class="badge text-bg-secondary fs-4 rounded-4 py-1 px-2 ms-2">${res.threadTotal} 명</span>
                  </h3>
                    <form class="position-relative">
                    </form>
                </div> 	
	          <div class="row"> 
      `;
					for (var k = 0; k < threadMemberList.length; k++) {
						html +=
							`
	            <div class=" col-md-6 col-xl-4">
	              <div class="card">
	                <div class="card-body p-4 d-flex align-items-center gap-3">
	                  <img src="${contextPath}${threadMemberList[k].memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
	                  <div>
					  <div class="d-flex">
	                    <h5 class="fw-semibold mb-0">${threadMemberList[k].memName}</h5> 
						<strong class="mb-1 ms-2 me-1 badge bg-primary-subtle text-primary" style="font-weight: normal">${threadMemberList[k].chRoleNm}</strong>
						 `;
						if (threadMemberList[k].chRole == 1) {
							html += `
							  👑
							`;
						}
						html +=
							`
					  </div> 
	                    <p class="fs-2 d-flex align-items-center">
	                    <iconify-icon icon="fluent-color:mail-16"></iconify-icon>
	                      ${threadMemberList[k].memEmail}
	                    </p>
	                  </div>
	                </div>
	              </div>
	            </div>
      `;
					}
					html +=
						`
	          </div>
	       </div>
	        <!-- 탭2 끝 -->
	
	
	        <!-- 탭3 시작 -->
	        <div class="tab-pane fade" id="pills-friends" role="tabpanel" aria-labelledby="pills-friends-tab" tabindex="0">
	          <div class="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
	            <h3 class="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">Friends <span class="badge text-bg-secondary fs-2 rounded-4 py-1 px-2 ms-2">20</span>
	            </h3>
	            <form class="position-relative">
	              <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Friends">
	              <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y text-dark ms-3"></i>
	            </form>
	          </div>
	          <div class="row">
	            <div class="col-sm-6 col-lg-4">
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-2.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Betty Adams</h5>
	                  <span class="text-dark fs-2">Medical Secretary</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li>
	                </ul>
	              </div>
	            </div>
	            <div class="col-sm-6 col-lg-4">
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-3.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Inez Lyons</h5>
	                  <span class="text-dark fs-2">Medical Technician</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li>
	                </ul>
	              </div>
	            </div>
	            <div class="col-sm-6 col-lg-4">
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-4.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Lydia Bryan</h5>
	                  <span class="text-dark fs-2">Preschool Teacher</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li>
	                </ul>
	              </div>
	            </div>
	            <div class="col-sm-6 col-lg-4">
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-5.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Carolyn Bryant</h5>
	                  <span class="text-dark fs-2">Legal Secretary</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li>
	                </ul>
	              </div>
	            </div>
	            <div class="col-sm-6 col-lg-4">
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-6.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Paul Benson</h5>
	                  <span class="text-dark fs-2">Safety Engineer</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li> 
	                </ul>
	              </div> 
	            </div>  
	            <div class="col-sm-6 col-lg-4"> 
	              <div class="card hover-img overflow-hidden">
	                <div class="card-body p-4 text-center border-bottom">
	                  <img src="{contextPath }/resources/assets/images/profile/user-7.jpg" alt="spike-img" class="rounded-circle mb-3" width="80" height="80">
	                  <h5 class="fw-semibold mb-0">Robert Francis</h5>
	                  <span class="text-dark fs-2">Nursing Administrator</span>
	                </div>
	                <ul class="px-2 py-2 text-bg-light list-unstyled d-flex align-items-center justify-content-center mb-0">
	                  <li class="position-relative">
	                    <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" href="javascript:void(0)">
	                      <i class="ti ti-brand-facebook"></i>
	                    </a>  
	                  </li> 
	                  <li class="position-relative">
	                    <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-instagram"></i>
	                    </a> 
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-info d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-github"></i>
	                    </a>
	                  </li>
	                  <li class="position-relative">
	                    <a class="text-secondary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold " href="javascript:void(0)">
	                      <i class="ti ti-brand-twitter"></i>
	                    </a>
	                  </li>
	                </ul>
	              </div>
	            </div>
	
	          </div>
	        </div>
	        <!-- 탭3 끝 -->
	      </div> 
	  	`;
					$("#main_contents").html(html);

					let threadMainToApprove = MAIN_CONTENTS.querySelector('#threadMainToApprove');
					threadMainToApprove.addEventListener('click', () => { docMyMainPageRender() });

					let threadMainToOngoing = MAIN_CONTENTS.querySelector('#threadMainToOngoing');
					threadMainToOngoing.addEventListener('click', async () => { await docMyMainPageRender() });

					cur_page = 1;
					total_page = Math.ceil(res.page.total / 4);
					chDashboardProjectInfoRender(res.page.list);

					$.ajax({
						url: "/synerhub/thread/threadEqpCount",
						type: "post",
						beforeSend: function (xhr) {
							xhr.setRequestHeader(header, token);
						},
						data: JSON.stringify({ thNo: thNo }),
						contentType: "application/json; charset=utf-8",
						success: function (res) {
							$(document).find("#eqpCount").text(res + " 개");
						}
					});
					// 비품 전체 끝

					// 비품 현황 출력
					$.ajax({
						url: "/synerhub/thread/threadEqpUsingCount",
						type: "post",
						beforeSend: function (xhr) {
							xhr.setRequestHeader(header, token);
						},
						data: JSON.stringify({ thNo: thNo }),
						contentType: "application/json; charset=utf-8",
						success: function (res) {
							$(document).find("#eqpUsingCount").text(res + " 개");
						}
					});
					// 비품 현황 끝
				}
			});

			/* 날씨api  */
		}
		);
		/* 날씨 api */

	}
};



$(document).ready(function () {
	$(document).on('click', '#pills-followers-tab', function () {
		console.log('Followers tab clicked'); // 로그 추가
		// 현재 클릭된 버튼에 active 클래스 추가 및 aria-selected 변경
		$(this).addClass('active').attr('aria-selected', 'true');

		// 기존의 active 버튼에 대해 active 클래스 제거 및 aria-selected 변경
		$('#pills-profile-tab').removeClass('active').attr('aria-selected', 'false');

		// 기존의 active div에서 show active 클래스 제거
		$('#pills-profile').removeClass('show active');

		// 클릭된 버튼과 관련된 div에 show active 클래스 추가
		$('#pills-followers').addClass('show active');
		console.log('Followers tab content shown'); // 로그 추가
	});

	$(document).on('click', '#pills-profile-tab', function () {
		console.log('Profile tab clicked'); // 로그 추가 
		// 현재 클릭된 버튼에 active 클래스 추가 및 aria-selected 변경
		$(this).addClass('active').attr('aria-selected', 'true');

		// 기존의 active 버튼에 대해 active 클래스 제거 및 aria-selected 변경 
		$('#pills-followers-tab').removeClass('active').attr('aria-selected', 'false');

		// 기존의 active div에서 show active 클래스 제거
		$('#pills-followers').removeClass('show active');

		// 클릭된 버튼과 관련된 div에 show active 클래스 추가
		$('#pills-profile').addClass('show active');
		console.log('Profile tab content shown'); // 로그 추가
	});
});

function threadDelete1(thNo) {
	Swal.fire({
		title: '정말로 삭제하시겠습니까?',
		text: '삭제한 스레드는 되돌릴 수 없습니다.',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '예',
		cancelButtonText: '아니요',
		reverseButtons: true,
	}).then(result => {
		if (result.isConfirmed) {
			Swal.fire('삭제되었습니다.');

			console.log(thNo);

			let synerhubThread = {
				thNo: thNo
			};

			$.ajax({
				url: "/synerhub/thread/delete",
				type: "post",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(synerhubThread),
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				success: function (res) {
					console.log(res);
					channelLoad();
				}
			});
		}
	});
}

$(document).on("click", "#thraedChHome", function () {
	console.log("thraedChHome 클릭");
});

$(document).on("click", "#threadeqpList", function () {
	$(document).find("#eqpListBtn").click();
});

$(document).on("click", "#threadeqpLive", function () {
	$(document).find("#eqpLiveBtn").click();
});