<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

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
                    Update
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { email, required, numeric, alphaNum } from 'vuelidate/lib/validators'
  import userService from '../../services/userService'
  export default {
    validations: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
      company: { alphaNum },
      phone: { numeric },
    },
    data () {
      return {
        id: '',
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
    async created () {
      const response = await userService.getUserProfile()
      this.id = response.data.id
      this.email = response.data.email
      this.firstName = response.data.firstName
      this.lastName = response.data.lastName
      this.company = response.data.company
      this.phone = response.data.phone
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
          userService.putUserProfile(this.id, formData).then(
            (res) => {
              this.email = res.data.email
              this.firstName = res.data.firstName
              this.lastName = res.data.lastName
              this.company = res.data.company
              this.phone = res.data.phone
            },
          )
        }
      },
    },
  }
</script>
