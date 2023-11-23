const User = ({user}) => {
  return (
    <tr>
        <td></td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td>{user.phone}</td>
    </tr>
  )
}

export default User