<template>
  <b-navbar>
    <nuxt-link to="/" class="navbar-brand">
      Oneiric<b>Music</b>
    </nuxt-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <nuxt-link to="/" class="nav-link">Player</nuxt-link>
        <nuxt-link to="/manager" class="nav-link">Manager</nuxt-link>
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