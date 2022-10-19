import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-sandwich">
        <div className="array-logo">ARRA<span>y</span></div>
        <section className="legal-text-wrapper">
          <p>
            © 2022 Array Corporation.
            Solar is a fullstack clone of <a href="https://store.steampowered.com/">Steam</a>.
            All trademarks are property of their respective owners in the US and other countries.
            This is for all the good times, and to many more.
          </p>
        </section>
        <div className="footer-solar-logo">
          <i className="fa-solid fa-sun" />
          <h1>Solar</h1>
        </div>
      </div>
      <div className="footer-links">
        <span>
          <p>Tech Stack</p> |
          <a href="https://reactjs.org/">React</a> |
          <a href="https://react-redux.js.org/">Redux</a> |
          <a href="https://aws.amazon.com/s3/">AWS S3</a> |
          <a href="https://rubyonrails.org/">Ruby on Rails</a> |
          <a href="https://www.postgresql.org/">PostgreSQL</a>
        </span>
        <span>
          <p>Get In Touch</p> |
          <a href="https://www.linkedin.com/in/fchien">
            <i class="fa-brands fa-linkedin" />
            @fchien
          </a> |
          <a href="https://github.com/fredchien3">
            <i className="fa-brands fa-square-github" />
            Github
          </a> |
          <a href="mailto: fred.chien3@gmail.com">
            <i className="fa-regular fa-envelope" />
            Email
          </a>
        </span>
      </div>
    </footer>
  )
}