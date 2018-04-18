<template>
  <div v-if="hanoiBlock"
       class="hanoi-tower-block"
       :style="style"
       :class="{'hanoi-tower-block-top':isTop,'hanoi-tower-block-active':hanoiBlock.active}"
       @click="clickOnBlock"
  >{{hanoiBlock.size}}</div>
</template>

<script>
export default {
  name: 'HanoiBlock',
  props: ['hanoiBlock', 'isTop'],
  data () {
    return {
    }
  },
  methods: {
    clickOnBlock () {
      if (this.isTop) {
        this.$emit('click-on-block')
      }
    }
  },
  computed: {
    style () {
      if (this.hanoiBlock) {
        const base = 30
        const width = base + this.hanoiBlock.size * 10
        return {'width': width + '%'}
      }
    }
  }
}
</script>
