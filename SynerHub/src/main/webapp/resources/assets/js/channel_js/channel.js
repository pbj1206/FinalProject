var thNoForThMem;
var synerhubChTtl;

function inviteAlaramMessage() {
	$("#alarmMessage").html("");
	$.ajax({
		url: "/synerhub/channel/invitealarm",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
		},
		data: JSON.stringify({ memNo: MEM_NO }),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			for (let i = 0; i < res.length; i++) {
				$("#alarmMessage").append(` 
		          <a href="javascript:void(0)" class="dropdown-item px-20 d-flex align-items-center py-6" id="invitemodal" chNo="${res[i].chNo}">
						<span class="flex-shrink-0">
							<img src="${contextPath}/resources/assets/images/profile/user-2.jpg" alt="user" width="45" class="rounded-circle" />
						</span>
						<div class="w-100 ps-3 mt-3">
							<div class="d-flex align-items-center justify-content-between">
								<h5 class="mb-0 fs-3 fw-normal">${res[i].chTtl}에서<br /> ${MEM_NAME}님을 초대하였습니다.</h5>
							</div>
							<p class="fs-2 ms-2 text-nowrap d-block text-muted" style="float: right;">9:08 AM</p>
							<div class="mt-1">
								<span class="fs-2 d-block text-muted"></span>
							</div>
						</div>
					</a>`);
			}
		}
	})
}


