import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const API = "http://127.0.0.1:5000";

  // 🔓 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // 📥 Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

  // ➕ Add task (FIXED)
  const addTask = async () => {
    if (!title || !deadline) return alert("Fill all fields");

    try {
      const res = await axios.post(
        `${API}/api/tasks`,
        { title, status: "pending", deadline },
        { headers: { Authorization: token } }
      );

      // ✅ Instant UI update
      setTasks(prev => [...prev, res.data]);

      setTitle("");
      setDeadline("");

    } catch (err) {
      console.log(err);
    }
  };

  // ✏️ Mark as done
  const markDone = async (id) => {
    try {
      await axios.put(
        `${API}/api/tasks/${id}`,
        { status: "done" },
        { headers: { Authorization: token } }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
        headers: { Authorization: token }
      });

      // Optional instant UI update
      setTasks(prev => prev.filter(t => t._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  // 📊 Stats
  const completed = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => new Date(t.deadline) < new Date() && t.status !== "done"
  ).length;

  return (
    <div style={{
      minHeight: "100vh",
      padding: "30px"
    }}>

      {/* 🧭 Navbar */}
      <div style={{
        background: "white",
        padding: "15px 20px",
        borderRadius: "10px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ margin: 0 }}>🚀 Task Manager</h2>

        <button onClick={logout} style={{
          background: "#ff4d4d",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Logout
        </button>
      </div>

      {/* 📊 Stats */}
      <div style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px"
      }}>
        {[
          { label: "Total", value: tasks.length },
          { label: "Done", value: completed },
          { label: "Overdue", value: overdue }
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1,
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* ➕ Add Task */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h3>Add Task</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button onClick={addTask} style={{
            background: "#1976d2",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
            Add
          </button>
        </div>
      </div>

      {/* 📋 Tasks */}
      <div>
        <h3 style={{ color: "white" }}>Your Tasks</h3>

        {tasks.length === 0 ? (
          <p style={{ color: "white" }}>No tasks yet...</p>
        ) : (
          tasks.map(t => (
            <div key={t._id} style={{
              background: "white",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >

              <div>
                <b>{t.title}</b><br/>
                <small>{t.deadline?.slice(0,10)}</small>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => markDone(t._id)} style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}>
                  Done
                </button>

                <button onClick={() => deleteTask(t._id)} style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}>
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;