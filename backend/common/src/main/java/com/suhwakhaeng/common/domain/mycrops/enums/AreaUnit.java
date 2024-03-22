package com.suhwakhaeng.common.domain.mycrops.enums;

import com.suhwakhaeng.common.domain.user.enums.Role;
import lombok.AllArgsConstructor;

import java.util.Arrays;
import java.util.function.Function;

@AllArgsConstructor
public enum AreaUnit {
    // 평방미터가 default
    SQUARE_METER("평방미터", (area) -> area),

    // 1평 >> 3.30579 평방미터
    PYEONG("평", (area) -> 3.30579 * area),
    
    // 1헥타르 >> 10000 평방미터
    HECTARE("헥타르", (area) -> 10000 * area);


    private String name;
    private Function<Double, Double> function;

    public static AreaUnit fromName(String name) {
        return Arrays.stream(values())
                .filter(unit -> unit.name.equals(name))
                .findAny().orElse(AreaUnit.SQUARE_METER);
    }

    public double getSquareM(double area) {
        return function.apply(area);
    }
}
