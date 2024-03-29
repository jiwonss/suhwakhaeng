package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;
import com.suhwakhaeng.common.domain.community.entity.Community;
import com.suhwakhaeng.common.domain.community.entity.CommunityComment;
import com.suhwakhaeng.common.domain.community.exception.CommunityErrorCode;
import com.suhwakhaeng.common.domain.community.exception.CommunityException;
import com.suhwakhaeng.common.domain.community.repository.CommunityCommentRepository;
import com.suhwakhaeng.common.domain.community.repository.CommunityRepository;
import com.suhwakhaeng.common.domain.user.entity.User;
import com.suhwakhaeng.common.domain.user.exception.UserErrorCode;
import com.suhwakhaeng.common.domain.user.exception.UserException;
import com.suhwakhaeng.common.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommunityCommentRepository commentRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;


    @Override
    public Long createComment(Long userId, CommentCreateRequest request) {
        User writer = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        Community community = communityRepository.findById(request.communityId())
                .orElseThrow(() -> new CommunityException(CommunityErrorCode.NOT_EXIST_COMMUNITY));

        CommunityComment comment = CommunityComment.builder()
                .writer(writer)
                .community(community)
                .content(request.content())
                .build();

        commentRepository.save(comment);

        Optional<CommunityComment> optionalParent = commentRepository.findById(request.parentId());

        if (optionalParent.isPresent()) {
            CommunityComment parent = optionalParent.get();
            parent.addSubComment(comment);
        }

        return comment.getId();
    }
}
