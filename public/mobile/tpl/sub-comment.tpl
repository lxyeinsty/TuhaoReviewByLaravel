<div class="comment-item sub-comment">
    <input type="hidden" name="parent_id" value="{{parent_id}}">
    <input type="hidden" name="sender_id" value="{{sender_id}}">
    <a href="user-center?id={{sender_id}}" class="comment-portrait">
        <img src="{{user_src}}">
    </a>
    <p class="comment-username">
        <a href="user-center?id={{sender_id}}">{{sender_author}}</a>
    </p>
    <div class="comment-content">
        <p>{{content}}</p>
        <div class="comment-input">
            <div class="icon-list">
            <!-- {{if masterFlag === 1}}
                <i class="delete-icon"></i>
            {{/if}} -->
                <i class="add-comment"></i>
            </div>
            <textarea name="user-comment" placeholder="请输入评论哦"></textarea>
            <a href="javascript:;" class="sub-issue-comment">评论</a>
        </div>
    </div>
</div>