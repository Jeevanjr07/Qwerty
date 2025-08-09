# How to Run the Book Tracking iOS App

## 📱 **Interactive Preview Available**

**OPEN `ios_preview.html` in your browser for an interactive demo!**

The HTML preview includes:
- ✅ Exact visual design of the iOS app
- ✅ Interactive Tinder-style book swiping (drag the cards!)
- ✅ Working tab navigation
- ✅ All sections: Header, Statistics, Continue Reading, Recommendations
- ✅ Your exact color scheme: white, black, beige, and brown

## 🍎 **Running the Actual iOS App**

### Prerequisites
- macOS computer with Xcode 15.0 or later
- iOS Simulator or physical iPhone/iPad
- Apple Developer account (for device testing)

### Steps to Run:

#### 1. **Open in Xcode**
```bash
# Navigate to project directory
cd /path/to/workspace

# Open the Xcode project
open BookTrackingApp.xcodeproj
```

#### 2. **Build and Run**
- Select a simulator or connected device from the scheme selector
- Press `Cmd + R` or click the "Run" button
- The app will build and launch automatically

#### 3. **Alternative: Command Line**
```bash
# Build for simulator
xcodebuild -project BookTrackingApp.xcodeproj -scheme BookTrackingApp -destination 'platform=iOS Simulator,name=iPhone 15 Pro'

# Run in simulator
xcrun simctl boot "iPhone 15 Pro"
xcrun simctl install booted ./build/Release-iphonesimulator/BookTrackingApp.app
xcrun simctl launch booted com.example.BookTrackingApp
```

## 🎨 **What You'll See in the iOS App**

### **1. Header Section**
- Personalized "Hello, Alex 👋" greeting on the left
- Profile button with beige background on the right

### **2. Statistics Dashboard**
- "Your Reading Journey" section
- 4 beautiful stat cards in a 2x2 grid:
  - **📚 Books Read:** 12
  - **🕐 Hours Spent:** 48  
  - **🔥 Reading Streak:** 7 days
  - **📄 Pages Read:** 2,847

### **3. Continue Reading**
- Current book: "The Psychology of Money" by Morgan Housel
- Progress bar showing 65% completion
- Elegant book cover placeholder with brown accents

### **4. Tinder-Style Book Recommendations**
- **Swipe right** ❤️ = Add to library
- **Swipe left** ❌ = Pass
- Smooth spring animations
- Card stacking with depth effect
- Books included: Atomic Habits, The 7 Habits, Think and Grow Rich

### **5. Bottom Navigation**
- 🏠 **Home** (current page)
- 🔍 **Search** 
- 📚 **My Library**

## 🎨 **Design Features**

### **Color Palette Implementation:**
- **White (#FFFFFF):** Clean background throughout
- **Black (#000000):** Primary text for readability
- **Beige (#F5EBD7):** Soft accent backgrounds and highlights  
- **Brown (#8A5A42):** Primary brand color for buttons and progress
- **Light Brown (#CC9966):** Secondary accents
- **Dark Brown (#664229):** Deep emphasis elements

### **Professional Styling:**
- Custom SwiftUI color extensions
- Subtle shadows and rounded corners
- Responsive grid layouts
- Smooth spring animations
- Modern iOS design principles

## 🛠 **Technical Features**

- **SwiftUI Framework:** Modern declarative UI
- **State Management:** Reactive data binding
- **Gesture Recognition:** Advanced swipe gestures
- **Custom Components:** Reusable UI elements
- **Animation System:** Spring-based transitions
- **Tab Navigation:** Native iOS navigation patterns

## 📁 **Project Structure**
```
BookTrackingApp/
├── BookTrackingApp.swift      # Main app entry point
├── HomeView.swift             # Complete home page implementation
├── Assets.xcassets/           # App icons and colors
└── Preview Content/           # Xcode preview assets
```

## 🚀 **Ready to Use!**

The app is fully functional and ready to run. All requirements have been implemented:

✅ Hello message and profile button  
✅ Beautiful statistics display  
✅ Continue Reading with progress bar  
✅ Tinder-style book recommendations  
✅ Professional bottom navigation  
✅ Light theme with your exact color palette  
✅ Aesthetic and professional design throughout

**Start by opening `ios_preview.html` to see the design in action!**