import Vue from 'vue'
import router from '../router'
import { authAxios } from '@/services/axios-service'

export default {
  submitTicket: (formData) => {
    authAxios.post('/ticket/new', formData).then(
      response => {
        Vue.swal({
          icon: 'success',
          title: 'Your ticket is submitted successfully',
        })
        router.push('/ticket/' + response.data)
      },
    ).catch(
      // eslint-disable-next-line handle-callback-err
      error => Vue.swal({
        icon: 'error',
        title: 'Something went wrong try again later',
      }),
    )
  },
  getTickets: () => {
   return authAxios.get('/tickets/user')
  },
  getTicketsByStatus: (status) => {
    return authAxios.get('/tickets/user/' + status)
  },
  getTicket: (id) => {
   return authAxios.get('/ticket/' + id)
  },
  submitComment: (id, formData) => {
    return authAxios.post('/ticket/comment/' + id + '/new', formData).then(
        Vue.swal({
          icon: 'success',
          title: 'Your Comment is submitted successfully',
        }),
    ).catch(
      // eslint-disable-next-line handle-callback-err
      error => Vue.swal({
        icon: 'error',
        title: 'Something went wrong try again later',
      }),
    )
  },
  putTicketStatus: (id, formData) => {
    return authAxios.put('/ticket/edit/' + id, formData).then(
      Vue.swal({
        icon: 'success',
        title: 'The New Status is submitted successfully',
      }),
    )
  },
  putAgentStatus: (id, formData) => {
    return authAxios.put('/ticket/edit/' + id, formData).then(
      Vue.swal({
        icon: 'success',
        title: 'The New Agent is submitted successfully',
      }),
    )
  },

  putComment: (id, formData) => {
    return authAxios.put('/ticket/comment/edit/' + id, formData).then(
      Vue.swal({
        icon: 'success',
        title: 'Your Comment Edited successfully',
      }),
    )
  },
}
