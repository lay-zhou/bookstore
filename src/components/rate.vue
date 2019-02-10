<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style='width'>
            ★★★★★
        </div>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    width () {
      return `width:${0.824 * (this.value / 2)}em`
    }
  }
}
</script>
<style lang="scss" scoped>
.rate {
    position: relative;
    display: inline-block;
    color: #EA5A49;
    .hollow {
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        width: 0;
        overflow: hidden;
    }
}
</style>