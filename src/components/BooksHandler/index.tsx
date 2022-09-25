import React, {useEffect, useState} from "react";

interface BookDetails {
  id: string;
  sbin: string;
  bookname: string;
  authorname: string;
  price: string;
  publise_year: string;
}

export default function Index() {
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    id: "",
    sbin: "",
    bookname: "",
    authorname: "",
    price: "",
    publise_year: "",
  });
  const [tableData, setTableData] = useState<any>([]);
  const [authorList, setAuthorList] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    let bookList = localStorage.getItem("bookDetailsList");
    if (bookList) {
      bookList = JSON.parse(bookList);
      if (bookList !== undefined && bookList !== null) {
        if (bookList.length > 0) {
          setTableData(bookList);
        }
      }
    }
  }, []);

  useEffect(() => {
    let authorList = localStorage.getItem("authorDetailsList");
    if (authorList) {
      authorList = JSON.parse(authorList);
      if (authorList !== undefined && authorList !== null) {
        if (authorList.length > 0) {
          setAuthorList(authorList);
        }
      }
    }
  }, []);

  const inputHandler = async (event: any) => {
    const {value, name} = event.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const submitHandler = () => {
    let tempBookList = [];
    if (!isEdit) {
      tempBookList = [
        ...tableData,
        {
          ...bookDetails,
          id: new Date().getTime().toString(),
        },
      ];
    } else {
      tempBookList = tableData.map((book: BookDetails) => {
        if (book.id == bookDetails.id) {
          return {...bookDetails};
        } else {
          return book;
        }
      });
    }
    setTableData([...tempBookList]);
    localStorage.setItem("bookDetailsList", JSON.stringify(tempBookList));
  };

  const preValueHandler = (book: BookDetails) => {
    setBookDetails({
      ...book,
    });
  };

  const resetBookDetails = () => {
    setIsEdit(false);
    setBookDetails({
      id: "",
      sbin: "",
      bookname: "",
      authorname: "",
      price: "",
      publise_year: "",
    });
  };

  const deleteBook = (bookId: string) => {
    const tempBookList = tableData.filter(
      (book: BookDetails) => book.id !== bookId
    );
    if (tempBookList.length > 0) {
      setTableData([...tempBookList]);
      localStorage.setItem("bookDetailsList", JSON.stringify(tempBookList));
    } else {
      setTableData([]);
      localStorage.removeItem("bookDetailsList");
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-center">Books</h2>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{float: "right"}}
          onClick={resetBookDetails}
        >
          AddBook
        </button>
      </div>
      {tableData.length > 0 ? (
        //  {/* Table start:- */}
        <table className="table">
          <thead>
            <th scope="col">Id</th>
            <th scope="col">Sbin</th>
            <th scope="col">BookName</th>
            <th scope="col">AuthorName</th>
            <th scope="col">Price</th>
            <th scope="col">PublishYear</th>
            <th scope="col">Action</th>
          </thead>
          <tbody>
            {tableData.map((book: BookDetails, index: number) => (
              <tr>
                <th scope="row">{book.id}</th>
                <td>{book.sbin}</td>
                <td>{book.bookname}</td>
                <td>{book.authorname}</td>
                <td>{book.price}</td>
                <td>{book.publise_year}</td>
                <td>
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        preValueHandler(book);
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteBook(book.id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{height: "50vh"}}
        >
          <h6 className="text-center text-secondary">Records not found...</h6>
        </div>
      )}

      {/* Modal start:- */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
              <label htmlFor="disabledTextInput" className="form-label">
                  Sbin
                </label>
                <input
                  type="text"
                  name="sbin"
                  value={bookDetails.sbin}
                  id="disabledTextInput"
                  className="form-control"
                  onChange={inputHandler}
                />
                <label htmlFor="disabledTextInput" className="form-label">
                  BookName
                </label>
                <input
                  type="text"
                  name="bookname"
                  value={bookDetails.bookname}
                  id="disabledTextInput"
                  className="form-control"
                  onChange={inputHandler}
                />
                <label htmlFor="disabledTextInput" className="form-label">
                  AuthorName
                </label>
                <select
                  className="form-select"
                  aria-label=".form-select-lg example"
                  name="authorname"
                  value={bookDetails.authorname}
                  onChange={inputHandler}
                >
                  <option value={""}>Select</option>
                  {authorList.map((author: any) => (
                    <option value={author.name}>{author.name}</option>
                  ))}
                </select>
                <label htmlFor="disabledTextInput" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={bookDetails.price}
                  id="disabledTextInput"
                  className="form-control"
                  onChange={inputHandler}
                />
                <label htmlFor="disabledTextInput" className="form-label">
                  Publise Year
                </label>
                <input
                  name="publise_year"
                  id="disabledTextInputfile"
                  className="form-control"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetBookDetails}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submitHandler}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

