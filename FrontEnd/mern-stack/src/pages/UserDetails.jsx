import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Table from "../components/Table";
const url = import.meta.env.VITE_API_URL;

const UserDetails = () => {
  const { id } = useParams();
  const [single, setSingle] = useState({});
  const [many, setMany] = useState([]);
  const { session } = useAuthContext();

  const Toggle = async (userId, boolean) => {
    let send = !boolean;
    console.log("send: ", send);

    const response = await fetch(`${url}/api/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ admin: send }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      Populate();
    }

    const data = await response.json();
  };

  const Details = async () => {
    try {
      const response = await fetch(`${url}/api/user/${id}`);
      const json = await response.json();

      setSingle(json);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    Details();
  }, []);

  const Populate = async () => {
    try {
      const response = await fetch(`${url}/api/user`);
      const json = await response.json();
      setMany([...json]);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    Populate();
  }, []);

  return (
    <div>
      <h1>Hello {single.name}!</h1>
      <h2>{single.email}</h2>
      <div className="tcontent">
        {session?.user.admin && <Table many={many} Toggle={Toggle} />}
      </div>
    </div>
  );
};

export default UserDetails;
