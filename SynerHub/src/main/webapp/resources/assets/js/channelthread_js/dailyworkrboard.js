//전역변수 이름다르게하기 이름 같게하면 오류생김
var threadfileList2 = [];
	
//페이지번호 전역변수 이름다르게하기 이름 같게하면 오류생김
let Dailypage = 1; 
    
function DailyWorkr(thNo) {
    //스레드 번호   
    synerhubth = thNo;
      
    let synerhubThread = {    
        "thNo": thNo,    
        "rowCnt": 10,          
        "page": Dailypage,   
        "synerhub1" :MEM_NO,     
        "synerhub2": synerhubth  
    }    
   
    console.log("DailyWorkr : ", synerhubThread);  
    /* 
    DailyWorkr -> console  
        page: 1  
        rowCnt : 10
        thNo : 238   
    */   

    $.ajax({ 
        url: "/synerhub/thdailyboard/list2",
        type: "post", 
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);  
        }, 
        data: JSON.stringify(synerhubThread),
        contentType: "application/json; charset=utf-8", 
        success:  function (result) { 
    
            console.log("/thdailyboard/list2 : ", result);    
            /*
             thdailyboard/list2 -> console.log
                    page : 1
                    thNo : 238
                    thTtl : "개발부"
            */
            let res = result.thboardDailyList.list;
            thTtl = result.thTtl;  
             
            var html = "" 
        if(result.thDailyAuthority == 0){

            Swal.fire('해당 스레드에 권한이 없습니다 !', '', 'warning');
            synerhubTheThread(thNo); 
    
              }else{
              
            if (res.length == 0) {
                html +=
            `<div class="mb-3 overflow-hidden position-relative">
				<div class="px-3">
				  <h4 class="fs-6 mb-0">일일 업무 보고</h4>
				  <nav aria-label="breadcrumb">
					<ol class="breadcrumb mb-0"> 
					  <li class="breadcrumb-item">
						<p>Home</p>
					  </li>
					  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
					  <li class="breadcrumb-item" aria-current="page">일일 업무보고</li>
					</ol>
				  </nav>
				</div>
			</div>
			<div class="col-12">
				<div class="card mb-0"> 
					<div class="card-body">
						<div class="d-md-flex justify-content-between mb-9">
							<div class="mb-9 mb-md-0">
								<div style="display: flex;">
									<h3>${thTtl}</h3>
								</div>
								<p class="card-subtitle mb-0"></p>
							</div>

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thDailySearch" placeholder="제목을 검색하세요">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" id="thDailySchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thDailySchBtn(${thNo})">
                                <i class="ti ti-search fs-6"></i>
                            </button>
                         </div> 

						</div> 
						<div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
							<table class="table align-middle text-nowrap text-center">
								<thead class="table-primary text-dark fs-4">
									<tr>
										<th class="ps-0">NO</th>
										<th>제목</th>
										<th>작성자</th> 
										<th>작성일</th>
									</tr> 
								</thead>
								<tbody> 
									<tr>
										<td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
									</tr> 
								</tbody>
					    </table> 
                    </div> 
                    <div class="align-items-center justify-content-between mt-10">
                    <div class="mb-3 me-3" >
                        <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                             `
                            if(result.thDailyAuthority > 0){
                                html +=`
                        <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                          <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                        </a>
                        <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thDailyinsert(${thNo})">
							  <i class="ti ti-pencil fs-6 me-2"></i> 
                              작성
						  </button>
                            `}html += `
                        </div>
				  </div>
				</div> 
			  </div>
			</div>`;
        } else {
                html += `
				  <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">일일 업무 보고</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <p>Home</p>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                  <li class="breadcrumb-item" aria-current="page">일일 업무보고</li>
                </ol>
              </nav>
            </div>
        </div>
        <div class="col-12">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="d-md-flex justify-content-between mb-9">
                        <div class="mb-9 mb-md-0">
                            <div style="display: flex;">
                                <h3>${thTtl} 일일 업무보고</h3> 
                            </div>
                            <p class="card-subtitle mb-0"></p>
                        </div>

                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thDailySearch" placeholder="제목을 검색하세요">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" id="thDailySchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thDailySchBtn(${thNo})">
                                <i class="ti ti-search fs-6"></i>
                            </button>
                         </div> 


                    </div>
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                    <th style="padding-left: 30px">NO</th>
                                    <th style="padding-left: 90px">제목</th>
                                    <th style="padding-right: 45px">작성자</th>  
                                    <th style="padding-left: 30px">작성일</th>
                                </tr>  
                            </thead>  
                            <tbody>`;

                for (var f = 0; f < res.length; f++) {
                    html += `
            <tr id="thBoardtr${res[f].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thDaily(${res[f].brdNo})">
                <td style="padding-left: 30px"><span style="margin-left: 10px;" id="${res[f].brdNo}">${res[f].rnum}</span></td>
                <td style="padding-left: 90px"> ${res[f].brdTtl}</td> 
                <td style=""padding-right: 45px"><span class="mb-1 badge text-bg-light">${res[f].brdWrtrNm} </span></td>
                <td style="padding-left: 30px"> ${res[f].formattedBrdRgdt}</td>
            </tr>`;
                }
            html +=
                `</tbody>
		                </table>
		              </div>
		              <div class="align-items-center justify-content-between mt-10">
		                  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
		                      `
                            if(result.thDailyAuthority > 0){ 
                                html +=` 
                        <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                            <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                        </a>
                            <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thDailyinsert(${thNo})">
                            <i class="ti ti-pencil fs-6 me-2"></i>작성
                        </button>
                            `} 
                            html +=
                            `
		                  </div>
		              </div> 
		
		            <div class="text-center" id="pagingdong">
		                <nav aria-label="Page navigation">
		                    <ul class="pagination justify-content-center pagination-sm m-0">
		                        <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
		                        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li> 
		                    </ul>
		                </nav> 
		            </div>
		
		            </div>
		          </div>
		        </div>`;
            }
        } 
            $("#main_contents").html(html);
            updatePaging(result.thboardDailyList.total, result.page, result.thboardDailyList.rowCnt, result.thNo);
            /*
            result.thboardDailyList.total : 12
            result.page : 1
            result.thboardDailyList.rowCnt : 10
            result.thNo : 238

            */
        }
    });
};//end DailyWorkr() 

