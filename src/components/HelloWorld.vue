<template>
  <div class="hanoi">
    <div class="hanoi-main-area">
      <hanoi-tower />
      <hanoi-tower />
      <hanoi-tower />
    </div>
  </div>
</template>

<script>
  import HanoiTower from './Tower';
  export default {
    name: 'Hanoi',
    data () {
      return {
      }
    },
    components:{ HanoiTower }
  }
</script>

<style type="text/scss" lang="scss" >
  @import '../assets/style.scss';
</style>
