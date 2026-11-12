
import { useState } from 'react';
import data from './data/users';
import './App.css';

function App() {
  const [users, setUsers] = useState(data);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  const [editId, setEditId] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    //Their name attribute tells us which property to update.

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      role: '',
      status: ''
    });
    setEditId(null);
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setEditId(user.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  // 1. Set existing user details into form
  // 2. Store selected user's ID
  };

  const handleDelete = (id) => {
  // 1. Ask for confirmation
  // 2. If cancelled, stop the function
  // 3. Remove selected user from users state
  // 4. If this user is being edited, reset the form
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) return;

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
    if (editId === id) {
      resetForm();
    }
  };

//   e represents the event object.  
// Whenever an event happens in JavaScript or React, React provides information about that event through this object.
// - Clicking a button → click event.
// - Typing in an input → change event.
// - Submitting a form → submit event.


//preventDefault() prevents the browser's default behaviour for an event. We use it in React forms to prevent an unwanted page reload during form submission.

  const handleSubmit = (e) => {
  // 1. Prevent default form submission
  // 2. Check whether editId exists
  // 3. If editing, update the matching user
  // 4. Otherwise, create a new user
  // 5. Reset form and editId
    e.preventDefault();

    if (editId !== null) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editId
            ? { ...user, ...form }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        ...form
      };

      setUsers((prev) => [...prev, newUser]);
    }

    resetForm();
  };

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p>Manage your team members in one place.</p>
        </div>
        <span className="user-count">
          Total Users: {users.length}
        </span>
      </header>

      <main>
        <section className="form-card">
          <h2>{editId !== null ? 'Edit User' : 'Add New User'}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  value={form.name}
                  placeholder='Enter the name'
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              {editId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

              <button type="submit" className="submit-btn">
                {editId !== null ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>Team Members</h2>
              <p>View and manage all registered users.</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td className="user-name">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.status.toLowerCase() === 'active'
                              ? 'active'
                              : 'inactive'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No users found. Add your first user!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        User Management Dashboard
      </footer>
    </div>
  );
}

export default App;
