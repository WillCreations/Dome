import React from "react";
import { Link } from "react-router-dom";

const Table = ({ many, Toggle }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {many.map((one, index) => {
            return (
              <tr key={index}>
                <td className="firstCol">{index + 1}</td>
                <td className="firstCol">{one.name}</td>
                <td>{one.email}</td>
                <td className={one.admin ? "Admin" : "lastCol"}>
                  <button
                    onClick={() => {
                      Toggle(one._id, one.admin);
                    }}
                  >
                    change
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