$(document).ready(function () {

	inviteAlaramMessage();
	channelLoad();

	$("#iconClick").on("click", function () {
		createChannelPage();

		// ID를 사용하여 이벤트 리스너 추가
		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm3');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm4');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		$(document).on("click", "#subnail", function () {
			$("#formFile1").click();
		});

		$(document).on("click", "#chProfile", function () {
			$("#formFile2").click();
		});

		$(document).on("change", "#formFile1", function () {
			let input = $(this);
			if (input[0].files && input[0].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					// 기존 이미지를 고정된 크기로 유지하며 변경
					document.getElementById('subnail').innerHTML = `<img src="${e.target.result}" class="fixed-img" style="width: 200px; height: 200px;"/>`;
				};
				reader.readAsDataURL(input[0].files[0]);
			} else {
				document.getElementById('subnail').innerHTML = ""; // 초기화
			}
		});

		$(document).on("change", "#formFile2", function () {
			let input = $(this);
			if (input[0].files && input[0].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					// 기존 이미지를 고정된 크기로 유지하며 변경
					document.getElementById('chProfile').innerHTML = `<img src="${e.target.result}" class="rounded-circle" style="width: 200px; height: 200px;"/>`;
				};
				reader.readAsDataURL(input[0].files[0]);
			} else {
				document.getElementById('chProfile').innerHTML = ""; // 초기화
			}
		});

		// 채널 등록 버튼 클릭 이벤트
		$("#createN4").off("click").on("click", function () {
			$(this).prop("disabled", true);

			var formData = new FormData();
			let inviteList = [];
			let threadNameList = [];
			let threadColorList = [];

			// 초대할 멤버 ID 수집
			$('#inputContainer input').each(function () {
				let memberId = $(this).val().trim();
				if (memberId) {
					inviteList.push(memberId);
				}
			});

			// 스레드 제목
			$('#inputContainer2 input[type="text"]').each(function () {
				let thName = $(document).find("#thName").val().trim();
				if (thName) {
					threadNameList.push($(this).val().trim());
				}
			});

			// 스레드 색상
			$('#inputContainer2 input[type="color"]').each(function () {
				threadColorList.push($(this).val().trim());
			});

			// formData에 값 추가
			formData.append("chTtl", $(document).find("#chTtl").val());

			// 파일 입력 요소가 존재하는지 확인하고 파일이 선택되었는지 체크
			let formFile1 = $(document).find("#formFile1")[0];
			if (formFile1 && formFile1.files.length > 0) {
				formData.append("imgFile", formFile1.files[0]);
			}

			formData.append("chCmnt", $(document).find("#chComment").val());
			formData.append("chMemNm", $(document).find("#memName").val());

			let formFile2 = $(document).find("#formFile2")[0];
			if (formFile2 && formFile2.files.length > 0) {
				formData.append("chPrfImg", formFile2.files[0]);
			}

			let memId = $(document).find("#addMember1").val().trim();
			formData.append("memId", memId || "");

			formData.append("thTtl", thTtl);
			formData.append("inviteList", JSON.stringify(inviteList));
			formData.append("threadNameList", JSON.stringify(threadNameList));
			formData.append("threadColorList", JSON.stringify(threadColorList));
			formData.append("memNo", MEM_NO);
			
			$.ajax({
				url: "/synerhub/channel/insert",
				type: "post",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: formData,
				contentType: false,
				processData: false,
				success: function (result) {
					swal.fire("채널 등록이 완료되었습니다.");
					$("#divChannelList").html("");
					channelLoad();
				},
				error: function (xhr, status, error) {
					swal.fire("채널 등록에 실패했습니다: " + error);
				},
				complete: function () {
					$("#createN4").prop("disabled", false);
				}
			});
		});
	})

	// 채널 생성 처음할때

	$(document).on("click", "#invitemodal", function () {
		let chNo = $(this).attr("chNo");

		$("#modalArea").html(`
					<div class="modal fade" id="chMemProfileModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">  
						<div class="modal-dialog" style="width: 45%;">
							<div class="modal-content">
								<div class="modal-header">
									<h1 class="card-title mt-3 mb-0" style="color: black; font-size: 1.5rem; flex-grow: 1; text-align: center;">채널 멤버 정보</h1>
									<button type="button" class="btn-close" id="closeButton" data-bs-dismiss="modal" aria-label="Close"> </button>
								</div>
								<div class="modal-body" id="chMemNmBox">
									<div class="mb-4 row align-items-center">
										<h5 class="fs-4 fw-semibold mb-3">채널에서 사용할 이름</h5>
										<div class="input-group">
											<input type="text" class="form-control" id="chMemNm" value="${MEM_NAME}" />
										</div>
									</div>
									<form action="/declaration/register" method="post" class="mt-3" enctype="multipart/form-data">
										<h5 class="fs-4 fw-semibold mb-3">채널에서 사용할 프로필 사진</h5>
										<input class="form-control" type="file" id="chMemProfile">
										<div class="chProfileList"></div>
									</form>
									<div class="row mt-3">
										<div class="d-flex mb-3 align-items-center gap-6" style="justify-content: center;">
											<button class="btn btn-primary" onclick="acceptInvite(${chNo})" data-bs-dismiss="modal">수락</button>
											<button class="btn bg-warning-subtle text-warning" onclick="denyInvite(${chNo})" data-bs-dismiss="modal">거절</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`)

		$("#modalArea").find("#chMemProfileModal").modal("show");
	});

	$(document).on("change", "#chMemProfile", function () {
		let input = $(this);
		if (input[0].files && input[0].files[0]) {
			$(".chProfileList").html("");
			for (let i = 0; i < input[0].files.length; i++) {
				let file = input[0].files[i];
				eqpImgCheck[i] = file;
				var reader = new FileReader();
				reader.onload = function (e) {
					let html = `
					<div class="me-1" style="position: relative; display: inline-block;">
						<img src="${e.target.result}" style="width: 200px; height: 200px;" />
					</div>`;
					$(".chProfileList").append(html);
				};
				reader.readAsDataURL(file);
			}
		}
	});

	// 채널 생성시 폼
	$("#chInsert").on("click", function () {
		createChannelPage();

		// ID를 사용하여 이벤트 리스너 추가
		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널' + ' 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm3');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널' + ' 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		document.getElementById('chTtl').addEventListener('input', function () {
			const channelName = this.value; // 입력 필드의 값 가져오기
			const displayElement = document.getElementById('channelNm4');

			if (channelName) {
				displayElement.textContent = "'" + channelName + "'" + ' 채널' + ' 생성 중...'; // 입력된 채널명으로 업데이트
			} else {
				displayElement.textContent = '생성 중...'; // 기본 텍스트로 복원
			}
		});

		$(document).on("click", "#subnail", function () {
			$("#formFile1").click();
		});

		$(document).on("click", "#chProfile", function () {
			$("#formFile2").click();
		});

		$(document).on("change", "#formFile1", function () {
			let input = $(this);
			if (input[0].files && input[0].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					// 기존 이미지를 고정된 크기로 유지하며 변경
					document.getElementById('subnail').innerHTML = `<img src="${e.target.result}" class="fixed-img" style="width: 200px; height: 200px;"/>`;
				};
				reader.readAsDataURL(input[0].files[0]);
			} else {
				document.getElementById('subnail').innerHTML = ""; // 초기화
			}
		});

		$(document).on("change", "#formFile2", function () {
			let input = $(this);
			if (input[0].files && input[0].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					// 기존 이미지를 고정된 크기로 유지하며 변경
					document.getElementById('chProfile').innerHTML = `<img src="${e.target.result}" class="rounded-circle" style="width: 200px; height: 200px;"/>`;
				};
				reader.readAsDataURL(input[0].files[0]);
			} else {
				document.getElementById('chProfile').innerHTML = ""; // 초기화
			}
		});

		// 채널 등록 버튼 클릭 이벤트
		$("#createN4").off("click").on("click", function () {
			$(this).prop("disabled", true);

			var formData = new FormData();
			let inviteList = [];
			let threadNameList = [];
			let threadColorList = [];

			// 초대할 멤버 ID 수집
			$('#inputContainer input').each(function () {
				let memberId = $(this).val().trim();
				if (memberId) {
					inviteList.push(memberId);
				}
			});

			// 스레드 제목
			$('#inputContainer2 input[type="text"]').each(function () {
				let thName = $(document).find("#thName").val().trim();
				if (thName) {
					threadNameList.push($(this).val().trim());
				}
			});

			// 스레드 색상
			$('#inputContainer2 input[type="color"]').each(function () {
				threadColorList.push($(this).val().trim());
			});

			// formData에 값 추가
			formData.append("chTtl", $(document).find("#chTtl").val());

			// 파일 입력 요소가 존재하는지 확인하고 파일이 선택되었는지 체크
			let formFile1 = $(document).find("#formFile1")[0];
			if (formFile1 && formFile1.files.length > 0) {
				formData.append("imgFile", formFile1.files[0]);
			}

			formData.append("chCmnt", $(document).find("#chComment").val());
			formData.append("chMemNm", $(document).find("#memName").val());

			let formFile2 = $(document).find("#formFile2")[0];
			if (formFile2 && formFile2.files.length > 0) {
				formData.append("chPrfImg", formFile2.files[0]);
			}

			let memId = $(document).find("#addMember1").val().trim();
			formData.append("memId", memId || "");

			formData.append("thTtl", thTtl);
			formData.append("inviteList", JSON.stringify(inviteList));
			formData.append("threadNameList", JSON.stringify(threadNameList));
			formData.append("threadColorList", JSON.stringify(threadColorList));
			formData.append("memNo", MEM_NO);

			$.ajax({
				url: "/synerhub/channel/insert",
				type: "post",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: formData,
				contentType: false,
				processData: false,
				success: function (result) {
					swal.fire("채널 등록이 완료되었습니다.");
					$("#divChannelList").html("");
					channelLoad();
				},
				error: function (xhr, status, error) {
					swal.fire("채널 등록에 실패했습니다: " + error);
				},
				complete: function () {
					$("#createN4").prop("disabled", false);
				}
			});
		});
	})

	// inputButton
	$('#main_contents').on('click', '#addInputButton', function () {
		// 새로운 입력 필드와 삭제 버튼을 포함하는 div 생성
		const inputContainer = $('<div>', { class: 'd-flex align-items-center mb-2' });
		const inputField = $('<input>', {
			type: 'text',
			class: 'form-control',
			placeholder: '초대할 멤버 ID'
		});

		// 삭제 버튼
		const removeButton = $('<button>', {
			type: 'button',
			class: 'btn bg-danger fw-medium ms-3' // 클래스 추가
		}).html('<i class="ti ti-circle-minus fs-6 d-flex text-white"></i>');

		// 클릭 이벤트 핸들러 추가: 삭제 버튼 클릭 시 해당 필드 제거
		removeButton.on('click', function () {
			inputContainer.remove(); // 해당 inputContainer를 제거
		});

		// 생성한 요소들을 inputContainer에 추가
		inputContainer.append(inputField).append(removeButton);

		// 최종적으로 inputContainer를 기존의 inputContainer에 추가
		$('#inputContainer').append(inputContainer);
	});

	// 입력 필드를 삭제하는 이벤트 핸들러
	$('#main_contents').on('click', '.removeInputButton', function () {
		$(this).closest('.d-flex').remove(); // 삭제 버튼이 클릭된 입력 필드를 제거
	});


	// InputButton2
	$('#main_contents').on('click', '#addInputButton2', function () {
		// 새로운 입력 필드를 포함하는 div 생성
		const inputContainer = $('<div>', { class: 'd-flex align-items-center mb-2' });

		// 스레드명 입력 필드
		const inputField = $('<input>', {
			type: 'text',
			class: 'form-control',
			placeholder: '스레드명'
		});

		// 색상 선택 입력 필드 추가
		const colorInputContainer = $('<div>', { class: 'form-group ms-3' }); // 색상 선택 필드를 포함할 div
		const colorInput = $('<input>', {
			type: 'color',
			class: 'form-control form-control-color',
			title: 'Choose your color',
			value: '#563d7c' // 기본 색상
		});
		colorInputContainer.append(colorInput); // 색상 선택 필드를 해당 div에 추가

		// 삭제 버튼
		const removeButton = $('<button>', {
			type: 'button',
			class: 'btn bg-danger fw-medium ms-3'
		}).html('<i class="ti ti-circle-minus fs-6 d-flex text-white"></i>'); // 삭제 아이콘

		// 클릭 이벤트 핸들러 추가: 삭제 버튼 클릭 시 해당 필드 제거
		removeButton.on('click', function () {
			inputContainer.remove(); // 해당 inputContainer를 제거
		});

		// 생성한 요소들을 inputContainer에 추가
		inputContainer.append(inputField).append(colorInputContainer).append(removeButton);

		// 최종적으로 inputContainer를 기존의 inputContainer2에 추가
		$('#inputContainer2').append(inputContainer);
	});



	// 입력 필드를 삭제하는 이벤트 핸들러
	$('#main_contents').on('click', '.removeThreadButton', function () {
		$(this).closest('.d-flex').remove(); // 삭제 버튼이 클릭된 입력 필드를 제거
	});






	// 카드 전환 함수
	function hideAllCards() {
		$('.card.mt-4').hide().removeClass('active');
	}

	function showCard(cardId) {
		$('#' + cardId).show().addClass('active');
	}

	$('#main_contents').on('click', '#createC1', function () {
		// URL 변경
		history.pushState(null, '', '/synerhub/main');

		// AJAX 요청으로 페이지 내용 로드
		$.ajax({
			url: "/synerhub/main",
			type: "GET",
			success: function (data) {
				$('#main_contents').html(data);
			},
			error: function (xhr, status, error) {
				alert("페이지 로드에 실패했습니다: " + error);
			}
		});
	});

	// 버튼 클릭 이벤트
	$('#main_contents').on('click', '#createN1', function () {
		var chTtl = $("#chTtl").val();
		var chLmg = $("#formFile1").val();
		if (chTtl == null || chTtl == "") {
			swal.fire("채널명을 입력해주세요.");
			return false;
		}
		if (chLmg == null || chLmg == "") {
			swal.fire("채널로고를 넣어주세요.");
			return false;
		}
		hideAllCards();
		showCard('createDiv2');
	});

	$('#main_contents').on('click', '#createP2', function () {

		hideAllCards();
		showCard('createDiv1');
	});

	$('#main_contents').on('click', '#createN2', function () {
		var memName = $("#memName").val();
		if (memName == null || memName == "") {
			swal.fire("이름을 입력해주세요");
			return false;
		}
		hideAllCards();
		showCard('createDiv3');
	});

	$('#main_contents').on('click', '#createP3', function () {
		hideAllCards();
		showCard('createDiv2');
	});

	$('#main_contents').on('click', '#createN3', function () {
		hideAllCards();
		showCard('createDiv4');
	});

	$('#main_contents').on('click', '#createP4', function () {
		hideAllCards();
		showCard('createDiv3');
	});
});

