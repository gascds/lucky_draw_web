<template>
  <q-layout view="hhh lpR fFf" style=" margin: auto">
    <q-header style="margin: auto;">
      <q-toolbar style="height: 55px">
        <div style="height: 35px; padding-left: 6px">
          <router-link :to="url">
          </router-link>
        </div>
        <q-toolbar-title>Lottery System</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
</style>

<script>
import { defineComponent } from "vue";
// import VConsole from 'vconsole';
// const vConsole = new VConsole();

export default defineComponent({
  name: "home",
  data() {
    return {
      manually: false,
      url: "/",
    };
  },
  methods: {
  },
});
</script>
