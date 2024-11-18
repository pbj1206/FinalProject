package kr.or.ddit.components.board.qna.vo;

import lombok.Data;

@Data
public class QnaStatsVO {
    private int qnaCategory;
    private int count;
    private int year;  // 연도 추가
    private int month; // 월 추가
    private int qnaSort;
}