//다른 곳에서 updatePaging()함수를 호출 시 실행
function updatePaging(total, currentPage, rowCnt, thNo) {
    console.log("updatePaging게시판 호출됨, thNo:", thNo);
    /*
          total :    12
    currentPage :    1
        rowCnt  :    10
          thNo  :    238
    */
	//rowCnt는 나누기 시 부모이므로 0이면 안됨
	if(rowCnt<1){
		console.log("나누기 시 부모가 0일 수 없습니다");
		return;
	}

    let totalPages = Math.ceil(total / rowCnt);
    let pagingContainer = $('#pagingdong .pagination');
    pagingContainer.empty(); // 이전 내용 삭제

    // 이전 버튼
    if (currentPage > 1) {
        pagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage - 1}" data-th-no="${thNo}">이전</a></li>`);
    } else {
        pagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" data-th-no="${thNo}">이전</a></li>`);
    }

    // 페이지 번호 생성
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            pagingContainer.append(`<li class="page-item active" aria-current="page"><a class="page-link" href="javascript:void(0)" data-th-no="${thNo}">${i}</a></li>`);
        } else {
            pagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${i}" data-th-no="${thNo}">${i}</a></li>`);
        }
    }

    // 다음 버튼
    if (currentPage < totalPages) {
        pagingContainer.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="${currentPage + 1}" data-th-no="${thNo}">다음</a></li>`);
    } else {
        pagingContainer.append(`<li class="page-item disabled"><a class="page-link" href="javascript:void(0)" aria-disabled="true" data-th-no="${thNo}">다음</a></li>`);
    }

    
}//end updatePaging()

function DailyWorkr2(thNo,page) { 

    let searchTitleWord = $("#thDailySearch").val().trim();

    let synerhubThread = {
        "thNo": thNo,  
        "rowCnt": 10,
        "page": page,
        "searchTitle" : searchTitleWord
    }
    console.log($("#thDailySearch").val().trim());

    console.log("DailyWorkr2 : ", synerhubThread);

    $.ajax({
        url: "/synerhub/thdailyboard/list2",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);  
        }, 
        data: JSON.stringify(synerhubThread),
        contentType: "application/json; charset=utf-8", 
        success: function (result) { 
        	
            let res = result.thboardDailyList.list;
            thTtl = result.thTtl;  
            
            var html = ""

            if (res.length == 0) {
                html +=
                    `<div class="mb-3 overflow-hidden position-relative">
				<div class="px-3">
				  <h4 class="fs-6 mb-0">일일 업무 보고</h4>
				  <nav aria-label="breadcrumb">
					<ol class="breadcrumb mb-0"> 
					  <li class="breadcrumb-item">
						<p>Home</p>
					  </li>
					  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
					</ol>
				  </nav>
				</div>
			</div>
			<div class="col-12">
				<div class="card mb-0">
					<div class="card-body">
						<div class="d-md-flex justify-content-between mb-9">
							<div class="mb-9 mb-md-0">
								<div style="display: flex;">
									<h3>${thTtl}</h3>
								</div>
								<p class="card-subtitle mb-0"></p>
							</div>
 
						<div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thDailySearch" placeholder="제목을 검색하세요" value="${searchTitleWord}">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" id="thDailySchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thDailySchBtn(${thNo})">
                                <i class="ti ti-search fs-6"></i>
                            </button>
                         </div> 
						
                        
                            </div> 
						<div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap text-center">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                    <th class="ps-0">NO</th>
                                    <th>제목</th>
                                    <th>작성자</th> 
                                    <th>작성일</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr>
                                    <td colspan="7" class="text-center">조회하신 게시글이 존재하지 않습니다.</td>
                                </tr>
                            </tbody>
                        </table>
				  </div>
				  <div class="align-items-center justify-content-between mt-10">
					  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
					  </div>
				  </div>
				</div>
			  </div>
			</div>`
            } else {
                html += `
				  <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">일일 업무 보고</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <p>Home</p>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                </ol>
              </nav>
            </div>
        </div>
        <div class="col-12">
            <div class="card mb-0">
                <div class="card-body">
                    <div class="d-md-flex justify-content-between mb-9">
                        <div class="mb-9 mb-md-0">
                            <div style="display: flex;">
                                <h3>${thTtl} 일일 업무보고</h3>
                            </div>
                            <p class="card-subtitle mb-0"></p>
                        </div>
                        
                        <div class="input-group me-3 mb-3" style="width:25%;"> 
                            <input type="text" class="form-control" id="thDailySearch" placeholder="제목을 검색하세요" value="${searchTitleWord}">
                            <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;" id="thDailySchWr" data-brdWrtrNm="${res.brdWrtrNm}" onclick="thDailySchBtn(${thNo})">
                                <i class="ti ti-search fs-6"></i>
                            </button>
                         </div> 

                    </div>
                    <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                        <table class="table align-middle text-nowrap">
                            <thead class="table-primary text-dark fs-4">
                                <tr>
                                    <th style="padding-left: 30px">NO</th>
                                    <th style="padding-left: 90px">제목</th>
                                    <th style="padding-right: 45px">작성자</th>  
                                    <th style="padding-left: 30px">작성일</th>
                                </tr>  
                            </thead>  
                            <tbody>`;

                for (var f = 0; f < res.length; f++) {
                    html += `
            <tr  id="thBoardtr${res[f].brdNo}" data-th-no="${thNo}" data-th-ttl="${thTtl}" onclick="thDaily(${res[f].brdNo})">
                <td style="padding-left: 30px"><span style="margin-left: 10px;" id="${res[f].brdNo}">${res[f].rnum}</span></td>
                <td style="padding-left: 90px"> ${res[f].brdTtl}</td> 
                <td style=""padding-right: 45px"><span class="mb-1 badge text-bg-light">${res[f].brdWrtrNm} </span></td>
                <td style="padding-left: 30px"> ${res[f].formattedBrdRgdt}</td>
            </tr>`;
                }
            }
            html +=
                `</tbody>
		                </table>
		              </div>
		              <div class="align-items-center justify-content-between mt-10">
		                  <div class="mb-3 me-3 d-flex justify-content-between" style="text-align: right;">
                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back">
                                <i class="ti ti-arrow-back-up fs-7 me-1" onclick="synerhubTheThread(${thNo})"></i>
                            </a>
		                      <button type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-primary" onclick="thDailyinsert(${thNo})">
		                          <i class="ti ti-pencil fs-6 me-2"></i>작성
		                      </button>
		                  </div>
		              </div> 
		
		            <div class="text-center" id="pagingdong">
		                <nav aria-label="Page navigation">
		                    <ul class="pagination justify-content-center pagination-sm m-0">
		                        <li class="page-item"><a class="page-link" href="javascript:void(0)" data-page="1">이전</a></li>
		                        <li class="page-item disabled"><a class="page-link" href="javascript:void(0)">다음</a></li> 
		                    </ul>
		                </nav>
		            </div>
		
		
		            </div>
		          </div>
		        </div>`;
		        
            $("#main_contents").html(html);
            /* map은 result임
            map.put("page",page);
			map.put("thTtl", thTtl);
			map.put("thNo", thNo);
			map.put("thboardFreeList", pagingVO1);
            */
            updatePaging(result.thboardDailyList.total, result.page, result.thboardDailyList.rowCnt, result.thNo);
        }
    });
};






function thDailyinsert(thNo) {

    var html = "";
    html += `<div class="mb-3 overflow-hidden position-relative">
	            <div class="px-3">
	              <h4 class="fs-6 mb-0">일일 업무보고 작성</h4>
	              <nav aria-label="breadcrumb">
	                <ol class="breadcrumb mb-0">
	                  <li class="breadcrumb-item">
	                    <p>Home</p>
	                  </li>
	                  <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
	                  <li class="breadcrumb-item" aria-current="page">일일 업무보고 작성</li>
	                </ol>
	              </nav>
	            </div>
	        </div>  
	
	        <div class="card">
	            <div class="card-body">
	                <div class="mb-4" role="tablist">
	                    <h3>일일 업무보고 작성</h3>
	                </div>
	
	                <div class="tab-content">
	                    <div class="tab-pane active" id="feeds" role="tabpanel">
	                        <div class="card border">
	                            <div class="card-body p-4">
	                                
	                                <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
	                                    <div class="mt-3">
	                                        <label class="form-label mt-10" for="title-3">제목</label>
	                                        <br />
	                                        <input id="ThDailyTtl" type="text" value="" class="form-control" />
	                                        <br />
	                                        <label class="form-label" for="text-3">내용</label>
	                                        <br />
                                        
                                            <div id="thDailyEditor" value=""></div>

	                                    </div>
	                                </div>
	
	                                <div class="d-flex align-items-center justify-content-between">
	                                	<form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
	                                    <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
	                                        <li>
	                                            <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('DailyinputFile').click();">
	                                                <i class="ti ti-paperclip me-2 fs-5"></i>
	                                                <span class="d-none d-sm-inline-flex">파일 첨부</span>
		                                            <input class="form-control" type="file" id="DailyinputFile" name="threadinputFile" style="display: none;">
	                                            </a> 
	                                        </li> 
	                                        <li>
												<div class="uploadedList"></div>
	                                        </li>
	                                    </ul>
	                                    </form>
	                                    <div>
                                        <button type="button" class="btn btn-primary" onclick="thDailyInsertBtn(${thNo})">등록</button>
	                                        <button type="button" class="btn bg-danger-subtle text-danger ms-3" id="thbrdinsert" onclick="thDailybackBtn(${thNo})">취소</button>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>`;
    $("#main_contents").html(html);

    let el = MAIN_CONTENTS.querySelector('#thDailyEditor');
      editor = new Editor({
        el: el,
        height: '500px',
        initialEditType: 'WYSIWYG',
        previewStyle: 'tab',
        hooks: {
          addImageBlobHook: async (blob, imgLoader) => {
            let formData = new FormData();
            formData.append('fileList', blob);
            formData.append('folderName', 'thDailyContsImg/' + synerhubch);
            let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
            imgLoader(res.data, 'IMG');
          }
        }
      });
    editor.getMarkdown();


};//end thDailyinsert()

function thDailyInsertBtn(thNo) {

    let brdConts;
    console.log("thDailyInsertBtn 크릵!!");

    // 게시글 정보를 포함한 데이터 객체 생성
    let data = {
        chNo: synerhubch,
        thNo: thNo,
        brdWrtr: MEM_NO,
        // brdTtl: $("#ThDailyTtl").val(),
        brdConts: $("#ThDailyConts").val()
    
    } 

    // FormData 객체 생성
    let formData = new FormData();
    formData.append("chNo", synerhubch);
    formData.append("thNo", thNo);
    formData.append("brdWrtr", MEM_NO);
    formData.append("brdTtl", $("#ThDailyTtl").val());
    // formData.append("brdConts", $("#ThDailyConts").val());

    if (editor.getHTML() === '<p><br></p>') {
        editor.focus();
        Swal.fire('내용을 입력하세요.');
        return;
      } else {
        formData.append("brdConts", editor.getMarkdown());
      }

    // 파일 첨부
    let fileInput = $('#DailyinputFile')[0];
    if (threadfileList2.length > 0) {
        for (let i = 0; i < threadfileList2.length; i++) {
            formData.append("thboardFileList", threadfileList2[i]);
        }
    }
    threadfileList2 = [];

    $.ajax({
        url: "/synerhub/thdailyboard/insert",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: formData, // FormData
        processData: false,
        contentType: false,
        success: function (res) {
            
            brdConts =  res.brdConts;

            console.log("/thDailyInsertBtn/insert", res)
            var html = `
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                    <h4 class="fs-6 mb-0">일일 업무보고</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <p>Home</p>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                            <li class="breadcrumb-item" aria-current="page">게시물</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="mb-4" role="tablist">
                        <h3>일일 업무 상세 보기</h3>
                    </div>
                    <div class="card">
                        <div class="card-body border-bottom">
                            <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                                <h5 class="mb-0">${res.brdWrtrNm}</h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="table-responsive mb-4 border rounded-1">
                                    <table class="table text-nowrap mb-0 align-middle">
                                        <thead class="text-dark fs-4">
                                            <tr>
                                                <th>
                                                    <h4 class="fs-4 fw-semibold mb-0">
                                                        <strong>&ensp;${res.brdTtl}</strong>
                                                    </h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style="height: 10em;"> 
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="ms-3">
                                                    </div>
                                                    <div id="thDailyViewer">

                                                    </div>
                                                </td>
                                            </tr>
                                             <tr> 
                                      <td>
                                          <div class="card-footer bg-white">
                                            <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                `;
            for (var i = 0; i < res.thboardFileDetail.length; i++) { 
                html += `
                                                            <li>
                                                            <div class="me-1 border">
                                                                <p class="mailbox-attachment-icon">
                                                                    `;
                if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
                    html += `
                                                                        <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
                    html += `
                                                                        <i class="ti ti-file-text"></i>`;
                }
                html += `
                                                                </p>
                                                                <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                   <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
                                                                    <a href="#" class="float-end mt-3"> 
                                                                        <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
                                                                        </button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>`;
            }
            html += `
                                            </ul>
                                        </div>

                                      </td>
                                    </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex align-items-center">
                                    `
            let brdCheck = false;
            if (res.brdWrtr == MEM_NO) {
                html += `     
                            <div class="ms-auto d-flex align-items-center gap-2">
                                <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thDailyMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-th-no="${res.thNo}"  onclick="thDailyModBtn(${res.brdNo})">
                                    <i class="ti ti-edit fs-7 me-1"></i>
                                </a>
                                <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                    <i class="ti ti-trash fs-7 me-1"></i>
                                </button>
                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                </a> 
                                `
                brdCheck = true
            } else {
                html += `
                                 <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i>  
                                </a>`
            }
            html += `
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content"> 
                                        <div class="modal-header d-flex align-items-center">
                                            <h4 class="modal-title mt-3" id="">
                                                &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                            </h4>  
                                            <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div> 
                                        <div class="modal-body"> 
                                            <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물은 복구할 수 없습니다.</h6>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
                                                아니오
                                            </button>
                                            <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thDailyDelete" data-brd-no="${res.brdNo}" onclick="thDailyDeleteBtn(${res.thNo})">
                                                예
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        `;
            Swal.fire('게시물 등록 완료 !', '', 'success');
            $("#main_contents").html(html);
            viewer = Editor.factory({
                el: MAIN_CONTENTS.querySelector('#thDailyViewer'),
                viewer: true,
                height: '500px',
                initialValue: brdConts
              });
        },
        error: function (xhr, status, error) {
            console.error("Error occurred: ", error);
            Swal.fire('게시물 등록 실패!', '다시 시도해 주세요.', 'error');
        }
    });
}//end thDailyInsertBtn() 


