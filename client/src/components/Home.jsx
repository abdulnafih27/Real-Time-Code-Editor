import React, { useState } from "react";
import "./home.css";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomID, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Room ID is generated");
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomID) {
      toast.error("Enter the room ID");
      return;
    }
    if (!name) {
      toast.error("Provide a Name");
      return;
    }
    navigate(`/editor/${roomID}`, {
      state: { name },
    });
    // toast.success("Room is Created");
  };
  return (
    <>
      <div className="home-main">
        <form className="home-container">
          <h3>Enter the Room ID</h3>
          <div className="home-input">
            <input
              type="text"
              placeholder="ROOM ID"
              value={roomID}
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <button onClick={joinRoom}>Join Room</button>
          <p>
            Don't have a room ID? <a onClick={generateRoomId}>New Room</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Home;
