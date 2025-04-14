import Category from "./Category.jsx";
import CoursesCarousel from "./CoursesCarousel.jsx";
import Hero from "./Hero.jsx";
import "./Start.css"
import { coursesData } from "../../assets/Courses.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";


function Start() {
  return (
    <>
    <Header />
    <main className="main">
        <Hero />
        <Category />
        <CoursesCarousel courses={coursesData}/>
    </main>
    <Footer />
    </>
    
  );
}

export default Start;
