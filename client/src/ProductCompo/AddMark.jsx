import React, { useState } from 'react';
import axios from 'axios';

const AddMark = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    score: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add a new mark
      const response = await axios.post('http://localhost:5000/marks', formData);

      // Handle the response, you can log it or show a success message to the user
      console.log('Mark created successfully:', response.data);

      // Clear the form after successful submission
      setFormData({
        studentId: '',
        subject: '',
        score: '',
      });
    } catch (error) {
      console.error('Error creating mark:', error);
      // Handle errors, you can show an error message to the user
    }
  };

  return (
    <div>
      <h2>Add Mark</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} />
        </label>
        <br />
        <label>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </label>
        <br />
        <label>
          Score:
          <input type="text" name="score" value={formData.score} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Mark</button>
      </form>
    </div>
  );
};

export default AddMark;
