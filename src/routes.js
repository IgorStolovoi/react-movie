import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Movies from "./pages/Movies";
import MovieInfo from "./pages/MovieInfo";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Error from "./components/Error/Error";
import About from "./components/About/About";
export const allRoutes = [
  { path: "/", component: <About /> },
  { path: "/*", component: <Error /> },
  { path: "/movies", component: <Movies />, isPrivate: true },
  { path: "/movie/:id", component: <MovieInfo />, isPrivate: true },
  { path: "/favorites", component: <Favorites />, isPrivate: true },
  { path: "/profile", component: <Profile />, isPrivate: true },
  { path: "/login", component: <LoginForm /> },
  { path: "/registration", component: <RegistrationForm /> },
];
