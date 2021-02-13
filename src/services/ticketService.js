import axios from 'axios'
import Vue from 'vue'
import router from '../router'

export default {
  ticketSubmit: (formData) => {
    axios.post('/ticket/new', formData).then(
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
}
