import React, { useState, useEffect } from "react";

function ExpenseForm({ onAdd, editData, onUpdate, onLogout }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setAmount(editData.amount);
      setDate(editData.date);
    }
  }, [editData]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    const expense = {
      id: editData ? editData.id : Date.now(),
      title,
      amount,
      date,
    };

    if (editData) {
      onUpdate(expense);
    } else {
      onAdd(expense);
    }

    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Expense"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* CENTER BUTTONS */}
      <div className="btn-center">
        <button>{editData ? "Update" : "Add"}</button>

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;