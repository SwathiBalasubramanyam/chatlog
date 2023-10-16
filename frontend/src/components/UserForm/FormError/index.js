import { FiAlertCircle } from 'react-icons/fi';
import "./FormError.css"

const FormError = ({error}) => {
    return (
        <li className="session-errors"><FiAlertCircle className='alert'/> {error}</li>
    )
}

export default FormError;