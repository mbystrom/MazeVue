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
      var startRow = this.randint(1,width-2)
      var startColumn = this.randint(1,height-2)
      var currentTile = { y: startRow, x: startColumn }
      console.log("starting tile is: (" + currentTile.x + ", " + currentTile.y + ")")
      // console.log(startRow + ', ' + startColumn)
      var windingPercent = 30
      var visitedTiles = []
      var loopsSinceLastWind = 0

      // 1 = left, 2 = up, 3 = right, 4 = down
      var dirToCarve = this.randint(1,4)
      while (this.isDrawable(currentTile, visitedTiles)) {
        loopsSinceLastWind++
        console.log("current tile is: (" + currentTile.x + ", " + currentTile.y + ")")
        console.log("direction is: " + dirToCarve)
        if (this.check2Ahead(currentTile, dirToCarve)) {
          var nextTile = currentTile
          if (dirToCarve === 1) { nextTile.x -= 1 }
          else if (dirToCarve === 2) { nextTile.y -= 1 }
          else if (dirToCarve === 3) { nextTile.x += 1 }
          else { nextTile.y += 1 }
          this.maze[currentTile.y][currentTile.x] = "."

          // submethod for pushing tiles
          var x_t = currentTile.x
          var y_t = currentTile.y
          visitedTiles.push({ y: y_t, x: x_t }); console.log("pushing tile!")
          if (visitedTiles.length > 3) { visitedTiles.shift(); console.log("shifting tile!") }
          console.log(visitedTiles)
          // end submethod

          currentTile = nextTile
          if (loopsSinceLastWind > 3) {
            if (this.randint(0,100) <= windingPercent) { 
              loopsSinceLastWind = 0
              this.Wynd(dirToCarve)
            }
          }
          console.log("loops since winding: " + loopsSinceLastWind)
        }
        else {
          loopsSinceLastWind = 0
          dirToCarve = this.Wynd(dirToCarve)
        }
      }
    },

    // named wynd instead of wind to make it seem less like the air current
    Wynd (dir) {
      console.log("changing direction!")
      var addToDir = this.randint(1,3)
      dir += addToDir
      if (dir > 4) { dir -= 4 }
      console.log("direction is now: " + dir)
      return dir
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

    isDrawable (tile, visited) {
      console.log("checking if current tile is drawable...")
      // var drawable = true
      // for (var y = tile.y - 1; y < tile.y + 1; y++) {
      //   for (var x = tile.x - 1; x < tile.x + 1; x++) {
      //     if (dir === 1) {
      //       if (x <= tile.x && y === tile.y) { continue }
      //       else {
      //         if (x === tile.x && y === tile.y) { continue }
      //         else if (this.maze[y][x] !== '#') { drawable = false }
      //       }
      //     }
      //     else if (dir === 2) {
      //       if (y <= tile.y && x === tile.x) { continue }
      //       else {
      //         if (x === tile.x && y === tile.y) { continue }
      //         else if (this.maze[y][x] !== '#') { drawable = false }
      //       }
      //     }
      //     else if (dir === 3) {
      //       if (x >= tile.x && y === tile.y) { continue }
      //       else {
      //         if (x === tile.x && y === tile.y) { continue }
      //         else if (this.maze[y][x] !== '#') { drawable = false }
      //       }
      //     }
      //     else {
      //       if (y >= tile.y && x === tile.x) { continue }
      //       else {
      //         if (x === tile.x && y === tile.y) { continue }
      //         else if (this.maze[y][x] !== '#') { drawable = false }
      //       }
      //     }
      //   }
      // }
      var drawable = true
      for (var y = tile.y - 1; y < tile.y + 1; y++) {
        for (var x = tile.x - 1; x < tile.x + 1; x++) {
          for (var coord in visited) {
            if (coord.y === y && coord.x === x) { continue }
          }
          if (tile.x === x && tile.y === y) { continue }
          else {
            if (this.maze[y][x] !== '#') { drawable = false }
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
