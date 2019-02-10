<template>
<div class="commentshow">
    <div class="comment">
        评论
    </div>                
    <div class="allcomment" v-for="comment in comments" :key="comment.id" @click="handleClick(comment.bookid)">
        <div class="top">
            <img :src="comment.avatarUrl" mode='aspectFit' class="img">
            <p>{{ comment.nickName }}</p>
        </div>
        <div class="footer">
            <span>{{ comment.comment }}</span>
            <i class="fa fa-mobile-phone">&nbsp;{{comment.phone || '未知型号'}}</i>
            <i style="padding-bottom: 10rpx;" class="fa fa-map-marker">&nbsp;{{ comment.location || '未知地点' }}</i>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick (bookid) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + bookid
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.commentshow {
    background-color: #eee;
    .comment {
        margin-left: 18rpx;
        font-size: 14px;
        line-height: 80rpx;
        height: 80rpx;
    }
    .allcomment {
        background-color: #fff;
        .top { 
            margin: 0 18rpx;
            padding: 10rpx 0;
            .img {
                float: left;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 10rpx;
                 vertical-align: middle;
                }
            p {
                    font-size: 14px;
                }
            
        }
        .footer {
            margin: 0 18rpx;
            span {
                margin-top: 5rpx;
            font-size: 14px;
            display: block;
            }
            i {
                display: block;
                font-size: 10px;
                margin: 10rpx 0;
            }
        }
    }
}
</style>