<template> 
    <div class="commentinfo">
        <textarea v-model='comment'
                  class='textarea'
                  :maxlength='100'
                  placeholder='请输入图书短评'></textarea>
        <div class="location">
            <p>地理位置:</p>
            <switch color="#EA5A49"  @change="getGeo"></switch>
            <span>{{ location }}</span>
        </div>
        <div class="phone">
            <p>手机型号:</p>
            <switch color="#EA5A49"  @change="getPhone"></switch>
            <span>{{ phone }}</span>
        </div>
        <button @click="postComment" class="btn">评论</button>
    </div>
</template>
<script>
import {post} from '@/util'
export default {
  props: ['bookid', 'location', 'phone'],
  data () {
    return {
      comment: '',
      phone: '',
      location: '',
      userinfo: ''
    }
  },
  methods: {
    async postComment () {
      let data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid,
        openid: this.userinfo.openId
      }
      await post('/weapp/addcomment', data)
      this.$emit('update', this.phone, this.location)
      this.comment = ''
    },
    getPhone (e) {
      if (e.target.value) {
        wx.getSystemInfo({
          success: (res) => {
            this.phone = res.model
          }
        })
      } else {
        this.phone = ''
      }
    },
    getGeo (e) {
      const ak = 'pjTl5Ef44KjakrgrOmTrIeCzS76WtACd'
      const url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: (geo) => {
            wx.request({
              url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json',
                ak
              },
              success: (res) => {
                if (res.data.status === 0) {
                  this.location = `${res.data.result.formatted_address}${res.data.result.business}`
                } else {
                  this.location = ''
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    }
  },
  mounted () {
    const userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>
<style lang="scss" scoped>
        .commentinfo {
        margin: 0 18rpx;
        .textarea {      
            font-size: 14px;
            background-color: #eee;
            width: 100%;
            margin-top: 15rpx;
        }
        .location {
            margin-top: 10rpx; 
            padding: 10rpx 0;
        }
        .phone {
            padding: 5rpx 0;
        }
            p {
                font-size:14px;
                display:inline-block;
                margin-right: 10rpx;
            }
            span {
                margin-left: 5rpx;
                color: #EA5A49;
                font-size: 14px;
            }
            .btn {
                margin-top: 15rpx;
            }
        }
</style>