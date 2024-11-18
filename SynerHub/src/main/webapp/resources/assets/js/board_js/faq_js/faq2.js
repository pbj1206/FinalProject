$(function() {
    $(document).on('click', '#faqList', function() {
        console.log("faq click");
        
        $.ajax({
            url: "/synerhub/faq/list",
            type: "post",
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success: function(res) {
                console.log("faq 테이블 생성");
                var html = "";

                // 카테고리 이름과 아이콘을 정의한 배열
                const categoryNames = [
                    "서비스", 
                    "계정", 
                    "결제·환불", 
                    "오류 보고", 
                    "신고 접수", 
                    "기타"
                ];
                
                const categoryIcons = [
                    "ti ti-heart-handshake",	// 서비스
                    "ti ti-user-circle",  	    // 계정
                    "ti ti-coin",		        // 결제·환불                    
                    "ti ti-bug",				// 오류 보고
                    "ti ti-user-exclamation",	// 신고 접수
                    "ti ti-line-dotted"       	// 기타
                ];

                // faq 데이터가 존재하는지 확인
                if (res.length === 0) {
                    html += `
                    <div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">FAQ</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">FAQ</li>
                            </ol>
                          </nav>
                        </div>
                    </div>
                    <div class="card" style="background-color: #e7ecf0;">
                        <div class="card-body text-center">
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab" tabindex="0">
                                    <div class="accordion accordion-flush mb-5 card position-relative overflow-hidden border" id="faqBoard">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="flush-heading0">
                                                <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse0" aria-expanded="false" aria-controls="flush-collapse0">
                                                    <h5 style="margin-left: 35%;">자주 묻는 질문이 존재하지 않습니다.</h5>
                                                </button> 
                                            </h2> 
                                            <div id="flush-collapse0" class="accordion-collapse collapse" aria-labelledby="flush-heading0" data-bs-parent="#faqBoard">
                                                <div class="accordion-body fw-normal">
                                                    <p>질문을 추가해 주세요.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    // 카테고리별로 FAQ 데이터를 그룹화
                    const groupedData = res.reduce((acc, faq) => {
                        const category = faq.faqCategory;
                        if (!acc[category]) {
                            acc[category] = [];
                        }
                        acc[category].push(faq);
                        return acc;
                    }, {});

                    html += `
                    <div class="mb-3 overflow-hidden position-relative">
                        <div class="px-3">
                          <h4 class="fs-6 mb-0">FAQ</h4>
                          <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                              <li class="breadcrumb-item">
                                <a href="../main/index.html">Home</a>
                              </li>
                              <li class="breadcrumb-item" aria-current="page">FAQ</li>
                            </ol>
                          </nav>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-body">
                            <div class="d-md-flex justify-content-between mb-9">
                                <div class="mb-9 mb-md-0">
                                    <div style="display: flex;">
                                        <h3>자주 묻는 질문</h3>
                                    </div>
                                    <p class="card-subtitle mb-0">SynerHUB 고객센터</p>
                                </div>
                        	</div>
                            <div class="card">
                                <ul class="nav nav-pills user-profile-tab" id="pills-tab" role="tablist">`;

                    // 그룹화된 데이터로 버튼 생성
                    Object.keys(groupedData).forEach((category, index) => {
                        const tabId = `tab-${index}`; // 각 탭의 고유 아이디 생성
                        const categoryName = categoryNames[index] || category; // 카테고리 이름 매핑
                        const categoryIcon = categoryIcons[index] || ""; // 카테고리 아이콘 매핑
                        html += `
                        <li class="nav-item" role="presentation">
                            <button class="nav-link position-relative rounded-0 ${index === 0 ? 'active' : ''} d-flex align-items-center justify-content-center bg-transparent fs-3 py-3" 
                                    id="pills-${tabId}-tab" data-bs-toggle="pill" data-bs-target="#pills-${tabId}" type="button" role="tab" aria-controls="pills-${tabId}" aria-selected="${index === 0}">
                                <i class="${categoryIcon} me-2 fs-6"></i>
                                <span class="d-none d-md-block">${categoryName}</span>
                            </button>
                        </li>`;
                    });

                    html += `
                                </ul>
                                <div class="card-body">
                                    <div class="tab-content" id="pills-tabContent">`;

                    // 각 카테고리에 대한 내용 생성
                    Object.keys(groupedData).forEach((category, index) => {
                        const tabId = `tab-${index}`; // 각 탭의 고유 아이디 생성
                        html += `
                        <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="pills-${tabId}" role="tabpanel" aria-labelledby="pills-${tabId}-tab" tabindex="0">
                            <div class="accordion accordion-flush mb-5 card position-relative overflow-hidden border" id="faqBoard">`;

                        // FAQ 내용을 추가
                        groupedData[category].forEach((faq, faqIdx) => {
                            html += `
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading${index}${faqIdx}">
                                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}${faqIdx}" aria-expanded="false" aria-controls="flush-collapse${index}${faqIdx}">
                                        ${faq.faqTtl}
                                    </button>
                                </h2>
                                <div id="flush-collapse${index}${faqIdx}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}${faqIdx}" data-bs-parent="#faqBoard">
                                    <div class="accordion-body fw-normal" style="line-height: 1.5; white-space: pre-line; margin: 0;">
                                        ${faq.faqConts}
                                    </div>
                                </div>
                            </div>`;
                        });

                        html += `
                            </div>
                        </div>`;
                    });

                    html += `
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }

                $("#main_contents").html(html);
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 실패:", error);
            }
        });
    });
});


