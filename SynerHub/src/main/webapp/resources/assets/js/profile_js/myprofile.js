function myProfile() {
	console.log("myProfile");

	let hostIndex = location.href.indexOf(location.host) + location.host.length;
	let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

	let data = {
		memNo: MEM_NO
	}

	$.ajax({
		url: "/synerhub/profile/getUser",
		type: "post",
		beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
			xhr.setRequestHeader(header, token);
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: async function (res) {

			console.log(res)

			var html = "";
			html +=
				`
        <div class="mb-3 overflow-hidden position-relative">
		  <div class="px-3">
		    <h4 class="fs-6 mb-0">나의 프로필</h4>
		    <nav aria-label="breadcrumb">
		      <ol class="breadcrumb mb-0">
		        <li class="breadcrumb-item">
		          <a href="../horizontal/index.html">Home</a>
		        </li>
		        <li class="breadcrumb-item" aria-current="page">User Profile</li>
		      </ol>
		    </nav>
		  </div>
		</div>
		
		  
		<div class="row">
            <div class="col-lg-4">
              <div class="card">

                <div class="card-body">
		          
                  <div class="hstack justify-content-end mb-4">
                    <div class="d-flex align-items-center">
         
                      <div class="ms-3 me-2">
                        <p class="badge bg-success-subtle text-success fw-semibold fs-2 gap-1 d-inline-flex align-items-center">
                          <iconify-icon icon="tabler:point-filled" width="1.5em" height="1.5em"  style="color: #00ff33"></iconify-icon></i>Active
                        </p>
                      </div>
                    </div>
                  </div>
        
                  <div class="text-center">
                    <img src="${contextPath}${res.memPrflimg}" width="150" class="rounded-3 mb-3" alt="" />
                    <h4 class="mb-1">${res.memName}</h4>
                    <h4 class="mb-1 profile-name">
						<sec:authentication property="principal.member.memName"/>
					</h4>
                    	<span class="badge bg-primary-subtle text-primary fw-light rounded-pill">Member</span>
					</div>

					<div class="hstack justify-content-center mt-3">
						<div class="d-flex align-items-center">
							<span class="bg-success-subtle p-6 rounded-3 round-50 hstack justify-content-center">
							<i class="ti ti-brand-youtube text-success fs-7"></i>
							</span>

							<div class="ms-3">
							<p class="fw-normal text-dark fs-5 mb-0 mt-1"><strong>가입 채널 수</strong></p>
							<p class="mb-0 fs-3 text-center">${res.channelCount}</p>
							</div>
						</div>
					</div>
        
                  <div class="mt-5">
                    <div class="pb-1 mb-2 border-bottom">
                      <h5 class="ms-2">나의 프로필</h5>
                    </div>
        
                    <ul class="ms-2">
                      <li class="py-2">
                        <p class="fw-normal text-dark mb-0">
                          <strong>이름 :</strong> 
                          <span class="fw-light ms-1 profile-name">
                            &ensp;
                  ${res.memName}
                          </span>
                        </p>
                      </li>
                      
                      <li class="py-2">
                        <p class="fw-normal text-dark mb-0 profile-phone">
                          <strong>전화번호 :</strong>
                          <span class="fw-light ms-1">
                            &ensp;
                  ${res.memPh}
                          </span>
                        </p>
                      </li>
                      
                      <li class="py-2">
                        <p class="fw-normal text-dark mb-0 profile-memEmail">
                          <strong>이메일 :</strong>
                          <span class="fw-light ms-1">
                            &ensp;
                  ${res.memEmail}
                          </span>
                        </p>
                      </li>
        
                      <li class="py-2">
                        <p class="fw-normal text-dark mb-0 profile-memAddr">
                          <strong>주소 :</strong>
                          <span class="fw-light ms-1">
                            &ensp;
                  ${res.memAddr1},
                  &nbsp;
                  ${res.memAddr2}
                          </span>
                        </p>
                      </li>
        
                      <li class="py-2">
                        <p class="fw-normal text-dark mb-0 profile-memIntr">
                          <strong>자기 소개 :</strong>
                          <span class="fw-light ms-1">
                            &ensp;
                  ${res.memIntr}
                          </span>
                        </p>
                      </li>
                    </ul>
                    
                    <div class="row mt-4" style="justify-content: center;">
                      <div class="col-sm-5">
                        <button type="button" class="btn btn-primary w-100 justify-content-center d-flex align-items-center" onclick="editPf()">
                            수정
                        </button>
                      </div>
                      <div class="col-sm-5">
                        <button type="button" class="btn btn-danger w-100 justify-content-center me-2 d-flex align-items-center mb-3 mb-sm-0">
                            취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>


			
            <div class="col-lg-8">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item me-2" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                    신고 내역
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    가입 채널
                  </button>
                </li>
              </ul>
              
              <div class="card mt-4">
                <div class="card-body">
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div class="mb-4 border-bottom pb-3">
                        <h4 class="card-title mb-0">나의 신고 접수 내역</h4>
                      </div>
                      <div class="table-responsive overflow-x-auto">
                        <table class="table align-middle text-nowrap">
                          <thead>
                            <tr>
                              <th scope="col">NO</th>
                              <th scope="col">신고 유형</th>
                              <th scope="col">신고 대상자</th>
                              <th scope="col">접수일</th>
                              <th scope="col">처리 상태</th>
                            </tr>
                          </thead>
                          <tbody class="border-top" id="delList">
                            <tr>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">
                                  &nbsp;1
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  음란물
                                </p>
                              </td>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <img src="${contextPath}/resources/assets/images/profile/user-2.jpg" alt="spike-img" class="rounded-circle" width="45" />
                                  </div>
                                  <div>
                                    <h6 class="mb-1">Mark J. Freeman</h6>
                                    <p class="fs-3 mb-0">채널명</p>
                                  </div>
                                </div> 
                              </td>
                              <td>
                                <p class="mb-0">2024.10.19.</p>
                              </td>
                              <td>
                                <p class="fw-bold text-danger mb-0">&emsp;대기</p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">
                                  &nbsp;2
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  허위 정보
                                </p>
                              </td>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <img src="${contextPath}/resources/assets/images/profile/user-3.jpg" alt="spike-img" class="rounded-circle" width="45" />
                                  </div>
                                  <div>
                                    <h6 class="mb-1">Mark J. Freeman</h6>
                                    <p class="fs-3 mb-0">채널명</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="mb-0">2024.10.16.</p>
                              </td>
                              <td>
                                <p class="fw-bold text-success mb-0">처리 완료</p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">
                                  &nbsp;3
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  스팸 및 홍보
                                </p>
                              </td>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <img src="${contextPath}/resources/assets/images/profile/user-7.jpg" alt="spike-img" class="rounded-circle" width="45" />
                                  </div>
                                  <div>
                                    <h6 class="mb-1">Mark J. Freeman</h6>
                                    <p class="fs-3 mb-0">채널명</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="mb-0">2024.10.12.</p>
                              </td>
                              <td>
                                <p class="fw-bold text-success mb-0">처리 완료</p>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">
                                  &nbsp;4
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  음란물
                                </p>
                              </td>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <img src="${contextPath}/resources/assets/images/profile/user-5.jpg" alt="spike-img" class="rounded-circle" width="45" />
                                  </div>
                                  <div>
                                    <h6 class="mb-1">Mark J. Freeman</h6>
                                    <p class="fs-3 mb-0">채널명</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="mb-0">2024.09.15.</p>
                              </td>
                              <td>
                                <p class="fw-bold text-success mb-0">처리 완료</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <div class="mb-4 border-bottom pb-3">
                        <h4 class="card-title mb-0">나의 가입 채널 목록</h4>
                        <div id="leave" class="ms-auto" style="display: none;">
                            <a href="javascript:void(0)" class="delete-multiple bg-danger-subtle btn me-2 text-danger d-flex align-items-center">
                                <i class="ti ti-logout me-1 fs-5"></i>탈퇴하기
                            </a>
                        </div>
                      </div>
                      <div class="table-responsive overflow-x-auto">
                        <table class="table align-middle text-nowrap">
                          <thead>
                            <tr>
                              <th>
                                <div class="n-chk align-self-center text-center ms-2">
                                  <div class="form-check">
                                    <input type="checkbox" class="form-check-input primary" id="ch-check-all" />
                                    <label class="form-check-label" for="ch-check-all"></label>
                                    <span class="new-control-indicator"></span>
                                  </div>
                                </div>
                              </th>
                              <th scope="col">NO</th>
                              <th scope="col">멤버십</th>
                              <th scope="col">가입 채널명</th>
                              <th scope="col">채널 가입일</th>
                              <th scope="col">채널 접속일</th>
                            </tr>
                          </thead>
                          <tbody class="border-top" id="myChList">
                            <tr>
                              <td>
                                <div class="n-chk align-self-center text-center ms-2">
                                  <div class="form-check">
                                    <input type="checkbox" class="form-check-input contact-chkbox primary" id="checkbox1" />
                                    <label class="form-check-label" for="checkbox1"></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">&nbsp;
                                  1
                                </p>
                              </td>
                              <td>
                                <div class="d-flex flex-column">
                                  <img src="${contextPath}/resources/assets/images/backgrounds/gold.png" class="rounded-circle" width="40" height="40" />
                                </div>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  Mathematics
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">
                                  2023-05-12
                                </p>
                              </td>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">&emsp;1일 전</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>


                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
		`

			$("#main_contents").html("");
			$("#main_contents").html(html);


			StartDelList();
		}
	});


}




