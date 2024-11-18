package kr.or.ddit.vo;

import java.util.List;
import lombok.Data;

@Data
public class PaginationInfoVO<T> {
    private int totalRecord;            // 총 게시글 수
    private int totalPage;              // 총 페이지 수
    private int currentPage;            // 현재 페이지
    private int screenSize;             // 페이지 당 게시글 수
    private int blockSize;              // 페이지 블록 수
    private int startRow;               // 시작 row
    private int endRow;                 // 끝 row
    private int startPage;              // 시작 페이지
    private int endPage;                // 끝 페이지
    private List<T> dataList;           // 결과를 넣을 데이터 리스트
    private String searchType;           // 검색 타입(제목, 작성자 등)
    private String searchWord;           // 검색 키워드
    private String qnaWtr;               // 작성자 검색을 위한 프로퍼티 추가
    private int dclrSubId;
    
    public PaginationInfoVO() {}

    // PaginationInfoVO 객체를 만들 때, 한 페이지당 게시글 수와 페이지 블록 수를 원하는 값으로 초기화 할 수 있다.
    public PaginationInfoVO(int screenSize, int blockSize) {
        this.screenSize = screenSize;
        this.blockSize = blockSize;
    }

    public void setTotalRecord(int totalRecord) {
        // 총 게시글수를 저장하고, 총 게시글 수를 페이지 당 나타낼 게시글 수로 나눠 총 페이지수를 구한다.
        this.totalRecord = totalRecord;
        // ceil은 올림
        totalPage = (int) Math.ceil(totalRecord / (double) screenSize);
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;                // 현재 페이지 설정
        endRow = currentPage * screenSize;            // 끝 row = 현재 페이지 * 한 페이지당 게시글 수
        startRow = endRow - (screenSize - 1);         // 시작 row = 끝 row - (한 페이지당 게시글 수 - 1)
        // 마지막 페이지 = (현재 페이지 + (페이지 블록 사이즈 - 1)) / 페이지 블록 사이즈 * 페이지 블록 사이즈
        endPage = (currentPage + (blockSize - 1)) / blockSize * blockSize; 
        startPage = endPage - (blockSize - 1);        // 시작 페이지 = 마지막 페이지 - (페이지 블록 사이즈 - 1)
        
        // 다음 페이지가 6페이지로 이동하도록 설정
        if (currentPage == 5) {
            currentPage = 6;
        }
    }

    public String getPagingHTML() {
        StringBuffer html = new StringBuffer();
        html.append("<nav aria-label='Page navigation'>");
        html.append("<ul class='pagination justify-content-center pagination-sm m-0'>");

        // Previous 버튼 (첫 페이지일 경우 비활성화)
        if (currentPage == 1) {
            html.append("<li class='page-item disabled'><a class='page-link' href='javascript:void(0)' tabindex='-1' aria-disabled='true'>이전</a></li>");
        } else {
            html.append("<li class='page-item'><a class='page-link' href='' data-page='" + 
                    (currentPage - 1) + "'>이전</a></li>");
        }

        // 페이지 번호
        for (int i = startPage; i <= (endPage < totalPage ? endPage : totalPage); i++) {
            if (i == currentPage) {
                html.append("<li class='page-item active' aria-current='page'><a class='page-link' href='javascript:void(0)'>" + 
                        i + "</a></li>");
            } else {
                html.append("<li class='page-item'><a class='page-link' href='javascript:void(0)' data-page='" +
                        i + "'>" + i + "</a></li>");
            }
        }

        // Next 버튼 (마지막 페이지일 경우 비활성화)
        if (currentPage == totalPage) {
            html.append("<li class='page-item disabled'><a class='page-link' href='javascript:void(0)' aria-disabled='true'>다음</a></li>");
        } else {
            html.append("<li class='page-item'><a class='page-link' href='' data-page='" +
                    (currentPage + 1) + "'>다음</a></li>");
        }

        html.append("</ul>");
        html.append("</nav>");

        return html.toString();
    }  
}
