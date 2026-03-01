import React from "react";

function ExpenseList({ items, onDelete, onEdit }) {
  if (items.length === 0) return <p>No expenses</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((e) => (
          <tr key={e.id}>
            <td>{e.title}</td>
            <td>₹{e.amount}</td>
            <td>{e.date}</td>
            <td>
              <button onClick={() => onEdit(e)}>Edit</button>
              <button onClick={() => onDelete(e.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;