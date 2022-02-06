<template>
  <div class="flex_center_style">
    <q-card class="my-card">
        <q-card-section>
            <div class="text-h6">Lottery Result</div>
            <br> {{lottryResult}}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
            <q-btn label="Join next round ? Click me" color="red" @click="confirm = true" />
        </q-card-section>
    </q-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Previous round ticket number will be removed, you will get new ticket number for this round.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Confirm" color="red" @click="removeTicket" v-close-popup />
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
  
</template>

<script>
import {defineComponent} from 'vue';
import httpRequest from "../utils/request";

export default defineComponent({
  name: "resultChecker",
  props: [
      'display'
  ],
  data() {
    return {
      lottryResult: null,
      confirm: false,
    }
  },
  watch: {
    display: {
      immediate: true,
      handler (newValue, oldValue){
        if (newValue){
          this.checkWinner();
        }
      }
    }
  },
  methods: {
    async checkWinner(){
      await httpRequest("/ticket/winner").then(
        (response) => {
          if (typeof response !== "undefined") {
            if (response.msg === "Success") {
              if (response.data){
                this.lottryResult = 'You Win !';
              }else{
                this.lottryResult = "Your ticket do not match with the winning number !";
              }
            } else {
              this.$q.notify({
                type: 'negative',
                message: '無法獲取你的Ticket號碼，請先參加抽獎活動。',
              });
              this.lottryResult = '無法獲取你的Ticket號碼，請先參加抽獎活動。';
            }
          } else {
            this.$q.notify({
              color: "negative",
              message: '伺服器出現問題，請稍後再試。',
            });
          }
        }
      );
    },
    async removeTicket(){
      await httpRequest("/ticket/", 'DELETE').then(
        (response) => {
          if (typeof response !== "undefined") {
            if (response.msg === "Success") {
              this.$q.notify({
                type: 'positive',
                message: '請到 "參加彩票抽獎活動" 重新參加抽獎。',
              });
            } else {
              this.$q.notify({
                type: 'negative',
                message: '無法參加下一輪抽獎。',
              });
            }
          } else {
            this.$q.notify({
              color: "negative",
              message: '伺服器出現問題，請稍後再試。',
            });
          }
        }
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.q-linear-progress{
  position: fixed !important;
  bottom: 0;
  z-index: 2;
}

.flex_center_style{
  padding: 10px;
  text-align: center;
  margin: 0 auto;
}

.remark{
  text-align: center; 
  color: #5b747a;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 15px;
  padding-bottom: 10px;
}

.my-card{
  width: 80%;
  margin: 10px auto;
}
.q-card__actions .q-btn {
    width: 100%;
}
.q-card{
  box-shadow:none;
}
</style>