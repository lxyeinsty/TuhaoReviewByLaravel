<div class="comment-item">
    <input type="hidden" name="parent_id" value="{{parent_id}}">
    <input type="hidden" name="sender_id" value="{{sender_id}}">
    <a href="user-center?id={{sender_id}}" class="comment-portrait">
        <img src="{{mainSrc}}">
    </a>
    {{if masterFlag === 1}}
        {{if is_send === 1}}
        <i class="confirm-icon confirm-icon-ok"></i>
        {{else}}
        <i class="confirm-icon"></i>
        {{/if}}
    {{/if}}
    <p class="comment-username">
        <a href="user-center?id={{sender_id}}">{{mainMaster}}</a>
    </p>
    <div class="comment-content">
        <p>{{mainContent}}</p>
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
    {{if subFlag == 1}}
        {{each subComments as value index}}
            <div class="comment-item sub-comment">
                <input type="hidden" name="parent_id" value="{{value.id}}">
                <input type="hidden" name="sender_id" value="{{value.sender_id}}">
                <a href="user-center?id={{value.sender_id}}" class="comment-portrait">
                    <img src="{{value.src}}">
                </a>
                <p class="comment-username">
                    <a href="user-center?id={{value.sender_id}}">{{value.sender_author}}</a>
                </p>
                <div class="comment-content">
                    <p>{{value.content}}</p>
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
        {{/each}}
    {{/if}}
</div>