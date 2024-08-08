import React, { useState, useEffect } from "react";
import image from "./std.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProfileManager = () => {
  const [student, setStudent] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    education: [],
    courses: [],
  });
  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    education: null,
    courses: null,
  });

  useEffect(() => {
    fetch("http://localhost:8080/student")
      .then((response) => response.json())
      .then((data) => {
        setStudent({
          personalInfo: data.personalInfo || {
            name: "",
            email: "",
            phone: "",
            address: "",
          },
          education: data.education || [],
          courses: data.courses || [],
        });
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => {
      const updatedStudent = { ...prevStudent };
      if (section === "personalInfo") {
        updatedStudent.personalInfo[name] = value;
      } else if (section === "education") {
        updatedStudent.education[index][name] = value;
      } else if (section === "courses") {
        updatedStudent.courses[index][name] = value;
      }
      return updatedStudent;
    });
  };

  const handleSave = () => {
    fetch("http://localhost:8080/student", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setIsEditing({
          personalInfo: false,
          education: null,
          courses: null,
        });
      })
      .catch((error) => console.error("Error saving student data:", error));
  };

  const handleCancelClick = () => {
    setIsEditing({
      personalInfo: false,
      education: null,
      courses: null,
    });
  };

  const handleEditClick = (section, index = null) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [section]: index,
    }));
  };

  const addEducation = () => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      education: [
        ...prevStudent.education,
        { degree: "", institution: "", year: "" },
      ],
    }));
    handleEditClick("education", student.education.length);
  };

  const deleteEducation = (index) => {
    setStudent((prevStudent) => {
      const updatedEducation = prevStudent.education.filter(
        (_, i) => i !== index
      );
      return { ...prevStudent, education: updatedEducation };
    });
  };

  const addCourse = () => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      courses: [...prevStudent.courses, { courseName: "", instructor: "" }],
    }));
    handleEditClick("courses", student.courses.length);
  };

  const deleteCourse = (index) => {
    setStudent((prevStudent) => {
      const updatedCourses = prevStudent.courses.filter((_, i) => i !== index);
      return { ...prevStudent, courses: updatedCourses };
    });
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light d-flex flex-column align-items-center">
        <a className="navbar-brand" href="/">
          <img src={image} width="30" height="30" alt="Logo" />
          <h3 className="ms-3">Profile Manager</h3>
        </a>
      </nav>

      <div className="card m-4">
        <h5 className="card-title ms-3">Personal Information</h5>
        <div className="card-body">
          {isEditing.personalInfo ? (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                placeholder="Name"
                value={student.personalInfo.name}
                onChange={(e) => handleChange(e, "personalInfo")}
              />
              <input
                type="email"
                className="form-control mb-2"
                name="email"
                placeholder="Email"
                value={student.personalInfo.email}
                onChange={(e) => handleChange(e, "personalInfo")}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="phone"
                placeholder="Phone"
                value={student.personalInfo.phone}
                onChange={(e) => handleChange(e, "personalInfo")}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="address"
                placeholder="Address"
                value={student.personalInfo.address}
                onChange={(e) => handleChange(e, "personalInfo")}
              />
              <button className="btn btn-primary mt-3" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary mt-3 ml-2"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p>Name: {student.personalInfo.name || "N/A"}</p>
              <p>Email: {student.personalInfo.email || "N/A"}</p>
              <p>Phone: {student.personalInfo.phone || "N/A"}</p>
              <p>Address: {student.personalInfo.address || "N/A"}</p>
              <div className="m-4">
                {!isEditing.personalInfo &&
                  isEditing.education === null &&
                  isEditing.courses === null && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing({ personalInfo: true })}
                    >
                      Edit Profile
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card m-4">
        <h5 className="card-title ms-3">Education</h5>
        <div className="card-body">
          {student.education.length > 0 ? (
            student.education.map((edu, index) => (
              <div key={index} className="mb-3">
                {isEditing.education === index ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="degree"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, "education", index)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="institution"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleChange(e, "education", index)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="year"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleChange(e, "education", index)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary mt-2 ml-2"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Degree: {edu.degree || "N/A"}</p>
                    <p>Institution: {edu.institution || "N/A"}</p>
                    <p>Year: {edu.year || "N/A"}</p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditClick("education", index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => deleteEducation(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No education data available.</p>
          )}
          <button className="btn btn-secondary mt-2" onClick={addEducation}>
            Add Education
          </button>
        </div>
      </div>

      <div className="card m-4">
        <h5 className="card-title ms-3">Courses</h5>
        <div className="card-body">
          {student.courses.length > 0 ? (
            student.courses.map((course, index) => (
              <div key={index} className="mb-3">
                {isEditing.courses === index ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="courseName"
                      placeholder="Course Name"
                      value={course.courseName}
                      onChange={(e) => handleChange(e, "courses", index)}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="instructor"
                      placeholder="Instructor"
                      value={course.instructor}
                      onChange={(e) => handleChange(e, "courses", index)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary mt-2 ml-2"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>Course Name: {course.courseName || "N/A"}</p>
                    <p>Instructor: {course.instructor || "N/A"}</p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditClick("courses", index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => deleteCourse(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No course data available.</p>
          )}
          <button className="btn btn-secondary mt-2" onClick={addCourse}>
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