function acceptInvite(chNo) {
	var formData = new FormData();
	formData.append("chNo", chNo);
	formData.append("memNo", MEM_NO);
	formData.append("chMemNm", $("#chMemNm").val());

	let chMemProfile = $("#chMemProfile")[0];
	formData.append("chMemProfile", chMemProfile.files[0]);

	$.ajax({
		url: "/synerhub/channel/acceptInvite",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token);
		},
		data: formData,
		contentType: false,
		processData: false,
		success: function (res) {
			swal.fire("초대 완료되었습니다.");
			inviteAlaramMessage();
			channelLoad();
		}
	})
};

function denyInvite(chNo) {
	let data = {
		chNo : chNo,
		memNo : MEM_NO
	}
	$.ajax({
		url: "/synerhub/channel/denyInvite",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			Swal.fire('초대 거절 되었습니다.', '', 'success');
			inviteAlaramMessage();
		}
	});
}



function addDropdownClass(A) {
	let element;
	if (isNaN(A)) {
		if (toString(A).indexOf("Setting") != 0) {
			element = document.querySelector('.scroll-sidebar.left').querySelector('#' + A);
		}
	} else {
		element = document.querySelector('.scroll-sidebar.left').querySelector('#channel' + A);
	}
	element.childNodes[1].classList.toggle('active');
	element.childNodes[3].classList.toggle('in');
}

function synerhubTheChannel(A) {
	addDropdownClass(A)
	synerhubch = A;
	synerhubth = null;
	const chNo = A;
	chHome(chNo);
}

