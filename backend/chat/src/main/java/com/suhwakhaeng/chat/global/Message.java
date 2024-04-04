package com.suhwakhaeng.chat.global;

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

    public static <T> Message<T> success(T dataBody) {
        return Message.<T>builder()
                .dataHeader(DataHeader.success())
                .dataBody(dataBody)
                .build();
    }

    public static <T> Message<T> success(T dataBody, String code, String resultMessage) {
        return Message.<T>builder()
                .dataHeader(DataHeader.success(code, resultMessage))
                .dataBody(dataBody)
                .build();
    }

    public static Message<Void> success() {
        return Message.<Void>builder()
                .dataHeader(DataHeader.success())
                .build();
    }

    public static <T> Message<T> fail(String resultCode, String resultMessage) {
        return Message.<T>builder()
                .dataHeader(DataHeader.fail(resultCode, resultMessage))
                .dataBody(null)
                .build();
    }
}
