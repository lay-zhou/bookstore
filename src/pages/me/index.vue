<template>
  <div class="wrapper">
    <div class="userInfo">
      <img :src="userInfo.avatarUrl" alt="" class="avatar">
      <p>{{ userInfo.nickName }}</p>
      
    </div>
    <year-progress></year-progress>
    <button class="btn" v-if="flag" open-type="getUserInfo" @getuserinfo="bindgetuserinfo">点击登陆</button>
    <div class="scanCode">
      <button  class="btn"  @click="scanBook">添加图书</button>
    </div>
    <loading :hidden="hiddenLoading">正在加载</loading>
  </div>
</template>
<script>
import yearProgress from '@/components/yearProgress.vue'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { post, showSuccess, showModal } from '@/util'
export default {
  data () {
    return {
      userInfo: {
        avatarUrl: '../../../static/img/unlogin.png'
      },
      flag: true,
      hiddenLoading: true
    }
  },
  components: {
    yearProgress
  },
  methods: {
    async addBook (isbn) {
      let res = await post('/weapp/addbook', {
        isbn,
        openId: this.userInfo.openId
      })
      if (res.code === 0) {
        showModal('添加成功', `${res.data.title}添加成功了`)
      } else if (res.code === -1) {
        showModal('添加失败', `错误信息${res.data.msg}`)
      } else {
        wx.showModal({
          content: '图书已经被添加过了,你们趣味相投哦',
          showCancel: false
        })
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            // isbn码res.result
            this.addBook(res.result)
          }
        }
      })
    },
    async bindgetuserinfo (e) {
      this.hiddenLoading = false
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: (userInfo) => {
          this.flag = !this.flag
          qcloud.request({
            url: config.userUrl,
            login: true,
            success: (res) => {
              this.hiddenLoading = true
              this.userInfo = res.data.data
              showSuccess('登陆成功')
              wx.setStorageSync('userInfo', this.userInfo)
              console.log(this.userInfo)
            }
          })
        }
      })
    }
  },

  mounted () {
  //   //调用应用实例的方法获取全局数据
  //   // this.getUserInfo()
    let user = wx.getStorageSync('userInfo')
    if (user) {
      this.userInfo = user
      this.flag = false
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  padding: 0 30rpx;
  .userInfo {
    margin-top: 150rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin-top: 20rpx;
      margin-bottom: 10rpx;
      border-radius: 50%;
    }
    p {
      font-size: 17px;
      color: #999999;
      margin: 10rpx 0;
    }
  }
}
</style>
