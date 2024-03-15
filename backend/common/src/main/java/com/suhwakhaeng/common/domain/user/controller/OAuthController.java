package com.suhwakhaeng.common.domain.user.controller;

import com.suhwakhaeng.common.domain.user.service.OauthService;
import com.suhwakhaeng.common.global.common.dto.Message;
import com.suhwakhaeng.common.global.component.oauth.vendor.enums.OauthServerType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {
    private final OauthService oauthService;

    @PostMapping("/{oauthServerType}/login")
    public ResponseEntity login(@PathVariable OauthServerType oauthServerType, @RequestParam("token") String token) {

        log.debug("OauthServerType : {}", oauthServerType);
        log.debug("token : {}", token);

        return ResponseEntity.ok().body(Message.success(oauthService.login(oauthServerType, token)));
    }

    /**
     * FE와 연결 전 테스트용 임시 api
     * @param code
     * @return
     */
    @GetMapping
    public ResponseEntity getCode(@RequestParam String code) {
        log.debug("code : {}", code);
        return ResponseEntity.ok().build();
    }
}
