package com.suhwakhaeng.common.domain.crops.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class TableInfo {

    private List<String> tableHead;
    private List<String> tableTitle;
    private List<List<String>> tableBody;

}
