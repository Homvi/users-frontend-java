import { useEffect, useState } from "react"
import User from "./components/User"
import axios from "axios";

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(20);
  const [phoneNumber, setphoneNumber] = useState("")
  const [users, setUsers] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      phone: "123-456-7890"
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      age: 40,
      phone: "555-123-4567"
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      age: 40,
      phone: "555-123-4567"
    }
])

const getUsers = async () => {
  const response = await axios.get('http://localhost:8080/');
  console.log(response);
  setUsers(response.body)
}


const handleSubmit = (e) => {
  e.preventDefault();
  const newUser = {
    firstName: firstName,
    lastName: lastName,
    age: Number(age),
    phoneNumber: phoneNumber
  }
  axios.post('http://localhost:8080/addUser', newUser)
  .then(function (response) {
    console.log(response);
    getUsers();
  })
  .catch(function (error) {
    console.log(error);
  });
}


useEffect(() => {
  getUsers()
}, [])


  return (
    <>
     <div className="overflow-x-auto">
      <h1 className="text-center my-3 text-2xl" >Users</h1>
      <h1 className="text-center my-3 text-xl" >Add user</h1>
      <form onSubmit={e => handleSubmit(e)} className="rounded-lg my-3 border-neutral-600 p-6 border-2 max-w-3xl flex flex-col justify-center items-center mx-auto" method="post">
        {/*First name */}
      <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">First name</span>
      </label>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
        {/*Last name */}
      <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Last name</span>
      </label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
        {/*Age */}
      <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Age</span>
      </label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
       {/* Phone */}
      <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Phone number</span>
      </label>
        <input type="text" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <button className="btn btn-neutral mt-3" type="submit">Submit</button>
      </form>

      {/* table */}
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Age</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      { users && users.map((user, id) => {
        return <User user={user} key={id}/>
      }) }
    </tbody>
  </table>
</div>
    </>
  )
}

export default App
