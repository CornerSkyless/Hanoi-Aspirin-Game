export class Hanoi {
  hanoiTowerList = []
  hanoiBlockCount = 3
  constructor (hanoiTowerCount = 3, hanoiBlockCount = 3) {
    this.hanoiBlockCount = hanoiBlockCount
    for (let i = 0; i < hanoiTowerCount; i++) {
      if (i === 0) this.hanoiTowerList.push(new HanoiTower(hanoiBlockCount))
      else this.hanoiTowerList.push(new HanoiTower(0))
    }
  }
  selectBlockOnTower (towerId) {
    let selectedBlock = null
    this.hanoiTowerList.forEach(tower => {
      if (tower.id === towerId) {
        tower.selectTop()
        selectedBlock = tower.getActiveBlock()
      } else tower.clearAllActive()
    })
    return selectedBlock
  }
  putSelectedBlockOnTower (towerId, selectedBlock) {
    this.historyList.push(JSON.parse(JSON.stringify(this.hanoiTowerList)))
    this.hanoiTowerList.forEach(tower => {
      if (tower.id !== towerId) tower.removeBlock(selectedBlock.id)
      else tower.pushBlock(selectedBlock)
      tower.clearAllActive()
    })
  }
  stepBack () {
    const historyTowerList = this.historyList.pop()
    this.hanoiTowerList.forEach(tower => {
      const historyTower = historyTowerList.find(ht => ht.id === tower.id)
      if (historyTower) tower.setByHistory(historyTower)
    })
  }
  historyList = []
  checkWin () {
    return this.hanoiTowerList[this.hanoiTowerList.length - 1].checkWin(this.hanoiBlockCount)
  }
  getTowerTopSize (towerId) {
    const tower = this.hanoiTowerList.find(t => t.id === towerId)
    if (tower) return tower.getTopSize()
    else return 99
  }
}

class HanoiTower {
  hanoiBlockList = []
  id = 0
  static towerId = 0
  constructor (hanoiBlockCount = 3) {
    this.id = HanoiTower.towerId++
    for (let i = hanoiBlockCount; i > 0; i--) {
      this.hanoiBlockList.push(new HanoiTowerBlock(i))
    }
  }
  clearAllActive () {
    this.hanoiBlockList.forEach(block => { block.active = false })
  }
  selectTop () {
    this.hanoiBlockList.forEach((block, i) => {
      if (i === this.hanoiBlockList.length - 1) block.active = !block.active
    })
  }
  getActiveBlock () {
    return this.hanoiBlockList.find(block => block.active)
  }
  removeBlock (blockId) {
    const index = this.hanoiBlockList.findIndex(block => block.id === blockId)
    if (index >= 0) this.hanoiBlockList.splice(index, 1)
  }
  pushBlock (block) {
    this.hanoiBlockList.push(block)
  }
  setByHistory (historyTower) {
    this.hanoiBlockList = historyTower.hanoiBlockList.map(block => new HanoiTowerBlock(block.size, block.id))
  }
  checkWin (hanoiBlockCount) {
    if (this.hanoiBlockList.length !== hanoiBlockCount) return false
    for (let i = 0; i < this.hanoiBlockList.length; i++) {
      console.log(this.hanoiBlockList[i].size)
      if (hanoiBlockCount !== this.hanoiBlockList[i].size) return false
      hanoiBlockCount--
    }
    return true
  }
  getTopSize () {
    if (this.hanoiBlockList.length > 0) {
      return this.hanoiBlockList[this.hanoiBlockList.length - 1].size
    } else return 99
  }
}

class HanoiTowerBlock {
  size = 0
  active = false
  id = 0
  static blockId = 1
  constructor (size, id) {
    this.size = size
    this.id = id || HanoiTowerBlock.blockId++
  }
  toggleActive () {
    this.active = !this.active
  }
}
