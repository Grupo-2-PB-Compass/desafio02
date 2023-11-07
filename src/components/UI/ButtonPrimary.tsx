import styles from './Button.module.css';

function ButtonPrimary(props: any) {
    return (
        <button className={'body-regular ' + styles['button-primary']} {...props}>{props.children}</button>
    )
}

export default ButtonPrimary;