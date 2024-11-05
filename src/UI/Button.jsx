import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes.string.isRequired, 
  className:PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
  };


function Button({children, className ="", onClick}) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