async function editPf() {

	let hostIndex = location.href.indexOf(location.host) + location.host.length;
	let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

	let data = {
		memNo: MEM_NO
	}
	console.log(data);
	let autographs = [];
	let autographRes = await axios.post('/synerhub/autograph/getautograph', data, axiosHeaderJson);
	autographRes.data && autographRes.data.forEach(o => autographs.push(o));
	console.log(autographRes);
	console.log(autographs);
	$.ajax({
		url: "/synerhub/profile/getUser",
		type: "post",
		beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
			xhr.setRequestHeader(header, token);
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (res) {

			var html = "";
			html +=
				`
		<div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">프로필 수정</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="../horizontal/index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">Edit Profile</li>
                </ol>
              </nav>
            </div>
          </div>


          <div class="card">
            <ul class="nav nav-pills user-profile-tab" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-3" id="pills-account-tab" data-bs-toggle="pill" data-bs-target="#pills-account" type="button" role="tab" aria-controls="pills-account" aria-selected="true">
                  <i class="ti ti-user-circle me-2 fs-6"></i>
                  <span class="d-none d-md-block">Account</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3" id="pills-bills-tab" data-bs-toggle="pill" data-bs-target="#pills-bills" type="button" role="tab" aria-controls="pills-bills" aria-selected="false">
                  <i class="ti ti-writing me-2 fs-6"></i>
                  <span class="d-none d-md-block">Signature</span>
                </button>
              </li>
            </ul>
            <div class="card-body" id="editBody">
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab" tabindex="0">
                  <div class="row">
                    <div class="col-lg-6 d-flex align-items-stretch">
                      <div class="card w-100 border position-relative overflow-hidden">
                        <div class="card-body p-4">
                          <h4 class="card-title">프로필 변경</h4>
                          <p class="card-subtitle mb-4">프로필 이미지를 변경해주세요.</p>
                          <div class="text-center">
                            <img src="${contextPath}${res.memPrflimg}" id="profileImg2" name="memPrflimg" alt="spike-img" class="img-fluid rounded-circle" width="120" height="120">
                            <input type="hidden" id="defaultProfileImg" value="${contextPath}${res.memPrflimg}">
                            <div class="d-flex align-items-center justify-content-center my-4 gap-6">
                            
	                          <div class="btn-group mb-3 ms-4">
			                    <button type="button" id="camera" class="btn bg-primary-subtle rounded-circle round me-4 d-inline-flex align-items-center justify-content-center px-2" onclick="openCamera()">
			                      <i class="ti ti-camera fs-7"></i>
			                    </button>
			                    <button type="button" class="btn bg-success-subtle rounded-circle round me-4 d-inline-flex align-items-center justify-content-center px-2" onclick="document.getElementById('pfImgFile').click();">
			                      <i class="ti ti-photo fs-7"></i>
			                      <input class="form-control" type="file" id="pfImgFile" name="imgFile" style="display: none;">
			                    </button>
			                    <button type="button" id="reset" class="btn bg-danger-subtle rounded-circle round me-4 d-inline-flex align-items-center justify-content-center px-2">
			                      <i class="ti ti-trash fs-7"></i>
			                    </button>
			                  </div>
                            
                            </div>
                            
                            <p class="mb-0">허용되는 확장자 JPG, GIF 또는 PNG. 최대 크기 10GB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 d-flex align-items-stretch">
                      <div class="card w-100 border position-relative overflow-hidden">
                        <div class="card-body p-4">
                          <h4 class="card-title">비밀번호 변경</h4>
                          <p class="card-subtitle mb-4">비밀번호를 변경해주세요.</p>
 
 
                            <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">현재 비밀번호</label>
                              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="●●●●●●●●●●">
                            </div>
                            <div class="mb-3">
                              <label for="exampleInputPassword2" class="form-label">새 비밀번호</label>
                              <input type="password" class="form-control" id="memPw" name="memPw" oninput="pwCheck()" onfocusout="validatePw()">
                            	<div class="invalid-feedback" id="pwc">8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요</div>
                            </div>
                            <div>
                              <label for="exampleInputPassword3" class="form-label">새 비밀번호 확인</label>
                              <input type="password" class="form-control" id="memPwCheck" name="memPwCheck" oninput="pwCheck()">
                            	<div class="valid-feedback" id="pwv">비밀번호가 일치합니다.</div>
								<div class="invalid-feedback" id="pwinv">비밀번호가 일치하지 않습니다.</div>
                            </div>
                         

                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="card w-100 border position-relative overflow-hidden mb-0">
                        <div class="card-body p-4">
                          <h4 class="card-title">회원정보 변경</h4>
                          <p class="card-subtitle mb-4">회원정보를 변경해주세요.</p>
                          

                            <div class="row">
                              <div class="col-lg-6">
                                <div class="mb-3">
                                  <label for="exampleInputtext" class="form-label">이름</label>
                                  <input type="text" class="form-control" id="memName" name="memName" value="${res.memName}">
                                </div>
                                <div class="mb-3">
                                  <label for="exampleInputtext1" class="form-label">이메일</label>
                                  <input type="email" class="form-control" id="email" name="memEmail" value="${res.memEmail}">
                                </div>
                                <div class="mb-3">
                                  <label for="exampleInputtext3" class="form-label">전화번호</label>
                                  <input type="text" class="form-control" id="memPh" name="memPh" value="${res.memPh}" maxlength="13" oninput="autoHyphen(this)">
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="d-flex">
                                    <div class="mb-3 flex-grow-1 me-2">
                                      <label for="memAddr1" class="form-label">주소</label>
	                                  	<input type="text" class="form-control" id="memAddr1" name="memAddr1" value="${res.memAddr1}">
                                    </div>
                                    <div class="mb-3" style="flex-basis: 0; flex-grow: 2;">
                                      <label for="memAddr2" class="form-label">상세주소</label>
	                                  	<input type="text" class="form-control" id="memAddr2" name="memAddr2" value="${res.memAddr2}">
                                    </div>
                                </div>
                                <div class="mb-3">
                                  <label for="exampleInputtext2" class="form-label">자기 소개</label>
                                  <textarea class="form-control" id="memIntr" name="memIntr" rows="5">${res.memIntr}</textarea>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="d-flex align-items-center justify-content-end mt-4 gap-6">
                                  <button class="btn btn-primary" id="savePf1">저장</button>
                                  <button class="btn bg-danger-subtle text-danger" id="cancelPf1">취소</button>
                                </div>
                              </div>
                            </div>
                          

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-bills" role="tabpanel" aria-labelledby="pills-bills-tab" tabindex="0">
                  <div class="row justify-content-center">
                    
                    <div class="col-lg-7 d-flex">
					    <div class="d-flex align-items-center justify-content-center">`;
			if (autographs[0]) {
				html += `
									<input data-no="${autographs[0].atgrphNo}" class="signature" type="file" id="fileInput1" accept="image/*" style="display: none;">
										<button data-sort="update" style="display:block;" type="button" id="updateBtn1" class="btn bg-primary-subtle text-primary mb-2 me-2 img1st imgbBtn1">
					            <i class="ti ti-upload text"></i>
					            <span class="text">&nbsp;재등록</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
					        	</button>
										<button data-sort="delete" style="display:block;" type="button" id="deleteBtn1" onclick="deleteAutograph(${autographs[0].atgrphNo}, '#signImg1', '1')" class="btn bg-danger-subtle text-danger mb-2 imgBn1">
					            <i class="ti ti-file-delete text"></i>
					            <span class="text">&nbsp;삭제</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
										</button>
										<button data-sort="insert" style="display: none;" type="button" id="insertBtn1" class="btn bg-success-subtle text-success mb-2 img1st imgBtn1">
					            <i class="ti ti-upload text"></i>
					            <span class="text">&nbsp;등록</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
					        	</button>
					`;
			} else {
				html += `
									<input class="signature" type="file" id="fileInput1" accept="image/*" style="display: none;">
										<button data-sort="update" data-up="true" style="display: none;" type="button" id="updateBtn1" class="btn bg-primary-subtle text-primary mb-2 me-2 img1st imgBtn1">
					            <i class="ti ti-upload text"></i>
					            <span class="text">&nbsp;재등록</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
					        	</button>
										<button data-sort="delete" style="display: none;" type="button" id="deleteBtn1" class="btn bg-danger-subtle text-danger mb-2 imgBtn1">
					            <i class="ti ti-file-delete text"></i>
					            <span class="text">&nbsp;삭제</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
										</button>
										<button data-sort="insert" style="display: block;" type="button" id="insertBtn1" class="btn bg-success-subtle text-success mb-2 img1st imgBtn1">
					            <i class="ti ti-upload text"></i>
					            <span class="text">&nbsp;등록</span>
					            <i class="ti ti-check text-active"></i>
					            <span class="text-active">&nbsp;Success</span>
					        	</button>
					`;
			}
			html += `
					    </div>
					    <div class="card border shadow-none ms-4">
					        <div class="card-body p-4">`;
			if (autographs[0]) {
				html += `<img src="${contextPath}/upload/temp/autograph/${MEM_NO}${autographs[0].src}" id="signImg1" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			} else {
				html += `<img src="${contextPath}/resources/assets/images/backgrounds/not-sign1.png" id="signImg1" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			}
			html += `
									</div>
					    </div>
					</div>
                    <div class="col-lg-7 d-flex">
					    <div class="d-flex align-items-center justify-content-center">`;
			if (autographs[1]) {
				html += `
												<input data-no="${autographs[1].atgrphNo}" class="signature" type="file" id="fileInput2" accept="image/*" style="display: none;">
													<button data-sort="update" style="display: block;" type="button" id="updateBtn2" class="btn bg-primary-subtle text-primary mb-2 me-2 img2nd imgBtn2">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;재등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="delete" style="display: block;" type="button" id="deleteBtn2" onclick="deleteAutograph(${autographs[1].atgrphNo}, '#signImg2', '2')" class="btn bg-danger-subtle text-danger mb-2 imgBn2">
														<i class="ti ti-file-delete text"></i>
														<span class="text">&nbsp;삭제</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="insert" data-up="true" style="display: none;" type="button" id="insertBtn2" class="btn bg-success-subtle text-success mb-2 img2nd imgBtn2">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
								`;
			} else {
				html += `
												<input class="signature" type="file" id="fileInput2" accept="image/*" style="display: none;">
													<button data-sort="update" style="display: none;" type="button" id="updateBtn2" class="btn bg-primary-subtle text-primary mb-2 me-2 img2nd imgBtn2">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;재등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="delete" style="display: none;" type="button" id="deleteBtn2" class="btn bg-danger-subtle text-danger mb-2 imgBtn2">
														<i class="ti ti-file-delete text"></i>
														<span class="text">&nbsp;삭제</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="insert" style="display: block;" type="button" id="insertBtn2" class="btn bg-success-subtle text-success mb-2 img2nd imgBtn2">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
								`;
			}
			html += `
					    </div>
					    <div class="card border shadow-none ms-4">
					        <div class="card-body p-4">`;
			if (autographs[1]) {
				html += `<img src="${contextPath}/upload/temp/autograph/${MEM_NO}${autographs[1].src}" id="signImg2" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			} else {
				html += `<img src="${contextPath}/resources/assets/images/backgrounds/not-sign1.png" id="signImg2" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			}
			html += `
									</div>
					    </div>
					</div>
                    <div class="col-lg-7 d-flex">
					    <div class="d-flex align-items-center justify-content-center">`;
			if (autographs[2]) {
				html += `
												<input data-no="${autographs[2].atgrphNo}" class="signature" type="file" id="fileInput3" accept="image/*" style="display: none;">
													<button data-sort="update" style="display:block;" type="button" id="updateBtn3" class="btn bg-primary-subtle text-primary mb-2 me-2 img3rd imgbBtn3">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;재등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="delete"  style="display: block" type="button" id="deleteBtn3" onclick="deleteAutograph(${autographs[2].atgrphNo}, '#signImg3', '3')" class="btn bg-danger-subtle text-danger mb-2 imgBn3">
														<i class="ti ti-file-delete text"></i>
														<span class="text">&nbsp;삭제</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="insert"  style="display: none;" type="button" id="insertBtn3" class="btn bg-success-subtle text-success mb-2 img3rd imgBtn3">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
								`;
			} else {
				html += `
												<input class="signature" type="file" id="fileInput3" accept="image/*" style="display: none;">
													<button data-sort="update" data-up="true" style="display: none;" type="button" id="updateBtn3" class="btn bg-primary-subtle text-primary mb-2 me-2 img3rd imgBtn3">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;재등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="delete" style="display: none;" type="button" id="deleteBtn3" class="btn bg-danger-subtle text-danger mb-2 imgbBtn3">
														<i class="ti ti-file-delete text"></i>
														<span class="text">&nbsp;삭제</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
													<button data-sort="insert" data-no="-1" data-up="true" style="display: block;" type="button" id="insertBtn3" class="btn bg-success-subtle text-success mb-2 img3rd imgbBtn3">
														<i class="ti ti-upload text"></i>
														<span class="text">&nbsp;등록</span>
														<i class="ti ti-check text-active"></i>
														<span class="text-active">&nbsp;Success</span>
													</button>
								`;
			}
			html += `
					    </div>
					    <div class="card border shadow-none ms-4">
					        <div class="card-body p-4">`;
			if (autographs[2]) {
				html += `<img src="${contextPath}/upload/temp/autograph/${MEM_NO}${autographs[2].src}" id="signImg3" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			} else {
				html += `<img src="${contextPath}/resources/assets/images/backgrounds/not-sign1.png" id="signImg3" alt="spike-img" class="img-fluid" style="height: 150px; width: 300px;">`
			}
			html += `
									</div>
					    </div>
					</div>
                    <div class="col-12">
                      <div class="d-flex align-items-center justify-content-end gap-6">
                        <button class="btn btn-primary" id="cancelPf2">저장</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

			$("#main_contents").html("");
			$("#main_contents").html(html);

		}
	});
}

// 개별 체크박스의 변화 감지
$(document).on("change", '.contact-chkbox', function () {
	// 체크된 체크박스가 하나라도 있으면 "탈퇴하기" 버튼 표시
	if ($('.contact-chkbox:checked').length > 0) {
		$('#leave').show();
	} else {
		$('#leave').hide();
	}
});

// "모두 선택" 체크박스의 변화 감지
$(document).on("change", '#ch-check-all', function () {
	var isChecked = $(this).is(':checked');
	// 모든 체크박스의 체크 상태 변경
	$('.contact-chkbox').prop('checked', isChecked).trigger('change');
});

$(document).ready(function () {
	var profileImg = $('#profileImg2');
	var imgFileInput = $('#imgFile');
	var capturedImage = localStorage.getItem('capturedImage');


	if (capturedImage) {
		profileImg.attr('src', capturedImage); // 로컬 스토리지에서 이미지 데이터 가져오기

		// DataTransfer 객체를 사용하여 파일 리스트에 추가
		var dataTransfer = new DataTransfer();

		// Blob 객체를 생성하여 이미지를 파일로 변환
		var byteString = atob(capturedImage.split(',')[1]); // base64 문자열에서 데이터 추출
		var mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0]; // MIME 타입 추출
		var ab = new Uint8Array(byteString.length);

		for (let i = 0; i < byteString.length; i++) {
			ab[i] = byteString.charCodeAt(i);
		}

		var blob = new Blob([ab], { type: mimeString });
		var file = new File([blob], 'capturedImage.png', { type: mimeString }); // 파일 생성

		var profileImg = $('#profileImg2');
		var imgFileInput = $('#imgFile');
		var capturedImage = localStorage.getItem('capturedImage');


		dataTransfer.items.add(file);
		// imgFileInput[0].files = dataTransfer.files; // input에 파일 추가

		localStorage.removeItem('capturedImage');

		$('#reset').on('click', function () {
			var defaultImg = $('#defaultProfileImg').val(); // 기본 이미지 경로
			if (defaultImg) {
				profileImg.attr('src', defaultImg); // 기본 이미지로 초기화
			} else {
				console.error("기본 이미지가 설정되어 있지 않습니다.");
			}
			imgFileInput.val(''); // 파일 입력 초기화
		});

	}
});



