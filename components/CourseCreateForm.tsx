// components/CourseCreateForm.tsx
import { useState } from "react";

const CourseCreateForm = () => {
  const [course, setCourse] = useState({
    title: "",
    ImageSrc: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (res.ok) {
        alert("Course created successfully!");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("Error: Unable to create course");
      console.error("Error creating course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={course.title}
        onChange={(e) => setCourse({ ...course, title: e.target.value })}
        placeholder="Course Title"
        required
      />
      <input
        type="text"
        value={course.ImageSrc}
        onChange={(e) => setCourse({ ...course, ImageSrc: e.target.value })}
        placeholder="Image Source"
        required
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseCreateForm;
