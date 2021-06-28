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
      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-container class="py-0">
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-autocomplete
                  v-model="selectedStatus"
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
            @click="onSubmit; statusDialog = false"
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
    name: 'EditStatus',
    props: {
      ticket: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        statusDialog: false,
        selectedStatus: this.ticket.status,
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          status: this.selectedStatus,
          agent: this.ticket.agent.id,
        }
        ticketService.putTicketStatus(this.ticket.id, formData).then(
          (res) => {
            this.ticket.status = res.data.status
          },
        )
      },
    },
  }
</script>

<style scoped>

</style>
