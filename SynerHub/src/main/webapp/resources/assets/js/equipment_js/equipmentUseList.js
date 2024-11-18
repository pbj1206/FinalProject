function eqpLive() {
  if (synerhubch == null) {
    swal.fire("채널을 누르고 들어와주세요");
  }
  else {
    MAIN_CONTENTS.innerHTML = `
  	<div class="mb-3 overflow-hidden position-relative">
		<div class="px-3">
			<h4 class="fs-6 mb-0">자원</h4>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb mb-0">
					<li class="breadcrumb-item">
						<a href="/synerhub/main">Home</a>
					</li>
					<li class="breadcrumb-item" aria-current="page">Equipment Situation</li>
				</ol>
			</nav>
		</div>
	</div>
	<div class="card">
		<div class="card-body calender-sidebar app-calendar">
			<div class="d-md-flex justify-content-between mb-9">
				<div class="mb-9 mb-md-0">
					<div style="display: flex;">
						<h3 id="eqpTitle">자원 현황</h3>
					</div>
					<p class="card-subtitle mb-0"></p>
				</div>
				<div class="me-3" style="text-align: right;">
					<button type="button" class="justify-content-center btn mb-1 bg-dark text-white" onclick="eqpList()">
						자원 목록
					</button>
				</div>
			</div>
			<div id="eqpCalendar"></div>
		</div>
	</div>
	
	<div class="modal" id="EqpUsingDetailForm">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-body p-4">
					<div id="returnBtn" style="float: right"></div>
					<div class="text-center text-dark">
						<i class="ti ti-calendar-month fs-7"></i>
						<h3 class="mt-2">자원 사용 현황</h3>
						<hr />
						<div class="container-fluid">
							<div class="row mt-3">
								<div class="form-group d-inline-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label">자원명</label>
									<input type="text" class="form-control" id="eqpUsingName" disabled />
									<input type="hidden" id="eqpUsingNumber" />
								</div>
							</div>
							<div class="row mt-3">
								<div class="form-group d-inline-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label">사용 시작 일시</label>
									<input type="date" class="form-control" id="eqpStartDate" disabled />
								</div>
							</div>
							<div class="row mt-3">
								<div class="form-group d-inline-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label">예상 반납 일시</label>
									<input type="date" class="form-control" id="eqpEndDate" disabled />
								</div>
							</div>
							<div class="row mt-3">
								<div class="form-group d-inline-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label"> 대 여 자</label>
									<input type="text" class="form-control" id="eqpMng" disabled />
								</div>
							</div>
							<div class="row mt-3">
								<div class="form-group d-inline-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label">대여 쓰레드</label>
									<input type="input" class="form-control" id="eqpDept" disabled />
								</div>
							</div>
							<div class="mt-3">
								<div class="form-group d-flex text-nowrap">
									<label for="recipient-name" class="form-label col-sm-3 col-form-label">사용 목적</label>
									<textarea class="form-control" style="height: 110px;" id="eqpUsingContent" disabled></textarea>
								</div>
							</div>
						</div>
						<div class="mt-4" id="EqpBtnPlace"></div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

    $.ajax({
      url: "/synerhub/equipmentLive/eqpLiveList",
      type: "post",
      beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
        xhr.setRequestHeader(header, token);
      },
      data: JSON.stringify({ chNo: synerhubch }),
      contentType: "application/json; charset=utf-8",
      success: function (res) {
        for (var i = 0, result = []; i < res.length; i++) {
          result.push({
            start: res[i].useStrtDt,
            end: res[i].rtnEstmtDt,
            title: res[i].eqpmntNm + "/" + res[i].thTtl,
            color: res[i].thClr,
            startStr: res[i].logNo,
            allDay: true,
            recurringDef: res[i].memNo
          });
        }
        EqpCalendar(result);
      }
    })
  }
}

function EqpCalendar(result) {

  var EqpUsingDetailForm = $(document).find("#EqpUsingDetailForm");

  EqpUsingDetailForm.css("justifyContent", "center");
  EqpUsingDetailForm.css("alignItems", "center");
  EqpUsingDetailForm.css("position", "fixed");
  EqpUsingDetailForm.css("top", "0");
  EqpUsingDetailForm.css("left", "0");
  EqpUsingDetailForm.css("width", "100%");
  EqpUsingDetailForm.css("height", "100%");
  EqpUsingDetailForm.css("backgroundColor", "rgba(0, 0, 0, 0.5)");
  EqpUsingDetailForm.css("zIndex", "1000");

  var EqpcalEl = document.getElementById('eqpCalendar');
  var EqpCalFnc = new FullCalendar.Calendar(EqpcalEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },

    buttonText: {
      today: '오늘'
    },

    views: {
      dayGridMonth: {
        dayMaxEventRows: 4
      },
    },

    events: result,

    eventResize: function (info) {
      console.log(info.oldEvent._def.extendedProps.recurringDef);
      if (info.oldEvent._def.extendedProps.recurringDef != MEM_NO && info.oldEvent._def.extendedProps.recurringDef != null) {
        swal.fire("자원 연장이 불가합니다");
        info.revert();
        return;
      }
      EqpMoveDate(info.endDelta.days, info.oldEvent._def.extendedProps.startStr, "resize");
    },

    eventDrop: function (event) {
			if (event.oldEvent._def.extendedProps.recurringDef != MEM_NO && event.oldEvent._def.extendedProps.recurringDef != null) {
				swal.fire("일정 변경 불가합니다");
				event.revert(); 
				return;
			} 
			EqpMoveDate(event.delta.days, event.oldEvent._def.extendedProps.startStr, "move");
		},


    eventClick: async function (info) {
      EqpEventClick(info.event._def.extendedProps.startStr);
    },

    displayEventTime: false,
    editable: true,
    droppable: true
  });
  EqpCalFnc.render();
};

function EqpMoveDate(event, date, state) {
  var movedate = {
    event: event,
    logNo: date,
    state: state,
    chNo: synerhubch
  }

  $.ajax({
    url: "/synerhub/equipmentLive/eqpMove",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(movedate),
    contentType: "application/json; charset=utf-8",
    success: function () {
      Swal.fire("자원 연장하였습니다.");
    }
  });
}

function EqpEventClick(info) {
  let eqpDetaiData = {
    logNo: info,
    chNo: synerhubch,
  }

  $.ajax({
    url: "/synerhub/equipmentLive/EqpLiveDetailForm",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(eqpDetaiData),
    contentType: "application/json; charset=utf-8",
    success: async function (res) {

      $("#eqpEndDate").attr("disabled", true);
      $("#eqpUsingContent").attr("disabled", true);
      $("#eqpUsingName").val(res.eqpmntNm);
      $("#eqpStartDate").val(res.startDate);
      $("#eqpEndDate").val(res.endDate);
      $("#eqpUsingContent").val(res.useFor);
      $("#eqpMng").val(res.chmemNm);
      $("#eqpDept").css("color", res.thClr);
      if (res.thTtl == null) {
        $("#eqpDept").val(res.chTtl);
        $("#eqpDept").css("color", "red")
      } else {
        $("#eqpDept").val(res.thTtl);
      }
      if (MEM_NO == res.memNo) {
        $("#EqpBtnPlace").html(`
	          <button type="button" class="btn btn-success me-2" onclick="eqpUsingUpdateForm(${info})">
	              수정
	          </button>
	          <button type="button" class="btn bg-danger-subtle text-danger" onclick="EqpUsingDetailFormCancelBtn()">
	              취소
	          </button>`);
        $("#returnBtn").html(`
          <button type="button" class="btn ms-2" style="background: none; border: none; padding: 0;" data-bs-container="body" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="자원 반납 버튼입니다.">
            <iconify-icon icon="solar:restart-bold" style="color: red; cursor: point;" width="40" height="40" onclick="eqpUsingReturn(${info})"></iconify-icon>
          </button>`);
      } else {
        $("#EqpBtnPlace").html(`
	          <button type="button" class="btn bg-dark text-white" onclick="EqpUsingDetailFormCancelBtn()">
	              확인
	          </button>`);
      }
      tooltipEqp();
    }
  });
  $("#EqpUsingDetailForm").css("display", "block");
}

function eqpUsingReturn(info) {
  Swal.fire({
    title: '정말로 반납 하시겠습니까?',
    text: '다시 되돌릴 수 없습니다.',
    icon: 'warning',

    showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    confirmButtonText: '승인', // confirm 버튼 텍스트 지정
    cancelButtonText: '취소', // cancel 버튼 텍스트 지정
  }).then(result => {
    // 만약 Promise리턴을 받으면,
    if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

      $.ajax({
        url: "/synerhub/equipmentLive/eqpUsingReturn",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token)
        },
        data: JSON.stringify({ logNo: info }),
        contentType: "application/json; charset=utf8",
        success: function (res) {
          $("#EqpUsingDetailForm").css("display", "none");
          eqpLive();
        }
      })
    }
  });

}

function eqpUsingUpdateForm(info) {
  let timeOff = new Date().getTimezoneOffset() * 60000;
  let eqpStartDate = new Date($("#eqpStartDate").val()).valueOf();
  let useStdDt = new Date(eqpStartDate - timeOff).toISOString().substring(0, 10);
  $("#eqpEndDate").attr("min", useStdDt);

  $("#eqpEndDate").attr("disabled", false);
  $("#eqpUsingContent").attr("disabled", false);
  $("#EqpBtnPlace").html(`
	  <button type="button" class="btn btn-success me-2" onclick="eqpUsingUpdate(${info})">
	      수정
	  </button>
	  <button type="button" class="btn bg-danger-subtle text-danger" onclick="EqpEventClick(${info})">
	      취소
	  </button>`);
}

function eqpUsingUpdate(info) {
  let eqpUpdateData = {
    logNo: info,
    rtnEstmtDt: $("#eqpEndDate").val(),
    useFor: $("#eqpUsingContent").val(),
    useStrtDt: $("#eqpStartDate").val()
  }

  $.ajax({
    url: "/synerhub/equipmentLive/eqpUsingLiveUpdate",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token)
    },
    data: JSON.stringify(eqpUpdateData),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      $("#EqpUsingDetailForm").css("display", "none");
      eqpLive();
    }
  })
};

function EqpUsingDetailFormCancelBtn() {
  $("#EqpUsingDetailForm").css("display", "none");
}


// esc시 클릭시
$(document).keydown(function (event) {
  if (event.keyCode == 27) {
    $(document).find("#EqpUsingDetailForm").css("display", "none");
  }
});

function tooltipEqp(){
  var popoverTriggerList = [].slice.call(
    // document.querySelectorAll('[data-bs-toggle="popover"]')
    $(document).find('[data-bs-toggle="popover"]')
  );

  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  const tooltipTriggerList = Array.from(
    $(document).find('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}