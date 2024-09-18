import { useEffect, useState } from "react";
import './App.css'; // Importing the CSS file

function App() {

  let [student, setStudent] = useState({});
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);
  let [errors, setErrors] = useState({});

  useEffect(() => {
    let oldList = JSON.parse(sessionStorage.getItem('studentList')) || []
    setList(oldList);
  }, [setList])

  let handleClick = (e) => {
    e.target.style.fontSize = "38px";
    e.target.style.color = "red";
  }

  let handleInput = (e) => {
    let { name, value } = e.target;
    setStudent({ ...student, [name]: value })
  }

  let handleSubmit = (e) => {
    alert("hi")
    e.preventDefault();

    //if (!validateForm()) return;

    let newList;

    if (index !== -1) {
      list[index] = student
      newList = [...list]
      setIndex(-1);
    } else {
      newList = [...list, student];
    }
    setList(newList);
    sessionStorage.setItem('studentList', JSON.stringify(newList));
    setStudent({})
  }

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    sessionStorage.setItem('studentList', JSON.stringify(newList));
  }

  let editData = (pos) => {
    let editStud = list[pos];
    setStudent(editStud);
    setIndex(pos)
  }

  let validateForm = () => {
    let tempErrors = {};
    setErrors(tempErrors);
    if (!student.id) tempErrors.id = "Id is Require";
    if (!student.name) tempErrors.name = "Name is required";
    if (!student.email) tempErrors.email = "Email is required";
    if (!student.password) tempErrors.password = "Password is required";
    if (!student.gender) tempErrors.gender = "Gender is required";
    if (!student.city) tempErrors.city = "City is required";
    if (!student.address) tempErrors.address = "Address is required";
    return Object.keys(tempErrors).length === 0;
  }

  return (
    <div className="app-container">
      <h2 className="header" onClick={(e) => handleClick(e)}>Student Form</h2>
      <form method="post" className="card" onSubmit={(e) => handleSubmit(e)}>
        <table className="form-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="text" name="name" value={student.name ? student.name : ""} onChange={(e) => handleInput(e)} />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="text" name="email" value={student.email ? student.email : ""} onChange={(e) => handleInput(e)} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><input type="submit" value={index !== -1 ? "Edit Data" : "Add Data"} className="submit-btn" /></td>
            </tr>
          </tbody>
        </table>
      </form>

      <br /><br />

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => editData(i)}>Edit</button> &nbsp;
                  <button className="delete-btn" onClick={() => deleteData(i)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App;
