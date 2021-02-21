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
        <comments
          :comments="comments"
          :ticket="ticket"
        />
      </base-material-card>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <info
        :ticket="ticket"
      />
    </v-col>
  </v-row>
</template>
<script>
  import comments from '../../components/tickets/comments'
  import info from '../../components/tickets/info'
  import ticketService from '@/services/ticketService'

  export default {
    name: 'Ticket',
    components: {
      comments: comments,
      info: info,
    },
    data () {
      return {
        ticket: {},
        comments: [],
      }
    },
    created () {
      const id = Number(this.$route.params.id)
      ticketService.getTicket(id).then(
        res => {
          this.ticket = res.data
          this.comments = res.data.ticketComments
        },
      )
    },
  }
</script>

<style scoped>
</style>
