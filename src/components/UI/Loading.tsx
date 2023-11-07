import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes["loading-circle"]}>
            <div className={classes.circle}>
            </div>
        </div>
    );
};

export default Loading;
