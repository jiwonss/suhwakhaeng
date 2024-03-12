package com.suhwakhaeng.common.global.common.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Message<T> {
    private final DataHeader dataHeader;
    private final T dataBody;

    @Getter
    @Builder
    private static class DataHeader {
        private final int successCode;
        private final String resultCode;
        private final String resultMessage;

        private static DataHeader success() {
            return DataHeader.builder()
                    .successCode(0)
                    .build();
        }

        private static DataHeader success(String code, String resultMessage) {
            return DataHeader.builder()
                    .successCode(0)
                    .resultCode(code)
                    .resultMessage(resultMessage)
                    .build();
        }

        private static DataHeader fail(String resultCode, String resultMessage) {
            return DataHeader.builder()
                    .successCode(1)
                    .resultCode(resultCode)
                    .resultMessage(resultMessage)
                    .build();
        }
    }
}
