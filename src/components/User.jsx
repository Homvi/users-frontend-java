const User = ({user, deleteUser}) => {
  return (
    <tr>
        <td></td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td>{user.phone}</td>
        <td><button onClick={() => deleteUser(user.id)} className="btn btn-error">Delete</button></td>
    </tr>
  )
}

export default User