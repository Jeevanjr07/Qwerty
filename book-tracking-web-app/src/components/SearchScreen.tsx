import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';

// Types for book data
interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  description?: string;
  publishedYear?: string;
  genres?: string[];
  rating?: number;
  pages?: number;
  isbn?: string;
}

interface SearchFilters {
  genre: string;
  year: string;
  sortBy: 'relevance' | 'title' | 'author' | 'year';
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [personalLibrary, setPersonalLibrary] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'library'>('search');
  const [filters, setFilters] = useState<SearchFilters>({
    genre: '',
    year: '',
    sortBy: 'relevance'
  });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // Sample personal library data
  useEffect(() => {
    const sampleLibrary: Book[] = [
      {
        id: '1',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        coverImage: 'https://covers.openlibrary.org/b/id/1234567-M.jpg',
        description: 'Timeless lessons on wealth, greed, and happiness.',
        publishedYear: '2020',
        genres: ['Finance', 'Psychology', 'Self-Help'],
        rating: 4.5,
        pages: 256
      },
      {
        id: '2',
        title: 'Atomic Habits',
        author: 'James Clear',
        coverImage: 'https://covers.openlibrary.org/b/id/2345678-M.jpg',
        description: 'An easy and proven way to build good habits and break bad ones.',
        publishedYear: '2018',
        genres: ['Self-Help', 'Psychology', 'Productivity'],
        rating: 4.7,
        pages: 320
      },
      {
        id: '3',
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen Covey',
        coverImage: 'https://covers.openlibrary.org/b/id/3456789-M.jpg',
        description: 'Powerful lessons in personal change.',
        publishedYear: '1989',
        genres: ['Self-Help', 'Business', 'Leadership'],
        rating: 4.6,
        pages: 381
      }
    ];
    setPersonalLibrary(sampleLibrary);
  }, []);

  // Search books using Open Library API
  const searchBooks = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await response.json();
      
      const formattedBooks: Book[] = data.docs.map((doc: any, index: number) => ({
        id: doc.key || `book-${index}`,
        title: doc.title || 'Unknown Title',
        author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
        coverImage: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
        description: doc.first_sentence ? doc.first_sentence[0] : undefined,
        publishedYear: doc.first_publish_year?.toString(),
        genres: doc.subject ? doc.subject.slice(0, 3) : [],
        rating: Math.random() * 2 + 3, // Random rating for demo
        pages: doc.number_of_pages_median,
        isbn: doc.isbn ? doc.isbn[0] : undefined
      }));
      
