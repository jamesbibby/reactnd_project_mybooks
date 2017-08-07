import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = props => {
	const { title, shelf, books, onShelfChange } = props
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">
				<i className={`title-icon icon-${shelf}`} />
				<span className="bookshelf-title-text">
					{title}
				</span>
			</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map(book =>
						<Book
							key={book.id}
							onShelfChange={onShelfChange}
							book={book}
							showIcon={false}
							currentShelf={book.shelf}
						/>
					)}
				</ol>
			</div>
		</div>
	)
}

Bookshelf.propTypes = {
	title: PropTypes.string.isRequired,
	shelf: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired,
}

export default Bookshelf
