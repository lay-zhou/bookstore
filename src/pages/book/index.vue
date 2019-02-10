<template>
<div>
    <topswiper :tops='tops'></topswiper>
    <card v-for="book in books" :key="book.id" :book='book'></card>
    <p class="text-footer" v-if="more">到底了哦^-^</p>
</div>
</template>
<script>
import { get } from '@/util'
import card from '@/components/card.vue'
import topswiper from '@/components/topswiper.vue'
export default {
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: [],
      top: {}
    }
  },
  components: {
    card,
    topswiper
  },
  methods: {
    async getBookList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const bookList = await get('/weapp/getbooklist', {
        page: this.page})
      if (bookList.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = bookList.data.bookList
      } else {
        this.books = this.books.concat(bookList.data.bookList)
      }
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    async getTop () {
      const tops = await get('/weapp/gettop')
      this.tops = tops.data.list
    }
  },
  onPullDownRefresh () {
    this.getBookList(true)
  },
  onReachBottom () {
    if (!this.more) {
      return false
    } else {
      this.page = this.page + 1
      this.getBookList()
    }
  },
  mounted () {
    this.getBookList(true)
    this.getTop()
  }
}
</script>
<style>
</style>
