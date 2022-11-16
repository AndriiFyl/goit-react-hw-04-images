// ХУКИ
import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  const closeByEscape = event => {
    if (event.keyCode === 27) {
      props.closeModal();
    }
  };

  // метод класа для натискання по Esc
  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
  }, []);

  return createPortal(
    <div
      className={css.Overlay}
      onClick={event => {
        if (event.target === event.currentTarget) {
          props.closeModal();
        }
      }}
    >
      <div className={css.Modal}>
        <img src={props.modalImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

// Класс-компонент VERSION-------------------------------------------------
// import { Component } from 'react';
// import css from './Modal.module.css';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
//   closeByEscape = event => {
//     if (event.keyCode === 27) {
//       this.props.closeModal();
//     }
//   };

//   // метод класа для натискання по Esc
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeByEscape);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeByEscape);
//   }

//   render() {
//     const { closeModal, modalImage } = this.props;
//     return createPortal(
//       <div
//         className={css.Overlay}
//         onClick={event => {
//           if (event.target === event.currentTarget) {
//             closeModal();
//           }
//         }}
//       >
//         <div className={css.Modal}>
//           <img src={modalImage} alt="" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
