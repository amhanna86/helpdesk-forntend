<template>
  <v-app>
    <v-container
      id="login"
      class="fill-height"
      fluid
      tag="section"
    >
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="3"
        >
          <base-material-card
            elevation="24"
            outlined
          >
            <template v-slot:heading>
              <div class="display-2 font-weight-light text-center">
                Login
              </div>
            </template>
            <div class="subtitle-1 font-weight-thin text-center">
              Or
              <router-link
                to="/signup"
                color="blue"
              >
                Register
              </router-link>
            </div>
            <v-form @submit.prevent="onSubmit">
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      id="email"
                      v-model="email"
                      type="email"
                      class="purple-input"
                      label="Email Address"
                      required
                      clearable
                      :error-messages="emailErrors"
                      prepend-icon="mdi-email"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      id="password"
                      v-model="password"
                      type="password"
                      label="Password"
                      class="purple-input"
                      required
                      clearable
                      :error-messages="passwordErrors"
                      prepend-icon="mdi-lock"
                      @input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-center"
                  >
                    <v-btn
                      class="ma-0"
                      outlined
                      color="green"
                      type="submit"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
  import router from '../../router'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    validations: {
      email: {
        required,
        email,
      },
      password: { required },
    },
    data () {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },
    created () {
      if (this.$store.getters.isAuthenticated) {
        router.replace('/')
      }
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        const formData = {
          email: this.email,
          password: this.password,
        }
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.$store.dispatch('login', {
            email: formData.email,
            password: formData.password,
          })
        }
      },
    },
  }
</script>
