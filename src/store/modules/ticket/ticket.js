import axios from 'axios'

const state = {
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

const getters = {
}

const mutations = {
  ticket (state, ticket) {
    state.ticket = ticket
    state.comments = ticket.ticketComments
  },
}

const actions = {
  getTicket ({ commit, dispatch }, formData, id) {
    axios.get('/ticket/' + id).then(
      res => {
        commit('ticket', {
          ticket: res.data.ticket,
          comments: res.data.ticket.ticketComments,
        })
      },
    )
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
