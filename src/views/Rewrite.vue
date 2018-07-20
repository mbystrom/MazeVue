<template>
  <div class="home">
    <h1>A Simple Maze</h1>
    <span v-for="(row, index) in maze" :key="index">
      <span v-for="(col, index) in row" :key="index">
        <span v-if="col === '#'">#&nbsp;</span>
        <span v-else>.&nbsp;</span>
      </span><br/>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: 10,
      width: 10,
      maze: [],

      N: 1,
      S: 2,
      E: 4,
      W: 8,
    }
  },

  methods: {
    CreateArray (height, width) {
      console.log("generating array!")
      var arr = []

      for (var i = 0; i < height; i++) {
        arr[i] = []
        for (var j = 0; j < width; j++) {
          arr[i][j] = 0
        }
      }

      this.maze = arr
      return null
    },

    CarvePassages (currentX, currentY, grid) {
      console.log("begining CarvePassages!")
      const N = this.N
      const S = this.S
      const E = this.E
      const W = this.W
      let directions = this.Shuffle([ N, S, E, W ])
      const DX = { E: 1, W: -1, N: 0, S: 0 }
      const DY = { E: 0, W: 0, N: -1, S: 1 }
      const opposite = { E: W, W: E, N: S, S: N }
      
      for (var direction of directions) {
        let nextX = currentX + DX[direction]
        let nextY = currentY + DY[direction]
        console.log("at position ("+currentX+","+currentY+"), direction is "+direction)

        if (!this.isOutOfBounds(nextX, nextY, grid)) {
          if (grid[nextY][nextX] === 0) {
            grid[currentY][currentX] |= direction
            grid[nextY][nextX] |= opposite[direction]
            this.CarvePassages(nextX, nextY, grid)
          }
        }
      }
      this.maze = grid
      console.log("done!")
    },

    isOutOfBounds(x, y, grid) {
      if (x < 0 || x > grid[y].length) {
        return true
      }

      if (y < 0 || y > grid.length) {
        return true
      }

      return false
    },

    Shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      return arr
    }
  },

  created: function () {
    console.log("started!")
    this.CreateArray(this.height, this.width)
    this.CarvePassages(0, 0, this.maze)
  }
}