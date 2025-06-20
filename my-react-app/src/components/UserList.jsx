function UserList({ users }) {
  return (
    <ul className="user-list">
      {users.map((user, index) => (
        <li key={index}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
export default UserList;