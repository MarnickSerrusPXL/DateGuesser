<template>
  <div class="bg-dark text-white">
    <h1 class="display-3">{{ msg }}</h1>
    <!-- Initial drag element -->
    <drag v-for="item in sourceDrag"
          :key="item.id.id"
          :class="{ [item]: true }"
          :transfer-data="{ item: item, list: sourceDrag, example: 'sourceDrag' }">
      <div v-if="sourceDrag[0].image">
        <img class="showImage pt-1" :src=item.image>
      </div>
    </drag>
    <br>
    <!-- drag targets -->
    <div>
      <div class="forceInline rounded" v-for="item in targetDrag" :key="item.id.id" :draggable="false">
        <div class="solvedBlock rounded">
          <div v-if="item.image">
            <img class="showImage pt-1" :src=item.image alt="animeImage">
          </div>
          <p>{{item.start}}</p>
        </div>
        <div class="forceInline customArrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </div>
        <drop class="drop list bg-secondary text-white rounded" @drop="handleDrop(item)"/>
        <div class="forceInline customArrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-primary mt-4 startButton" v-on:click="fillSourceDrag">Start</button>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'DragDropContainer',
  props: {
    msg: String
  },
  data() {
    return {
      sourceDrag: [],
      targetDrag: [{id: 0, image: "https://cdn.myanimelist.net/images/anime/3/57325.jpg", start:"1971-01-01"}],
      showsLeft: []
    };
  },
  methods: {
    handleDrop(target) {
      this.targetDrag.splice(this.targetDrag.indexOf(target) + 1, 0, this.sourceDrag[0]);
      let lastDate = "1970-01-02";
      for(let i = 0; i < this.targetDrag.length; i++){
        if (new Date(lastDate) >= new Date(this.targetDrag[i].start)){
          alert("Show was from " + this.targetDrag[i].start);
          window.location.reload();
        }
      lastDate = this.targetDrag[i].start;
      }
      if (this.targetDrag.length === 10){
        alert("Win!")
        window.location.replace("https://www.youtube.com/watch?v=2k0SmqbBIpQ");
      }
      this.fillSourceDrag();
    },
    async fillSourceDrag() {
      try {
        this.showsLeft = (await Vue.axios.get("http://localhost:3000/anime/random")).data;
        Vue.set(this.sourceDrag, 0, this.showsLeft.shift());
      }catch (e){
        alert("Something went wrong")
        console.log(e);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drag {
  display: inline-block;
  width: 170px;
  height: 170px;
  text-align: center;
  background: #aaa;
  margin: 10px;
}

.drop {
  display: inline-block;
  vertical-align: top;
  padding: 15px;
  margin: 10px;
  width: 170px;
  height: 170px;
}

.solvedBlock {
  display: inline-block;
  width: 170px;
  height: 170px;
  text-align: center;
  background: #aaa;
  margin: 10px;
}

.forceInline {
  display: inline-block;
}
.showImage {
  display: inline-block;
  width: 100px;
  height: 150px;
}
.customArrow {
  text-align: center;
  vertical-align: top;
  margin-top: 80px;
}
.startButton {
  width: 150px;
}
</style>
