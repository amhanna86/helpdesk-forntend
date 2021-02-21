import { authAxios } from '@/services/axios-service'

export default {
getAgents: () => {
   return authAxios.get('/agents')
  },
}
