import React from 'react';
import './Header.css';
import logo from './iithlogo_long.png';

function Header() {
  return (
    <header className="header">
      <div class= "left_alignStuff">
        <img src={logo} alt="Logo" className="logo" />
        <h1 class = "heading">SDQS: Senate Documents Query System</h1>
      </div>
      <nav>
        <ul>
          <li><a href="https://iith.ac.in/about/aboutiith/">About IITH</a></li>
          <li><a href="https://ai.iith.ac.in/pdf/20200306-Academics-Handbook.pdf">Academic Handbook</a></li>
          <li><a href="https://iith.ac.in/assets/files/pdf/Academic_options.pdf">Academic Options</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;