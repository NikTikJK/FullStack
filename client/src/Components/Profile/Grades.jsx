import HeaderProfile from "./Usable/HeaderProfile";
import "./Grades.css";
import { useEffect, useState } from "react";

function Grades() {
  const [user, setUser] = useState([])
  const [userCourses, setUserCourses] = useState([])
  const defaultGrades = [
    {
      id: 1,
      user: {
        name: "Иван Иванов",
        avatar: "https://i.imgur.com/JqYeJYt.png",
      },
      teacher: {
        name: "Петр Петров",
        avatar: "https://i.imgur.com/8Km9tLL.png",
      },
      course: {
        title: "React для начинающих",
        category: "Frontend разработка",
      },
      grade: 85,
      date: "2023-05-15",
    },
    {
      id: 2,
      user: {
        name: "Иван Иванов",
        avatar: "https://i.imgur.com/JqYeJYt.png",
      },
      teacher: {
        name: "Анна Смирнова",
        avatar: "https://i.imgur.com/YqQqJYt.png",
      },
      course: {
        title: "JavaScript продвинутый",
        category: "Программирование",
      },
      grade: 92,
      date: "2023-06-20",
    },
  ];

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
  

  const gradesData = defaultGrades;

  const getGradeColor = (grade) => {
    if (grade >= 90) return "#4CAF50";
    if (grade >= 75) return "#8BC34A";
    if (grade >= 60) return "#FFC107";
    return "#F44336";
  };

  return (
    <>
      <HeaderProfile />
      <div className="grades-container">
        <h1 className="grades-title">Мои оценки</h1>

        <div className="grades-filters">
          <select className="filter-select">
            <option value="all">Все курсы</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
          <select className="filter-select">
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="highest">По наивысшей оценке</option>
            <option value="lowest">По наименьшей оценке</option>
          </select>
        </div>

        <div className="grades-list">
          {gradesData.map((gradeItem) => (
            <div key={gradeItem.id} className="grade-card">
              <div className="grade-header">
                <div className="course-info">
                  <h3 className="course-title">{gradeItem.course.title}</h3>
                  <span className="course-category">
                    {gradeItem.course.category}
                  </span>
                </div>
                <div
                  className="grade-badge"
                  style={{ backgroundColor: getGradeColor(gradeItem.grade) }}
                >
                  {gradeItem.grade}
                </div>
              </div>

              <div className="grade-body">
                <div className="person-info">
                  <img
                    src={gradeItem.user.avatar}
                    alt="User"
                    className="person-avatar"
                  />
                  <div className="person-details">
                    <span className="person-role">Студент</span>
                    <span className="person-name">{gradeItem.user.name}</span>
                  </div>
                </div>

                <div className="person-info">
                  <img
                    src={gradeItem.teacher.avatar}
                    alt="Teacher"
                    className="person-avatar"
                  />
                  <div className="person-details">
                    <span className="person-role">Преподаватель</span>
                    <span className="person-name">
                      {gradeItem.teacher.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grade-footer">
                <span className="grade-date">
                  {new Date(gradeItem.date).toLocaleDateString()}
                </span>
                <button className="details-button">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="takegrade-container">
        <h1>Мои курсы</h1>
      </div>
    </>
  );
}

export default Grades;
