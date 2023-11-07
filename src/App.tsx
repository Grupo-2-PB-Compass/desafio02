import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home/Home.tsx";
import Actors from "./pages/Actors";
import TvShows from "./pages/TvShows";
import Movie from "./pages/Movies/Movie.tsx";
import Collections from "./pages/Collections";
import Search from "./pages/Search/Search.tsx";
import MyList from "./pages/MyList";
import PrivateRoute from "./private-routes/PrivateRoute.tsx";
import Approved from "./pages/Login/approved.tsx";


function App() {
  return (
          <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/approved" element={<Approved />} />
                <Route path="/" element={<PrivateRoute component={Home} />} />
                <Route path="/actors" element={<PrivateRoute component={Actors} />} />
                <Route path="/tvshows" element={<PrivateRoute component={TvShows} />} />
                <Route path="/movies" element={<PrivateRoute component={Movie} />} />
                <Route path="/collections" element={<PrivateRoute component={Collections} />} />
                <Route path="/search" element={<PrivateRoute component={Search} />} />
                <Route path="/mylist" element={<PrivateRoute component={MyList} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
