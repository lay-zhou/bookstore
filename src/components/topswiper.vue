<template>
<div class="topswiper">
        <swiper
            :indicator-dots='true'
            indicator-active-color='#EA5A49'
            :autoplay= 'true'
            :interval='6000'
            :duration='1000'
            :circular= 'true'
            >
            <div v-for="(page,i) in pages" 
            :key="i">
            <swiper-item>
                    <img 
                    @click="getdetail(img.id)"
                    class='slide-image'
                    mode='aspectFit'
                    v-for='img in page'
                    :key='img.id'
                    :src='img.image'
                    >              
            </swiper-item> 
            </div>    
        </swiper>
</div>
</template>
<script>
export default {
  props: ['tops'],
  data () {
    return {
    }
  },
  computed: {
    pages () {
      let res = this.tops
      console.log([res.slice(0, 3), res.slice(3, 6), res.slice(6)])
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    getdetail (id) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + id
      })
    }
  }
}
</script>
<style lang="scss">
.topswiper {
    display: block;
        .slide-image {
            margin-top: 5rpx;
            width: 33%;
            height: 40vw;
    }
}
</style>