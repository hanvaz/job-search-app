export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Job Search</h3>
          <p>Ứng dụng tìm việc làm cho sinh viên</p>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <ul>
            <li><a href="mailto:info@jobsearch.com">Email</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#">Hướng dẫn</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Điều khoản</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Job Search. All rights reserved.</p>
      </div>
    </footer>
  );
}
