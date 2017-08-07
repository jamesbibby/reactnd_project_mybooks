import React from 'react'
import PropTypes from 'prop-types'

// Renders a single book
const Book = props => {
	const { book, showIcon, onShelfChange } = props
	return (
		<li>
			<div className="book">
				<div className="book-top">
					{book.imageLinks &&
						book.imageLinks.smallThumbnail &&
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
							}}
						>
							<i className={showIcon && `book-icon icon-${book.shelf}`} />
						</div>}
					<div className="book-shelf-changer">
						<select
							defaultValue={book.shelf}
							onChange={event => onShelfChange(book, event.target.value)}
						>
							<option value="none" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">
					{book.title}
				</div>
				{book.authors &&
					book.authors.map(author =>
						<div className="book-authors" key={author}>
							{author}
						</div>
					)}
			</div>
		</li>
	)
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	showIcon: PropTypes.bool.isRequired,
	onShelfChange: PropTypes.func.isRequired,
}

export default Book
