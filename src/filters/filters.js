import moment from 'moment'

export default {
  userLetters: (user) => {
    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase() // <-- The return value as Per logic
  },

  status: (value) => {
    switch (value) {
      case 0:
        return 'New'
      case 1:
        return 'In Progress'
      case 2:
        return 'Done'
      case 3:
        return 'Archived'
    }
  },

  colors: (value) => {
    switch (value) {
      case 0:
        return 'red'
      case 1:
        return 'green'
      case 2:
        return 'blue'
      case 3:
        return 'gray'
    }
  },

  formatDate: (value) => {
    if (value) {
      return moment(String(value)).format('DD.MM.YYYY HH:mm')
    }
  },
}
