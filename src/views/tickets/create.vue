<template>
  <v-container
    id="New Ticket"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="11"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Create New Ticket
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
                    id="title"
                    v-model="title"
                    label="Title"
                    required
                    clearable
                    :error-messages="titleErrors"
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-textarea
                    id="description"
                    v-model="description"
                    required
                    clearable
                    :error-messages="descriptionErrors"
                    class="purple-input"
                    label="Description"
                    @input="$v.description.$touch()"
                    @blur="$v.description.$touch()"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-btn
              class="ma-0"
              outlined
              color="green"
              type="submit"
            >
              Submit
            </v-btn>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    validations: {
      title: { required },
      description: { required },
    },
    data () {
      return {
        title: '',
        description: '',
      }
    },
    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title is required.')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.required && errors.push('Description is required')
        return errors
      },
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        const formData = {
          title: this.title,
          description: this.description,
        }
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          axios.post('/ticket/new', formData)
        }
      },
    },
  }
</script>

<style scoped>

</style>
