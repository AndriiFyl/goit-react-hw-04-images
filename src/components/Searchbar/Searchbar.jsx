// ХУКИ======================================================================
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default function Searchbar(props) {
  const [query, setQuery] = useState('');

  // метод, що записує в state інфу з інпута
  const handlechange = e => {
    const query = e.target.value;
    setQuery(query);
  };

  // метод відправки інфи до App при сабміті форми
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(query);

    // умова, при якій при спробі відправити пусту форму побачимо підказку
    if (query.trim() === '') {
      return toast.error('Please write your request');
    }
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__button__label}>Search</span>
          <BiSearch size={24} />
        </button>

        <input
          onChange={handlechange}
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
        />
      </form>
    </header>
  );
}

// Класс-Компонент VERSION------------------------------------------------
// import { Component } from 'react';
// import { toast } from 'react-toastify';
// import { BiSearch } from 'react-icons/bi';
// import 'react-toastify/dist/ReactToastify.css';
// import css from './Searchbar.module.css';

// export default class Searchbar extends Component {
//   state = {
//     query: '',
//   };
//   // метод, що записує в state інфу з інпута
//   handlechange = e => {
//     const query = e.target.value;
//     this.setState({ query });
//   };

//   // метод відправки інфи до App прип сабміті форми
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query);

//     // умова, при якій при спробі відправити пусту форму побачимо підказку
//     if (this.state.query.trim() === '') {
//       return toast.error('Please write your request');
//     }

//     // очистка форми після відправки
//     // this.setState({ query: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.SearchForm__button}>
//             <span className={css.SearchForm__button__label}>Search</span>
//             <BiSearch size={24} />
//           </button>

//           <input
//             onChange={this.handlechange}
//             className={css.SearchForm__input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="query"
//             value={this.state.query}
//           />
//         </form>
//       </header>
//     );
//   }
// }
