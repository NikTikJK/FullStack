import "./Category.css"

function Category() {
  return (
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Популярные направления</h2>
        <p class="section-subtitle">Выберите интересующую вас область знаний</p>

        <div class="categories-grid">
          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                alt="Веб-разработка"
              />
            </div>
            <h3 class="category-title">Веб-разработка</h3>
            <p class="category-courses">24 курса</p>
          </div>

          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
                alt="Мобильная разработка"
              />
            </div>
            <h3 class="category-title">Мобильные приложения</h3>
            <p class="category-courses">18 курсов</p>
          </div>

          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2620/2620903.png"
                alt="Data Science"
              />
            </div>
            <h3 class="category-title">Data Science</h3>
            <p class="category-courses">15 курсов</p>
          </div>

          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/423/423092.png"
                alt="Дизайн"
              />
            </div>
            <h3 class="category-title">Дизайн</h3>
            <p class="category-courses">22 курса</p>
          </div>

          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3573/3573174.png"
                alt="Маркетинг"
              />
            </div>
            <h3 class="category-title">Маркетинг</h3>
            <p class="category-courses">12 курсов</p>
          </div>

          <div class="category-card">
            <div class="category-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1998/1998664.png"
                alt="Бизнес"
              />
            </div>
            <h3 class="category-title">Бизнес</h3>
            <p class="category-courses">9 курсов</p>
          </div>
        </div>

        <button class="view-all-btn">Все категории →</button>
      </div>
    </section>
  );
}

export default Category;
