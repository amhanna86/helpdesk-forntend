export default {
  userLetters: (user) => {
    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase() // <-- The return value as Per logic
  },
}
