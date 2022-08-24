
import { InputHTMLAttributes , TextareaHTMLAttributes} from 'react'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes <HTMLInputElement>{}
// essa tipagem faz ...rest receber todas propriedades do input

interface TextAreaProps extends TextareaHTMLAttributes <HTMLTextAreaElement>{}

export function Input ({...rest}:InputProps ) {
    return (
        <input className={styles.input} {...rest} />
    )
}

export function TextArea ({...rest}: TextAreaProps ) {
    return (
<textarea className={styles.input} {...rest}>

</textarea>

    )
}