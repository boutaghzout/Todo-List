import { useState } from "react";

export default function MyForm() {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    age: "",
    generalInfo: "",
    isStudent: false,
    country: "",
    status: "",
  });

  function handleChecked(event) {
    setFormInput({ ...formInput, isStudent: event.target.checked });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <label>Name:</label>
      <input
        value={formInput.name}
        onChange={(event) => {
          setFormInput({ ...formInput, name: event.target.value });
        }}
      />

      <hr></hr>
      <label>Email:</label>
      <input
        value={formInput.email}
        onChange={(event) => {
          setFormInput({ ...formInput, email: event.target.value });
        }}
      />
      <hr></hr>
      <label>Age:</label>
      <input
        value={formInput.age}
        onChange={(event) => {
          setFormInput({ ...formInput, age: event.target.value });
        }}
      />
      <hr></hr>
      {/* textera */}
      <label>General Info</label>
      <textarea
        onChange={(event) => {
          setFormInput({ ...formInput, generalInfo: event.target.value });
        }}
      >
        {formInput.generalInfo}
      </textarea>
      <hr></hr>
      {/* checkbox */}
      <label>Are You Student</label>
      <input
        type="checkbox"
        checked={formInput.isStudent}
        onChange={handleChecked}
      />
      <hr></hr>
      {/* Select */}
      <label>Your Contries</label>
      <select
        value={formInput.country}
        onChange={(event) => {
          setFormInput({ ...formInput, county: event.target.value });
        }}
      >
        <option>Marrakech</option>
        <option>Rabat</option>
        <option>Casa Blanca</option>
      </select>

      <hr></hr>
      {/* Radio */}
      <div>
        <input
          value="student"
          type="radio"
          name="status"
          checked={formInput.status == "student"}
          onChange={(event) => {
            setFormInput({ ...formInput, status: event.target.value });
          }}
        />
        Student
        <input
          value="teacher"
          type="radio"
          name="status"
          checked={formInput.status == "teacher"}
          onChange={(event) => {
            setFormInput({ ...formInput, status: event.target.value });
          }}
        />
        Teacher
      </div>

      <hr></hr>
      <input type="submit" />
    </form>
  );
}
