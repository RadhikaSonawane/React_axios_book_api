import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: '',
      description: '',
      price: ''
    },
    editBookData: {
      id: '',
      title: '',
      description: '',
      price:''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    axios.defaults.headers.common['d8b9dc4e-031f-4ac6-8a7d-fe966f60ed7f'] = 'SWknouDdE74R7J3XXS5yy2bFIpMIWbwY6ize2DsH';
     axios.get("https://9xetmg653b.execute-api.eu-west-1.amazonaws.com/dev/books").then((response) => {
       console.dir(response);
   });
 }
  toggleNewBookModal() {
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: ! this.state.editBookModal
    });
  }
  addBook() {
    axios.post(' https://9xetmg653b.execute-api.eu-west-1.amazonaws.com/dev/books', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);

      this.setState({ books, newBookModal: false, newBookData: {
        title: '',
        description: '',
        price: ''
      }});
    });
  }
  updateBook() {
    let { title, description, price } = this.state.editBookData;

    axios.put('https://9xetmg653b.execute-api.eu-west-1.amazonaws.com/dev/books' + this.state.editBookData.id, {
      title, description, price
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { id: '', title: '', description: '', price: ''}
      })
    });
  }
  editBook(id, title, description, price) {
    this.setState({
      editBookData: { id, title, description, price }, editBookModal: ! this.state.editBookModal
    });
  }
  deleteBook(id) {
    axios.delete('https://9xetmg653b.execute-api.eu-west-1.amazonaws.com/dev/books' + id).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('https://9xetmg653b.execute-api.eu-west-1.amazonaws.com/dev/books').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.description}</td>
          <td>{book.price}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.title, book.description, book.price)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Books App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.title = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="description">description</Label>
            <Input id="description" value={this.state.newBookData.description} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.description = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="price">price $</Label>
            <Input id="price" value={this.state.newBookData.price} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.price = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.title = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="description">description</Label>
            <Input id="description" value={this.state.editBookData.description} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.description = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price $</Label>
            <Input id="price" value={this.state.editBookData.price} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.price = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>description</th>
              <th>price</th>
            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
