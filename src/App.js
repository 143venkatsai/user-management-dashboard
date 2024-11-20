import React, {useEffect, useState} from "react";
import axios from "axios";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      setUsers([...users, { ...newUser, id: response.data.id }]);
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUser(null); 
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
      <div className="app-container">
        <h1>User Management Dashboard</h1>

        {error && <p className="error-msg">{error}</p>}

        <h2>{editingUser ? "Edit User" : "User Form"}</h2>
        <UserForm
          onSubmit={editingUser ? updateUser : addUser}
          initialData={editingUser}
        />

        <h2>Users Data</h2>
        <UserList
          users={users}
          onEdit={(user) => setEditingUser(user)}
          onDelete={deleteUser}
        />
      </div>
  );
}

export default App;