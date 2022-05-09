import { authAxios } from '@/services/axios-service'
import Vue from 'vue'

export default {
 getAgents: () => {
   return authAxios.get('/agents')
  },
  getUsers: () => {
    return authAxios.get('/users')
  },
  getUserProfile: () => {
    return authAxios.get('/user')
  },
  putUserProfile: (id, formData) => {
    return authAxios.put('/user/edit/' + id, formData).then(
      Vue.swal({
        icon: 'success',
        title: 'You profile is submitted successfully',
      }),
    )
  },
}
