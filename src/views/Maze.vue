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
    CreateArray(height,width) {
      var arr = []

      for (var i = 0; i < height; i++) {
        arr[i] = []
        for (var j = 0; j < width; j++) {
          arr[i][j] = '#'
        }
      }

      this.maze = arr
    },

    GenerateMaze () {
      var startRow = Math.floor(Math.random() * 32)
      var startColumn = Math.floor(Math.random() * 32)
      console.log(startRow + ', ' + startColumn)
      this.maze[startRow][startColumn] = '_'
    }
  },

  created: function () {
    this.CreateArray(this.height, this.width)
    this.GenerateMaze()
  }
}
</script>