// 페이지 번호 클릭 이벤트 등록
$(document).on('click', "#pagingdong .page-link", function() {
	//<a class="page-link" href="javascript:void(0)" data-page="1" data-th-no="${thNo}">1</a>
	//<a class="page-link" href="javascript:void(0)" data-page="2" data-th-no="${thNo}">2</a>
	//<a class="page-link" href="javascript:void(0)" data-page="3" data-th-no="${thNo}">3</a>
    const page = $(this).data('page');//2
    //data-th-no="
    const thNo = $(this).data('thNo');//238
    
    if (page) {
    	//page : 2
    	console.log("page : " + page);
    	//thNo : 238
    	console.log("thNo : " + thNo);
        DailyWorkr2(thNo, page); 
    }
});


// 업로드 한 파일목록의 'X' 클릭
$(document).on("click", ".uploadedList span", function () {
    $(this).parent("div").remove();
});

$(document).on("change", "#DailyinputFile", function () {
    let input = $(this); 

    if (input[0].files && input[0].files.length > 0) {
        for (let i = 0; i < input[0].files.length; i++) {
            let file = input[0].files[i];

            threadfileList2.push(file);
        }
    } 

    if (input[0].files && input[0].files.length > 0) {
        for (let i = 0; i < input[0].files.length; i++) {
            let file = input[0].files[i];
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log("aaaaaaaaaaaaaa", reader.onload);
                let html = `
					<div class="me-1" style="position: relative; display: inline-block;">
						<img src="${e.target.result}" style="width: 100px; height: 100px" />
						<span style="position: absolute; top: 0; right: 0; background: white; cursor: pointer;">X</span>
					</div>`;
                $(".uploadedList").append(html);
            };
            reader.readAsDataURL(file);
        }
    } else {
        document.getElementById('EqpUploadFileList').src = "";
    }
});

