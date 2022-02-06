<template>
  <div class="flex_center_style">
    <q-card class="my-card">
        <q-card-section>
            <div class="text-h6">Your ticket number: </div>
            <br> {{ticketNumber}}
        </q-card-section>
        <q-separator inset />
        <q-card-section>
            <div class="remark">Remark: Please remember this ticket number to check when you win</div>
        </q-card-section>
    </q-card>
  </div>
  
</template>

<script>
import {defineComponent} from 'vue';
import httpRequest from "../utils/request";

export default defineComponent({
  name: "ticketGetter",
  props: [
      'display'
  ],
  data() {
    return {
      ticketNumber: null,
    }
  },
  watch: {
    display: {
      immediate: true,
      handler (newValue, oldValue){
        if (newValue){
          this.getTicket();
        }
      }
    }
  },
  methods: {
    async getTicket(){
      await httpRequest("/ticket/").then(
        (response) => {
          if (typeof response !== "undefined") {
            if (response.msg === "Success") {
              this.ticketNumber = response.data;
            } else {
              this.$q.notify({
                type: 'negative',
                message: '伺服器出現問題，請稍後再試。',
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