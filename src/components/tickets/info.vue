<template>
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
                <editStatus :ticket="ticket" />
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
                <edit-agent :ticket="ticket" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </base-material-card>
</template>

<script>
  import editStatus from '../../components/tickets/dialogs/editStatus'
  import editAgent from '../../components/tickets/dialogs/editAgent'

  export default {
    name: 'Info',
    components: {
      editStatus: editStatus,
      editAgent: editAgent,
    },
    props: {
      ticket: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>