function openCamera() {
	var host = window.location.href;
	window.open('/synerhub/login/uploadImage?host=' + host, "a",  "width=800, height=800");   

	let interval = setInterval(callback, 1000);
	let img = localStorage.getItem("capturedImage");


	function callback() {
		if (img != localStorage.getItem("capturedImage")) {
			var profileImage = $('.container-fluid').find("#profileImg2");	// 부모 요소에서 자식 요소 찾기 
			profileImage.attr("src", localStorage.getItem("capturedImage")); // 새로운 이미지 URL로 변경

			var capturedImage = localStorage.getItem('capturedImage');
			var imgFileInput = $(document).find('#pfImgFile');

			// DataTransfer 객체를 사용하여 파일 리스트에 추가
			var dataTransfer = new DataTransfer();

			// Blob 객체를 생성하여 이미지를 파일로 변환
			var byteString = atob(capturedImage.split(',')[1]); // base64 문자열에서 데이터 추출
			var mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0]; // MIME 타입 추출
			var ab = new Uint8Array(byteString.length);

			for (let i = 0; i < byteString.length; i++) {
				ab[i] = byteString.charCodeAt(i);
			}

			var blob = new Blob([ab], { type: mimeString });
			var file = new File([blob], 'capturedImage.png', { type: mimeString }); // 파일 생성

			dataTransfer.items.add(file);
			imgFileInput[0].files = dataTransfer.files;
			console.log(imgFileInput[0].files);

			clearInterval(interval);
		}
	}
}


