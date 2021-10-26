<template>
  <div
    class="
      justify-between
      w-10/12
      px-2
      py-1
      flex
      items-center
      m-auto
      msg
    "
    :class="msgLabel.bg"
  >
    <p> 
      <img v-if="msgLabel.icon" :src="msgLabel.icon"  class="w-6 h-6 inline-block" alt="msg icon" />
      <span class="p-2" :class="msgLabel.text" v-text="msgLabel.msg">  </span>
    </p>
    <img src="../assets/close.svg" class="w-6 h-6 cursor-pointer" v-on:click="hideMsg" alt="close message icon" />
  </div>
</template>

<script>
import data from "./msg.json";

export default {
  data() {
    return {
      msgLabel:{}
    };
  },

  props: ["msgType"],

  methods: {
    hideMsg: function() {
      document.querySelector(".msg").style.display = "none";

}
  },

  mounted() {
    this.msgLabel = data[this.$props.msgType]
  }
};
</script>