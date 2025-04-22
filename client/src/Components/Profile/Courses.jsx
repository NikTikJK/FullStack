import HeaderProfile from "./Usable/HeaderProfile";
import "./Courses.css";
import { useState, useEffect } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [subscribes, setSubscribes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Ошибка парсинга пользователя:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");

        if (!response.ok) {
          alert("Ошибка при загрузке курсов");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        alert(err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          alert("Пользователь не авторизован");
          return;
        }

        const user = JSON.parse(userData);
        const res = await fetch(
          `http://localhost:5000/api/subscribe?userId=${user.id}`
        );

        if (!res.ok) {
          alert("Ошибка при загрузке подписок");
          return;
        }

        const data = await res.json();
        const courseIds = data.map((item) => item.course_id);

        console.log(courseIds);
        setSubscribes(courseIds);
      } catch (err) {
        alert(err);
      }
    };

    fetchSubscriptions();
  }, []);

  const createSubscribe = async (userId, courseId) => {
    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          courseId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при подписке");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  };

  return (
    <>
      <HeaderProfile />
      <div className="courses-container">
        <h2>Доступные курсы</h2>

        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>Преподаватель: {course.user_id}</p>
              <p>Длительность: {course.duration}</p>
              <button
                className={
                  subscribes.includes(course.id) ? "continue-btn" : "enroll-btn"
                }
                onClick={() => {
                  if (!subscribes.includes(course.id)) {
                    createSubscribe(user.id, course.id);
                    setSubscribes([...subscribes, course.id]);
                  } else {
                    console.log("continiue");
                    
                  }
                }}
              >
                {subscribes.includes(course.id) ? "Продолжить" : "Записаться"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