$(function () {
	$("#main_contents").on("click", "#dropdownMenuButton", function () {
		console.log("click...!");
		$("#main_contents").find("#uploadDropMenu").show();
	});

	$("#main_contents").on("click", "#camera", function () {
		console.log("camera...!");
		$("#main_contents").find("#uploadDropMenu").hide();
	});

	// 프로필 이미지를 선택했을 때 
	$(document).on("change", '#pfImgFile', function (event) {
		var fileValue = $(document).find("#pfImgFile").val();
		var fileName = fileValue[fileValue.length - 1]; // 파일명
		console.log(fileValue);

		var file = event.target.files[0]; // Open파일로 선택한 이미지 파일

		if (isImageFile(file)) { // 이미지 라면
			var reader = new FileReader();
			reader.onload = function (e) {

				var profileImage = $('.container-fluid').find("#profileImg2");	// 부모 요소에서 자식 요소 찾기 

				// 이미지 소스 변경
				if (profileImage.length) {
					profileImage.attr("src", e.target.result); // 새로운 이미지 URL로 변경
				}
				console.log(this, 2);
			}
			reader.readAsDataURL(file);
		} else { // 이미지 파일이 아닐 때
			alert("이미지 파일을 선택해주세요!");
		}
	});
});

function isImageFile(file) {
	var ext = file.name.split(".").pop().toLowerCase();	// 파일명에서 확장자를 추출
	return ($.inArray(ext, ["jpg", "jpeg", "png", "gif"]) === -1) ? false : true
}

