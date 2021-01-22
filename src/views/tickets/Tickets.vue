<template>
  <base-material-card
    icon="mdi-clipboard-text"
    title="Tickets"
    class="px-5 py-3"
  >
    <v-data-table
      :headers="headers"
      :items="tickets"
      @click:row="handleClick"
    />
  </base-material-card>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Tickets',
    data () {
      return {
        tickets: [],
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Title',
            value: 'title',
          },
          {
            sortable: false,
            text: 'Status',
            value: 'status',
            align: 'right',
          },
          {
            sortable: false,
            text: 'CreatedAt',
            value: 'createdAt',
            align: 'right',
          },
          {
            sortable: false,
            text: 'UpdatedAt',
            value: 'updatedAt',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Customer',
            value: 'customer',
            align: 'right',
          },
        ],
      }
    },
    created () {
      if (this.$store.getters.isAuthenticated) {
        axios.get('/tickets/user').then(
          res => {
            this.tickets = res.data
          },
        )
      }
    },
    methods: {
      handleClick (row) {
        this.$router.push('/ticket/' + row.id)
      },
    },
  }
</script>

<style scoped>
tr:hover{
  cursor: pointer;
}
</style>
