$(function () {
    $(document).on('click', '#contact', function () {
        // console.log("contact click");
        if (synerhubch == null) {
            swal.fire("채널을 먼저 입장해주세요!");
            return;
        }
        contactLoad();
    });

    // 검색 입력 이벤트 처리
    $(document).on('input', '#text-srh', function () {
        const searchValue = $(this).val().toLowerCase();
        filterUserList(searchValue);
    });

    // 검색 입력시 엔터 키를 눌렀을 때 기본 동작 방지
    $(document).on('keypress', '#text-srh', function (event) {
        if (event.key == 'Enter') {
            event.preventDefault();
        }
    });

});

function contactLoad() {
    var html = `
    <div class="mb-3 overflow-hidden position-relative">
        <div class="px-3">
            <h4 class="fs-6 mb-0">채널 주소록</h4>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">Home</li>
                    <li class="breadcrumb-item" aria-current="page">Channel Contact</li>
                </ol>
            </nav>
        </div>
    </div>

    <!-- 채팅 모달 -->
    <div class="modal fade" id="chatStart" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <!-- 채팅 모달 화면 출력되는 부분 -->
            </div>
        </div>
    </div>
    <!-- 채팅 모달 끝 -->

    <div class="card overflow-hidden chat-application">
        <div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
            <button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
                <i class="ti ti-menu-2 fs-5"></i>
            </button>
            <form class="position-relative w-100">
                <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Contact">
                <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
            </form>
        </div>
        <div class="d-flex w-100">
            <div class="min-width-340">
                <div class="border-end user-chat-box h-100">
                    <div class="px-4 pt-9 pb-6 d-none d-lg-block">
                        <form class="position-relative">
                            <input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="이름을 입력하세요" />
                            <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                        </form>
                    </div>
                    <div class="app-chat" style="max-height: 480px; overflow-y: auto;">
                        <ul class="chat-users mh-n100" data-simplebar>
                            <!-- 사용자 리스트 출력되는 부분 -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="w-100">
                <div class="chat-container h-100 w-100">
                    <div class="chat-box-inner-part h-100">
                        <div class="chatting-box app-email-chatting-box">
                            <div class="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                                <h5 class="text-dark mb-0 fs-5">연락처 상세보기</h5>
                                <ul class="list-unstyled mb-0 d-flex align-items-center">
                                    <li class="d-lg-none d-block">
                                        <a class="text-dark back-btn px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                                            <i class="ti ti-arrow-left"></i>
                                        </a>
                                    </li>
                                    <!-- <li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="important">
                                        <a class="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)">
                                            <i class="ti ti-star"></i>
                                        </a>
                                    </li> -->
                                </ul>
                            </div>
                            <div class="position-relative overflow-hidden">
                                <div class="position-relative">
                                    <div class="chat-box email-box mh-n100 p-9" data-simplebar="init">
                                        <!-- 사용자 상세보기 출력되는 부분 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    $("#main_contents").html(html);

    let data = {
        memNo: MEM_NO,
        chNo: synerhubch
    };

    $.ajax({
        url: '/synerhub/contact/contactList',
        type: 'post',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (res) {
            const myId = '';

            // 채널별 리스트
            var userListHtml = '';
            // console.log(res);
            res.forEach(function (member) {
                if (member.memNo != myId) {
                    userListHtml += `
                    <li>
                        <a href="javascript:void(0)" class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user" id="chat_user_${member.memNo}" data-user-id="${member.memNo}">
                            <strong>
                            <span class="position-relative">
                                <img src="${contextPath}${member.memPrflimg}" width="40" height="40" class="rounded-circle">
                            </span>
                            </strong>
                            <div class="ms-6 d-inline-block w-100">
                                <h6 class="mb-1 fw-semibold chat-title fs-5" data-username="${member.memName}">${member.memName}(${member.chMemThNm || '-'})</h6>
                                <strong><span class="fs-3 text-body-color d-block email-text" >${member.memEmail}</span></strong>
                                <h6 class="fw-semibold mb-0 phone-number" style="display:none;">${member.memPh}</h6> <!-- 휴대폰 번호를 숨긴 상태로 추가 -->
                            </div>
                        </a>
                    </li>`;
                }
            });

            // 사용자 리스트가 비어있는지 확인
            if (userListHtml == '') {
                userListHtml = `
                <li class="text-center">
                    <p>주소록에 등록된 사용자가 없습니다.</p>
                    <a onclick="channelInvite(124)" class="btn btn-primary" style="cursor: pointer; padding: 10px 20px; font-size: 16px; margin-top: 10px;">
                        채널 초대
                    </a>
                </li>`;
            }

            // 주소록 상세보기
            var userDetailHtml = '';
            // console.log(res);
            res.forEach(function (member, index) {
                if (index == 0) {
                    userDetailHtml += `
                    <div class="chat-list chat active-chat" data-user-id="${member.memNo}">`
                } else {
                    userDetailHtml += `
                    <div class="chat-list chat" data-user-id="${member.memNo}">`
                }
                userDetailHtml += `
                        <div class="d-flex mt-4 ms-2">
                            <div class="col-lg-4">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="profile-pic mb-1 mt-3">
                                            <img src="${contextPath}${member.memPrflimg}" width="150" class="rounded-circle" alt="user" />
                                            <h4 class="mt-3 mb-0">${member.memName}</h4>
                                        </div>
                                        <div class="
                                            badge
                                            bg-primary-subtle
                                            text-primary
                                            ">
                                            ${member.chRoleNm}
                                        </div>
                                        <div class="mt-2">프로필 닉네임 : <strong>${member.chMemNm || '-'}</strong></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row ms-4 mt-4">
                                <div class="col-5 mb-7">
                                    <p class="mb-1 fs-2">휴대폰번호</p>
                                    <h5 class="fw-semibold mb-0 phone-number">${member.memPh}</h5>
                                </div>
                                <div class="col-7 mb-7">
                                    <p class="mb-1 fs-2">이메일</p>
                                    <h5 class="fw-semibold mb-0">${member.memEmail}</h5>
                                </div>
                                <div class="col-12 mb-9">
                                    <p class="mb-1 fs-2">주소</p>
                                    <h5 class="fw-semibold mb-0">${member.memAddr1}, ${member.memAddr2}(${member.memPstCd})</h5>
                                </div>
                                <div class="col-5 mb-7">
                                    <p class="mb-1 fs-2">채널가입일</p>
                                    <h5 class="fw-semibold mb-0">${member.chRegdt}</h5>
                                </div>
                                <div class="col-7 mb-7">
                                    <p class="mb-1 fs-2">최근접속일</p>
                                    <h5 class="fw-semibold mb-0">${member.chCnntdt || '-'}</h5>
                                </div>
                                <div class="pb-7 mb-0">
                                    <p class="mb-2 fs-2">자기소개</p>
                                    <h5 class="fw-semibold mb-0">${member.memIntr || '-'}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="border-bottom mb-4"></div>
                        <div class="d-flex align-items-center gap-6">
                            <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#chatStart" style="width: 200px">채팅하기</button>
                        </div>
                    </div>
                `;
            });

            $(".chat-users").html(userListHtml);
            $(".chat-box").html(userDetailHtml);

            const modalContent = `
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <img src="${contextPath}${res[0].memPrflimg}" width="100" class="rounded-circle img-fluid mb-3" />
                <h5 class="card-title">${res[0].memName}</h5>
                <strong class="badge bg-primary-subtle text-primary mb-3" style="font-weight: normal;">${res[0].memPh}</strong>
                <h4>'${res[0].memName}'님과 채팅을 시작하시겠습니까?</h4>
            </div>
            <div class="modal-footer justify-content-center">
                <button data-btn-action="addTask" class="btn add-tsk btn-success" data-bs-dismiss="modal" id="startChattingToContact">시작하기</button>
            </div>
            `;

            // 모달에 내용 설정
            $('#chatStart .modal-content').html(modalContent);
        },
    });
}

// 검색 기능
function filterUserList(searchValue) {
    // 사용자 리스트 가져오기
    $('.chat-users li').each(function () {
        const userName = $(this).find('.chat-title').data('username').toLowerCase();
        if (userName.includes(searchValue)) {
            $(this).show(); // 검색어가 포함된 경우 보여줌
        } else {
            $(this).hide(); // 포함되지 않은 경우 숨김
        }
    });
}

// 채팅하기 버튼 클릭 시 모달 정보 업데이트
$(document).on('click', '.chat-user', function () {
    const userId = $(this).data('user-id');
    const userName = $(this).find('.chat-title').data('username');
    const userEmail = $(this).find('.fs-3').text();
    const userPh = $(this).find('.phone-number').text();
    const userPrflimg = $(this).find('img').attr('src');

    // console.log('User ID:', userId);
    // console.log('User Name:', userName);
    // console.log('User Email:', userEmail);
    // console.log('User Phone:', userPh);
    // console.log('User Profile Image:', userPrflimg);

    // 모달에 정보 설정
    const modalContent = `
        <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
            <img src="${userPrflimg}" width="100" class="rounded-circle img-fluid mb-3 hover" />
            <h5 class="card-title">${userName}</h5>
            <strong class="badge bg-primary-subtle text-primary mb-3" style="font-weight: normal;">${userPh}</strong>
            <h4>'${userName}'님과 채팅을 시작하시겠습니까?</h4>
        </div>
        <div class="modal-footer justify-content-center">
            <button data-btn-action="addTask" class="btn add-tsk btn-success" data-bs-dismiss="modal" data-user-img="${userPrflimg}" data-user-id="${userId}" data-user-name="${userName}" id="startChattingToContact">시작하기</button>
        </div>
    `;

    // 모달에 내용 설정
    $('#chatStart .modal-content').html(modalContent);
    // $('#chatStart').modal('show'); // 모달 열기
});

$(document).on("click", "#startChattingToContact", function () {
    let userId = $(this).data('user-id');
    let userName = $(this).data('user-name');
    let userImg = $(this).data('user-img');

    userImg = userImg.replace('/synerhub', '');

    let formData = new FormData();
    formData.append('groupTitle', userName);
    formData.append('memNo', MEM_NO);
    formData.append('inviteMemNo', userId);
    formData.append('groupImg', userImg);

    $.ajax({
        url: "/synerhub/CreateChattingGroupByContact",
        type: "post",
        processData: false, // jQuery가 데이터를 처리하지 않도록 설정
        contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: formData,
        success: function (res) {
            console.log(res)
            chatopen();
            $(document).find("#"+res).click();

        }
    })
});
