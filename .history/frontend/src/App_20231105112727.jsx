import React from 'react';

function App () {
  return (
    // <>Let&apos;s go!</>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;
