import PropTypes from "prop-types";


Modal.propTypes = {
  children: PropTypes.string.isRequired, 
  };


function Modal({children}) {
    return (
        <div className="w-[250px] h-auto p-3 bg-[var(--whitebeige)] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-3xl">
            {children}
        </div>
    )
}

export default Modal
