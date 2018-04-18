<template>
  <div>
    <div class="hanoi">
      <div class="hanoi-left">
        <h4>步数: {{hanoi.historyList.length}}</h4>
        <div v-if="hanoi.historyList.length>0" @click="stepBack">上一步</div> <br>
        <div  @click="reset">重置</div>
      </div>
      <div class="hanoi-main-area">
        <hanoi-tower
          v-for="tower in hanoi.hanoiTowerList"
          :hanoi-tower="tower"
          :key="tower.id"
          :selected-block="selectedBlock"
          @select-block-on-tower="selectBlockOnTower"
          @put-selected-block-on-tower="putSelectedBlockOnTower"
        />
      </div>
    </div>
  </div>

</template>

<script>
import HanoiTower from './Tower'
import { Hanoi } from './Hanoi'
import Swal from 'sweetalert2'

export default {
  name: 'Hanoi',
  data () {
    return {
      hanoi: new Hanoi(),
      selectedBlock: null
    }
  },
  methods: {
    selectBlockOnTower (towerId) {
      this.selectedBlock = this.hanoi.selectBlockOnTower(towerId)
    },
    putSelectedBlockOnTower (towerId) {
      if (this.selectedBlock && this.selectedBlock.size < this.hanoi.getTowerTopSize(towerId)) {
        this.hanoi.putSelectedBlockOnTower(towerId, this.selectedBlock)
        this.selectedBlock = null
        if (this.hanoi.checkWin()) {
          Swal(
            '做得好!',
            '你解决了这个汉诺塔问题',
            'success'
          ).then(() => {
            this.reset()
          })
        }
      }
    },
    stepBack () {
      this.hanoi.stepBack()
    },
    reset () {
      let blockCount = 3
      let towerCount = 3
      Swal({
        title: '请输入方块数量',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: ' 确认'
      }).then((result) => {
        if (result.value) {
          if (Number(result.value) > 3 && Number(result.value) < 8) blockCount = Number(result.value)
          Swal({
            title: '请输入塔的数量',
            input: 'number',
            showCancelButton: true,
            confirmButtonText: ' 确认'
          }).then((result2) => {
            if (result2.value) {
              if (Number(result2.value) > 3 && Number(result2.value) <= 5) towerCount = Number(result2.value)
              this.hanoi = new Hanoi(towerCount, blockCount)
            }
          }).catch(() => { this.hanoi = new Hanoi(towerCount, blockCount) })
        }
      }).catch(() => { this.hanoi = new Hanoi(towerCount, blockCount) })
    }
  },
  components: { HanoiTower }
}
</script>

<style type="text/scss" lang="scss" >
  @import '../assets/style.scss';
</style>
