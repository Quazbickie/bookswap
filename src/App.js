import logo from './logo.svg';
import './App.css';
import { Auth } from "./components/auth";
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [bookList, setBookList] = useState([]);
  const bookCollectionRef = collection(db, 'books');

  useEffect(() => {
    const getBookList = async () => {
      try{
        //read data
        //set book state to data
        const data = await getDocs(bookCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(filteredData);
        setBookList(filteredData);
      } catch(err) {
        console.error(err);
      }
     
    }

    getBookList();
  }, []);

  


  return (
    <div className="App">
      <Auth />
      <div>
        {bookList.map((book) => (
          <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>Year: {book.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
