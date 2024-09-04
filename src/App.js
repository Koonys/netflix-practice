import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";



//홈페이지
//전체 영화페이지
//영화 디테일페이지
function App() {
  return (
    <Routes>
      <Route path={'/'} element={<AppLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path={'movies'}>
           <Route index element={<MoviePage/>}/>
           <Route path={':id'} element={<MovieDetailPage/>}/>
        </Route>
        <Route path={'/movies'} element={<MoviePage/>}/>
        <Route path={'/movies/:id'} element={<MovieDetailPage/>}/>
      </Route>
      <Route path={'*'} element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
