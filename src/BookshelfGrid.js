import React from 'react'
import Bookshelf from './Bookshelf'

const BookshelfGrid = props => {
	const { bookMap, onShelfChange, currentlyReading, read, wantToRead } = props
	return (
		<div className="list-books-content">
			<div>
				<Bookshelf
					title="Currently Reading"
					shelf="currentlyReading"
					books={currentlyReading.map(id => bookMap[id])}
					onShelfChange={onShelfChange}
				/>
				<Bookshelf
					title="Want To Read"
					shelf="wantToRead"
					books={wantToRead.map(id => bookMap[id])}
					onShelfChange={onShelfChange}
				/>
				<Bookshelf
					title="Read"
					shelf="read"
					books={read.map(id => bookMap[id])}
					onShelfChange={onShelfChange}
				/>
			</div>
		</div>
	)
}

export default BookshelfGrid
