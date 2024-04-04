package com.suhwakhaeng.common.domain.crops.dto;

import lombok.*;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TableInfo {

    private Long tableId;
    private List<String> tableHead;
    private List<String> tableTitle;
    private List<List<String>> tableBody;

    public TableInfo(Long tableId, String tableHead, String tableTitle) {
        this.tableId = tableId;
        this.tableHead = Arrays.stream(tableHead.split(",")).toList();
        this.tableTitle = Arrays.stream(tableTitle.split(",")).toList();
    }

    public void updateTableBody(List<List<String>> tableBody) {
        this.tableBody = tableBody;
    }

}
