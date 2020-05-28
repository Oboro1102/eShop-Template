<template lang="pug">
  div(id="app")
    Navbar
    transition(name="fade" mode="out-in" appear)
      router-view
    ToTop
    Footer
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToTop from "@/components/ToTop";

export default {
  components: {
    Navbar,
    Footer,
    ToTop
  }
};
</script>