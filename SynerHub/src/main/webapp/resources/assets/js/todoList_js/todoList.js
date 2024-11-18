$(document).on('click', '#todoList', function () {
    console.log("todoList click");

    todoListLoad();
    editItem();
    deleteItem();
    clearItem();
    addKanbanItem();
    kanbanEdit();
    kanbanDelete();
    kanbanSortable();

    todoListLoad();
});


function todoListLoad() {
    let data = {
        memNo: MEM_NO
    }

    $.ajax({
        url: '/synerhub/todolist/list', // 컨트롤러의 URL 매핑
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        success: async function (response) {
            let count = 0;
            console.log(response)
            var html = "";

            html += `
			<div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                  <h4 class="fs-6 mb-0">해야 할 업무</h4>
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item">
                        <a href="../main/index.html">Home</a>
                      </li>
                      <li class="breadcrumb-item" aria-current="page">To do List</li>
                    </ol>
                  </nav>
                </div>
            </div>
            <div class="card">
                <div class="card-body overflow-hidden position-relative">
                    <div class="container d-flex justify-content-between align-items-center">
                        <div>
                            <h3>해야 할 업무</h3>
                        </div>
                        <div class="action-btn layout-top-spacing mb-7 d-flex align-items-center">
                            <button id="add-list" class="btn btn-primary ms-auto">목록 추가</button>
                        </div>
                    </div>
                    <div class="modal fade" id="addItemModal" tabindex="-1" role="dialog" aria-labelledby="addTaskModalTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="add-task-title modal-title" id="addTaskModalTitleLabel1">업무 추가</h5>
                                    <h5 class="edit-task-title modal-title" id="addTaskModalTitleLabel2">업무 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="compose-box">
                                        <div class="compose-content" id="addTaskModalTitle">
                                            <div class="addTaskAccordion" id="add_task_accordion">
                                                <div class="task-content task-text-progress">
                                                    <div id="collapseTwo" class="collapse show" data-parent="#add_task_accordion">
                                                        <div class="task-content-body">
                                                            <form action="javascript:void(0);">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="task-title mb-4 d-flex">
                                                                            <input id="kanban-title" type="text" placeholder="제목을 입력하세요." class="form-control" name="tdlTtl">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="task-badge d-flex">
                                                                            <textarea id="kanban-text" placeholder="내용을 입력하세요." class="form-control" name="tdlConts"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <div class="d-flex gap-6">
                                        <button data-btn-action="addTask" class="btn add-tsk btn-primary">추가</button>
                                        <button data-btn-action="editTask" class="btn edit-tsk btn-success">저장</button>
                                        <button class="btn bg-danger-subtle text-danger d-flex align-items-center gap-1" data-bs-dismiss="modal">취소</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="addListModal" tabindex="-1" role="dialog" aria-labelledby="addListModalTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title add-list-title" id="addListModalTitleLabel1">목록 추가</h5>
                                    <h5 class="modal-title edit-list-title" id="addListModalTitleLabel2">목록 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="compose-box">
                                        <div class="compose-content" id="addListModalTitle">
                                            <form action="javascript:void(0);">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="list-title d-flex align-items-center">
                                                            <input id="item-name" type="text" placeholder="목록 이름을 입력하세요." class="form-control" name="task">
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <div class="d-flex gap-6">
                                        <button class="btn add-list btn-primary">추가</button>
                                        <button class="btn edit-list btn-success">저장</button>
                                        <button class="btn bg-danger-subtle text-danger d-flex align-items-center gap-1" data-bs-dismiss="modal">취소</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="deleteConformation" tabindex="-1" role="dialog" aria-labelledby="deleteConformationLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content" id="deleteConformationLabel">
                                <div class="modal-header">
                                    <div class="icon round-40 d-flex align-items-center justify-content-center bg-light-danger text-danger me-2 rounded-circle">
                                        <i class="ti ti-trash fs-6"></i>
                                    </div>
                                    <h5 class="modal-title fw-semibold" id="exampleModalLabel">업무 삭제</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body justify-content-center text-center">
                                    <p class="mb-0">삭제 시 되돌리실 수 없습니다. 계속하시겠습니까?</p>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" data-remove="task" data-tdlno="${response.tdlNo}">삭제</button>
                                    <button type="button" class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">취소</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 목록 삭제/비우기 모달창 -->
                    <div class="modal fade" id="selectDelete" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                      <div class="modal-dialog modal-md">
                        <div class="modal-content modal-filled bg-danger-subtle">
                          <div class="modal-body p-4">
                            <div class="text-center text-danger">
                              <i class="ti ti-trash fs-7"></i>
                              <h4 class="mt-2">목록 비우기</h4>
                              <p class="mt-3 text-dark">
                                    	목록을 완전히 비우시겠습니까? 
                              </p>
                              <!-- <button type="button" id="deleteList" class="btn btn-danger my-2 list-delete" data-bs-dismiss="modal" data-remove="task"> -->
                                	<!-- 삭제 -->
                              <!-- </button> -->
                              <button type="button" id="clearAllList" class="btn btn-warning my-2 ms-2 list-clear-all" data-bs-dismiss="modal" data-remove="task">
                                	비우기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 목록 삭제/비우기 모달창 끝 -->

                    <div class="scrumboard" id="cancel-row">
                        <div class="layout-spacing pb-3">
                            <div data-simplebar>
                                <div class="task-list-section">

                                    <div data-item="1" class="task-list-container tdlListState" data-action="sorting">
                                        <div class="connect-sorting connect-sorting-todo">
                                            <div class="task-container-header">
                                                <h6 class="item-head mb-0 fs-4 fw-semibold" data-item-title="Todo">할 업무(예정)</h6>
                                                <div class="hstack gap-2">
                                                    <div class="add-kanban-title">
                                                        <a class="addTask d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add Task" style="cursor: pointer">
                                                            <i class="ti ti-plus text-dark"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-kanban-title">
                                                        <a class="list-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit List" style="cursor: pointer">
                                                            <i class="ti ti-pencil text-dark"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-kanban-title tdlDelBtn">
                                                        <a class="d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="modal" data-bs-target="#selectDelete" style="cursor: pointer">
                                                            <i class="ti ti-trash text-dark"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="connect-sorting-content ui-sortable" data-sortable="true">
                                            
            `;
                count = 0;

                for (var i = 0; i < response.length; i++) {
                    if(response[i].tdlState == 1){
                        count++;
                        html += `

                                                <div data-draggable="true" class="card img-task tdlTask ui-sortable-handle" data-tdl-no="${response[i].tdlNo}">
                                                    <div class="card-body">
                                                        <div class="task-header border-bottom">
                                                            <div>
                                                                <h4 data-item-title="${response[i].tdlTtl}">${response[i].tdlTtl}</h4>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="add-kanban-title">
                                                                    <a no="${i}" class="kanban-item-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Task" style="cursor: pointer">
                                                                        <i class="ti ti-pencil text-dark"></i>
                                                                    </a>
                                                                </div>
                                                                <div class="add-kanban-title ms-2">
                                                                    <a class="kanban-item-delete d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete Task" style="cursor: pointer">
                                                                        <i class="ti ti-trash text-dark"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="task-content">
                                                            <p class="mb-0" data-item-text="${response[i].tdlConts}">
                                                                ${response[i].tdlConts}
                                                            </p>
                                                        </div>
                                                        <div class="task-body">
                                                            <div class="task-bottom">
                                                                <div class="tb-section-1">
                                                                    <strong class="hstack gap-2 fs-2" style="font-weight: normal;" data-item-date="${new Date(response[i].tdlDt).toLocaleDateString()}">
                                                                    <i class="ti ti-calendar-month fs-5"></i> ${new Date(response[i].tdlDt).toLocaleDateString()}
                                                                    </strong>
                                                                </div>
                                                                <div id="stateBdg" class="tb-section-2">
                                                                    <strong class="badge text-bg-light fs-1" style="font-weight: normal;">예정</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                        `;
                    }
                }

                    if(count == 0) {
                        html += `
                                                <div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>할 일을 추가해주세요.</p>
                                                </div>
                                `;
                    }
                    html += `
                                            </div>
                                        </div>
                                    </div>
                            `;

                    html += `

                                    <div data-item="2" class="task-list-container tdlListState" data-action="sorting">
                                        <div class="connect-sorting connect-sorting-inprogress">
                                            <div class="task-container-header">
                                                <h6 class="item-head mb-0 fs-4 fw-semibold" data-item-title="In Progress">진행 중인 업무</h6>
                                                <div class="hstack gap-2">
                                                    <div class="add-kanban-title">
                                                        <a class="list-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit List" style="cursor: pointer">
                                                            <i class="ti ti-pencil text-dark"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-kanban-title tdlDelBtn">
                                                        <a class="d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="modal" data-bs-target="#selectDelete" style="cursor: pointer">
                                                            <i class="ti ti-trash text-dark"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="connect-sorting-content ui-sortable" data-sortable="true">
                                                    
                    `;
                    count = 0;

                    for (var i = 0; i < response.length; i++) {
                        if(response[i].tdlState == 2){
                            count++;
                            html += `
                                                <div data-draggable="true" class="card img-task tdlTask ui-sortable-handle" data-tdl-no="${response[i].tdlNo}">
                                                    <div class="card-body">
                                                        <div class="task-header border-bottom">
                                                            <div>
                                                            <h4 data-item-title="${response[i].tdlTtl}">
                                                                ${response[i].tdlTtl}</h4>
                                                            </div>
                                                                    <div class="d-flex">
                                                                    <div class="add-kanban-title">
                                                                        <a no="${i}" class="kanban-item-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Task" style="cursor: pointer">
                                                                            <i class="ti ti-pencil text-dark"></i>
                                                                        </a>
                                                                    </div>
                                                                    <div class="add-kanban-title ms-2">
                                                                        <a class="kanban-item-delete d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete Task" style="cursor: pointer">
                                                                            <i class="ti ti-trash text-dark"></i>
                                                                        </a>
                                                                    </div>
                                                                    </div>
                                                        </div>
                                                        <div class="task-content">
                                                            <p class="mb-0" data-item-text="${response[i].tdlConts}">
                                                                ${response[i].tdlConts}
                                                            </p>
                                                        </div>
                                                        <div class="task-body">
                                                            <div class="task-bottom">
                                                                <div class="tb-section-1">
                                                                    <strong class="hstack gap-2 fs-2" style="font-weight: normal;" data-item-date="${new Date(response[i].tdlDt).toLocaleDateString()}">
                                                                    <i class="ti ti-calendar-month fs-5"></i> ${new Date(response[i].tdlDt).toLocaleDateString()}
                                                                    </strong>
                                                                </div>
                                                                <div id="stateBdg" class="tb-section-2">
                                                                    <strong class="badge bg-primary-subtle text-primary fs-1" style="font-weight: normal;">진행 중</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                            `;
                        }
                    }

                        if(count == 0){
                            html += `
                                                <div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>진행 중인 업무가 존재하지 않습니다.</p>
                                                </div>
                                            
                                    `;
                        }

                        html +=`
                                            </div>
                                        </div>
                                    </div>
                                `;

                        html += `

                                    <div data-item="3" class="task-list-container tdlListState" data-action="sorting">
                                        <div class="connect-sorting connect-sorting-done">
                                            <div class="task-container-header">
                                                <h6 class="item-head mb-0 fs-4 fw-semibold" data-item-title="Done">완료된 업무</h6>
                                                <div class="hstack gap-2">
                                                    <div class="add-kanban-title">
                                                        <a class="list-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit List" style="cursor: pointer">
                                                            <i class="ti ti-pencil text-dark"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-kanban-title tdlDelBtn">
                                                        <a class="d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="modal" data-bs-target="#selectDelete" style="cursor: pointer">
                                                            <i class="ti ti-trash text-dark"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="connect-sorting-content ui-sortable" data-sortable="true">
                                                
                        `;
                        count = 0;

                        for (var i = 0; i < response.length; i++) {
                            if(response[i].tdlState == 3){
                                count++;
                                html += `
                                                <div data-draggable="true" class="card img-task tdlTask ui-sortable-handle" data-tdl-no="${response[i].tdlNo}">
                                                    <div class="card-body">
                                                        <div class="task-header border-bottom">
                                                            <div>
                                                                <h4 data-item-title="${response[i].tdlTtl}">
                                                                    ${response[i].tdlTtl}</h4>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div class="add-kanban-title">
                                                                    <a no="${i}" class="kanban-item-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Task" style="cursor: pointer">
                                                                        <i class="ti ti-pencil text-dark"></i>
                                                                    </a>
                                                                </div>
                                                                <div class="add-kanban-title ms-2">
                                                                    <a class="kanban-item-delete d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete Task" style="cursor: pointer">
                                                                        <i class="ti ti-trash text-dark"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="task-content">
                                                            <p class="mb-0" data-item-text="${response[i].tdlConts}">
                                                                ${response[i].tdlConts}
                                                            </p>
                                                        </div>
                                                        <div class="task-body">
                                                            <div class="task-bottom">
                                                                <div class="tb-section-1">
                                                                    <strong class="hstack gap-2 fs-2" style="font-weight: normal;" data-item-date="${new Date(response[i].tdlDt).toLocaleDateString()}">
                                                                    <i class="ti ti-calendar-month fs-5"></i> ${new Date(response[i].tdlDt).toLocaleDateString()}
                                                                    </strong>
                                                                </div>
                                                                <div id="stateBdg" class="tb-section-2">
                                                                    <strong class="badge bg-success-subtle text-success fs-1" style="font-weight: normal;">완료</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                `; 
                            }
                        }

                            if(count == 0){
                                html += `
                                                <div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>완료한 업무가 존재하지 않습니다.</p>
                                                </div>
                                            
                                    `;
                            }

                            html +=`

                                            </div>
                                        </div>
                                    </div>

                                    `;

                    for (var i = 0; i < response.length; i++) {
                        if(response[i].tdlState == 4){
                            count++;
                            html += `

                                    <div data-item="4" class="task-list-container tdlListState" data-action="sorting">
                                        <div class="connect-sorting" style="background-color: #FFF6EA;">
                                            <div class="task-container-header">
                                                <h6 class="item-head mb-0 fs-4 fw-semibold" data-item-title="Done">${response[i].tdlListnm}</h6>
                                                <div class="hstack gap-2">
                                                    <div class="add-kanban-title">
                                                        <a class="list-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit List" style="cursor: pointer">
                                                            <i class="ti ti-pencil text-dark"></i>
                                                        </a>
                                                    </div>
                                                    <div class="add-kanban-title tdlDelBtn">
                                                        <a class="d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="modal" data-bs-target="#selectDelete" style="cursor: pointer">
                                                            <i class="ti ti-trash text-dark"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="connect-sorting-content ui-sortable" data-sortable="true">
                                                
                        `;
                        count = 0;


                            if(count == 0){
                                html += `
                                                <div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>${response[i].tdlListnm}가 존재하지 않습니다.</p>
                                                </div>
                                            
                                    `;
                            }

                            html +=`

                                            </div>
                                        </div>
                                    </div>

                                    `;
                        }
                    }
                                    
                                    html += `

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            `;
            $("#main_contents").html(html);

            kanbanSortable();
        }
    });


}