      setBooks(formattedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to sample data if API fails
      setBooks([
        {
          id: 'fallback-1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          coverImage: 'https://covers.openlibrary.org/b/id/1234567-M.jpg',
          description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
          publishedYear: '1925',
          genres: ['Fiction', 'Classic', 'Romance'],
          rating: 4.2,
          pages: 180
        },
        {
          id: 'fallback-2',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          coverImage: 'https://covers.openlibrary.org/b/id/2345678-M.jpg',
          description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
          publishedYear: '1960',
          genres: ['Fiction', 'Classic', 'Drama'],
          rating: 4.5,
          pages: 281
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchBooks(searchQuery);
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Add book to personal library
  const addToLibrary = (book: Book) => {
    if (!personalLibrary.find(b => b.id === book.id)) {
      setPersonalLibrary([...personalLibrary, book]);
    }
  };

  // Remove book from personal library
  const removeFromLibrary = (bookId: string) => {
    setPersonalLibrary(personalLibrary.filter(book => book.id !== bookId));
  };

  // Filter and sort books
  const getFilteredBooks = (bookList: Book[]) => {
    let filtered = [...bookList];

    if (filters.genre) {
      filtered = filtered.filter(book => 
        book.genres?.some(genre => 
          genre.toLowerCase().includes(filters.genre.toLowerCase())
        )
      );
    }

    if (filters.year) {
      filtered = filtered.filter(book => 
        book.publishedYear === filters.year
      );
    }

    // Sort books
    switch (filters.sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'year':
        filtered.sort((a, b) => (b.publishedYear || '0').localeCompare(a.publishedYear || '0'));
        break;
      default:
        // Keep relevance order (API order)
        break;
    }

    return filtered;
  };

  const SearchBar = () => (
    <div className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for books, authors, or genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="clear-search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );

  const FilterSection = () => (
    <div className="filter-section">
      <select
        value={filters.genre}
        onChange={(e) => setFilters({...filters, genre: e.target.value})}
        className="filter-select"
      >
        <option value="">All Genres</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="self-help">Self-Help</option>
        <option value="business">Business</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="biography">Biography</option>
      </select>

      <select
        value={filters.year}
        onChange={(e) => setFilters({...filters, year: e.target.value})}
        className="filter-select"
      >
        <option value="">All Years</option>
        {Array.from({length: 30}, (_, i) => 2024 - i).map(year => (
          <option key={year} value={year.toString()}>{year}</option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
        className="filter-select"
      >
        <option value="relevance">Relevance</option>
        <option value="title">Title A-Z</option>
        <option value="author">Author A-Z</option>
        <option value="year">Year (Newest)</option>
      </select>
    </div>
  );

  const BookCard = ({ book, showAddButton = true }: { book: Book; showAddButton?: boolean }) => (
    <div className="search-book-card" onClick={() => {
      setSelectedBook(book);
      setShowBookModal(true);
    }}>
      <div className="book-cover-container">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="book-cover-image" />
        ) : (
          <div className="book-cover-placeholder">📖</div>
        )}
        {showAddButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToLibrary(book);
            }}
            className="add-to-library-btn"
            title="Add to Library"
          >
            ➕
          </button>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        {book.publishedYear && (
          <p className="book-year">{book.publishedYear}</p>
        )}
        {book.rating && (
          <div className="book-rating">
            {'⭐'.repeat(Math.floor(book.rating))}
            <span className="rating-text">({book.rating.toFixed(1)})</span>
          </div>
        )}
        {book.genres && book.genres.length > 0 && (
          <div className="book-genres">
            {book.genres.slice(0, 2).map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const BookModal = () => (
    showBookModal && selectedBook && (
      <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
        <div className="book-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowBookModal(false)}>
            ✕
          </button>
          
          <div className="modal-content">
            <div className="modal-book-cover">
              {selectedBook.coverImage ? (
                <img src={selectedBook.coverImage} alt={selectedBook.title} />
              ) : (
                <div className="modal-cover-placeholder">📖</div>
              )}
            </div>
            
            <div className="modal-book-details">
              <h2>{selectedBook.title}</h2>
              <p className="modal-author">by {selectedBook.author}</p>
              
              {selectedBook.publishedYear && (
                <p><strong>Published:</strong> {selectedBook.publishedYear}</p>
              )}
              
              {selectedBook.pages && (
                <p><strong>Pages:</strong> {selectedBook.pages}</p>
              )}
              
              {selectedBook.rating && (
                <div className="modal-rating">
                  <strong>Rating:</strong> {'⭐'.repeat(Math.floor(selectedBook.rating))} ({selectedBook.rating.toFixed(1)})
                </div>
              )}
              
              {selectedBook.genres && selectedBook.genres.length > 0 && (
                <div className="modal-genres">
                  <strong>Genres:</strong>
                  <div className="genre-tags">
                    {selectedBook.genres.map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedBook.description && (
                <div className="modal-description">
                  <strong>Description:</strong>
                  <p>{selectedBook.description}</p>
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  className="add-to-library-modal-btn"
                  onClick={() => {
                    addToLibrary(selectedBook);
                    setShowBookModal(false);
                  }}
                >
                  Add to My Library
                </button>
                <button 
                  className="start-reading-btn"
                  onClick={() => setShowBookModal(false)}
                >
                  Start Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="search-screen">
      <div className="search-header">
        <h1 className="search-title">Discover Books</h1>
        <p className="search-subtitle">Find your next great read from millions of books</p>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Search Library
        </button>
        <button 
          className={`tab-button ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
        >
          📚 My Library ({personalLibrary.length})
        </button>
      </div>

      {activeTab === 'search' && (
        <div className="search-content">
          <SearchBar />
          <FilterSection />
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching for books...</p>
            </div>
          )}

          {!loading && books.length > 0 && (
            <div className="search-results">
              <h3>Found {books.length} books</h3>
              <div className="books-grid">
                {getFilteredBooks(books).map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}

          {!loading && searchQuery && books.length === 0 && (
            <div className="no-results">
              <p>No books found for "{searchQuery}"</p>
              <p>Try different keywords or check your spelling</p>
            </div>
          )}

          {!loading && !searchQuery && (
            <div className="search-suggestions">
              <h3>Popular Searches</h3>
              <div className="suggestion-tags">
                {['Fiction', 'Self-Help', 'Business', 'Science Fiction', 'Biography', 'History'].map(tag => (
                  <button 
                    key={tag} 
                    className="suggestion-tag"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'library' && (
        <div className="library-content">
          {personalLibrary.length > 0 ? (
            <div className="personal-library">
              <h3>My Library ({personalLibrary.length} books)</h3>
              <div className="books-grid">
                {personalLibrary.map(book => (
                  <div key={book.id} className="library-book-card">
                    <BookCard book={book} showAddButton={false} />
                    <button
                      onClick={() => removeFromLibrary(book.id)}
                      className="remove-from-library-btn"
                      title="Remove from Library"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-library">
              <div className="empty-icon">📚</div>
              <h3>Your library is empty</h3>
              <p>Search for books and add them to your personal library</p>
              <button 
                className="start-searching-btn"
                onClick={() => setActiveTab('search')}
              >
                Start Searching
              </button>
            </div>
          )}
        </div>
      )}

      <BookModal />
    </div>
  );
};

export default SearchScreen;