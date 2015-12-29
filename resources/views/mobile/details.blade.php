<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    @include ('mobile/content/title')
    <link rel="stylesheet" type="text/css" href="/mobile/styles/goods.css">
</head>

<body>
    @include ('mobile/content/header')
    <input type="hidden" name="curPage" curPage="1">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="hidden" name="proId" value="{{$goods->id}}">
    <input type="hidden" name="goods_master" value="{{$goods->user_id}}">
    <input type="hidden" name="is_send" value="{{$goods->is_send}}">
    <div class="container">
        <h2 class="goods-title">
            <span>{{$goods->pro_name}}</span>
            @if($loginFlag === $goods->user_id)
                <a href="javascript:;" class="edit-info">
                    <span>编辑信息</span>
                </a>
            @endif
        </h2>
        <div class="goods-brief">
            <div class="user-brief">
                <div class="user-brief-info">
                    <a href="user-center?id={{$goods->user_id}}" class="goods-portrait">
                        <img src="{{$goods->portrait}}">
                    </a>
                    <a href="javascript:;">{{$goods->username}}</a>
                </div>
                <div class="comment-count">
                    <span>{{$goods->comment_total}}</span>
                </div>
            </div>
            <div class="goods-thumb">
                <img src="{{$goods->src[0]}}">
            </div>
            <ul class="image-gallery">
                @for($i = 0;$i < count($goods->src);$i++)
                    @if($i === 0)
                    <li image-id="{{$i + 1}}" class="choosed-image">
                        <img src="{{$goods->src[$i]}}">
                    </li>
                    @else
                    <li image-id="{{$i + 1}}">
                        <img src="{{$goods->src[$i]}}">
                    </li>
                    @endif
                @endfor
            </ul>
        </div>
        <div class="goods-specific-info">
            <div class="goods-info-item">
                <span class="goods-info-name">联系方式:</span>
                <span class="goods-info-content">{{$goods->contact}}</span>
            </div>
            <div class="goods-info-item">
                <span class="goods-info-name">物品详情:</span>
                <span class="goods-info-content">{{$goods->pro_desc}}</span>
            </div>
            <div class="goods-info-item">
                <span class="goods-info-name">主人心愿:</span>
                <span class="goods-info-content">{{$goods->desire}}</span>
            </div>
        </div>
        <div class="goods-comment-area">
            <a href="javascript:;" id="link-comment">评论区</a>
            <div class="comment-content-area">
            @if(count($comments) > 0)
                @foreach($comments as $comment_item)
                    <div class="comment-item">
                        <input type="hidden" name="parent_id" value="{{$comment_item->id}}">
                        <input type="hidden" name="sender_id" value="{{$comment_item->sender_id}}">
                        <a href="user-center?id={{$comment_item->sender_id}}" class="comment-portrait">
                            <img src="{{$comment_item->src}}">
                        </a>
                        @if($loginFlag === $goods->user_id && $goods->user_id !== $comment_item->sender_id)
                            @if($goods->is_send === 0)
                            <i class="confirm-icon"></i>
                            @else
                            <i class="confirm-icon confirm-icon-ok"></i>
                            @endif
                        @endif
                        <p class="comment-username">
                            <a href="user-center?id={{$comment_item->sender_id}}">{{$comment_item->sender_author}}</a>
                        </p>
                        <div class="comment-content">
                            <p>{{$comment_item->content}}</p>
                            <div class="comment-input">
                                <div class="icon-list">
                                    <!-- @if($loginFlag === $goods->user_id)
                                        <i class="delete-icon"></i>
                                    @endif -->
                                    <i class="add-comment"></i>
                                </div>
                                <textarea name="user-comment" placeholder="请输入评论哦"></textarea>
                                <a href="javascript:;" class="sub-issue-comment">评论</a>
                            </div>
                        </div>
                        @if(count($comment_item->comments) > 0)
                            @foreach($comment_item->comments as $sub_comment_item)
                                <div class="comment-item sub-comment">
                                    <input type="hidden" name="parent_id" value="{{$sub_comment_item->id}}">
                                    <input type="hidden" name="sender_id" value="{{$sub_comment_item->sender_id}}">
                                    <a href="user-center?id={{$sub_comment_item->sender_id}}" class="comment-portrait">
                                        <img src="{{$sub_comment_item->src}}">
                                    </a>
                                    <p class="comment-username">
                                        <a href="user-center?id={{$sub_comment_item->sender_id}}">{{$sub_comment_item->sender_author}}</a>
                                    </p>
                                    <div class="comment-content">
                                        <p>{{$sub_comment_item->content}}</p>
                                        <div class="comment-input">
                                            <div class="icon-list">
                                                <!-- @if($loginFlag === $goods->user_id)
                                                    <i class="delete-icon"></i>
                                                @endif -->
                                                <i class="add-comment"></i>
                                            </div>
                                            <textarea name="user-comment" placeholder="请输入评论哦"></textarea>
                                            <a href="javascript:;" class="sub-issue-comment">评论</a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        @endif
                    </div>
                @endforeach
            @endif
            </div>
            <div class="comment-input" id="main-comment">
                <textarea name="user-comment" placeholder="请输入评论哦"></textarea>
            </div>
            <a href="javascript:;" id="issue-comment">发布评论</a>
        </div>
    </div>
    <p class="end-line">
        <span>END</span>
    </p>
    <section class="mes-hint">
        <p class="mes-content"></p>
    </section>
    <script type="text/javascript" src="/mobile/tpl/dist/template.js"></script>
    <script type="text/javascript" src="/mobile/scripts/dist/goods.js"></script>
</body>

</html>
