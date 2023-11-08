import classes from './Login.module.css';
import {Link} from "react-router-dom";
import ButtonPrimary from "../../components/UI/ButtonPrimary.tsx";
import logo from "../../assets/images/compass-uol-logo.png";
import {requestToken} from "../../api/Login.ts";

function Login() {
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

