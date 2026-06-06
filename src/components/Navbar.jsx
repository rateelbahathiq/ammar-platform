import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">عمار</div>

      <ul className="nav-links">
        <li>الرئيسية</li>
        <li>الشركات الهندسية</li>
        <li>شركات المقاولات</li>
        <li>مواد البناء</li>
      </ul>

      <div className="nav-buttons">
        <button className="login-btn">
          تسجيل الدخول
        </button>

        <button className="start-btn">
          ابدأ الآن
        </button>
      </div>
    </nav>
  );
}

export default Navbar;