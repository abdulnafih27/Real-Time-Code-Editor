import React, { useEffect, useRef, useState } from "react";
import "./editor.css";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../socket";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null)
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  useEffect(() => {
    // Use a stable identifier like `roomId` to avoid unnecessary re-renders
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      const handleError = (e) => {
        console.log("Socket Error : ", e);
        toast.error("Socket Connection Failed!");
        navigate("/");
      };
      socketRef.current.emit("join", {
        roomId,
        username: location.state?.name,
      });

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.name) {
          toast.success(`${username} joined`);
        }
        else{
          if(clients.length === 1){
            toast.success(`Room Created`)
          }
          else {
            toast.success('Room Joined')
          }
        }
        setClients(clients);
        socketRef.current.emit('sync-code', {
          code : codeRef.current,
          socketId
        })
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} Left`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []);

  const [clients, setClients] = useState([]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      toast.success(`Room ID Copied`)
    } catch (error) {
      toast.error(`Unable to Copy Room Id`)
    }
  };

  const leaveRoom = () => {
    navigate('/')
  }
  return (
    <div className="container">
      <div className="sidebar">
        <h2>CODECAST</h2>
        <hr className="hr-style" />
        <div className="clients">
          {clients.map((client) => (
            <Client key={client.socketId} name={client.username} />
          ))}
        </div>
        <hr className="hr-style" />
        <div className="sidebar-btn">
          <button onClick={copyRoomId} className="btn-success">Copy Room ID</button>
          <button onClick = {leaveRoom} className="btn-failure" >
            Leave Room
          </button>
        </div>
      </div>
      <div className="code-editor">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange = {(code) => codeRef.current = code}/>
      </div>
    </div>
  );
};

export default EditorPage;
