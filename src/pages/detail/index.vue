<template>
<div>
  <official-account></official-account>
  <book-info :list='list'></book-info>
  <comments  :comments='comments'></comments>
  <comment-info @update="getComment" :bookid='bookid'  :location='location' :phone='phone'></comment-info>
  <button open-type="share" class="btn">转发好友</button>
</div>
</template>
<script>
import {get} from '@/util'
import bookInfo from '@/components/bookInfo.vue'
import commentInfo from '@/components/commentInfo.vue'
import comments from '@/components/comments.vue'
export default {
  data () {
    return {
      bookid: '',
      list: '',
      id: '',
      comments: '',
      location: '',
      phone: ''
    }
  },
  components: {
    bookInfo,
    comments,
    commentInfo
  },
  methods: {
    async getDetail () {
      const res = await get('/weapp/getdetail', {
        id: this.bookid
      })
      this.list = res.data
      wx.setNavigationBarTitle({
        title: this.list.title
      })
    },
    async getComment (phone, location) {
      const comments = await get('/weapp/getcomment', {
        bookid: this.bookid
      })
      this.comments = comments.data.comments
      this.location = location
      this.phone = phone
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id// 获取query
    this.id = this.$root.$mp.query.id
    this.getDetail()
    this.getComment()
    this.location = ''
    this.phone = ''
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin: 0 18rpx;
  margin-top: 15rpx;
}
</style>