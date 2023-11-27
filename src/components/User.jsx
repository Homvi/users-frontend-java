import { useEffect, useState } from "react"

const User = ({user, deleteUser, saveModifications}) => {

const [isUserUnderModification, setIsUserUnderModification] = useState(false)

const handleChangeToModify = () => {
setIsUserUnderModification(true)
}



const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [age, setAge] = useState(20);
const [phoneNumber, setPhoneNumber] = useState("")

const handleSaveModifications = () => {
  const newUser = {
    firstName,
    lastName,
    age,
    phoneNumber
  }
  saveModifications(newUser, user.id)
  setIsUserUnderModification(false)
}

useEffect(() => {
  setFirstName(user.firstName)
  setLastName(user.lastName)
  setAge(user.age)
  setPhoneNumber(user.phone)
}, [])



  return (
    <tr>
        <td></td>
        { !isUserUnderModification && (
          <>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{age}</td>
          <td>{phoneNumber}</td>
          </>
        ) }
        { isUserUnderModification && (
          <>
          <td>
         <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </td>
          <td>
         <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </td>
          <td>
         <input type="number" value={age} onChange={e => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </td>
          <td>
         <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </td>
       
          </>
        ) }

        <td><button onClick={() => deleteUser(user.id)} className="btn btn-error">Delete</button></td>
        { !isUserUnderModification &&  <td><button onClick={handleChangeToModify} className="btn btn-warning">Modify</button></td>}
        { isUserUnderModification &&  <td><button onClick={handleSaveModifications} className="btn btn-accent">Save</button></td>}
    </tr>
  )
}

export default User