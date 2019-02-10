<template>
<div class="yearProgress">
    <progress :percent="percent" activeColor="#EA5A49" active />
    <p>{{ year }}&nbsp;年({{ yeartype }})已经过去</p><p style="color:#EA5A49;">&nbsp;{{ day }}&nbsp;</p>天, <p style="color:#EA5A49;">{{ percent }}&nbsp;</p><p>%</p>
</div>
</template>
<script>
export default {
  data () {
    return {
      yeartype: ''
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(0)
      let end = new Date().getTime()
      return Math.ceil((end - start.getTime()) / 1000 / 60 / 60 / 24)
    },
    percent () {
      let days = null
      if (this.year % 400 === 0) {
        days = 366
        this.yeartype = '闰年'
      } else if (this.year % 4 === 0 && this.year % 100 !== 0) {
        days = 366
        this.yeartype = '闰年'
      } else {
        days = 365
        this.yeartype = '平年'
      }
      return (this.day / days * 100).toFixed(1)// 保留一位而且四舍五入，刚
    }
  }
}
</script>
<style lang="scss" scoped>
.yearProgress {
    text-align: center;
    padding: 15rpx 0;
    p {
        display: inline-block;
        font-size: 17px;
        margin-top: 15rpx;
    }
}
</style>