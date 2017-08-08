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
					{books.map(book => {
						/***
						   I did not use a unique id library here.
						   The recommended one react-key-index no longer has source available (404 on github),  and other options seemed unsuitable.
							 Although unlikely I have added the shelf name as a prefix to avoid issues.  I
							 f a book ends up on more than one shelf (though much of the BokosAPI breaks in that case)
							 For search results I am reducing the results down to only unique books by id so it should never be a problem for that use case.
						***/

						return (
							<Book
								key={`${shelf}::${book.id}`}
								onShelfChange={onShelfChange}
								book={book}
								showIcon={false}
								currentShelf={book.shelf}
							/>
						)
					})}
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
