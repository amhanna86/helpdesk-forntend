<template>
  <div>
    <v-btn
      v-if="this.$store.getters.isCustomer"
      class="mx-4 mt-3"
      absolute
      right
      top
      fab
      dark
      small
      color="blue"
      to="/ticket/new"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    <base-material-card
      title="Tickets"
      class="px-5 py-3"
    >
      <template v-slot:heading>
        <v-tabs
          v-model="tabs"
          background-color="transparent"
          slider-color="white"
          show-arrows
          fixed-tabs
        >
          <span
            class="subheading font-weight-light mx-3"
            style="align-self: center"
          >Tickets:</span>

          <v-tab
            v-for="tabHeader in tabHeaders"
            :key="tabHeader.title"
          >
            <v-icon class="mr-2">
              {{ tabHeader.icon }}
            </v-icon>
            {{ tabHeader.title }}
          </v-tab>
        </v-tabs>
      </template>

      <v-tabs-items
        v-model="tabs"
        class="transparent"
      >
        <v-tab-item
          v-for="tabHeader in tabHeaders"
          :key="tabHeader.status"
        >
          <v-card-text>
            <template>
              <v-row

                align="center"
              >
                <v-col cols="12">
                  <v-data-table
                    class="row-pointer"
                    :headers="headers"
                    :items="getTicketsByStatus(tabHeader.status)"
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
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </div>
</template>
<script>
  import ticketService from '@/services/ticketService'

  export default {
    name: 'Tickets',
    data () {
      return {
        tickets: [],
        tabs: 0,
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
        tabHeaders: [
          {
            title: 'New',
            icon: 'mdi-card-plus-outline',
            status: 0,
          },
          {
            title: 'Open',
            icon: 'mdi-open-in-new',
            status: 1,
          },
          {
            title: 'Done',
            icon: 'mdi-format-list-checks',
            status: 2,
          },
          {
            title: 'Archived',
            icon: 'mdi-arrow-up-bold-box-outline',
            status: 3,
          },
        ],
      }
    },
    async created () {
      const response = await ticketService.getTickets()
      console.log(response)
      this.tickets = response.data
    },
    methods: {
      handleClick (row) {
        this.$router.push('/ticket/' + row.id)
      },
      getTicketsByStatus (status) {
        var filteredTickets = []
        this.tickets.forEach(function (currentValue) {
          if (currentValue.status === status) {
            filteredTickets.push(currentValue)
          }
        })
        return filteredTickets
      },
    },
  }
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
