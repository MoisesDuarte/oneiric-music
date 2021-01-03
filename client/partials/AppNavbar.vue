<template>
  <b-navbar>
    <b-navbar-brand href="#">
      OneiricMusic
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          Player
        </b-nav-item>
        <b-nav-item>
          Manager
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'AppNavbar',
}
</script>

<style>

</style>