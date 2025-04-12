
import PropTypes from 'prop-types';
import '../../css/modal.css';

const ModalWindow = ({ handleClose, show = false, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

ModalWindow.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default ModalWindow;
