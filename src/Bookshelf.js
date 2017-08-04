import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		onShelfChange: PropTypes.func.isRequired,
	}
	render() {
		const { title, books, onShelfChange } = this.props
		console.log('books', books)
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">
					{title}
				</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book =>
							<Book key={book.id} onShelfChange={onShelfChange} book={book} />
						)}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf
