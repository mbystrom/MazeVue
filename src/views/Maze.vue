<template>
  <div class="home">
    <h1>A Simple Maze</h1>
    <span v-for="(row, index) in maze" :key="index">
      <span v-for="(col, index) in row" :key="index">
        <span v-if="col === '#'">&nbsp;#&nbsp;</span>
        <span v-else>&nbsp;=&nbsp;</span>
      </span><br/>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 32,
      width: 32,
      maze: []
    }
  },
  methods: {
    CreateArray(height, width) {
      var arr = []

      for (var i = 0; i < height; i++) {
        arr[i] = []
        for (var j = 0; j < width; j++) {
          arr[i][j] = '#'
        }
      }

      this.maze = arr
    },

    GenerateMaze (height, width) {
      console.log("starting maze generation...")
      var startRow = this.randint(0,width-1)
      var startColumn = this.randint(0,height-1)
      var currentTile = { y: startRow, x: startColumn }
      console.log("starting tile is: (" + currentTile.x + ", " + currentTile.y + ")")
      // console.log(startRow + ', ' + startColumn)
      var windingPercent = 30

      // 1 = left, 2 = up, 3 = right, 4 = down
      var dirToCarve = this.randint(1,4)
      while (isDrawable(currentTile, dirToCarve)) {
        if (check2Ahead(currentTile, dirToCarve)) {

        }
      }
    },

    check2Ahead(tile,dir) {
      try {
        if (dir === 1) {
          if (this.maze[tile.y][tile.x - 2] !== '#') { return false }
          else { return true }
        }
        if (dir === 2) {
          if (this.maze[tile.y - 2][tile.x] !== '#') { return false }
          else { return true }
        }
        if (dir === 3) {
          if (this.maze[tile.y][tile.x + 2] !== '#') {
            return false
          }
          else { return true }
        }
        if (dir === 4) {
          if (this.maze[tile.y + 2][tile.x] !== '#') { return false }
          else { return true }
        }
      }
      catch(err) {
        console.log("error: " + err.message)
        return false
      }
    },

    isDrawable (tile, dir) {
      console.log("checking if current tile is drawable...")
      var drawable = true
      for (var y = tile.y - 1; y < tile.y + 1; y++) {
        for (var x = tile.x - 1; x < tile.x + 1; x++) {
          if (dir === 1) {
            if (x <= tile.x && y === tile.y) { continue }
            else {
              if (x === tile.x && y === tile.y) { continue }
              else if (this.maze[y][x] !== '#') { drawable = false }
            }
          }
          else if (dir === 2) {
            if (y <= tile.y && x === tile.x) { continue }
            else {
              if (x === tile.x && y === tile.y) { continue }
              else if (this.maze[y][x] !== '#') { drawable = false }
            }
          }
          else if (dir === 3) {
            if (x >= tile.x && y === tile.y) { continue }
            else {
              if (x === tile.x && y === tile.y) { continue }
              else if (this.maze[y][x] !== '#') { drawable = false }
            }
          }
          else {
            if (y >= tile.y && x === tile.x) { continue }
            else {
              if (x === tile.x && y === tile.y) { continue }
              else if (this.maze[y][x] !== '#') { drawable = false }
            }
          }
        }
      }
      console.log(drawable)
      return drawable
    },

    randint(start, end) {
      var range = (end - start) + 1
      var num = Math.floor(Math.random() * range) + start
      return num
    }
  },

  created: function () {
    this.CreateArray(this.height, this.width)
    this.GenerateMaze(this.height, this.width)
  }
}
</script>
