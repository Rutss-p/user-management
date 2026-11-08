import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import data from './data/users'
import './App.css'
function App() {

  const [users, setUsers] = useState(data);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });
  const [editId, setEditId] = useState(null);

  // e.target gives you the input element.
  // name identifies which field changed.
  // value gives you the entered value.
  // [name]: value dynamically updates that particular property.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = (users) => {
    setForm({
      name: users.name,
      email: users.email,
      role: users.role,
      status: users.status
    })

    setEditId(users.id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsers = {
      id: users.length + 1,
      ...form
    }
    setUsers((prev) => [...prev, newUsers])

    setForm({
      name: "",
      email: "",
      role: "",
      status: ""
    })
  }


  console.log(users)
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>email</th>
              <th>role</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        <input
          type='text'
          name='role'
          value={form.role}
          onChange={handleChange}
        />
        <input
          type='text'
          name='status'
          value={form.status}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>

      </form>
    </>
  )
}

export default App
