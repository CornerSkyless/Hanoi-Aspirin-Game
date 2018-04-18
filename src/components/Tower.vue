<template>
  <div class="hanoi-tower" :class="{'hanoi-tower-hover-line':readyToPut}" @click="clickOnTower">
    <div class="hanoi-tower-line"></div>
    <div class="hanoi-tower-blocks">
      <hanoi-block v-for="(block,i) in hanoiTower.hanoiBlockList"
                   :key="block.id"
                   :hanoi-block="block"
                   :is-top="i===hanoiTower.hanoiBlockList.length-1"
                   @click-on-block="clickOnBlock"
      />
    </div>
  </div>
</template>

<script>
import HanoiBlock from './Block'
export default {
  name: 'HanoiTower',
  props: ['hanoiTower', 'selectedBlock'],
  data () {
    return {
    }
  },
  methods: {
    clickOnBlock () {
      this.$emit('select-block-on-tower', this.hanoiTower.id)
    },
    clickOnTower () {
      if (this.readyToPut) {
        this.$emit('put-selected-block-on-tower', this.hanoiTower.id)
      }
    }
  },
  computed: {
    readyToPut () {
      return this.selectedBlock &&
        !this.hanoiTower.getActiveBlock() &&
        this.selectedBlock.size < this.hanoiTower.getTopSize()
    }
  },
  components: { HanoiBlock }
}
</script>
