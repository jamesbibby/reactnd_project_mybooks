import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import { Route } from 'react-router-dom'
import './App.css'
import terms from './SearchTerms'

const initialState = {
	bookMap: {},
	currentlyReading: [],
	read: [],
	wantToRead: [],
}

class BooksApp extends React.Component {
	// this way we can always go back to an initial state when reducing the getAll() result

	state = initialState

	componentDidMount() {
		BooksAPI.getAll().then(books => {
			// Organize the books into a map (id:object) to allow constant time lookups
			// store the shelf contents as ids, the detailed object can be retreived from the map if needed
			const state = books.reduce((state, book) => {
				state.bookMap[book.id] = book
				switch (book.shelf) {
					case 'wantToRead':
						state.wantToRead.push(book.id)
						break
					case 'currentlyReading':
						console.log('state', state)
						state.currentlyReading.push(book.id)
						break
					case 'read':
						state.read.push(book.id)
						break
				}
				return state
			}, this.initialState)
			this.setState(state)
			console.log(state)
		})
	}

	// When the shelf changes we can directly update the id list of books on each shelf
	// We also need to update the current shelf of the book in the book map
	// (this ensures the select box shows the correct default)
	onShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf).then(results => {
			this.setState(state => {
				const bookMap = { ...state.bookMap }
				bookMap[book.id].shelf = shelf
				return { ...results, bookMap }
			})
		})
	}

	render() {
		return (
			<div className="app">
				<Route
					path="/search"
					render={({ history }) => <SearchBooks history={history} />}
				/>
				<Route
					exact
					path="/"
					render={({ history }) =>
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="list-books-content">
								<div>
									<Bookshelf
										title="Currently Reading"
										books={this.state.currentlyReading.map(
											id => this.state.bookMap[id]
										)}
										onShelfChange={this.onShelfChange}
									/>
									<Bookshelf
										title="Want To Read"
										books={this.state.wantToRead.map(
											id => this.state.bookMap[id]
										)}
										onShelfChange={this.onShelfChange}
									/>
									<Bookshelf
										title="Read"
										books={this.state.read.map(id => this.state.bookMap[id])}
										onShelfChange={this.onShelfChange}
									/>
								</div>
							</div>
							<div className="open-search">
								<a onClick={() => history.push('/search')}>Add a book</a>
							</div>
						</div>}
				/>
			</div>
		)
	}
}

export default BooksApp
