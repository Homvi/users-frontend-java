import { useEffect, useState } from "react"
import User from "./components/User"
import axios from "axios";

function App() {

/* example user */
/*{ firstName:"John",
  lastName:"Doe",
  age: 13,
  phone:"12423443543",
  id:12
  } */

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(20);
  const [phoneNumber, setphoneNumber] = useState("")
  const [users, setUsers] = useState([
  ]);

const getUsers = async () => {
  const response = await axios.get('http://localhost:8080');
  console.log(response);
  setUsers(response.data)
}

const handleSubmit = (e) => {
  e.preventDefault();
  const newUser = {
    firstName: firstName,
    lastName: lastName,
    age: Number(age),
    phone: phoneNumber
  }
  console.log(newUser);
  axios.post('http://localhost:8080/addUser', newUser)
  .then(function (response) {
    console.log("The ersponse is: \n", response);
    getUsers();
  })
  .catch(function (error) {
    console.log(error);
  });
}


useEffect(() => {
  getUsers()
}, [])

const handleDelete =  (id) => {
  console.log(id);
  axios.delete('http://localhost:8080/deleteUser', { data: { id: id } })
  .then(function (response) {
    console.log("The ersponse is: \n", response);
    getUsers();
  })
  .catch(function (error) {
    console.log(error);
  });
}

const handleSaveModifications = async (newUser, id) => {
  console.log("The new user should be: ", newUser);
  console.log("The id is: ", id);
  console.log("The body is: ", {newUser, id:id});
  const res = await axios.put('http://localhost:8080/updateUser', { newUser });
  console.log(res);
  console.log(newUser, id);
  getUsers();
}


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
        <th>Delete</th>
        <th>Modify</th>
      </tr>
    </thead>
    <tbody>
      { users && users.map((user, id) => {
        return <User user={user} saveModifications={handleSaveModifications} deleteUser={handleDelete} key={id}/>
      }) }
    </tbody>
  </table>
</div>
    </>
  )
}

export default App
