<template>
  <v-app>
    <v-container
      id="signup"
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
          md="8"
        >
          <base-material-card
            elevation="24"
            outlined
          >
            <template v-slot:heading>
              <div class="display-2 font-weight-light text-center">
                Register
              </div>
            </template>
            <div class="subtitle-1 font-weight-thin text-center">
              Or <router-link
                to="/login"
              >
                Login
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
                    md="6"
                  >
                    <v-text-field
                      id="firstName"
                      v-model="firstName"
                      type="firstName"
                      class="purple-input"
                      label="First Name"
                      required
                      clearable
                      :error-messages="firstNameErrors"
                      prepend-icon="mdi-account"
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      id="lastName"
                      v-model="lastName"
                      type="lastName"
                      class="purple-input"
                      label="Last Name"
                      required
                      clearable
                      :error-messages="lastNameErrors"
                      prepend-icon="mdi-account-multiple"
                      @input="$v.lastName.$touch()"
                      @blur="$v.lastName.$touch()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
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
                    md="6"
                  >
                    <v-text-field
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      class="purple-input"
                      required
                      clearable
                      :error-messages="confirmPasswordErrors"
                      prepend-icon="mdi-lock"
                      @input="$v.confirmPassword.$touch()"
                      @blur="$v.confirmPassword.$touch()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      id="company"
                      v-model="company"
                      type="company"
                      label="Company"
                      class="purple-input"
                      required
                      clearable
                      :error-messages="companyErrors"
                      prepend-icon="mdi-home-city"
                      @input="$v.company.$touch()"
                      @blur="$v.company.$touch()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      id="phone"
                      v-model="phone"
                      type="phone"
                      label="Phone"
                      class="purple-input"
                      required
                      clearable
                      :error-messages="phoneErrors"
                      prepend-icon="mdi-phone"
                      @input="$v.phone.$touch()"
                      @blur="$v.phone.$touch()"
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
                      Register
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
  import { email, required, sameAs, numeric, alphaNum } from 'vuelidate/lib/validators'
  export default {
    validations: {
      email: { required, email },
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      firstName: { required },
      lastName: { required },
      company: { alphaNum },
      phone: { numeric },
    },
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
      }
    },
    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors.push('Confirm Password is required.')
        !this.$v.confirmPassword.sameAsPassword && errors.push('There is a mismatch.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      lastNameErrors () {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last Name is required')
        return errors
      },
      firstNameErrors () {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.required && errors.push('First Name is required')
        return errors
      },
      companyErrors () {
        const errors = []
        if (!this.$v.company.$dirty) return errors
        !this.$v.company.alphaNum && errors.push('Company Name should have letters')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.numeric && errors.push('Telephone should have numbers')
        return errors
      },
    },
    created () {
      if (this.$store.getters.isAuthenticated) {
        router.replace('/dashboard')
      }
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          firstName: this.firstName,
          lastName: this.lastName,
          company: this.company,
          phone: this.phone,
        }
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.$store.dispatch('signup', formData)
        }
      },
    },
  }
</script>

<style scoped>

</style>
