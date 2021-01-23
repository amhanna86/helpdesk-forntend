<template>
  <base-material-card
    icon="mdi-clipboard-text"
    title="Tickets"
    class="px-5 py-3"
  >
    <v-data-table
      class="row-pointer"
      :headers="headers"
      :items="tickets"
      @click:row="handleClick"
    >
      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | formatDate }}
      </template>
      <template v-slot:item.customer="{ item }">
        {{ item.customer.fullUsername }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ item.updatedAt | formatDate }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="$options.filters.colors(item.status)"
          dark
        >
          {{ item.status | status }}
        </v-chip>
      </template>
    </v-data-table>
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
            sortable: true,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: true,
            text: 'Title',
            value: 'title',
          },
          {
            sortable: true,
            text: 'Status',
            value: 'status',
            align: 'right',
          },
          {
            sortable: true,
            text: 'CreatedAt',
            value: 'createdAt',
            align: 'right',
          },
          {
            sortable: true,
            text: 'UpdatedAt',
            value: 'updatedAt',
            align: 'right',
          },
          {
            sortable: true,
            text: 'Customer',
            value: 'customer',
            align: 'right',
          },
        ],
      }
    },
    async created () {
      if (this.$store.getters.isAuthenticated) {
        await axios.get('/tickets/user').then(
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

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
