import { FiAlertCircle } from 'react-icons/fi';
import "./FormErrors.css"

const FormError = ({error}) => {
    return (
        <li className="session-errors"><FiAlertCircle className='alert'/> {error}</li>
    )
}

export default FormError;