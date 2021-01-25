<template>
  <v-row>
    <v-col
      cols="12"
      md="8"
    >
      <base-material-card
        color="warning"
        class="px-5 py-3"
      >
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            {{ ticket.title }}
          </div>
          <div class="subtitle-1 font-weight-light">
            {{ ticket.description }}
          </div>
        </template>
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
      </base-material-card>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <base-material-card
        color="warning"
        class="px-5 py-3"
      >
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            Ticket Info
          </div>
        </template>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="text-left">
                    Status:
                  </td>
                  <td class="text-right">
                    <template>
                      <v-dialog
                        v-model="statusDialog"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip
                            :color="$options.filters.colors(ticket.status)"
                            v-bind="attrs"
                            dark
                            v-on="on"
                          >
                            {{ ticket.status | status }}
                          </v-chip>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Change Status </span>
                          </v-card-title>
                          <v-form @submit.prevent="onEditSubmit">
                            <v-card-text>
                              <v-container class="py-0">
                                <v-row>
                                  <v-col
                                    cols="12"
                                    md="12"
                                  >
                                    <v-autocomplete
                                      v-model="defaultSelectedStatus"
                                      :items="[
                                        {key:'New',value:0},
                                        {key:'In Progress',value:1},
                                        {key:'Done',value:2},
                                        {key:'Archived',value:3}]"
                                      label="Status"
                                      dense
                                      filled
                                      item-text="key"
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
                                @click="statusDialog = false"
                              >
                                Close
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                type="submit"
                                @click="onEditSubmit; statusDialog = false"
                              >
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-dialog>
                    </template>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    Last Update:
                  </td>
                  <td class="text-right">
                    {{ ticket.updatedAt | formatDate }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    Creator:
                  </td>
                  <td class="text-right">
                    {{ ticket.customer.fullUsername }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    Staff:
                  </td>
                  <td class="text-right">
                    {{ ticket.agent.fullUsername }}
                    <v-dialog
                      v-model="agentDialog"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          x-small
                          v-bind="attrs"
                          v-on="on"
                          @click="getAgents"
                        >
                          mdi-pencil
                        </v-icon>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Change Assignee </span>
                        </v-card-title>
                        <v-form @submit.prevent="onEditSubmit">
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col
                                  cols="12"
                                  sm="12"
                                >
                                  <v-autocomplete
                                    v-model="defaultSelectedAgent"
                                    :items="agents"
                                    label="Agents"
                                    dense
                                    filled
                                    item-text="fullUsername"
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
                              @click="agentDialog = false"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              type="submit"
                              @click="onEditSubmit; agentDialog = false"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </v-dialog>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </base-material-card>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </v-row>
</template>
<script>
  import axios from 'axios'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'Ticket',
    validations: {
      newComment: { required },
    },
    data () {
      return {
        ticket: {},
        comments: [],
        newComment: '',
        loading: false,
        agentDialog: false,
        statusDialog: false,
        agents: [],
        defaultSelectedAgent: '',
        defaultSelectedStatus: '',
      }
    },
    computed: {
      newCommentErrors () {
        const errors = []
        if (!this.$v.newComment.$dirty) return errors
        !this.$v.newComment.required && errors.push('Comment is required.')
        return errors
      },
    },
    created () {
      const id = Number(this.$route.params.id)
      axios.get('/ticket/' + id).then(
        res => {
          this.ticket = res.data
          this.comments = res.data.ticketComments
          this.defaultSelectedAgent = res.data.agent
          this.defaultSelectedStatus = res.data.status
        },
      )
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
      getAgents () {
        axios.get('/agents').then(
          res => {
            this.agents = res.data
          },
        )
      },
      onEditSubmit () {
        this.$v.$touch()
        const formData = {
          status: this.defaultSelectedStatus,
          agent: this.defaultSelectedAgent.id,
        }
        axios.put('/ticket/edit/' + this.ticket.id, formData).then(res => {
          this.status = res.data.status
          this.ticket.agent = res.data.agent
        })
      },
    },
  }
</script>

<style scoped>
</style>