// 로그인시 나오는 화면 생성(가입된 채널 없을때)
function channelLoad() {
	let no = { memNo: MEM_NO };
	$.ajax({
		url: "/synerhub/channel/list",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token);
		},
		data: JSON.stringify(no),
		contentType: "application/json; charset=utf-8",
		success: async function (res) {
			var html = "";
			for (var i = 0; i < res.length; i++) {
				if (res.length > 0) {
					mainSet(res);
				}
				let chData = await getChData(res[i].chNo);
				let creator = chData.num;
				// let li = document.createElement('li');
				// li.className = "sidebar-item";
				// li.id = 'channel'+res[i].chNo;
				// let a = document.createElement('a');
				// a.classList.add("sidebar-link");
				// a.classList.add("has-arrow");
				// a.classList.add("success-hover-bg");
				html += `
            <li class="sidebar-item" id="channel${res[i].chNo}">
              <a class="sidebar-link has-arrow primary-hover-bg" href="javascript:synerhubTheChannel(${res[i].chNo})" aria-expanded="false">
                  <span class="aside-icon p-2 bg-primary-subtle rounded-1">
                      <i class="ti ti-buildings fs-6"></i>
                  </span>
                  <span class="hide-menu ps-1">${res[i].chTtl}</span>
              </a>
              <ul aria-expanded="false" class="collapse first-level">`;
				for (var j = 0; j < res[i].thList.length; j++) {
					html += `
              <li class="sidebar-item"> 
			  <input type="hidden" value="${res[i].thList[j].thClr}" id="hiddenClr"/>
                <a href="javascript:synerhubTheThread(${res[i].thList[j].thNo})" class="sidebar-link danger-hover-bg">
                    <span class="sidebar-icon"></span>
					<span class="hide-menu">${res[i].thList[j].thTtl}</span>
                </a> 
              </li>`;
				}
				if (creator == MEM_NO) {
					html += ` 
              <li class="sidebar-item" id="channelSetting${res[i].chNo}">
                  <a class="sidebar-link has-arrow warning-hover-bg" onclick="addDropdownClass('channelSetting${res[i].chNo}')" aria-expanded="false" style="cursor: pointer">
                    <span class="sidebar-icon"></span>
                    <span class="hide-menu">채널 설정</span>
                  </a>
                  <ul aria-expanded="false" class="collapse two-level">
                    <li class="sidebar-item">
                      <a onclick="channelTreeSetter(${res[i].chNo})" class="sidebar-link indigo-hover-bg" style="cursor: pointer">
                        <span class="sidebar-icon"></span>
                        <span class="hide-menu">멤버 규칙</span>
                      </a>
                    </li>   
                    <li class="sidebar-item">
                      <a onclick="channelInvite(${res[i].chNo})" class="sidebar-link indigo-hover-bg" style="cursor: pointer">
                        <span class="sidebar-icon"></span>
                        <span class="hide-menu">채널 초대</span>
                      </a>
                    </li>   
                  </ul> 
                </li>`;
				}
				html += ` 
                <button id="thInsert" class="btn btn-rounded btn-outline-light mb-5 ms-5 rounded-circle round-40 btn-sm d-inline-flex align-items-center justify-content-center">
                  <i class="ti ti-plus fs-5 text-dark text-center d-block"></i>
                </button>
                </ul>
            </li>
                  `;
			}
			$("#divChannelList").html(html);
		},
		error: function (err) {
			console.error("채널 리스트 로드 중 오류 발생:", err);
		}
	});
}

function channelInvite() {
	let html = `
			<!-- 채널 초대 모달 -->
			<div class="modal fade" id="channelInviteModal" tabindex="-1" aria-labelledby="channelInviteModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
							<div class="modal-content">
									<div class="modal-header border-bottom">
											<h3 class="modal-title" id="channelInviteModalLabel">채널 초대</h3>
											<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body" style="max-height: 300px; overflow-y: auto;">
											<div class="row">
													<div class="col-md-12">
															<div class="mt-2 mb-3">
																	<label class="form-label" for="int1">
																			채널 멤버 초대
																			<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널을 함께 이용할 사용자 ID를 추가해주세요.">
																					<iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
																			</button>
																	</label>
																	<div id="inputChannelContainer">
																			<div class="d-flex align-items-center mb-2">
																					<input type="text" class="form-control" id="addMember1" placeholder="초대할 멤버 ID" />
																					<button type="button" id="addInputButton" class="btn btn-success fw-medium ms-3" onclick="addMemberInput()">
																							<i class="ti ti-circle-plus fs-6 d-flex"></i>
																					</button>
																			</div>
																	</div>
															</div>
													</div>
											</div>
									</div>
									<div class="modal-footer justify-content-center">
											<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="InviteChannelMember()">초대</button>
											<button type="button" class="btn bg-danger-subtle text-danger ms-2" data-bs-dismiss="modal">취소</button>
									</div>
							</div>
					</div>
			</div>
	`;

	// 모달을 DOM에 추가
	document.body.insertAdjacentHTML('beforeend', html);

	// 모달 표시
	const channelInviteModal = new bootstrap.Modal(document.getElementById('channelInviteModal'));
	channelInviteModal.show();

	// 모달이 닫힐 때 DOM에서 제거
	document.getElementById('channelInviteModal').addEventListener('hidden.bs.modal', function () {
		this.remove();
	});
}

function InviteChannelMember() {
	// 초대할 멤버 ID 수집

	var formData = new FormData();
	let channelInviteList = [];
	$('#inputChannelContainer input').each(function () {
		channelInviteList.push($(this).val().trim());
	});


	formData.append("channelInviteList", JSON.stringify(channelInviteList));
	formData.append("chNo", synerhubch);
	$.ajax({
		url: "/synerhub/channel/channelInsertMember",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token);
		},
		data: formData,
		contentType: false,
		processData: false,
		success: function (res) {
			swal.fire("초대 완료하였습니다.");
		}
	})
}

// 멤버 입력 필드를 추가하는 함수
function addMemberInput() {
	const inputChannelContainer = document.getElementById('inputChannelContainer');
	const newInput = document.createElement('div');
	newInput.className = 'd-flex align-items-center mb-2';
	newInput.innerHTML = `
			<input type="text" class="form-control" placeholder="초대할 멤버 ID" />
			<button type="button" class="btn bg-danger-subtle text-danger fw-medium ms-3" onclick="removeMemberInput(this)">
					<i class="ti ti-circle-minus fs-6 d-flex"></i>
			</button>
	`;
	inputChannelContainer.appendChild(newInput);
}

// 멤버 입력 필드를 제거하는 함수
function removeMemberInput(button) {
	const inputField = button.parentElement;
	inputField.remove();
}

// 메인화면 가입된 채널이 있는 경우 
function mainSet(chList) {
	html = `<div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">가입 채널</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="../main/index.html">가입 채널</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">Channel List</li>
                </ol>
              </nav>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
 
              <div class="mb-4" role="tablist">
                <h3>가입된 채널</h3>
              </div>
              <div class="row">
`;


	for (var i = 0; i < chList.length; i++) {
		html += ` <div class="col-lg-3 col-md-4">
                <div class="card overflow-hidden">
                  <div class="el-card-item pb-3">
                    <div class="
                        el-card-avatar
                        mb-3
                        el-overlay-1
                        w-100
                        overflow-hidden
                        position-relative
                        text-center
                      ">
                      <a class="image-popup-vertical-fit" href="javascript:synerhubTheChannel(${chList[i].chNo})" >
                        <img src="${contextPath}${chList[i].chLmg}" class="d-block position-relative w-100 channelCard" alt="user" style="object-fit: contain;"/>
                      </a>
                    </div>
                       
                    <div class="d-flex justify-content-center align-items-center mx-3 w-100"> 
					    <div class="me-1"> <!-- 이미지 div -->`;
		if (chList[i].planNo == 1 && chList[i].planCcl == 1) {
			html += `  <img src="${contextPath}/resources/assets/images/backgrounds/bronze.png" alt="spike-img" class="rounded-circle" width="45">`
		} else if (chList[i].planNo == 2 && chList[i].planCcl == 1) {
			html += `  <img src="${contextPath}/resources/assets/images/backgrounds/silver.png" alt="spike-img" class="rounded-circle" width="45">`
		} else if (chList[i].planNo == 3 && chList[i].planCcl == 1) {
			html += `  <img src="${contextPath}/resources/assets/images/backgrounds/gold.png" alt="spike-img" class="rounded-circle" width="45">`
		} else {

		}

		html += `</div>
					    <div class="el-card-content d-flex flex-column text-center flex-grow-1 me-5"> <!-- 가운데 정렬을 위한 flex 설정 -->
					        <h4 class="mb-0 card-title mb-1">${chList[i].chTtl}</h4>
					        <p class="card-subtitle"><i class="ti ti-users me-1"></i>${chList[i].channelTotal}</p>
					    </div>
					</div>



                    
                  </div>
                </div>
                </div>`
	}


	html += `  </div>
            </div>
          </div>

`
	MAIN_CONTENTS.innerHTML = html;
	settingChHeight();
}

