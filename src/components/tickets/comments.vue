<template>
  <v-col
    cols="12"
    md="12"
  >
    <v-card-text>
      <template v-for="comment in comments">
        <v-row
          :key="comment.id"
          align="center"
        >
          <v-col cols="1">
            <v-list-item-avatar
              class="align-self-center"
              color="white"
              contain
            >
              <v-avatar
                color="primary"
                size="56"
              >
                <template v-if="comment.user.image">
                  <v-img
                    src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
                    max-height="30"
                  />
                </template>
                <template v-else>
                  {{ comment.user | userLetters }}
                </template>
              </v-avatar>
            </v-list-item-avatar>
          </v-col>

          <v-col cols="10">
            <div
              class="font-weight-light"
              v-text="comment.comment"
            />
          </v-col>
          <v-col
            cols="1"
            class="text-right"
          >
            <v-icon class="mx-1">
              mdi-pencil
            </v-icon>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
    <v-form @submit.prevent="onSubmit">
      <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          id="newComment"
          v-model="newComment"
          type="comment"
          class="purple-input"
          label="Comment"
          required
          clearable
          :error-messages="newCommentErrors"
          @input="$v.newComment.$touch()"
          @blur="$v.newComment.$touch()"
        />
      </v-col>
      <v-col
        cols="12"
        class="text-right"
      >
        <v-btn
          class="ma-0"
          outlined
          color="green"
          type="submit"
        >
          Comment
        </v-btn>
      </v-col>
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-col>
</template>
<script>
  import { required } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    name: 'Comments',
    props: {
      ticket: {
        type: Object,
        required: true,
      },
      comments: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        newComment: '',
        loading: false,
      }
    },
    validations: {
      newComment: { required },
    },
    computed: {
      newCommentErrors () {
        const errors = []
        if (!this.$v.newComment.$dirty) return errors
        !this.$v.newComment.required && errors.push('Comment is required.')
        return errors
      },
    },
    methods: {
      onSubmit () {
        this.$v.$touch()
        const formData = {
          comment: this.newComment,
        }
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // eslint-disable-next-line no-unused-expressions
          this.loading = true
          axios.post('/ticket/comment/' + this.ticket.id + '/new', formData).then(res => {
            this.$v.$reset()
            this.newComment = ''
            this.comments.push(res.data)
          }).catch((error) => {
            this.error = true
            console.log(error)
          }).finally(() => {
            this.loading = false
          })
        }
      },
    },
  }
</script>

<style scoped>

</style>
