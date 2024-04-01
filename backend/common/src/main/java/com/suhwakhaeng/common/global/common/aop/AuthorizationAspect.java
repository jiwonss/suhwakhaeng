package com.suhwakhaeng.common.global.common.aop;

import com.suhwakhaeng.common.global.common.annotation.CustomPreAuthorize;
import com.suhwakhaeng.common.global.error.exception.AccessDeniedException;
import com.suhwakhaeng.common.global.error.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AuthorizationAspect {

    @Before("@annotation(customAnnotation)")
    public void authorize(JoinPoint joinPoint, CustomPreAuthorize customAnnotation) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String role = request.getHeader("X-Authorization-Role");

        for (String requiredRole : customAnnotation.value()) {
            if (role != null && role.equals(requiredRole)) {
                return; // Authorized
            }
        }

        throw new AccessDeniedException(ErrorCode.ACCESS_DENIED);
    }
}
