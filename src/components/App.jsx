// Хуки===============================================================
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/api';
import css from './App.module.css';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // console.log(images);

  useEffect(() => {
    setIsLoading(true);
    fetchImages(query, page)
      .then(pictures => {
        console.log(pictures);
        if (pictures.length === 0) {
          toast.error('no any pictures');
        }
        setImages(page === 1 ? [...pictures] : [...images, ...pictures]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);

  const handleSumbit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // метод відкриття/закриття модалки
  const toggleModal = modalImage => {
    if (!modalImage) {
      setModalImage('');
      setShowModal(false);
      return;
    }
    setModalImage(modalImage);
    setShowModal(true);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSumbit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={toggleModal} />
      {images.length > 11 && <Button onLoadMore={handleLoadMore} />}
      {showModal && <Modal modalImage={modalImage} closeModal={toggleModal} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

// Класс-компонент version
// import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { fetchImages } from 'services/api';
// import css from './App.module.css';
// import Searchbar from './Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     modalImage: '',
//     showModal: false,
//   };

//   componentDidUpdate = (_, prevState) => {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true });
//       fetchImages(this.state.query, this.state.page)
//         .then(images => {
//           this.setState(prevState => ({
//             // рендеримо за умовою: якщо це унас перша сторінка, то ми просто розпилюємо (перезапишемо в state )
//             // нові зображення, що прийшли (наприклад, коли на 1й сторінці були dogs і ми ще раз сабмітнули пусту форму)
//             // якщо ж це у нас не перша сторінка (наприклад ми натискаємо на кнопку Load more, у нас відповідно змінюється сторінка -
//             // і як результат виконається друга умова тернарника: до існуючих зображень додамо нові)
//             images:
//               this.state.page === 1
//                 ? [...images]
//                 : [...prevState.images, ...images],
//           }));
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   };

//   // метод, що приймає з Searchbar ключове слово для запиту і  записує його в state App
//   //  page: 1 - щоб при новому запиті (нове слово) номер сторінки скидувався на 1
//   handleSumbit = query => {
//     this.setState({ query, page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(state => ({ page: state.page + 1 }));
//   };

//   // метод відкриття/закриття модалки
//   toggleModal = modalImage => {
//     if (!modalImage) {
//       this.setState({ modalImage: '', showModal: false });
//       return;
//     }
//     this.setState({ modalImage, showModal: true });
//   };

//   render() {
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleSumbit} />
//         {this.state.isLoading && <Loader />}
//         <ImageGallery images={this.state.images} openModal={this.toggleModal} />
//         {this.state.images.length > 0 && (
//           <Button onLoadMore={this.handleLoadMore} />
//         )}
//         {this.state.showModal && (
//           <Modal
//             modalImage={this.state.modalImage}
//             closeModal={this.toggleModal}
//           />
//         )}
//         <ToastContainer autoClose={2000} />
//       </div>
//     );
//   }
// }
