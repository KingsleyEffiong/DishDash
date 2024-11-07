import PropTypes from "prop-types";


Modal.propTypes = {
  children: PropTypes.string.isRequired, 
  className:PropTypes.string
  };


function Modal({children, className}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Modal