function thDaily(brdNo) {
    
    let brdConts;

    let data = {
        "brdNo": brdNo,
        synerhub1 : MEM_NO,
        synerhub2: synerhubth 
    }
    $.ajax({
        url: "/synerhub/thdailyboard/select",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log("thdailyboard/select : ", result);

            let res = result.thboardVO;

            brdConts = res.brdConts;

            var html = "";
            if(result.thboardAuthority == 0){

                Swal.fire('해당 스레드에 권한이 없습니다 !', '', 'warning');
                synerhubTheThread(thNo);
  
              }else{
            html += ` 
            <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                    <h4 class="fs-6 mb-0">일일 업무보고</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <p>Home</p>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                            <li class="breadcrumb-item" aria-current="page">게시물 </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="mb-4" role="tablist">
                        <h3>일일 업무 상세 보기</h3>
                    </div>
                    <div class="card">
                        <div class="card-body border-bottom">
                            <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                                <h5 class="mb-0">${res.brdWrtrNm}</h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="table-responsive mb-4 border rounded-1">
                                    <table class="table text-nowrap mb-0 align-middle">
                                        <thead class="text-dark fs-4">
                                            <tr> 
                                                <th>
                                                    <h4 class="fs-4 fw-semibold mb-0">
                                                        <strong>&ensp;${res.brdTtl}</strong>
                                                    </h4>
                                                </th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr style="height: 10em;"> 
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="ms-3">
                                                    </div>  
                                                    <div id="thDailyViewer">
                                                        ${brdConts}
                                                    </div>

                                                </td>
                                            </tr>
                                             <tr> 
                                      <td>
                                          <div class="card-footer bg-white">
                                            <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                `;
            for (var i = 0; i < res.thboardFileDetail.length; i++) {
                html += `
                                                             <li>
                                                            <div class="me-1 border">
                                                                <p class="mailbox-attachment-icon">
                                                                    `;
                if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
                    html += `
                                                                        <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
                    html += ` 
                                                                        <i class="ti ti-file-text"></i>`;
                }
                html += `
                                                                </p>
                                                                <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                   <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
                                                                    <a href="#" class="float-end mt-3"> 
                                                                        <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
                                                                        </button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>`;
            }
            html += `
                                            </ul>
                                        </div>

                                      </td>
                                    </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex align-items-center">
                                `
            let brdCheck = false;
            if (res.brdWrtr == MEM_NO) {
                html += `     
                            <div class="ms-auto d-flex align-items-center gap-2">
                                <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thDailyMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${brdConts}" data-th-no="${res.thNo}"  onclick="thDailyModBtn(${res.brdNo})">
                                    <i class="ti ti-edit fs-7 me-1"></i>
                                </a> 
                                <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                    <i class="ti ti-trash fs-7 me-1"></i>
                                </button>
                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                </a> 
                                `
                brdCheck = true
            } else {
                html += `           
                                 <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                </a>`
            }
            html += `
                                    </div>
                                </div> 
                            </div>
                            <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content"> 
                                        <div class="modal-header d-flex align-items-center">
                                            <h4 class="modal-title mt-3" id="">
                                                &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                            </h4>  
                                            <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div> 
                                        <div class="modal-body"> 
                                            <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물은 복구할 수 없습니다.</h6>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
                                                아니오
                                            </button>
                                            <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thBoardDelete" data-brd-no="${res.brdNo}" onclick="thDailyDeleteBtn(${res.thNo})">
                                                예
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div> `;
        }
        $("#main_contents").html(html);
        
        viewer = Editor.factory({
            el: MAIN_CONTENTS.querySelector('#thDailyViewer'),
            viewer: true,
            height: '500px',
            initialValue: brdConts
            });
        }
    });
}

function thDailyDeleteBtn(thNo) {
    console.log("삭제할 번호Daily:", thNo);
    let brdNo = $("#thBoardDelete").data("brdNo");

    data = {
        thNo: thNo,
        brdNo: brdNo
    }
    $.ajax({
        url: "/synerhub/thdailyboard/delete",
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            Swal.fire('게시물 삭제 완료 !', '', 'success');
            DailyWorkr(thNo);
        }
    });
}

function thDailyModBtn(brdNo) {
    console.log("thDailyModBtn 클릭!");

    let brdTtl = $("#thDailyMod").data("brdTtl");
    let brdConts = $("#thDailyMod").data("brdConts");
    let thNo = $("#thDailyMod").data("thNo");

    var html = "";
    html += `
        <div class="mb-3 overflow-hidden position-relative">
                    <div class="px-3">
                    <h4 class="fs-6 mb-0">일일 업무보고 수정</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <p>Home</p>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                        <li class="breadcrumb-item" aria-current="page">일일 업무수정</li>
                        </ol>
                    </nav>
                    </div>
                </div>  
        
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist"> 
                            <h3>일일 업무보고 수정</h3>
                        </div>
        
                        <div class="tab-content">
                            <div class="tab-pane active" id="feeds" role="tabpanel">
                                <div class="card border">
                                    <div class="card-body p-4">
                                        
                                        <div class="userprofile mt-25 mb-5 d-flex flex-column-reverse">
                                            <div class="mt-3">
                                                <label class="form-label mt-10" for="title-3">제목</label>
                                                <br />
                                                <input id="ThDailyTtl" type="text" value="${brdTtl}" class="form-control" />
                                                <br />
                                                <label class="form-label" for="text-3">내용</label>
                                                <br />
                                                
                                                <div id="thDailyEditor" value="">${brdConts}</div>

                                            </div>
                                        </div>
        
                                        <div class="d-flex align-items-center justify-content-between">
                                            <form action="/qna/register" method="post" class="mt-3" enctype="multipart/form-data">
                                                <ul class="quill-editor-metalink d-flex align-items-center gap-3 gap-sm-4 mb-0">
                                                <li>
                                                    <a class="text-muted fs-4" href="javascript:void(0)" onclick="document.getElementById('DailyinputFile').click();">
                                                        <i class="ti ti-paperclip me-2 fs-5"></i>
                                                        <span class="d-none d-sm-inline-flex">파일 첨부</span>
                                                        <input class="form-control" type="file" id="DailyinputFile" name="DailyinputFile" style="display: none;">
                                                    </a>
                                                </li>
                                                <li>
                                                    <div class="uploadedList"></div>
                                                </li>  
                                        </ul>
                                            </form>
                                            <div>
                                            <button type="button" class="btn btn-success" id="" onclick="thDailyUpdateBtn(${brdNo})">수정</button>
                                                <button type="button" class="btn bg-danger-subtle text-danger ms-3" onclick="thDailybackBtn(${thNo})">취소</button>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        $("#main_contents").html(html)


        editor = new Editor({
            el: MAIN_CONTENTS.querySelector("#thDailyEditor"),
            height: '500px',
            initialEditType: 'markdown',
            previewStyle: 'tab',
            initialValue  : brdConts ,
            hooks: {
              addImageBlobHook: async (blob, imgLoader) => {
                let formData = new FormData();
                formData.append('fileList', blob);
                formData.append('folderName', 'thDailyContsImg/' + synerhubch);
                let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
                imgLoader(res.data, 'IMG');
              }
            }
          });
        editor.getMarkdown();
}

function thDailyUpdateBtn(brdNo){

    let thNo = $("#thDailyMod").data("thNo"); 
    let brdTtl =$("#ThDailyTtl").val();
    let brdConts = editor.getMarkdown();
    

    let data = {
         thNo : thNo,
        brdNo : brdNo,
       brdTtl : brdTtl,
     brdConts : brdConts
    }
    console.log("data : ",data);
    $.ajax({
        url: "/synerhub/thdailyboard/update", 
        type: "post",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
        var res = result.thboardVO;

        brdConts = res.brdConts;
        var html =""; 
        html += ` <div class="mb-3 overflow-hidden position-relative">
                <div class="px-3">
                    <h4 class="fs-6 mb-0">일일 업무보고</h4>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <p>Home</p>
                            </li>
                            <li class="breadcrumb-item" aria-current="page">${thTtl}</li>
                            <li class="breadcrumb-item" aria-current="page">게시물</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="card"> 
                <div class="card-body">
                    <div class="mb-4" role="tablist">
                        <h3>일일 업무 상세 보기</h3>
                    </div>
                    <div class="card">
                        <div class="card-body border-bottom">
                            <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                                <img src="${contextPath}${res.memPrflimg}" alt="spike-img" class="rounded-circle" width="40" height="40">
                                <h5 class="mb-0">${res.brdWrtrNm}</h5>
                            </div>
                            <div class="card-body p-4">
                                <div class="table-responsive mb-4 border rounded-1">
                                    <table class="table text-nowrap mb-0 align-middle">
                                        <thead class="text-dark fs-4">
                                            <tr> 
                                                <th>
                                                    <h4 class="fs-4 fw-semibold mb-0">
                                                        <strong>&ensp;${res.brdTtl}</strong>
                                                    </h4> 
                                                </th> 
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr style="height: 10em;"> 
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="ms-3">
                                                    </div>  
                                                    <div id="thDailyViewer">

                                                    </div>
                                                </td>
                                            </tr> 
                                             <tr> 
                                      <td>
                                          <div class="card-footer bg-white">
                                            <ul class="mailbox-attachments d-flex align-items-stretch clearfix">
                                                `;
            for (var i = 0; i < res.thboardFileDetail.length; i++) {
                html += `
                                                             <li> 
                                                            <div class="me-1 border">
                                                                <p class="mailbox-attachment-icon">
                                                                    `;
                if (res.thboardFileDetail[i].atchFileExtn == "jpg" || res.thboardFileDetail[i].atchFileExtn == "png") {
                    html += `
                                                                          <img src="${contextPath}${res.thboardFileDetail[i].atchFilePath}" style="width: 150px; height: 150px"/>`;
                } else if (res.thboardFileDetail[i].atchFileExtn == "pdf") {
                    html += `  
                                                                        <i class="ti ti-file-text"></i>`;
                }
                html += `
                                                                </p>
                                                                <div class="mailbox-attachment-info" style="display: flex; align-items: center; justify-content: space-between;">
                                                                   <p style="flex: 1; text-align: center; word-wrap: break-word; overflow-wrap: break-word; max-width: 150px; white-space: normal;">${res.thboardFileDetail[i].atchFileOrgnlNm}</p>
                                                                    <a href="#" class="float-end mt-3"> 
                                                                        <button class="btn btn-light btn-sm" style="align-self: flex-end; padding: 0; border: none; background: none;">
                                                                        </button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>`;
            }
            html += `
                                            </ul> 
                                        </div>

                                      </td>
                                    </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex align-items-center">
                                `
            let brdCheck = false;
            if (res.brdWrtr == MEM_NO) {
                html += `     
                            <div class="ms-auto d-flex align-items-center gap-2">
                                <a class="text-dark bg-hover-primary ms-auto d-flex align-items-center justify-content-center position-right bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="thDailyMod" data-brd-ttl="${res.brdTtl}" data-brd-conts="${res.brdConts}" data-th-no="${res.thNo}"  onclick="thDailyModBtn(${res.brdNo})">
                                    <i class="ti ti-edit fs-7 me-1"></i>
                                </a> 
                                <button type="button" class="btn text-dark bg-hover-primary ms-auto d-flex p-2 fs-4" data-bs-toggle="modal" data-bs-target="#vertical-center-modal">
                                    <i class="ti ti-trash fs-7 me-1"></i>
                                </button>
                                <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
                                </a> 
                                `
                brdCheck = true
            } else { 
                html += `
                                 <a class="text-dark bg-hover-primary d-flex align-items-center ms-auto bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back"  onclick="thDailyback(${res.thNo})">
                                    <i class="ti ti-arrow-forward-up fs-7 me-1"></i> 
                                </a>`
            }
            html += `
                                    </div>
                                </div> 
                            </div>
                            <div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content"> 
                                        <div class="modal-header d-flex align-items-center">
                                            <h4 class="modal-title mt-3" id="">
                                                &emsp;선택한 게시글을 정말 삭제하시겠습니까?
                                            </h4>  
                                            <button type="button" class="btn-close mb-4" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div> 
                                        <div class="modal-body"> 
                                            <h6 class="ms-5" style="color: gray;">&nbsp;&emsp;&emsp;&emsp; 삭제한 게시물은 복구할 수 없습니다.</h6>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn bg-danger-subtle text-danger waves-effect text-start" data-bs-dismiss="modal">
                                                아니오
                                            </button>
                                            <button type="button" class="btn bg-primary-subtle text-primary" data-bs-dismiss="modal" id="thBoardDelete" data-brd-no="${res.brdNo}" onclick="thDailyDeleteBtn(${res.thNo})">
                                                예
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            Swal.fire('게시물 수정 완료 !', '', 'success');
            $("#main_contents").html(html);
            viewer = Editor.factory({
                el: MAIN_CONTENTS.querySelector('#thDailyViewer'),
                viewer: true,
                height: '500px',
                initialValue: brdConts
              });
        }
    });
}


function thDailySchBtn(thNo) {
    DailyWorkr2(thNo, 1);
};

 

//(상세)뒤로가기
function thDailyback(thNo) {
    DailyWorkr(thNo);
}
//뒤로가기
function thDailybackBtn(thNo) {
    DailyWorkr(thNo);
}