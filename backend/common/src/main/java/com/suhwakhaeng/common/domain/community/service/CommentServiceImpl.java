package com.suhwakhaeng.common.domain.community.service;

import com.suhwakhaeng.common.domain.community.dto.CommentCreateRequest;
import com.suhwakhaeng.common.domain.community.dto.CommentListResponse;
import com.suhwakhaeng.common.domain.community.dto.CommentResponse;
import com.suhwakhaeng.common.domain.community.dto.WriterInfo;
import com.suhwakhaeng.common.domain.community.entity.Community;
import com.suhwakhaeng.common.domain.community.entity.CommunityComment;
import com.suhwakhaeng.common.domain.community.exception.CommentException;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.suhwakhaeng.common.domain.community.exception.CommentErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommunityCommentRepository commentRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;


    @Override
    public Long createComment(Long userId, Long communityId, CommentCreateRequest request) {
        User writer = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXIST_USER));

        Community community = communityRepository.findById(communityId)
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

    @Transactional(readOnly = true)
    @Override
    public List<CommentListResponse> selectComment(Long communityId) {
        List<CommunityComment> comments = commentRepository.findByCommunityId(communityId);
        List<CommentListResponse> results = new ArrayList<>();

        for (CommunityComment comment : comments) {
            if (comment.getParent() != null) {
                continue;
            }

            List<CommentResponse> recomment = new ArrayList<>();

            User writer = comment.getWriter();
            WriterInfo writerInfo = WriterInfo.fromEntity(writer);

            List<CommunityComment> children = comment.getChildren();

            for (CommunityComment child : children) {
                WriterInfo childWriter = WriterInfo.fromEntity(child.getWriter());
                CommentResponse childComment = CommentResponse.builder()
                        .commentId(child.getId())
                        .createdAt(child.getCreatedAt())
                        .content(child.getContent())
                        .user(childWriter)
                        .build();
                recomment.add(childComment);
            }

            CommentResponse parent = CommentResponse.builder()
                    .commentId(comment.getId())
                    .createdAt(comment.getCreatedAt())
                    .content(comment.getContent())
                    .user(writerInfo)
                    .build();

            results.add(CommentListResponse.builder()
                    .comment(parent)
                    .recomment(recomment)
                    .build());
        }

        return results;
    }

    @Override
    public void deleteComment(Long userId, Long commentId) {
        CommunityComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentException(NOT_EXIST_COMMENT));

        if (comment.getWriter().getId() != userId) {
            throw new CommentException(NOT_MATCH_USER);
        }

        commentRepository.deleteByParent(comment);
        commentRepository.deleteById(commentId);
    }
}
