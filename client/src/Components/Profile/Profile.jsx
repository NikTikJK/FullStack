import HeaderProfile from "./Usable/HeaderProfile";
import "./Profile.css";
import UserUpdateModal from "./Usable/UserUpdateModal";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) throw new Error('Ошибка обновления');
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось сохранить изменения');
    }
  };

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

  return (
    <>
      <HeaderProfile />
      <main className="profile-content">
        <div className="profile-header">
          <div className="avatar-container">
            <img src={user.photo} alt="Аватар" className="profile-avatar" />
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{user.login}</h1>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Редактировать профиль
              </button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>кол во</h3>
            <p>Завершенных курсов</p>
          </div>
          <div className="stat-card">
            <h3>кол во</h3>
            <p>Курсов в процессе</p>
          </div>
          <div className="stat-card">
            <h3>кол во</h3>
            <p>Достижений</p>
          </div>
        </div>
        {isModalOpen && (
          <UserUpdateModal
            user={user}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdate}
          />
        )}
      </main>
    </>
  );
}

export default Profile;
