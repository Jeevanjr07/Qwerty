# iOS Book Tracking App

A beautiful, modern iOS app for tracking your reading progress with a light theme and aesthetic design.

## Design Features

### Color Palette
- **White**: Primary background color
- **Black**: Primary text color
- **Beige** (`#F5EBD7`): Accent and card backgrounds
- **Brown** (`#8A5A42`): Primary brand color for buttons and accents
- **Light Brown** (`#CC9966`): Secondary accent color
- **Dark Brown** (`#664229`): Deep accent color for emphasis

### Home Page Layout

#### 1. Header Section
- **Hello Message**: Personalized greeting in the top-left corner
- **Profile Button**: Circular profile icon in the top-right corner with beige background

#### 2. Statistics Division
- **Title**: "Your Reading Journey"
- **Grid Layout**: 2x2 grid displaying:
  - Books Read (with book icon)
  - Hours Spent (with clock icon)
  - Reading Streak (with flame icon)
  - Pages Read (with document icon)
- **Styling**: Cards with subtle shadows and rounded corners

#### 3. Continue Reading Section
- **Current Book Display**: Shows book cover, title, and author
- **Progress Bar**: Visual representation of reading progress with percentage
- **Book Cover**: Placeholder design with book icon
- **Clean Layout**: Horizontal layout with book info and progress details

#### 4. Book Recommendations (Tinder-style)
- **Swipe Gestures**: 
  - Right swipe = Add to library (❤️)
  - Left swipe = Pass (❌)
- **Card Stack**: Multiple book cards stacked with depth
- **Smooth Animations**: Spring animations for card movements
- **Visual Feedback**: Rotation and scaling during swipe gestures

#### 5. Bottom Navigation
- **Home Tab**: Current page (house icon)
- **Search Tab**: Book search functionality (magnifying glass icon)
- **My Library Tab**: Personal book collection (books icon)
- **Accent Color**: Brown theme throughout

## Technical Implementation

### SwiftUI Features Used
- **Custom Color Extensions**: Defined brand colors
- **State Management**: `@State` for dynamic content
- **Gesture Recognition**: Drag gestures for Tinder-style swiping
- **Animations**: Spring animations for smooth interactions
- **Grid Layouts**: LazyVGrid for statistics display
- **Navigation**: TabView for bottom navigation
- **Custom Components**: Reusable UI components

### File Structure
```
BookTrackingApp.swift      # Main app entry point and navigation
HomeView.swift            # Complete home page implementation
ContentView_Preview.swift # Preview configurations
README.md                # This documentation
```

### Key Components
- `HeaderSection`: User greeting and profile button
- `StatisticsSection`: Reading metrics in grid layout
- `ContinueReadingSection`: Current book with progress
- `BookRecommendationsSection`: Tinder-style book discovery
- `BookCard`: Individual book recommendation card
- `StatCard`: Individual statistic display card

## Running the App
1. Open in Xcode
2. Select iOS Simulator or device
3. Build and run the project
4. Experience the beautiful, functional book tracking interface

The app provides a premium, aesthetic experience for book lovers to track their reading journey with modern iOS design principles and smooth interactions.