let flagDelBtn = false;
var sel;
$(function () {
	$(document).on('click', '.img1st', function () {
		console.log(this);
		sel = this.dataset.sort;
		if (sel == "insert") {
			flagDelBtn = false;
		} else if (sel == "upload") {
			flagDelBtn = false;
		} else if (sel == "delete") {
			flagDelBtn = true;
		}
		$('#fileInput1').click();
		console.log(sel);
	});

	// 파일 선택 시 이미지 미리보기 추가
	$(document).on('change', '#fileInput1', async function (event) {
		var file = event.target.files[0]; // 선택된 이미지 파일

		if (isImageFile(file)) { // 이미지 파일인지 확인
			var reader = new FileReader();
			reader.onload = function (e) {
				var signImg1 = $('.container-fluid').find("#signImg1");
				if (signImg1.length) {
					signImg1.attr("src", e.target.result); // 새로운 이미지 URL로 변경
					var signBtn1 = $('.container-fluid').find("#signBtn1");
				}
			};
			reader.readAsDataURL(file);
			let formData = new FormData();
			formData.append('fileList', file);
			formData.append('folderName', 'autograph/' + MEM_NO);
			formData.append('memNo', MEM_NO);
			console.log(this.dataset.no);
			if (sel == 'update') {
				formData.append('sort', 'autograph/update');
				formData.append('atgrphNo', this.dataset.no);
			} else if (sel == 'insert') {
				formData.append('sort', 'autograph/insert');
			}
			let res = await autographUpload(formData);

			if (res.data) {
				this.setAttribute('data-no', res.data);
				if (!flagDelBtn) {
					MAIN_CONTENTS.querySelector('#insertBtn1').style.display = "none";
					MAIN_CONTENTS.querySelector('#updateBtn1').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn1').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn1').setAttribute('onclick', `deleteAutograph(${res.data}, '#signImg1', '1')`);
				}
			} else {
				Swal.fire('오류발생. 다시 시도해주세요.');
			}
		} else {
			alert("이미지 파일을 선택해주세요!");
		}
	});

	$(document).on('click', '.img2nd', function () {
		sel = this.dataset.sort;
		if (sel == "insert") {
			flagDelBtn = false;
		} else if (sel == "upload") {
			flagDelBtn = false;
		} else if (sel == "delete") {
			flagDelBtn = true;
		}
		$('#fileInput2').click();
	});

	// 파일 선택 시 이미지 미리보기 추가
	$(document).on('change', '#fileInput2', async function (event) {
		var file = event.target.files[0]; // 선택된 이미지 파일

		if (isImageFile(file)) { // 이미지 파일인지 확인
			var reader = new FileReader();
			reader.onload = function (e) {
				var signImg2 = $('.container-fluid').find("#signImg2");
				if (signImg2.length) {
					signImg2.attr("src", e.target.result); // 새로운 이미지 URL로 변경
					var signBtn2 = $('.container-fluid').find("#signBtn2");
				}
			};
			reader.readAsDataURL(file);

			let formData = new FormData();
			formData.append('fileList', file);
			formData.append('folderName', 'autograph/' + MEM_NO);
			formData.append('memNo', MEM_NO);
			if (sel == 'update') {
				formData.append('sort', 'autograph/update')
				formData.append('atgrphNo', this.dataset.no)
			} else if (sel == 'insert') {
				formData.append('sort', 'autograph/insert')
			}
			let res = await autographUpload(formData);
			if (res.data) {
				this.setAttribute('data-no', res.data);
				if (!flagDelBtn) {
					MAIN_CONTENTS.querySelector('#insertBtn2').style.display = "none";
					MAIN_CONTENTS.querySelector('#updateBtn2').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn2').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn2').setAttribute('onclick', `deleteAutograph(${res.data}, '#signImg2', '2')`);
				}
			} else {
				Swal.fire('오류발생. 다시 시도해주세요.');
			}
		} else {
			alert("이미지 파일을 선택해주세요!");
		}
	});

	$(document).on('click', '.img3rd', function () {
		sel = this.dataset.sort;
		if (sel == "insert") {
			flagDelBtn = false;
		} else if (sel == "upload") {
			flagDelBtn = false;
		} else if (sel == "delete") {
			flagDelBtn = true;
		}
		$('#fileInput3').click();
	});

	// 파일 선택 시 이미지 미리보기 추가
	$(document).on('change', '#fileInput3', async function (event) {
		var file = event.target.files[0]; // 선택된 이미지 파일
		if (isImageFile(file)) { // 이미지 파일인지 확인
			var reader = new FileReader();
			reader.onload = function (e) {
				var signImg3 = $('.container-fluid').find("#signImg3");
				if (signImg3.length) {
					signImg3.attr("src", e.target.result); // 새로운 이미지 URL로 변경
					var signBtn3 = $('.container-fluid').find("#signBtn3");
				}
			};
			reader.readAsDataURL(file);
			let formData = new FormData();
			formData.append('fileList', file);
			formData.append('folderName', 'autograph/' + MEM_NO);
			formData.append('memNo', MEM_NO);
			if (sel == 'update') {
				formData.append('sort', 'autograph/update')
				formData.append('atgrphNo', this.dataset.no)
			} else if (sel == 'insert') {
				formData.append('sort', 'autograph/insert')
			}
			let res = await autographUpload(formData);

			if (res.data) {
				this.setAttribute('data-no', res.data);
				if (!flagDelBtn) {
					MAIN_CONTENTS.querySelector('#insertBtn3').style.display = "none";
					MAIN_CONTENTS.querySelector('#updateBtn3').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn3').style.display = "block";
					MAIN_CONTENTS.querySelector('#deleteBtn3').setAttribute('onclick', `deleteAutograph(${res.data}, '#signImg3', '3')`);
				}
			}
		} else {
			alert("이미지 파일을 선택해주세요!");
		}
	});
});