function settingChHeight() {
	var channelCards = $(document).find(".channelCard");
	for (let i = 0; i < channelCards.length; i++) {
		let width = channelCards.eq(i).css("width");
		channelCards.eq(i).css("height", width);
	}
}

// 채널 메인화면
function chHome(chNo) { 

	chNo = synerhubch;

	let channelMain = {
		chNo: chNo,
		memNo: MEM_NO

	};

	$.ajax({
		url: "/synerhub/channel/select",
		type: "post",
		beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
		},
		data: JSON.stringify(channelMain),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			synerhubChTtl = res.chTtl;
			var channelBoard = res.channelBoardList;
			var threadList = res.thList;
			var channelNotice = res.channelNoticeList;
			var channelMember = res.channelMemberList;
			var html = "";
			html += `
          <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">${synerhubChTtl}</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="../main/index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page" id="threadTtl">${res.chTtl}</li>
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
	                    <h3 class="me-7 mb-0 fs-7">${res.chTtl}</h3>
	                  </div>
	                </div>
	                <div class="col-lg-4 order-lg-2 order-2" style="position: absolute; padding-left: 65%;">
	                  <div class="d-flex align-items-center justify-content-around m-4">
	                    <div style="cursor:pointer;" onclick="myPjtMainCallback()" class="text-center me-4">
	                      <i class="ti ti-file-description fs-6 d-block mb-2"></i>
	                      <h4 class="mb-0 lh-1 text-nowrap">${res.pjtOnGoingCnt} 건</h4>
	                      <p class="mb-0 text-nowrap">프로젝트 수</p> 
	                    </div>
	                
	                    <div class="text-center ms-4 me-4">
	                        <i class="ti ti-users fs-6 d-block mb-2"></i>
	                        <h4 class="mb-0 lh-1 text-nowrap">${res.channelTotal} 명</h4>
	                        <p class="mb-0 text-nowrap">채널 인원</p> 
	                    </div>
	
	                  </div>
	                </div>
	
	              </div>
	              <button class="btn btn-danger px-3 shadow-none me-3" onclick="channelExit(${chNo})">
	                <i class="ti ti-logout"></i>
	                	나가기
	              </button>
	            </div>
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
	              <!-- 스레드 목록 카드 -->
	              <div class="card">
	                <div class="card-body position-relative">
	                  <div class="d-flex mb-2 justify-content-between align-items-center">
	                    <h4 class="card-title mb-0">스레드 목록</h4>
	                  </div>
	                  `
			if (threadList.length === 0) {
				html += `
	                  <div class="table-responsive" style="height: 242px;" data-simplebar>
	                    <table class="table table-borderless align-middle text-nowrap mb-1">
	                        <thead>
	                            <tr>
	                                <th scope="col">&emsp;스레드명</th>
	                                <th class="text-center" scope="col">스레드장</th>
	                                <th class="text-center" scope="col">인원 수</th>
	                                <th class="text-center" scope="col">&emsp;&emsp;</th>
	                            </tr>
	                        </thead>
	                        <tbody id="threadList">
	                            <tr>
	                                <td colspan="7" class="text-center">스레드가 존재하지 않습니다.</td>
	                            </tr>
	                    `
			} else {
				html += `
	                  <div class="table-responsive" style="height: 242px;" data-simplebar>
	                    <table class="table table-borderless align-middle text-nowrap mb-1">
	                        <thead>
	                            <tr>
	                                <th scope="col">&emsp;스레드명</th>
	                                <th class="text-center" scope="col">스레드장</th>
	                                <th class="text-center" scope="col">인원 수</th>
	                                <th class="text-center" scope="col">&emsp;&emsp;</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                        `
				for (var i = 0; i < threadList.length; i++) {
					html += `
	                            <tr>
	                                <td>
	                                    <div class="d-flex align-items-center ms-1">
	                                        <div class="me-3">
	                                            <img src="${contextPath}/resources/assets/images/profile/user-2.jpg" width="25" class="rounded-1" alt="spike-img" />
	                                        </div>
	                                        <div>`
					if (threadList[i].thboardAuthority == 1) {
						thNoForThMem = threadList[i].thNo;

						html +=
							`<h6 class="mb-1 fw-bolder">${threadList[i].thTtl}⭐</h6>`;
					} else {
						html +=
							`<h6 class="mb-1 fw-bolder">${threadList[i].thTtl}</h6>`;
					}
					html += `
	                                        </div>
	                                    </div>
	                                </td>
	                                <td>
	                                    <p class="fs-3 fw-normal mb-0 text-center">${threadList[i].threadLeader}</p>
	                                </td>
	                                <td>
	                                    <p class="fs-3 fw-normal mb-0 text-center">${threadList[i].thMemCount} 명</p>
	                                </td>
	                                <td class="text-center">
	                                  <button class="btn btn-sm bg-primary-subtle text-primary rounded-pill fs-2 me-1 goThread" data-th-no="${threadList[i].thNo}" id="goThread"><i class="ti ti-chevrons-right fs-2"></i></button>
	                                </td>
	                            </tr>
	                          `
				}
			}
			html += `
	                        </tbody>
	                    </table>
	                  </div>
	                </div>
	              </div>
	              <!-- 스레드 목록 카드 끝 -->
	
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
	                    <div class="card-body p-4 hover" id="channelMainToApprove" style="cursor: pointer;">
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
	                    <div class="card-body p-4" id="channelMainToOngoing" style="cursor: pointer;">
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
	
	              <!-- 전체 공지사항 현황 -->
	              <div class="card" style="overflow: hidden; height: 530px;">
								`
			if (channelNotice.length == 0) {
				html += `
	                  <div class="card-body p-4"  id="divChannelNotice" data-ch-ttl="${res.chTtl}" onclick="channelNtc(${chNo})" style="cursor: pointer; ">
	                      <div class="d-flex mb-4 justify-content-between align-items-center" style="gap: 16px;">
														<h4 class="card-title mt-3 ms-2" style="margin-right: auto;">${res.chTtl} 공지사항</h4>
														<h6 style="padding-right: 32px;">더보기</h6> 
												</div>
	                      <div class="table-responsive" data-simplebar>
	                          <table class="table table-borderless align-middle text-nowrap mb-1">
	                              <thead class="table-primary table-striped ext-nowrap align-middle">
	                                  <tr>
																				<th></th>
	                                      <th scope="col">제목</th>
	                                      <th scope="col">작성일</th>
	                                      <th scope="col">작성자</th>
	                                      <th scope="col">조회수</th>
	                                  </tr>
	                              </thead>
	                              <tbody>
	                                <tr>
	                                    <td colspan="6" class="text-center">공지사항이 존재하지 않습니다.</td>
	                                </tr>
	                              </tbody>
	                          </table>
	                      </div>
	                  </div>
									`
			} else {
				html += `
										<div class="card-body p-4"  id="divChannelNotice" data-ch-no="${chNo}" data-ch-ttl="${res.chTtl}" onclick="channelNtc(${chNo})" style="cursor: pointer;">
	                      <div class="d-flex mb-4 justify-content-between align-items-center" style="gap: 16px;">
														<h4 class="card-title mt-3 ms-2" style="margin-right: auto;">${res.chTtl} 공지사항</h4>
														<h6 style="padding-right: 32px;">더보기</h6> 
												</div>
	                      <div class="table-responsive" data-simplebar>
	                          <table class="table table-borderless align-middle text-nowrap mb-1">
	                              <thead class="table-primary table-striped ext-nowrap align-middle">
	                                  <tr>
	                                      <th scope="col"><span style="margin-left:20px;">제목</span></th>
	                                      <th scope="col">작성자</th>
	                                      <th scope="col">작성일</th>
	                                      <th scope="col" style="text-align: center">조회수</th>
	                                  </tr>
	                              </thead>
	                              <tbody>
																`
				for (var k = 0; k < Math.min(channelNotice.length, 7); k++) {
					html += `
								<tr>
										<td class="ps-0"><span  style="margin-left:35px;">${channelNotice[k].brdTtl}</span></td> 
										<td><span class="mb-1 badge text-bg-light">${channelNotice[k].brdWrtrNm}</span></td>
										<td>${channelNotice[k].formattedBrdRgdt}</td>
										<td style="text-align: center"><p class="mb-1 badge bg-indigo-subtle text-indigo">${channelNotice[k].brdHit}</p></td>
								</tr>
								`;
				}

				html += `
																</tbody>
														</table>
												</div>
										</div>`;
			}
			html += `
	              </div>
	              <!-- 전체 공지사항 끝 -->
	            </div>
	            <!-- 결재 카드 & 일일 업무 보고 끝 -->
	          </div>
	          <!-- 첫 로우 끝 -->
	
	
	          <!-- 두번째 로우 시작 -->
	          <div class="row">
	            <!-- 다가오는 일정 -->
	            <div class="col-lg-4">
	              <div class="card acedamic">
	                <div class="card-body">
	                  <div class="d-flex mb-4 justify-content-between align-items-center">
	                    <h4 class="card-title mb-0">가상화폐</h4>
											<div>
												<div>
													<iconify-icon onclick="coinRefreshBtnSetter()" id="coinRefreshBtn" icon="ic:round-refresh" width="30" height="30"  style="color: black; cursor:pointer"></iconify-icon>
												</div>
											</div>
	                  </div>
	                  <!-- Nav tabs -->
	                  <ul class="nav nav-tabs shadow justify-content-between" role="tablist">
	                    <li class="nav-item">
	                      <a class="nav-link me-1 active w-100" data-bs-toggle="tab" href="#one" role="tab">
	                        <span>-1H</span>
	                      </a>
	                    </li>
	                    <li class="nav-item">
	                      <a class="nav-link" data-bs-toggle="tab" href="#two" role="tab">
	                        <span>-24H</span>
	                      </a>
	                    </li>
	                    <li class="nav-item">
	                      <a class="nav-link" data-bs-toggle="tab" href="#three" role="tab">
	                        <span>-7D</span>
	                      </a>
	                    </li>
	                    <li class="nav-item">
	                      <a class="nav-link" data-bs-toggle="tab" href="#four" role="tab">
	                        <span>-30D</span>
	                      </a>
	                    </li>
	                    <li class="nav-item">
	                      <a class="nav-link" data-bs-toggle="tab" href="#five" role="tab">
	                        <span>-90D</span>
	                      </a>
	                    </li>
	                  </ul>
	                  <!-- Tab panes -->
	                  <div class="tab-content mt-3">
	                    <div class="tab-pane active" id="one" role="tabpanel">
	                      <div class="tab-content" data-simplebar>
	                        <div class="row mt-1 gx-0">
	                          <table id="coinTable" class="table table-hover table-bordered">
															<thead id="coinTableHead">

															</thead>
															<tbody id="coinTableBody1st">

															</tbody>
	                          </table>
	                        </div>
	                      </div>
	                    </div>
	                    <div class="tab-pane active" id="two" role="tabpanel">
	                      <div class="tab-content" data-simplebar>
	                        <div class="row mt-1 gx-0">
	                          <table id="coinTable" class="table table-hover table-bordered">
															<thead id="coinTableHead">

															</thead>
															<tbody id="coinTableBody2nd">

															</tbody>
	                          </table>
	                        </div>
	                      </div>
	                    </div>
	                    <div class="tab-pane active" id="three" role="tabpanel">
	                      <div class="tab-content" data-simplebar>
	                        <div class="row mt-1 gx-0">
	                          <table id="coinTable" class="table table-hover table-bordered">
															<thead id="coinTableHead">

															</thead>
															<tbody id="coinTableBody3rd">

															</tbody>
	                          </table>
	                        </div>
	                      </div>
	                    </div>
	                    <div class="tab-pane active" id="four" role="tabpanel">
	                      <div class="tab-content" data-simplebar>
	                        <div class="row mt-1 gx-0">
	                          <table id="coinTable" class="table table-hover table-bordered">
															<thead id="coinTableHead">

															</thead>
															<tbody id="coinTableBody4th">

															</tbody>
	                          </table>
	                        </div>
	                      </div>
	                    </div>
	                    <div class="tab-pane active" id="five" role="tabpanel">
	                      <div class="tab-content" data-simplebar>
	                        <div class="row mt-1 gx-0">
	                          <table id="coinTable" class="table table-hover table-bordered">
															<thead id="coinTableHead">

															</thead>
															<tbody id="coinTableBody5th">

															</tbody>
	                          </table>
	                        </div>
	                      </div>
	                    </div>
											<button id="coinPagePrev" onclick="coinPagePrev()" class="btn pe-0 ps-0 position-absolute top-50 start-0 translate-middle-y" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
												<iconify-icon icon="grommet-icons:previous" width="30" height="517" style="color: black"></iconify-icon>	
												<span class="visually-hidden">Previous</span>
											</button>
											<button id="coinPageNext" onclick="coinPageNext()" class="btn pe-0 ps-0 position-absolute top-50 end-0 translate-middle-y" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
												<iconify-icon icon="grommet-icons:next" width="30" height="517" style="color: black"></iconify-icon>
												<span class="visually-hidden">Next</span>
											</button>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <!-- 다가오는 일정 끝 -->
	
	            <!-- 채널 게시판 -->  
	            <div class="col-lg-8">
	              <div class="card">
	                `
			if (channelBoard.length == 0) {
				html += `
	                <div class="card-body p-4" id="divChannelBoard" data-th-ttl="${res.chTtl}" onclick="channelBoard(${chNo})" style="cursor: pointer; height: 539px;"> 
	                  <div class="d-flex mb-4 justify-content-between align-items-center">
	                    <h4 class="card-title mt-3 ms-2">${res.chTtl} 게시판</h4>
											<h6 style="padding-right: 32px;">더보기</h6> 
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
	                <div class="card-body p-4" id="divChannelBoard" data-th-ttl="${res.chTtl}" onclick="channelBoard(${chNo})" style="cursor: pointer; height: 539px;">
	                  <div class="d-flex mb-4 justify-content-between align-items-center" style="gap: 16px;">
												<h4 class="card-title mt-3 ms-2" style="margin-right: auto;">${res.chTtl} 게시판</h4>
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
				for (var j = 0; j < Math.min(channelBoard.length, 7); j++) {
					html += `
									<tr>
											<td style="padding-left: 30px;">${channelBoard[j].brdTtl}</td>
											<td class="ps-0"><span class="mb-1 badge text-bg-light" style="margin-left: 10px;">${channelBoard[j].brdWrtrNm}</span></td>
											<td class="ps-4"><span style="margin-right: 50px;">${channelBoard[j].formattedBrdRgdt}</span></td>
											<td style="padding-left: 20px"><p class="mb-1 badge bg-indigo-subtle text-indigo">${channelBoard[j].brdHit}</p></td>
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
	            <!-- 채널 게시판 끝 -->
	          </div>
	          <!-- 두번째 로우 끝 -->
	        </div> 
	        <!-- 탭1 끝 -->
	
	
	        <!-- 탭2 시작 -->
	        <div class="tab-pane fade" id="pills-followers" role="tabpanel" aria-labelledby="pills-followers-tab" tabindex="0">
	          <div class="d-sm-flex align-items-center justify-content-between mt-3 mb-4">
	            <h3 class="mb-3 mb-sm-0 fw-semibold d-flex align-items-center">${res.chTtl} 인원
							<span class="badge text-bg-secondary fs-3 rounded-4 py-1 px-2 ms-2">${res.channelTotal} 명</span>
	            </h3>
	            <form class="position-relative">
	            </form>
	          </div>
	          <div class="row">
						`;
			for (var i = 0; i < channelMember.length; i++) {
				html += `
	            <div class=" col-md-6 col-xl-4">
	              <div class="card">
	                <div class="card-body p-4 d-flex align-items-center gap-3">
	                  <img src="${contextPath}${channelMember[i].memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
	                  <div>
										<div class="d-flex">
										<h5 class="fw-semibold mb-0">${channelMember[i].memName}</h5>
										<strong class="mb-1 ms-2 me-1 badge bg-primary-subtle text-primary" style="font-weight: normal">${channelMember[i].chRoleNm}</strong>
											`;
				if (channelMember[i].chPrp == 'C') {
					html += `
												👑
												`;
				}
				html +=
					`
											</div>
											<p class="fs-2 d-flex align-items-center">
	                    <iconify-icon icon="fluent-color:mail-16"></iconify-icon>
												${channelMember[i].memEmail}
	                    </p>
	                  </div>
	                  
	                </div>
	              </div>
	            </div>
							`
			}
			html += `
	            
	          </div>
	        </div>
	        <!-- 탭2 끝 -->
	
	        
	  `;
			$("#main_contents").html(html);

			coinListGetter();

			cur_page = 1;
			total_page = Math.ceil(res.page.total / 4);
			chDashboardProjectInfoRender(res.page.list);

			let channelMainToApproveDiv = MAIN_CONTENTS.querySelector('#channelMainToApprove');
			channelMainToApproveDiv.addEventListener('click', () => { docMyMainPageRender() });

			let channelMainToOngoingDiv = MAIN_CONTENTS.querySelector('#channelMainToOngoing');
			channelMainToOngoingDiv.addEventListener('click', () => { docMyMainPageRender() });

			ThreadButtonListeners();

			starSetter();
		}
	});
}

const starSetter = () => {
	let divChannelList = document.querySelector(".left-sidebar");
	let channel = divChannelList.querySelector(`#channel${synerhubch}`);
	let threads = channel.querySelectorAll("a");
	threads.forEach((th) => {
		if (th.href.substring(22) == `Thread(${thNoForThMem})`) {
			let starSpan = th.querySelectorAll('span')[1];
			// 마지막 문자가 ⭐인지 확인
			if (starSpan.innerText.charAt(starSpan.innerText.length - 1) !== '⭐') {
				starSpan.innerText += '⭐';
			}
		}
	});
}

function channelExit(chNo) {
}

function ThreadButtonListeners() {
	const thButton = document.querySelectorAll('.goThread');
	thButton.forEach(button => {
		button.addEventListener('click', function () {
			const thNo = this.dataset.thNo;
			loadThread(thNo);
		});
	});
}

function loadThread(thNo) {
	synerhubTheThread(thNo);
}

function createChannelPage() {
	MAIN_CONTENTS.innerHTML = `
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                    <h4 class="fs-6 mb-0">채널 생성</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">Create Channel</li>
                        </ol>
                    </nav>
                </div>
            </div>
                <!-- 1 -->
            <div class="container">
            <div class="card mt-4 active" id="createDiv1"> 
              <div class="card-body">
                <h3>1. 채널 정보 입력</h3>
                <div class="row">

                  <div class="col-md-6">
                    <div class="row border-top">
                      <div class="col-md-12">
                        <div class="mt-5 mb-3">
                          <label class="form-label" for="firstName1">
                          	채널명
                          	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="생성할 채널 이름을 입력해주세요.">
                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
                            </button>
                          </label>
                          <input type="text" class="form-control" id="chTtl" />
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-12"> 
                        <div class="mb-3">
                          <label class="form-label" for="emailAddress1">
                          	채널 로고
                          	<button type="button" class="btn ms-2 logo" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-html="true" data-bs-original-title="채널에서 사용할 로고를 추가해주세요.">
                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
                            </button>
                          </label>
                          <div class="card">
                            <div class="card-body">
                             <div class="text-center">
									<div id="subnail" style="cursor: pointer;">
											<img src="${contextPath}/resources/assets/images/products/not-image4.png" alt="image" class="img-thumbnail fixed-img" style="width: 200px; height: 200px;"/>                  
									</div>
									<input class="form-control mt-3" type="file" id="formFile1">
							</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mt-5 mb-3">
                      <label class="form-label" for="emailAddress1">
                      	채널 소개
                      	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널에 대한 간략한 설명을 적어주세요.">
                          <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
                        </button>
                      </label>
                      <div class="card">
                        <div class="card-body">
                          <div class="text-center mb-3">
                            <textarea id="chComment" class="form-control" rows="15" placeholder="채널에 대한 소개를 입력해주세요..."></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex align-items-center justify-content-end mt-4 gap-6">
                    <button class="btn btn-light" id="createC1">취소</button>
                    <button class="btn btn-primary" id="createN1">다음</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 1 끝 -->

                <!-- 2 -->
                <div class="card mt-4" id="createDiv2" style="display: none;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
														<h3>2. 나의 프로필</h3>
														<div class="d-flex align-items-center"> <!-- align-items-center로 수직 중앙 정렬 -->
																<p id="channelNm" style="color: gray; font-size: 1.2rem; margin-bottom: 0;">&nbsp;채널 생성 중...</p>
																<div class="spinner-border text-secondary ms-2" role="status" style="width: 1.75em; height: 1.75em;">
																		<span class="visually-hidden">Loading...</span>
																</div>
														</div>
												</div>
                        <div class="row border-top">
                            <div class="col-md-6">
                                <div class="mt-5 mb-3">
                                    <label class="form-label" for="jobTitle1">
                                    	이름
                                    	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널에서 사용할 이름을 입력해주세요.">
			                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
			                            </button>
                                    </label>
                                    <input type="text" class="form-control" id="memName" />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label" for="emailAddress1">
                                    	프로필 이미지
                                    	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널에서 사용할 프로필 이미지를 선택해주세요.">
                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
                            </button>
                                    </label>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="text-center">
                                                <div id="chProfile" style="cursor: pointer;">
                                                  <img src="${contextPath}/resources/assets/images/profile/user-default.jpg" alt="image" class="rounded-circle" style="width: 200px; height: 200px;" />
                                                </div>
                                                <input class="form-control mt-3" type="file" id="formFile2">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex align-items-center justify-content-end mt-4 gap-6">
                                <button class="btn btn-light" id="createP2">이전</button>
                                <button class="btn btn-primary" id="createN2">다음</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 2 끝 -->

                <!-- 3 -->
                  <div class="card mt-4" id="createDiv3" style="display: none;">
                      <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center">
															<h3>3. 채널 초대</h3>
															<div class="d-flex align-items-center"> <!-- align-items-center로 수직 중앙 정렬 -->
																	<p id="channelNm3" style="color: gray; font-size: 1.2rem; margin-bottom: 0;">&nbsp;채널 생성 중...</p>
																	<div class="spinner-border text-secondary ms-2" role="status" style="width: 1.75em; height: 1.75em;">
																			<span class="visually-hidden">Loading...</span>
																	</div>
															</div>
													</div>
                          <div class="row border-top">
                              <div class="col-md-6">
                                  <div class="mt-5 mb-3">
                                      <label class="form-label" for="int1">
                                      	채널 멤버 초대
                                      	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널을 함께 이용할 사용자 ID를 추가해주세요.">
			                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
			                            </button>
                                      </label>
                                      <div id="inputContainer">
                                          <div class="d-flex align-items-center mb-2">
                                              <input type="text" class="form-control" id="addMember1" placeholder="초대할 멤버 ID" />
                                              <button type="button" id="addInputButton" class="btn btn-success fw-medium ms-3">
            									<i class="ti ti-circle-plus fs-6 d-flex"></i>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-12">
                              <div class="d-flex align-items-center justify-content-end mt-4 gap-6">
                                  <button class="btn btn-light" id="createP3">이전</button>
                                  <button class="btn btn-primary" id="createN3">다음</button>
                              </div>
                          </div>
                      </div>
                  </div>
                <!-- 3 끝 -->

                <!-- 4 -->
                <div class="card mt-4" id="createDiv4" style="display: none;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
														<h3>4. 스레드 생성</h3>
														<div class="d-flex align-items-center"> <!-- align-items-center로 수직 중앙 정렬 -->
																<p id="channelNm4" style="color: gray; font-size: 1.2rem; margin-bottom: 0;">&nbsp;채널 생성 중...</p>
																<div class="spinner-border text-secondary ms-2" role="status" style="width: 1.75em; height: 1.75em;">
																		<span class="visually-hidden">Loading...</span>
																</div>
														</div>
												</div>
                        <div class="row border-top"> 
                            <div class="col-md-6"> 
                                <div class="mt-5 mb-3">
                                    <label class="form-label" for="int2">
                                    	스레드 생성
                                    	<button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="채널에서 사용할 스레드를 추가해주세요.">
			                              <iconify-icon icon="octicon:question-16" width="1.2rem" height="1.2rem" style="color: #0085DB;"></iconify-icon>
			                            </button>
                                    </label>
                                    <div id="inputContainer2">
                                        <div class="d-flex align-items-center mb-2">
                                            <input type="text" class="form-control" id="thName" placeholder="스레드명"/>
                                            <div class="form-group ms-3">
                                                <input type="color" id="thClr" class="form-control form-control-color" value="" title="Choose your color">
                                            </div>
                                            <button type="button" id="addInputButton2" class="btn btn-success fw-medium ms-3">
            																			<i class="ti ti-circle-plus fs-6 d-flex"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex align-items-center justify-content-end mt-4 gap-6">
                                <button class="btn btn-light" id="createP4">이전</button>
                                <button class="btn btn-primary" id="createN4">생성하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 4 끝 -->
            </div>`;
}
