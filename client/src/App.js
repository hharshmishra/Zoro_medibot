import './App.css';
import '../src/normal.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat.js';
import { Firstpage } from './FirstPage';


function App() {
return (
  <div>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Firstpage />} />
  <Route path="/Chat" element={<Chat />} />
</Routes>
</BrowserRouter>
  </div>
)
  
}




export default App;
