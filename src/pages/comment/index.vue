<template>
<div class="comment">
    <comments :comments='comments' type='user'></comments>
    <div class="interval">我的图书</div>
    <card v-for="book in books" :key="book.id" :book='book'></card>
    <p class="text-footer" v-if="more">到底了哦^-^</p>
</div>
</template>
<script>
import { get } from '@/util'
import card from '@/components/card.vue'
import comments from '@/components/comments.vue'
export default {
  data () {
    return {
      userInfo: '',
      comments: '',
      books: '',
      page: '',
      more: Boolean
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComment()
      this.getBook(true)
      wx.hideNavigationBarLoading()
    },
    async getComment () {
      const comments = await get('/weapp/getcomment', {
        openid: this.userInfo.openId
      })
      this.comments = comments.data.comments
    },
    async getBook (init) {
      if (init) {
        this.more = true
        this.page = 0
      }
      const list = await get('/weapp/getbooklist', {
        openid: this.userInfo.openId,
        page: this.page
      })
      const books = list.data.bookList
      if (books.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books
      } else {
        this.books = this.books.concat(books)
      }
    }
  },
  components: {
    comments,
    card
  },
  onReachBottom () {
    if (!this.more) {
      return false
    } else {
      this.page = this.page + 1
      this.getComment()
    }
    this.getBook()
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userInfo.openId) {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.comment {
    margin: 0 5rpx;
    .interval {
        padding-left: 15rpx;
        margin-top: 15rpx;
        line-height: 80rpx;
        height: 80rpx;
        background-color: #eee;
        font-size: 14px;
    }
}
</style>