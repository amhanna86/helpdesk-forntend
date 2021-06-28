<template>
  <v-dialog
    v-model="commentDialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        x-small
        v-bind="attrs"
        v-on="on"
      >
        mdi-pencil
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Comment</span>
      </v-card-title>
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-textarea
                  id="newComment"
                  v-model="editedComment"
                  type="comment"
                  class="purple-input"
                  label="Comment"
                  required
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="commentDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            type="submit"
            @click="onSubmit; commentDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import ticketService from '@/services/ticketService'

  export default {
    name: 'EditComment',
    props: {
      currentComment: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        commentDialog: false,
        editedComment: this.currentComment.comment,
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          comment: this.editedComment,
        }
        ticketService.putComment(this.currentComment.id, formData).then(
          (res) => {
            this.currentComment.comment = res.data.comment
          },
        )
      },
    },
  }
</script>

<style scoped>

</style>
