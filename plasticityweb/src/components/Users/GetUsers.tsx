import { useEffect, useState } from "react";

const GetUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const listItems = data.map((d: any) => <li key={d.id}>{d.firstName}</li>);
        setUsers(listItems);
      });
  }, []);

  return <div>{users} </div>;
};

export default GetUsers;
