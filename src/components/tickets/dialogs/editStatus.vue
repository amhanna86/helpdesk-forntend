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

<script>
  import axios from 'axios'

  export default {
    name: 'EditStatus',
    props: {
      ticket: Object,
      required: true,
    },
    data () {
      return {
        statusDialog: false,
        defaultSelectedStatus: '',
      }
    },
    methods: {
      onEditSubmit () {
        this.$v.$touch()
        const formData = {
          status: this.defaultSelectedStatus,
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
