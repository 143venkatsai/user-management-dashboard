import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./index.css"

const  UserForm  = (props) => {
    const { onSubmit, initialData } = props;

    const [formData, setFormData] = useState(
        initialData || { id: "", name: "", email: "", website:"" }
    );
      
        useEffect(() => {
          if (initialData) setFormData(initialData);
        }, [initialData]);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          const newUser = {...formData, id: uuidv4()}
          onSubmit(newUser);
          setFormData({ name: "", email: "", website: "" }); 
        };
      
        return (
            <div className="form-container">
                <img src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" className="form-image" alt="User Form Logo" />
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            name="name"
                            id="name"
                            value={formData.name}
                            placeholder="Enter your name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email:</label>
                        <input
                            name="email"
                            id="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="website">Department:</label>
                        <input
                            name="website"
                            id="website"
                            value={formData.website}
                            placeholder="Enter your department"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="add-btn">Add</button>
                </form>
            </div>
        );
}

export default UserForm;
