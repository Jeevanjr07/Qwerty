import SwiftUI

struct HomeView: View {
    @State private var userName = "Alex"
    @State private var currentBookProgress: Double = 0.65
    @State private var currentBook = Book(
        title: "The Psychology of Money",
        author: "Morgan Housel",
        coverImage: "book_cover_1",
        progress: 0.65
    )
    @State private var recommendedBooks = [
        Book(title: "Atomic Habits", author: "James Clear", coverImage: "book_cover_2", progress: 0.0),
        Book(title: "The 7 Habits", author: "Stephen Covey", coverImage: "book_cover_3", progress: 0.0),
        Book(title: "Think and Grow Rich", author: "Napoleon Hill", coverImage: "book_cover_4", progress: 0.0)
    ]
    @State private var currentRecommendationIndex = 0
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 0) {
                    // Header Section
                    HeaderSection(userName: userName)
                    
                    // Statistics Section
                    StatisticsSection()
                        .padding(.horizontal, 20)
                        .padding(.top, 20)
                    
                    // Continue Reading Section
                    ContinueReadingSection(book: currentBook)
                        .padding(.horizontal, 20)
                        .padding(.top, 25)
                    
                    // Book Recommendations Section
                    BookRecommendationsSection(
                        books: $recommendedBooks,
                        currentIndex: $currentRecommendationIndex
                    )
                    .padding(.horizontal, 20)
                    .padding(.top, 25)
                    .padding(.bottom, 100) // Space for tab bar
                }
            }
            .background(Color.white)
            .navigationBarHidden(true)
        }
    }
}

struct HeaderSection: View {
    let userName: String
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Hello,")
                    .font(.title2)
                    .foregroundColor(.secondary)
                Text("\(userName) 👋")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
            }
            
            Spacer()
            
            Button(action: {
                // Profile action
            }) {
                Image(systemName: "person.circle.fill")
                    .font(.title)
                    .foregroundColor(.bookBrown)
                    .background(
                        Circle()
                            .fill(Color.bookBeige)
                            .frame(width: 50, height: 50)
                    )
            }
        }
        .padding(.horizontal, 20)
        .padding(.top, 10)
    }
}

struct StatisticsSection: View {
    var body: some View {
        VStack(spacing: 15) {
            Text("Your Reading Journey")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.black)
                .frame(maxWidth: .infinity, alignment: .leading)
            
            LazyVGrid(columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ], spacing: 15) {
                StatCard(title: "Books Read", value: "12", icon: "book.fill", color: .bookBrown)
                StatCard(title: "Hours Spent", value: "48", icon: "clock.fill", color: .bookLightBrown)
                StatCard(title: "Reading Streak", value: "7 days", icon: "flame.fill", color: .orange)
                StatCard(title: "Pages Read", value: "2,847", icon: "doc.text.fill", color: .bookDarkBrown)
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color.bookBeige.opacity(0.3))
        )
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
            
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.black)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 15)
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color.white)
                .shadow(color: .black.opacity(0.05), radius: 5, x: 0, y: 2)
        )
    }
}

struct ContinueReadingSection: View {
    let book: Book
    
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Continue Reading")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.black)
            
            HStack(spacing: 15) {
                // Book Cover
                RoundedRectangle(cornerRadius: 12)
                    .fill(Color.bookBeige)
                    .frame(width: 80, height: 120)
                    .overlay(
                        Image(systemName: "book.closed.fill")
                            .font(.title)
                            .foregroundColor(.bookBrown)
                    )
                
                VStack(alignment: .leading, spacing: 8) {
                    Text(book.title)
                        .font(.headline)
                        .fontWeight(.semibold)
                        .foregroundColor(.black)
                        .lineLimit(2)
                    
                    Text("by \(book.author)")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    VStack(alignment: .leading, spacing: 5) {
                        HStack {
                            Text("Progress")
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text("\(Int(book.progress * 100))%")
                                .font(.caption)
                                .fontWeight(.medium)
                                .foregroundColor(.bookBrown)
                        }
                        
                        ProgressView(value: book.progress)
                            .progressViewStyle(LinearProgressViewStyle(tint: .bookBrown))
                            .background(Color.bookBeige.opacity(0.3))
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.white)
                    .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
            )
        }
    }
}