function validatePw() {
	var memPw = $('#memPw').val();
	var memPwCheck = $('#memPwCheck').val();
	var $invalidFeedback = $('#pwc');

	// 비밀번호의 유효성 검사 (8~16자, 영문 대/소문자, 숫자, 특수문자 포함)
	var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

	if (!pattern.test(memPw)) {
		$("#memPw").removeClass("is-valid").addClass("is-invalid"); // 유효하지 않으면 is-invalid 추가
		$invalidFeedback.show(); // 오류 메시지 표시
		$("#memPwCheck").attr("disabled", true);
	} else {
		$("#memPw").removeClass("is-invalid").addClass("is-valid"); // 유효하면 is-valid 추가
		$invalidFeedback.hide(); // 오류 메시지 숨김
		$("#memPwCheck").attr("disabled", false); // 비밀번호 확인 필드 활성화
		$("#memPwCheck").focus(); // memPwCheck에 포커스 맞추기
	}
}

function pwCheck() {
	var memPw = $('#memPw').val();
	var memPwCheck = $('#memPwCheck').val();

	if (memPwCheck.length > 0) { // 비밀번호 확인 필드에 입력이 있는 경우에만 체크
		if (memPwCheck === memPw) {
			$("#memPw").removeClass("is-invalid").addClass("is-valid");
			$("#memPwCheck").removeClass("is-invalid").addClass("is-valid");
			$("#pwv").show();
			$("#pwinv").hide();
		} else {
			$("#memPw").removeClass("is-valid").addClass("is-invalid");
			$("#memPwCheck").removeClass("is-valid").addClass("is-invalid");
			$("#pwv").hide();
			$("#pwinv").show();
		}
	} else {
		// 비밀번호 확인 필드가 비어있을 경우
		$("#memPw").removeClass("is-valid is-invalid");
		$("#pwv").hide();
		$("#pwinv").hide();
	}
}
// 비밀번호 입력 시 pwCheck() 호출
$('#memPw').on('input', function () {
	pwCheck(); // 비밀번호 입력 시 pwCheck 호출
});


