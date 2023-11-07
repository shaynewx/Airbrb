import React from 'react';

function App () {
  return (
    // <>Let&apos;s go!</>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Login />} />
        <Route path="/about" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
