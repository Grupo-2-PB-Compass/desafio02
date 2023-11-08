import classes from './Button.module.css';

function ButtonOutlined(props: any) {
    return (
        <button className={classes.button + ' ' + classes['button-outlined']} {...props}>{props.children}</button>
    )
}

export default ButtonOutlined;