function saveProfile() {

	let hostIndex = location.href.indexOf(location.host) + location.host.length;
	let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

	var imgFileInput = $(document).find('#pfImgFile');
	console.log(imgFileInput[0].files);

	var formData = new FormData();
	formData.append("memNo", MEM_NO);
	formData.append("memPw", $('#memPw').val());
	formData.append("memName", $('#memName').val());

	formData.append("imgFile", imgFileInput[0].files[0]);

	formData.append("memEmail", $('#email').val());
	formData.append("memPh", $('#memPh').val());
	formData.append("memAddr1", $('#memAddr1').val());
	formData.append("memAddr2", $('#memAddr2').val());
	formData.append("memIntr", $('#memIntr').text());

	$.ajax({
		url: "/synerhub/profile/saveUser", // 저장할 URL
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token); // CSRF 토큰 설정
		},
		data: formData,
		contentType: false,
		processData: false,
		success: function (res) {
			console.log("수정 성공", res);
			$("#memNm1").text($('#memName').val());
			$("#memNm2").text($('#memName').val());
			$("#memNm3").text($('#memName').val());
			$("#memEm1").html(`<iconify-icon icon="solar:mailbox-line-duotone" class="fs-4 me-1"></iconify-icon>` + $('#email').val())


			var reader = new FileReader();
			reader.onload = function (e) {
				$("#memPrfl1").attr("src", e.target.result);
				$("#memPrfl2").attr("src", e.target.result);
				$("#memPrfl3").attr("src", e.target.result);
			}
			reader.readAsDataURL(imgFileInput[0].files[0]);


			// SweetAlert2로 성공 메시지 표시
			Swal.fire({
				title: "프로필 변경 완료!",
				text: "'" + res.memName + "'님의 프로필이 성공적으로 변경되었습니다.",
				icon: "success",
				timer: 1500,
				showConfirmButton: false // 확인 버튼 숨김
			}).then(() => {
				myProfile(); // 프로필 화면으로 돌아가기
			});
		},
		error: function (err) {
			alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
			console.log("수정 에러", err);
		}
	});

}

$(function () {
	// 수정 버튼 클릭 시 saveProfile 함수 호출
	$(document).on('click', '#savePf1', function () {
		saveProfile();
		console.log("수정 버튼 클릭");
	});

});

// 취소 버튼 클릭시 나의 프로필로 이동 
$(function () {
	$(document).on('click', '#cancelPf1', function () {
		myProfile();
	});
	$(document).on('click', '#cancelPf2', function () {
		myProfile();
	});
});

// 전화번호 자동 하이픈 
var autoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/g, "$1-$2-$3")
		.replace(/(-{1,2})$/g, "");
}


var deleteAutograph = async (A, B, C) => {
	data = {
		atgrphNo: A
	}

	Swal.fire({
		title: "서명을 삭제하시겠습니까?",
		text: "삭제된 서명은 문의를 통해 복구가 가능합니다.",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "삭제",
		cancelButtonText: "취소"
	}).then(async (result) => {
		if (result.isConfirmed) {

			let res = await axios.post('/synerhub/autograph/delete', data, axiosHeaderJson)

			if (res.data = 'Y') {
				let img = MAIN_CONTENTS.querySelector(B);
				let src = "/synerhub/resources/assets/images/backgrounds/not-sign1.png";
				img.setAttribute('src', src);
				MAIN_CONTENTS.querySelector('#insertBtn' + C).style.display = "block";
				MAIN_CONTENTS.querySelector('#updateBtn' + C).style.display = "none";
				MAIN_CONTENTS.querySelector('#deleteBtn' + C).style.display = "none";
			}

		} else {
			Swal.fire('오류발생. 잠시후에 다시 시도해주세요.')
		}
	});

}
var autographUpload = async (A) => await axios.post('/synerhub/fileio/upload', A, axiosHeaderFile);

