<template>
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
        <v-col
          v-for="comment in ticket.ticketComments"
          :key="comment.id"
          cols="12"
        >
          <div
            class="font-weight-light"
            v-text="comment.comment"
          />
        </v-col>
      </v-card-text>
    </base-material-card>
  </v-col>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Ticket',
    data () {
      return {
        ticket: {},
      }
    },
    async created () {
      const id = Number(this.$route.params.id)
      await axios.get('/ticket/' + id).then(
        res => {
          this.ticket = res.data
        },
      )
    },
  }
</script>

<style scoped>

</style>