// ----------------------------------------------------------------------
// 드래그로 업무 상태 수정 기능
// ----------------------------------------------------------------------
function kanbanSortable() {
    let data_sortable = $(document).find('[data-sortable="true"]');
    console.log(data_sortable);

    data_sortable.sortable({
        connectWith: ".connect-sorting-content",
        items: ".card",
        cursor: "move",
        placeholder: "ui-state-highlight",
        refreshPosition: true,
        stop: function (event, ui) {
            var parent_ui = ui.item.parent().attr("data-item");
        },
        update: function (event, ui) {
            console.log("move");
            console.log(ui);
            console.log(ui.item.parent().parent());

            // 드래그한 아이템의 tdlNo 가져오기
            var tdlNo = ui.item.data("tdl-no");

            // 새로운 상태 결정하기  
            var newState = parseInt(ui.item.closest('.tdlListState').data('item'), 10); // 숫자로 변환
            var parentItem = ui.item.parent().attr("data-item");

            // newState에 따라 tdlListnm 및 색상 설정
            var tdlListnm;
            var badgeClass = 'text-bg-light'; // 기본 클래스 설정

            switch (newState) {
                case 1:
                    tdlListnm = '할 업무(예정)';
                    badgeClass = 'text-bg-light'; // 예정의 기본 색상
                    break;
                case 2:
                    tdlListnm = '진행 중인 업무';
                    badgeClass = 'bg-primary-subtle text-primary'; // 진행 중일 때 색상
                    break;
                case 3:
                    tdlListnm = '완료된 업무';
                    badgeClass = 'bg-success-subtle text-success'; // 완료일 때 색상
                    break;
                default:
                    tdlListnm = '새 목록';
                    badgeClass = 'bg-warning-subtle text-warning'; // 기본 상태 색상
                    break;
            }

            console.log("newState 값:", newState); // 디버깅용 로그

            // 상태 배지 업데이트
            var stateBdg = "";
            switch (newState) {
                case 1:
                    stateBdg = "예정";
                    break;
                case 2:
                    stateBdg = "진행 중";
                    break;
                case 3:
                    stateBdg = "완료";
                    break;
                default:
                    stateBdg = "미정";
                    break;
            }

            // 드래그한 카드의 상태 배지 업데이트
            ui.item.find(".badge").text(stateBdg);
            ui.item.find(".badge").attr("class", `badge ${badgeClass} fs-1`);

            // id가 noneTdl인 요소가 존재하면 제거
            var noneTdlElement = ui.item.parent().parent().find("#noneTdl");
            if (noneTdlElement.length) {
                noneTdlElement.remove();
            }

            var noneTdlElements = $('.tdlListState');
            console.log(noneTdlElements);

            for (let i = 0; i < noneTdlElements.length; i++) {
                var tdlTasks = noneTdlElements.eq(i).find('.tdlTask');
                console.log(tdlTasks);
                if (tdlTasks.length == 0) {
                    var noneTdls = noneTdlElements.eq(i).find('.connect-sorting-content');

                    let html = "";

                    if (i == 0) {
                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                    <p>할 일을 추가해주세요.</p>
                                </div>`;
                    } else if (i == 1) {
                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                    <p>진행 중인 업무가 존재하지 않습니다.</p>
                                </div>`;
                    } else if (i == 2) {
                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                    <p>완료한 업무가 존재하지 않습니다.</p>
                                </div>`;
                    }

                    noneTdls.html(html);
                }
            }

            // AJAX 요청을 통해 tdlState와 tdlListnm 업데이트
            $.ajax({
                type: "POST",
                url: "/synerhub/todolist/updateState", // 상태 업데이트를 위한 URL
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(header, token);
                },
                data: JSON.stringify({
                    tdlNo: tdlNo,
                    tdlState: newState,
                    tdlListnm: tdlListnm // tdlListnm 추가
                }),
                success: function (response) {
                    console.log("tdlState 업데이트 성공:", response);
                },
                error: function () {
                    console.error("tdlState 업데이트 실패");
                }
            });
        },
    });
}


// ----------------------------------------------------------------------
// add task and open modal
// ----------------------------------------------------------------------
function addKanbanItem() {
    $(document).on("click", ".addTask", function (event) {
        event.preventDefault();
        getParentElement = $(this)
            .parents('[data-action="sorting"]')
            .attr("data-item");
        $(".edit-task-title").hide();
        $(".add-task-title").show();
        $('[data-btn-action="addTask"]').show();
        $('[data-btn-action="editTask"]').hide();
        $("#addItemModal").modal("show");
        kanban_add(getParentElement);
    });
}


// ----------------------------------------------------------------------
//   업무 추가 기능
// ----------------------------------------------------------------------
function kanban_add(getParent) {
    $(document).off("click", '[data-btn-action="addTask"]')
        .on("click", '[data-btn-action="addTask"]', function (event) {

            getAddBtnClass = $(this).attr("class").split(" ")[1];

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth());

            var monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];

            today = dd + " " + monthNames[mm];

            var $_getParent = getParent;

            var itemTitle = document.getElementById("kanban-title").value;
            var itemText = document.getElementById("kanban-text").value;

            // 입력 검증
            if (!itemTitle || !itemText) {
                alert("제목과 내용을 입력해주세요!");
                return; // 입력이 없으면 함수 종료
            }

            // TodoListVO 객체 생성
            var todoListVO = {
                tdlListnm: $_getParent, // 부모 항목명
                tdlTtl: itemTitle,
                tdlConts: itemText,
                memNo: MEM_NO
            };

            // AJAX 요청
            $.ajax({
                type: "POST",
                url: "/synerhub/todolist/register", // URL 수정
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(header, token);
                },
                data: JSON.stringify(todoListVO),
                success: function (response) {
                    console.log("할 일 추가 성공:", response);

                    // id가 noneTdl인 요소가 존재하면 제거
                    var noneTdlElement = $("[data-item='" + $_getParent + "'] .connect-sorting-content").find("#noneTdl");
                    if (noneTdlElement.length) {
                        noneTdlElement.remove();
                    }

                    // 추가된 항목을 UI에 반영
                    var item_html =
                        `<div data-draggable="true" class="card tdlTask task-text-progress" data-tdl-no="${response.tdlNo}" style="">` +
                        '<div class="card-body">' +
                        '<div class="task-header border-bottom">' +
                        '<div class="">' +
                        '<h4 class="" data-item-title="' +
                        `${itemTitle}` +
                        '">' +
                        `${itemTitle}` +
                        "</h4>" +
                        "</div>" +
                        '<div class="">' +
                        '<div class="d-flex">' +
                        '<div class="add-kanban-title">' +
                        '<a class="kanban-item-edit d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit Task" style="cursor: pointer">' +
                        '<i class="ti ti-pencil text-dark"></i>' +
                        '</a>' +
                        '</div>' +
                        '<div class="add-kanban-title ms-2">' +
                        '<a class="kanban-item-delete d-flex align-items-center justify-content-center gap-1 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete Task" style="cursor: pointer">' +
                        '<i class="ti ti-trash text-dark"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        "</div>" +
                        "</div>" +
                        '<div class="task-body">' +
                        '<div class="task-content">' +
                        '<p class="mb-0" data-item-text="' +
                        `${itemText}` +
                        '">' +
                        `${itemText}` +
                        "</p>" +
                        "</div>" +
                        '<div class="task-bottom">' +
                        '<div class="tb-section-1">' +
                        '<strong class="hstack gap-2 fs-2" style="font-weight: normal;" data-item-date="' +
                        `${today}` +
                        '"><i class="ti ti-calendar-month fs-5"></i> ' +
                        `${today}` +
                        "</strong>" +
                        "</div>" +
                        '<div class="tb-section-2">' +
                        '<strong class="badge fs-1" style="background-color: #ffa0d8; color: white; font-weight: normal;">New</strong>' +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    $("[data-item='" + $_getParent + "'] .connect-sorting-content").append(item_html);
                    
                    // 입력 필드 값을 비웁니다.
				    document.getElementById("kanban-title").value = "";
				    document.getElementById("kanban-text").value = "";
				    
                },
                error: function (xhr, status, error) {
                    console.error("할 일 추가 실패:", error);
                    Swal.fire({
				    	title: "할 일 추가에 실패했습니다.",
				        timer: 1500,
				        showConfirmButton: true,
				    });
                }
            });

            // 모달 닫기
            $("#addItemModal").modal("hide");

            kanbanEdit();
            kanbanDelete();
        });
}


// ----------------------------------------------------------------------
//   add item
// ----------------------------------------------------------------------
$(document).off("click", "#add-list")
    .on("click", "#add-list", function (event) {
        event.preventDefault();

        $(".add-list").show();
        $(".edit-list").hide();
        $(".edit-list-title").hide();
        $(".add-list-title").show();
        $("#addListModal").modal("show");
    });


// ----------------------------------------------------------------------
//   목록 추가 기능
// ----------------------------------------------------------------------
$(document).off("click", ".add-list") 
    .on("click", ".add-list", function (event) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");

        today = mm + "." + dd;

        var itemTitle = document.getElementById("item-name").value;

        // 입력값 검증
        if (!itemTitle) {
            alert("목록 제목을 입력하세요.");
            return;
        }

        var itemNameLowercase = itemTitle.toLowerCase();
        var itemNameRemoveWhiteSpace = itemNameLowercase.split(" ").join("_");
        var itemDataAttr = itemNameRemoveWhiteSpace;

        // AJAX 요청
        $.ajax({
            url: '/synerhub/todolist/addList', // 서버의 API 엔드포인트
            type: 'POST',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
            data: JSON.stringify({
                tdlListnm: itemTitle, // 서버에 전송할 데이터
                memNo: MEM_NO 
            }),
            success: function (response) {
            
                // 서버에서 성공적으로 응답을 받았을 때
                if (response) {
                    // HTML 추가
                    var item_html =
                        '<div data-item="item-' +
                        itemDataAttr +
                        '" class="task-list-container mb-4" data-action="sorting">' +
                        '<div class="connect-sorting">' +
                        '<div class="task-container-header">' +
                        '<h6 class="item-head mb-0 fs-4 fw-semibold" data-item-title="' +
                        response.tdlListnm +
                        '">' +
                        response.tdlListnm +
                        "</h6>" +
                        '<div class="hstack gap-2">' +
                        '<div class="dropdown">' +
                        '<a class="dropdown-toggle" href="javascript:void(0)" role="button" id="dropdownMenuLink-4" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
                        '<i class="ti ti-dots-vertical text-dark"></i>' +
                        "</a>" +
                        '<div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink-4">' +
                        '<a class="dropdown-item list-edit" href="javascript:void(0);">수정</a>' +
                        '<a class="dropdown-item list-delete" href="javascript:void(0);">삭제</a>' +
                        '<a class="dropdown-item list-clear-all" href="javascript:void(0);">목록 비우기</a>' +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        '<div class="connect-sorting-content ui-sortable" data-sortable="true">' +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    $(".task-list-section").append(item_html);
                    $("#addListModal").modal("hide");
                    $("#item-name").val("");
                    kanbanSortable();
                    editItem();
                    deleteItem();
                    clearItem();
                    addKanbanItem();
                    kanbanEdit();
                    kanbanDelete();

                    // Tooltip 초기화
                    var tooltipTriggerList = [].slice.call(
                        document.querySelectorAll('[data-bs-toggle="tooltip"]')
                    );
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl);
                    });
                } else {
                    Swal.fire({
				    	title: "목록 추가에 실패했습니다.",
				        timer: 1500,
				        showConfirmButton: true,
				    });
                }
            },
            error: function (xhr, status, error) {
                // AJAX 요청이 실패했을 때
                alert("서버와의 통신에 실패했습니다: " + error);
            }
        });
    });



// ----------------------------------------------------------------------
// edit item
// ----------------------------------------------------------------------
function editItem() {
    $(document).off("click", ".list-edit")
        .on("click", ".list-edit", function (event) {
            event.preventDefault();

            var parentItem = $(this);

            $(".add-list").hide();
            $(".edit-list").show();

            $(".add-list-title").hide();
            $(".edit-list-title").show();

            var itemTitle = parentItem
                .parents('[data-action="sorting"]')
                .find(".item-head")
                .attr("data-item-title");
            $("#item-name").val(itemTitle);

            $(document).off("click", ".edit-list")
                .on("click", ".edit-list", function (event) {
                    var $_innerThis = $(this);
                    var $_getListTitle = document.getElementById("item-name").value;

                    var $_editedListTitle = parentItem
                        .parents('[data-action="sorting"]')
                        .find(".item-head")
                        .html($_getListTitle);
                    var $_editedListTitleDataAttr = parentItem
                        .parents('[data-action="sorting"]')
                        .find(".item-head")
                        .attr("data-item-title", $_getListTitle);

                    $("#addListModal").modal("hide");
                    $("#item-name").val("");
                });
            $("#addListModal").modal("show");
            $("#addListModal").on("hidden.bs.modal", function (e) {
                $("#item-name").val("");
            });
        });
}


// ----------------------------------------------------------------------
// 목록 삭제 기능
// ----------------------------------------------------------------------
function deleteItem() {
    $(document).off("click", ".tdlDelBtn")
        .on("click", ".tdlDelBtn", function () {

            var list = $(this);

            $(document).off("click", "#deleteList")
                .on("click", "#deleteList", function (event) {
                    event.preventDefault();

                    list.parents("[data-action]").remove();
                });
                
        })
}


// ----------------------------------------------------------------------
// 목록 비우기 기능
// ----------------------------------------------------------------------
function clearItem() {
    $(document).off("click", ".tdlDelBtn")
        .on("click", ".tdlDelBtn", function () {

            var list = $(this);

            // 클릭된 버튼의 부모 중 data-action="sorting" 요소 찾기
            var sortingContainer = list.parents('[data-action="sorting"]');
            
            // .connect-sorting-content .card 요소의 tdlNo 찍기
            var tdlNos = []; // tdlNo를 저장할 배열

            sortingContainer.find(".connect-sorting-content .card").each(function() {
                var tdlNo = $(this).data("tdl-no"); // tdlNo를 data-속성에서 가져옴
                console.log("tdlNo:", tdlNo); // tdlNo 출력
                tdlNos.push(tdlNo); // 배열에 tdlNo 추가
            });
            
            console.log(tdlNos);

            // 추가 작업을 위한 클릭 이벤트 리스너 설정
            $(document).off("click", "#clearAllList")
                .on("click", "#clearAllList", function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    // 비동기 삭제 요청
                    $.ajax({
                        url: '/synerhub/todolist/deleteTaskAll', // 삭제 요청 URL
                        type: 'POST', // POST 방식으로 요청
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader(header, token);
                        },
                        contentType: 'application/json', // JSON 형식으로 데이터 전송
                        data: JSON.stringify(tdlNos), // tdlNo 배열을 JSON 문자열로 변환
                        success: function(response) {
                            console.log(response); // 삭제 결과 메시지

                            // 카드 삭제 후 UI 업데이트
                            sortingContainer.find(".connect-sorting-content .card").remove();

                            // noneTdlElements를 기준으로 업데이트
                            var noneTdlElements = $('.tdlListState'); // 상태 요소를 가져옵니다.
                            for (let i = 0; i < noneTdlElements.length; i++) {
                                var tdlTasks = noneTdlElements.eq(i).find('.tdlTask');
                                console.log(tdlTasks);
                                if (tdlTasks.length == 0) {
                                    var noneTdls = noneTdlElements.eq(i).find('.connect-sorting-content');

                                    let html = "";

                                    // i에 따라 텍스트 변경
                                    if (i == 0) {
                                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>할 일을 추가해주세요.</p>
                                                </div>`;
                                    } else if (i == 1) {
                                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>진행 중인 업무가 존재하지 않습니다.</p>
                                                </div>`;
                                    } else if (i == 2) {
                                        html = `<div id="noneTdl" class="d-flex align-items-center justify-content-center">
                                                    <p>완료한 업무가 존재하지 않습니다.</p>
                                                </div>`;
                                    }

                                    noneTdls.html(html);
                                }
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("삭제 실패:", error);
                        }
                    });
            });
        });
}



// ----------------------------------------------------------------------
// 업무 삭제 기능
// ----------------------------------------------------------------------
function kanbanDelete() {
    $(document).off("click", ".card .kanban-item-delete")
        .on("click", ".card .kanban-item-delete", function (event) {
            event.preventDefault();

            const get_card_parent = $(this).parents(".card");
            const selectedTdlNo = get_card_parent.data('tdl-no'); // 카드에서 tdlNo 가져오기

            console.log(selectedTdlNo);

            if (selectedTdlNo == null) {
                console.error("tdlNo를 찾을 수 없습니다.");
                return; // tdlNo가 없으면 함수 종료
            }

            $("#deleteConformation").modal("show");

            $('[data-remove="task"]').off("click").on("click", function (event) {
                event.preventDefault();

                $.ajax({
                    url: `/synerhub/todolist/delete/${selectedTdlNo}`, // 삭제 요청 URL
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(header, token);
                    },
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        console.log("삭제 성공:", response);
                        
                        todoListLoad(); // 삭제 후 목록을 다시 로드
                    },
                    error: function () {
                        Swal.fire({
					    	title: "업무 삭제에 실패했습니다.",
					        timer: 1500,
					        showConfirmButton: true,
					    });
                    }
                });
            });
        });
}


// ----------------------------------------------------------------------
// 업무 수정 기능
// ----------------------------------------------------------------------
function kanbanEdit() {
    $(document).off("click", ".card .kanban-item-edit")
        .on("click", ".card .kanban-item-edit", function (event) {
            event.preventDefault();

            var parentItem = $(this);
            var no = parentItem.parents(".tdlTask").data("tdl-no"); // tdlNo 값 가져오기

            console.log("tdlNo:", no); // tdlNo 로그 출력

            $(".add-task-title").hide();
            $(".edit-task-title").show();

            $('[data-btn-action="addTask"]').hide();
            $('[data-btn-action="editTask"]').show();

            var itemKanbanTitle = parentItem
                .parents(".tdlTask")
                .find("h4")
                .attr("data-item-title");
            $(".task-text-progress #kanban-title").val(itemKanbanTitle);

            var itemText = parentItem
                .parents(".tdlTask")
                .find('p:not(".progress-count")')
                .attr("data-item-text");
            $(".task-text-progress #kanban-text").val(itemText);

            $(document).off("click", '[data-btn-action="editTask"]')
                .on("click", '[data-btn-action="editTask"]', function (event) {
                    var kanbanValueTitle = document.getElementById("kanban-title").value;
                    var kanbanValueText = document.getElementById("kanban-text").value;

                    // AJAX 요청 추가
                    var todoListVO = {
                        tdlNo: no, // 수정할 업무의 ID
                        tdlTtl: kanbanValueTitle,
                        tdlConts: kanbanValueText,
                        memNo: MEM_NO // 사용자 ID
                    };

                    $.ajax({
                        type: "POST",
                        url: "/synerhub/todolist/update", // 수정 요청 URL
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader(header, token);
                        },
                        data: JSON.stringify(todoListVO),
                        success: function (response) {
                            console.log("업무 수정 성공:", response);
                            // 수정된 내용을 UI에 반영
                            parentItem.parents(".tdlTask").find("h4").attr("data-item-title", kanbanValueTitle).html(kanbanValueTitle);
                            parentItem.parents(".tdlTask").find('p:not(".progress-count")').attr("data-item-text", kanbanValueText).html(kanbanValueText);
                            $("#addItemModal").modal("hide");
                        },
                        error: function () {
                            Swal.fire({
						    	title: "업무 수정에 실패했습니다.",
						        timer: 1500,
						        showConfirmButton: true,
						    });
                        }
                    });
                });
            $("#addItemModal").modal("show");
        });

}


