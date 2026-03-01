import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const loginHandler = () => setIsLoggedIn(true);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const addExpense = (exp) => {
    setExpenses([exp, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const editExpense = (data) => {
    setEditData(data);
  };

  const updateExpense = (updated) => {
    const updatedList = expenses.map((e) =>
      e.id === updated.id ? updated : e
    );
    setExpenses(updatedList);
    setEditData(null);
  };

  if (!isLoggedIn) return <Login onLogin={loginHandler} />;

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onAdd={addExpense}
        editData={editData}
        onUpdate={updateExpense}
        onLogout={logoutHandler}
      />

      <ExpenseList
        items={expenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />
    </div>
  );
}

export default App;