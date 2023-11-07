import classes from './Login.module.css';
import {Link} from "react-router-dom";
import ButtonPrimary from "../../components/UI/ButtonPrimary.tsx";
import logo from "../../assets/images/compass-uol-logo.png";

function Login() {
    async function requestToken() {
        try {
            const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
                },
            });

            const resData = await response.json();
            const {request_token} = resData;
            window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/approved`;
        } catch (e: any) {
            throw new Error(e.statusText);
        }
    }

    return (
        <div className={classes.background}>
            <div className={classes.login}>
                <h1>Compass Video</h1>

                <h3>Acesse sua conta para ver nossos títulos</h3>
                <ButtonPrimary onClick={requestToken}>Iniciar sessão com TMDB</ButtonPrimary>

                <div className={classes['guest-login']}>
                    <p className={'body-small'}>Não tem conta?</p>
                    <Link className={'body-small'} to={'/approved'}>Acesse como convidado</Link>
                </div>

                <img src={logo} alt="logo"/>
            </div>
        </div>
    );
}

export default Login;

