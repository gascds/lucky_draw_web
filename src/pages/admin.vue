<template>
  <q-page class="col items-center justify-evenly bg-grey-3">
    <div class="q-pa-md row items-start flex_center_style">
      <q-card class="my-card">
        <q-card-section class="bg-blue-5 text-white">
          <div class="text-h6">參加彩票抽獎活動</div>
          <div class="text-subtitle2">目前開放予所有人士參與</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn type="submit" @click="lotteryParticipation"  flat>按此參加</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card">
        <q-card-section class="bg-green-5 text-white">
          <div class="text-h6">查看得獎號碼</div>
          <div class="text-subtitle2">只會顯示你是否中獎</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn type="submit" @click="lotteryWinner" flat>按此查看</q-btn>
        </q-card-actions>
      </q-card>

    </div>

    <div v-show='participationPage'>
      <ticketGetter :display="participationPage"></ticketGetter>
    </div>

    <div v-show='checkResultPage'>
      <resultChecker :display="checkResultPage"></resultChecker>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ticketGetter from "./ticketGetter.vue"
import resultChecker from "./resultChecker.vue"

export default defineComponent({
  name: "admin",
  	components: {
      ticketGetter: ticketGetter,
      resultChecker: resultChecker
    },
  data() {
    return {
      participationPage: false,
      checkResultPage: false,
    }
  },
  methods: {
    lotteryParticipation(){
      this.participationPage = !this.participationPage;
      this.checkResultPage = false;
    },
    lotteryWinner(){
      this.checkResultPage = !this.checkResultPage;
      this.participationPage = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.my-card{
  width: 100%;
  max-width: 250px;
  margin: 20px;
}
.q-card__actions .q-btn {
  width: 100%;
}
.flex_center_style{
  display: flex;
  justify-content: center;
  padding: 16px;
}
</style>