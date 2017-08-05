import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Terms from './SearchTerms'
import Autocomplete from 'react-autocomplete'
import Book from './Book'

class SearchBooks extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		onSearch: PropTypes.func.isRequired,
		clearSearchResults: PropTypes.func.isRequired,
		books: PropTypes.array.isRequired,
		onShelfChange: PropTypes.func.isRequired,
		getCurrentShelf: PropTypes.func.isRequired,
	}

	state = {
		query: '',
	}

	handleChange = (event, value) => {
		this.setState({ query: value })
	}

	handleSelect = value => {
		this.setState({ query: value })
		this.props.onSearch(value)
	}

	render() {
		const {
			history,
			clearSearchResults,
			onShelfChange,
			books,
			getCurrentShelf,
		} = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<a
						className="close-search"
						onClick={() => {
							clearSearchResults()
							history.push('/')
						}}
					>
						Close
					</a>
					<div className="search-books-input-wrapper">
						<Autocomplete
							value={this.state.query}
							inputProps={{ placeholder: 'Search by title or author' }}
							items={Terms.map(term => ({
								label: term,
							}))}
							wrapperStyle={{}}
							getItemValue={item => item.label}
							shouldItemRender={(item, value) =>
								item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1}
							onChange={this.handleChange}
							onSelect={this.handleSelect}
							renderItem={(item, isHighlighted) =>
								<div
									style={{ background: isHighlighted ? 'lightgray' : 'white' }}
								>
									{item.label}
								</div>}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map(book => {
							return (
								<Book
									key={book.id}
									onShelfChange={onShelfChange}
									book={book}
									currentShelf={getCurrentShelf(book.id, book.title)}
								/>
							)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks
