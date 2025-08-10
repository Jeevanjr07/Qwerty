import React, { useState } from 'react';
import './App.css';
import SearchScreen from './components/SearchScreen';

// Color scheme from iOS design
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  bookBeige: '#F5EBD7',
  bookBrown: '#8A5A42',
  bookLightBrown: '#CC9966',
  bookDarkBrown: '#664229',
  gray: '#666666',
  lightGray: '#999999',
  lightGrayBackground: '#F0F0F0',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  success: '#44AA44',
  error: '#FF4444',
  warning: '#FF9500',
  progressBackground: 'rgba(245, 235, 215, 0.3)',
  cardShadow: 'rgba(0, 0, 0, 0.05)',
  deepShadow: 'rgba(0, 0, 0, 0.15)',
};

// Header Component
const HeaderSection = ({ userName }: { userName: string }) => (
  <div className="header-section">
    <div className="greeting">
      <p className="hello-text">Hello,</p>
      <h1 className="name-text">{userName} 👋</h1>
    </div>
    <button className="profile-button">
      👤
    </button>
  </div>
);

// Statistics Component
const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{title}</div>
  </div>
);

const StatisticsSection = () => {
  const stats = [
    { title: 'Books Read', value: '12', icon: '📚', color: colors.bookBrown },
    { title: 'Hours Spent', value: '48', icon: '🕐', color: colors.bookLightBrown },
    { title: 'Reading Streak', value: '7 days', icon: '🔥', color: colors.warning },
    { title: 'Pages Read', value: '2,847', icon: '📄', color: colors.bookDarkBrown },
  ];

  return (
    <div className="statistics-section">
      <h2 className="section-title">Your Reading Journey</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

// Continue Reading Component
const ContinueReadingSection = ({ book }: { book: any }) => (
  <div className="continue-reading-section">
    <h2 className="section-title">Continue Reading</h2>
    <div className="book-card">
      <div className="book-cover">
        📖
      </div>
      <div className="book-info">
        <div className="book-details">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
        </div>
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percent">{Math.round(book.progress * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${book.progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Book Recommendations Component
const BookCard = ({ book, onSwipe, style }: { book: any; onSwipe: (direction: string) => void; style?: any }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const currentX = e.clientX - startX;
      setDragOffset({ x: currentX, y: 0 });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (Math.abs(dragOffset.x) > 100) {
        const direction = dragOffset.x > 0 ? 'right' : 'left';
        onSwipe(direction);
      }
      setDragOffset({ x: 0, y: 0 });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className={`recommendation-card ${isDragging ? 'dragging' : ''}`}
      style={{
        ...style,
        transform: `translateX(${dragOffset.x}px) rotate(${dragOffset.x * 0.1}deg)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="rec-book-cover">
        <div className="rec-book-icon">📖</div>
        <div className="rec-book-title">{book.title}</div>
      </div>
      <div className="rec-book-info">
        <h3 className="rec-title">{book.title}</h3>
        <p className="rec-author">by {book.author}</p>
      </div>
    </div>
  );
};

const BookRecommendationsSection = ({ books }: { books: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: string) => {
    console.log(`Swiped ${direction} on book:`, books[currentIndex]?.title);
    setTimeout(() => {
      if (currentIndex < books.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + 3);

  return (
    <div className="recommendations-section">
      <h2 className="section-title">Discover New Books</h2>
      <div className="card-stack">
        {visibleBooks.map((book, index) => (
          <BookCard
            key={`${book.id}-${currentIndex + index}`}
            book={book}
            onSwipe={index === 0 ? handleSwipe : () => {}}
            style={{
              zIndex: visibleBooks.length - index,
              transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
            }}
          />
        ))}
      </div>
      <div className="swipe-indicators">
        <div className="swipe-action">
          <span>❌</span>
          <span>Pass</span>
        </div>
        <div className="swipe-action">
          <span>❤️</span>
          <span>Add to Library</span>
        </div>
      </div>
    </div>
  );
};

// Bottom Navigation
const BottomNavigation = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
  <div className="bottom-navigation">
    <button 
      className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
      onClick={() => setActiveTab('home')}
    >
      <span className="nav-icon">🏠</span>
      <span>Home</span>
    </button>
    <button 
      className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
      onClick={() => setActiveTab('search')}
    >
      <span className="nav-icon">🔍</span>
      <span>Search</span>
    </button>
    <button 
      className={`nav-item ${activeTab === 'library' ? 'active' : ''}`}
      onClick={() => setActiveTab('library')}
    >
      <span className="nav-icon">📚</span>
      <span>My Library</span>
    </button>
  </div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userName] = useState('Alex');
  const [currentBook] = useState({
    id: 1,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    progress: 0.65,
  });
  const [recommendedBooks] = useState([
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'The 7 Habits', author: 'Stephen Covey' },
    { id: 3, title: 'Think and Grow Rich', author: 'Napoleon Hill' },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="home-content">
            <HeaderSection userName={userName} />
            <StatisticsSection />
            <ContinueReadingSection book={currentBook} />
            <BookRecommendationsSection books={recommendedBooks} />
          </div>
        );
      case 'search':
        return <SearchScreen />;
      case 'library':
        return (
          <div className="screen-content">
            <h1>My Library</h1>
            <p>Your personal book collection</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="phone-frame">
        <div className="screen">
          <div className="status-bar">
            <span>9:41</span>
            <span>📶 📶 📶 🔋</span>
          </div>
          <div className="app-content">
            {renderContent()}
          </div>
          <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
};

export default App;
