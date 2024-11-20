import "./index.css"

const UserList = (props) => {
    const { users, onEdit, onDelete } = props

    return (
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <p className="name"><span>Name: </span>{user.name}</p>
            <p className="email"><span>Email: </span>{user.email}</p>
            <p className="department"><span>Department: </span>{user.website}</p>
            <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
            <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  export default UserList