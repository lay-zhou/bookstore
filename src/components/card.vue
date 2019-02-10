<template>
<a :href="detailUrl">
    <div class="book-card">
        <div class="picture" @click="preview">
            <img :src="book.image" class="img" mode="aspectFit"/>
        </div>
        <div class="detail">
 
            <div class="row">
                <div class="right">
                    {{ book.rate }}
                    <rate :value='book.rate'></rate>
                </div>
                <div class="left" style="color:#EA5A49;">
                    {{ book.title }}
            </div>

            <div class="row" style="display:block">
                <div class="right" style="color:#EA5A49;">
                    浏览:{{ book.count }}
                </div>
                <div class="left">
                    {{ book.author }}&nbsp;
                </div>
                </div>     
            </div>
    
            <div class="row">
                <div class="right">
                    {{ book.userInfo.nickName }}
                </div>
                <div class="left">
                    {{ book.publisher }}
                </div>
            </div>

        </div>
    </div>
</a>
</template>
<script>
import rate from '@/components/rate.vue'
export default {
  props: {
    book: ['book'],
    detailUrl: ''
  },
  components: {
    rate
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book-card {
    display: block;
    font-size: 14px;
    overflow: hidden;
    margin: 5px 0;
    padding: 5px;
    .picture {
        width: 90px;
        height: 90px;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail {
        margin-left: 95px;
        .row {
            display: block;
            line-height: 20px;
            margin-bottom: 3px;
            .left {
                margin-right: 80px;
            }
            .right {
                float: right;
            }                
        }
    }
}
</style>