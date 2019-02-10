<template>
<div class="bookInfo">
    <div class="top">
        <img 
        class="bcg"
        :src="list.image"
        mode="aspectFill">
        <img 
        class="img"
        :src="list.image"
        mode="aspectFit">
        <div class="text">
            <p class="title">{{ list.title }}</p>
            <p class="author">{{ list.author }}</p>
        </div>
    </div>

    <div class="detail">
        <div class="row">
            <div class="right">
                {{ list.rate }}分
                <rate :value='list.rate'></rate>
            </div>
            <div class="left">
                <img :src="userInfo.image" mode="aspectFit" class="user-img">
                {{ userInfo.name}}
            </div>       
        </div>
        <div class="row">
            <div class="right">
                {{ list.price }}
            </div>
            <div class="left">
                出版社:{{ list.publisher }}
            </div>  
        </div>
        <div class="tags" v-for="(tag,i) in list.tags" :key="i">
            {{ tag }}
        </div>
        <div class="summary">
            <p  v-for="(sum,j) in list.summary" :key="j">{{ sum }}</p>
        </div>
    </div>
</div>
</template>
<script>
import rate from '@/components/rate.vue'
export default {
  props: ['list'],
  components: {
    rate
  },
  computed: {
    userInfo () {
      return this.list.user_info || {}
    }
  }
}
</script>
<style lang="scss" scoped>
.bookInfo {
    margin-bottom: 20rpx;
    .detail {
        padding: 0 18rpx;
        .row {
            font-size: 16px;
            padding: 5rpx 0;
            .right {
                float: right;
            }
            .left {
                margin-right: 100rpx;
                .user-img {
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
        }
        .tags {
            color: #EA5A49;
            border:1px solid #EA5A49;
            display: inline-block;
            border-radius: 10px;
            padding: 5px;
            margin: 3px;
            margin-top: 10rpx;
            font-size: 14px;
        }
        .summary {
            margin-top: 10px;
            p {
                text-indent: 2em;
                font-size: 14px;
            }
        }
    }
    .top {
        width: 750rpx;
        height: 500rpx;
        position: relative;
        overflow: hidden;
        .bcg {
            filter: blur(15px);
            width: 100%;
        }
        .img {
            position: absolute;
            height: 300rpx;
            width: 100%;
            top: 30rpx;
            left: 0;
        }
        .text {
            text-align: center;
            position: absolute;
            top: 330rpx;
            left: 0;
            width: 100%;
            color: white;
            .title {
                font-size: 20px;
                padding: 10rpx 0;
            }
            .author {
                font-size: 16px;
            }
        }
    }
}
</style>