struct BookRecommendationsSection: View {
    @Binding var books: [Book]
    @Binding var currentIndex: Int
    @State private var dragOffset = CGSize.zero
    @State private var rotationAngle: Double = 0
    
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Discover New Books")
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(.black)
            
            ZStack {
                ForEach(books.indices.reversed(), id: \.self) { index in
                    if index >= currentIndex && index < currentIndex + 3 {
                        BookCard(book: books[index])
                            .scaleEffect(index == currentIndex ? 1.0 : 0.95)
                            .offset(x: index == currentIndex ? dragOffset.width : 0)
                            .rotationEffect(.degrees(index == currentIndex ? rotationAngle : 0))
                            .zIndex(Double(books.count - index))
                            .opacity(index < currentIndex + 3 ? 1.0 : 0.0)
                            .animation(.spring(response: 0.5, dampingFraction: 0.8), value: dragOffset)
                    }
                }
            }
            .frame(height: 400)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        dragOffset = value.translation
                        rotationAngle = Double(value.translation.width / 10)
                    }
                    .onEnded { value in
                        let threshold: CGFloat = 100
                        
                        if value.translation.width > threshold {
                            // Right swipe - like
                            withAnimation(.spring()) {
                                dragOffset = CGSize(width: 1000, height: 0)
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                nextBook()
                            }
                        } else if value.translation.width < -threshold {
                            // Left swipe - pass
                            withAnimation(.spring()) {
                                dragOffset = CGSize(width: -1000, height: 0)
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                nextBook()
                            }
                        } else {
                            // Snap back
                            withAnimation(.spring()) {
                                dragOffset = .zero
                                rotationAngle = 0
                            }
                        }
                    }
            )
            
            // Swipe indicators
            HStack {
                VStack(spacing: 5) {
                    Image(systemName: "xmark")
                        .foregroundColor(.red)
                    Text("Pass")
                        .font(.caption)
                        .foregroundColor(.red)
                }
                
                Spacer()
                
                VStack(spacing: 5) {
                    Image(systemName: "heart.fill")
                        .foregroundColor(.green)
                    Text("Add to Library")
                        .font(.caption)
                        .foregroundColor(.green)
                }
            }
            .padding(.horizontal, 40)
            .opacity(0.6)
        }
    }
    
    private func nextBook() {
        dragOffset = .zero
        rotationAngle = 0
        if currentIndex < books.count - 1 {
            currentIndex += 1
        }
    }
}

struct BookCard: View {
    let book: Book
    
    var body: some View {
        VStack(spacing: 15) {
            // Book Cover
            RoundedRectangle(cornerRadius: 15)
                .fill(Color.bookBeige)
                .frame(width: 200, height: 280)
                .overlay(
                    VStack {
                        Image(systemName: "book.closed.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.bookBrown)
                        
                        Text(book.title)
                            .font(.headline)
                            .fontWeight(.bold)
                            .foregroundColor(.black)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 10)
                            .lineLimit(3)
                    }
                )
            
            VStack(spacing: 5) {
                Text(book.title)
                    .font(.title3)
                    .fontWeight(.semibold)
                    .foregroundColor(.black)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)
                
                Text("by \(book.author)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
        .frame(width: 250, height: 380)
        .background(
            RoundedRectangle(cornerRadius: 25)
                .fill(Color.white)
                .shadow(color: .black.opacity(0.15), radius: 15, x: 0, y: 8)
        )
    }
}

// Data Models
struct Book: Identifiable {
    let id = UUID()
    let title: String
    let author: String
    let coverImage: String
    let progress: Double
}