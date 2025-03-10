import React from 'react';
import './main.css';

function Main() {
  return (
    <main className="main-content">
      <section className="hero">
        <h2>Welcome to Our Website</h2>
        <p>This is the main content area of the website.</p>
        <button className="cta-button">Learn More</button>
      </section>
      
      <section className="features">
        <div className="feature">
          <h3>Feature 1</h3>
          <p>Description of feature 1 goes here.</p>
        </div>
        <div className="feature">
          <h3>Feature 2</h3>
          <p>Description of feature 2 goes here.</p>
        </div>
        <div className="feature">
          <h3>Feature 3</h3>
          <p>Description of feature 3 goes here.</p>
        </div>
      </section>
    </main>
  );
}

export default Main;
