import React from "react";

const footer = () => {
  return (
    <div>
      <div className="grid grid-flow-col">
        <div className="footer-nav">
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms">Terms & Conditions</a> |
          <a href="/accessibility">Accessibility</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default footer;