$(document).on('click', '#savePf2', async function () {



	// let signatureInputs = MAIN_CONTENTS.querySelectorAll('.signature');

	// let uploadFiles = [];
	// let updateFiles = [];
	// signatureInputs.array.forEach(input => input.dataset.detailno ?	updateFiles.push(input.files[0]) : uploadFiles.push(input.files[0]));

	// if(uploadFiles.length != 0 || updateFiles.length != 0) {
	// 	let atchFileId;
	// 	let formData = new FormData();
	// 	if(updateFiles.length != 0) {
	// 		updateFiles.forEach(async o => {
	// 			formData.append('fileList', o);
	// 			formData.append('folderName', "autograph/"+MEM_NO);
	// 		})
	// 		let res = await axios.post('/synerhub/fileio/update', formData, axiosHeaderFile);
	// 		atchFileId = res.data;
	// 	}
	// 	formData.delete('fileList');
	// 	uploadFiles.array.forEach( async o => {
	// 		atchFileId = atchFileNo != null ? formData.append('atchFileId', atchFileId) : null;
	// 		formData.append('fileList', o);
	// 		formData.append('folderName', "autograph/"+MEM_NO);
	// 		let uploadRes = await axios.post('/synerhub/fileio/upload', formData, axiosHeaderFile);
	// 		let data = {
	// 			memNo : MEM_NO,
	// 			memAutograph : uploadRes.data
	// 		}
	// 		res = await axios.post('/synerhub/member/autograph', data, axiosHeaderJson)
	// 		let result = res.data == 'Y' ? myProfile() : Swal.fire('다시 시도해주세요');
	// 	});
	// } else {
	// 	Swal.fire('서명사진을 등록후 저장해주세요');
	// 	return;
	// }
});

// 프로필 채널 리스트 만들기
$(document).on("click", "#profile-tab", function () {
	var myChList = $(document).find("#myChList");
	myChList.html("");

	let data = {
		memNo: MEM_NO
	}

	$.ajax({
		url: "/synerhub/profile/getChList",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			console.log(res);

			let html = '';

			for (let i = 0; i < res.length; i++) {
				html += `<tr>
							<td>
								<div class="n-chk align-self-center text-center ms-2">
									<div class="form-check">
										<input type="checkbox" class="form-check-input contact-chkbox primary" id="checkbox1" />
										<label class="form-check-label" for="checkbox1"></label>
									</div>
								</div>
							</td>
							<td>
								<p class="fw-normal mb-0 fs-3 text-dark">&nbsp;
									${i + 1}
								</p>
							</td>
							<td>
								<div class="d-flex flex-column">`;
				if (res[i].planNo == 1)
					html += `<img src="${contextPath}/resources/assets/images/backgrounds/bronze.png" class="rounded-circle" width="40" height="40" />`;
				else if (res[i].planNo == 2)
					html += `<img src="${contextPath}/resources/assets/images/backgrounds/silver.png" class="rounded-circle" width="40" height="40" />`;
				else if (res[i].planNo == 3)
					html += `<img src="${contextPath}/resources/assets/images/backgrounds/gold.png" class="rounded-circle" width="40" height="40" />`;
				else
					html += `&emsp;-`;
				html += `</div>
							</td>
							<td>
								<p class="text-dark mb-0 fw-normal">
									${res[i].chTtl}
								</p>
							</td>
							<td>
								<p class="text-dark mb-0 fw-normal">
									${res[i].chRegdt}
								</p>
							</td>
							<td>
								<p class="fw-normal mb-0 fs-3 text-dark">${res[i].chCnntdt}</p>
							</td>
						</tr>`
			}

			myChList.html(html);
		}
	})
})

$(document).on("click", "#home-tab", function () {
	StartDelList();
})

function StartDelList() {
	var delList = $(document).find("#delList");
	delList.html("");

	let data = {
		dclrId: MEM_NO
	}

	$.ajax({
		url: "/synerhub/profile/getDelList",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			console.log(res);

			let html = '';

			for (let i = 0; i < res.length; i++) {
				html += `<tr>
                              <td>
                                <p class="fw-normal mb-0 fs-3 text-dark">
                                  &nbsp;${i + 1}
                                </p>
                              </td>
                              <td>
                                <p class="text-dark mb-0 fw-normal">`;
				if (res[i].dclrSort == 1)
					html += `스팸 및 홍보`;
				else if (res[i].dclrSort == 2)
					html += `욕설 신고`;
				else if (res[i].dclrSort == 3)
					html += `음란물`;
				else if (res[i].dclrSort == 4)
					html += `허위 정보`;
				else if (res[i].dclrSort == 5)
					html += `불법 정보`;
				else if (res[i].dclrSort == 6)
					html += `기타`;
				html += `</p>
                              </td>
                              <td>
                                <div class="d-flex align-items-center">
                                  <div class="me-3">
                                    <img src="${contextPath}${res[i].dclrSubPrflimg}" alt="spike-img" class="rounded-circle" width="45" />
                                  </div>
                                  <div>
                                    <h6 class="mb-1">${res[i].dclrSubName}</h6>
                                    <p class="fs-3 mb-0">${res[i].dclrSubMemberId}</p>
                                  </div>
                                </div> 
                              </td>
                              <td>
                                <p class="mb-0">${res[i].dclrRcptYmd}</p>
                              </td>
                              <td>
                                `;
				if (res[i].dclrState == 0)
					html += `<p class="fw-bold text-warning mb-0">
										&emsp;대기`;
				else if (res[i].dclrState == 1)
					html += `<p class="fw-bold text-success mb-0">
									처리 완료`;
				html += `</p>
                             </td>
                            </tr>`
			}

			delList.html(html);
		}
	})
}