<template>
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
      <v-form @submit.prevent="onSubmit">
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
                  item-value="id"
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
            @click="onSubmit; agentDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'EditAgent',
    props: {
      ticket: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        agentDialog: false,
        agents: [],
        defaultSelectedStatus: this.ticket.status,
        defaultSelectedAgent: this.ticket.agent,
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          status: this.defaultSelectedStatus,
          agent: this.defaultSelectedAgent,
        }
        axios.put('/ticket/edit/' + this.ticket.id, formData).then((res) => {
          this.ticket.agent = res.data.agent
        })
      },
      getAgents () {
        axios.get('/agents').then(
          res => {
            this.agents = res.data
          },
        )
      },
    },
  }
</script>

<style scoped>

</style>
