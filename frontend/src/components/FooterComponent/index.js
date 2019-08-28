import React from "react";

const FooterComponent = () => (
  <footer>
    <section className="footer-contents">
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-6 col-sm-12">
            <p className="copyright-text">
              <a href="http://github.com/rafaelpenczkoski">github.com/rafaelpenczkoski</a>
            </p>
          </div>
          <div className="col-md-6 col-sm-12 text-right">
            <div className="footer-nav">
              <nav>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/register">Join</a></li>
                  <li><a href="/about_us">About</a></li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
);

export default FooterComponent;
