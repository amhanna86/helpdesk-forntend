<template>
  <v-app>
    <div id="signin">
      <div class="signin-form">
        <form @submit.prevent="onSubmit">
          <div class="input">
            <label for="email">Mail</label>
            <input
              id="email"
              v-model="email"
              type="email"
            >
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
            >
          </div>
          <div class="submit">
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>
<script>
  import router from '../../router'

  export default {
    data () {
      return {
        email: '',
        password: '',
      }
    },
    created () {
      if (this.$store.getters.isAuthenticated) {
        router.replace('/dashboard')
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('login', { email: formData.email, password: formData.password })
      },
    },
  }
</script>
