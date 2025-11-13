import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Task from './pages/tasksPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}
