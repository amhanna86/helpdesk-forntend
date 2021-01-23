export default (value) => {
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
}
