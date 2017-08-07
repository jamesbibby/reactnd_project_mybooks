import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookshelfGrid from './BookshelfGrid'
import { Route } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import './App.css'

class BooksApp extends React.Component {
	// this way we can always go back to an initial state when reducing the getAll() result
	initialState = {
		searchResults: [],
		searchResultsMessage: 'Search for books to add to your shelves!',
		bookMap: {},
		currentlyReading: [],
		read: [],
		wantToRead: [],
	}

	// set the state to initial state on load
	state = this.initialState

	// when the component mounts for the first time, retrieve the book list and categorize them
	componentDidMount() {
		BooksAPI.getAll()
			.then(books => {
				// Organize the books into a map (id:object) to allow constant time lookups
				// store the shelf contents as ids, the detailed object can be retreived from the map if needed
				const myState = books.reduce((state, book) => {
					state.bookMap[book.id] = book
					switch (book.shelf) {
						case 'wantToRead':
							state.wantToRead.push(book.id)
							break
						case 'currentlyReading':
							state.currentlyReading.push(book.id)
							break
						case 'read':
							state.read.push(book.id)
							break
						default:
							break
					}
					return state
				}, this.initialState)
				this.setState(myState)
			})
			.catch(error => {
				// show a small toast message when the api call fails
				console.log('an error ocurred', error)
				notify.show(`Failed to communicate with Books API`, 'error', 2000)
			})
	}

	// Check if this id is in any of our shelves
	getCurrentShelf = id => {
		return this.state.read.includes(id)
			? 'read'
			: this.state.currentlyReading.includes(id)
				? 'currentlyReading'
				: this.state.wantToRead.includes(id) ? 'wantToRead' : 'none'
	}

	onSearch = term => {
		// Retrieve the search results from the BooksAPI,
		// filter them for unique entries and set the state
		BooksAPI.search(term)
			.then(books => {
				if (!books || books.error || books.length === 0) {
					if (books && books.error) {
						console.log(books)
						notify.show('Invalid search term', 'error', 2000)
					}
					this.setState({
						searchResults: [],
						searchResultsMessage: `No results found for ${term}`,
					})
					return
				}
				// there are duplicates in the results so we need to filter
				const uniqueIds = new Set()
				const uniqueBooks = books.filter(book => {
					if (uniqueIds.has(book.id)) {
						return false
					}
					uniqueIds.add(book.id)
					return true
				})
				this.setState({
					searchResults: uniqueBooks,
					searchResultsMessage: `${books.length} results found for ${term}`,
				})
			})
			.catch(error => {
				// show a small toast message when the api call fails
				console.log('an error ocurred', error)
				notify.show(`Failed to communicate with Books API`, 'error', 2000)
			})
	}

	// clear the search results, used when the user exist the search screen
	clearSearchResults = () => {
		this.setState({
			searchResults: this.initialState.searchResults,
			searchResultsMessage: this.initialState.searchResultsMessage,
		})
	}

	// When the shelf changes we can directly update the id list of books on each shelf
	// We also need to update the current shelf of the book in the book map
	// (this ensures the select box shows the correct default)
	onShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then(results => {
				this.setState(state => {
					const bookMap = { ...state.bookMap }
					if (bookMap[book.id]) {
						bookMap[book.id].shelf = shelf
					} else {
						BooksAPI.get(book.id).then(book => {
							this.setState(state => {
								bookMap[book.id] = book
								return { bookMap }
							})
						})
					}
					// show a small toast message when the book as changed shelves
					// notify.show(`Succesfully moved book`, 'success', 2000)
					notify.show(`Failed to move book`, 'error', 2000)
					return { ...results, bookMap }
				})
			})
			.catch(error => {
				// show a small toast message when the book as changed shelves
				console.log('an error ocurred', error)
				notify.show(`Failed to move book`, 'error', 2000)
			})
	}

	render() {
		return (
			<div className="app">
				<Notifications />
				<Route
					path="/search"
					render={({ history }) =>
						<SearchBooks
							history={history}
							searchResults={this.state.searchResults}
							searchResultsMessage={this.state.searchResultsMessage}
							clearSearchResults={this.clearSearchResults}
							onSearch={this.onSearch}
							onShelfChange={this.onShelfChange}
							getCurrentShelf={this.getCurrentShelf}
						/>}
				/>
				<Route
					exact
					path="/"
					render={({ history }) =>
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<BookshelfGrid
								bookMap={this.state.bookMap}
								onShelfChange={this.onShelfChange}
								currentlyReading={this.state.currentlyReading}
								read={this.state.read}
								wantToRead={this.state.wantToRead}
							/>
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
