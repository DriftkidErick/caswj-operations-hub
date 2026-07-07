import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Agendas from "./pages/Agendas";
import Events from "./pages/Events";
import Templates from "./pages/Templates";
import People from "./pages/People";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agendas" element={<Agendas />} />
            <Route path="/events" element={<Events />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/people" element={<People />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;