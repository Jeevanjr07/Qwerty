import SwiftUI

@main
struct BookTrackingApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

// Color scheme extension for our app
extension Color {
    static let bookBeige = Color(red: 0.96, green: 0.92, blue: 0.84)
    static let bookBrown = Color(red: 0.54, green: 0.36, blue: 0.26)
    static let bookLightBrown = Color(red: 0.8, green: 0.6, blue: 0.4)
    static let bookDarkBrown = Color(red: 0.4, green: 0.26, blue: 0.16)
}

struct ContentView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
                .tag(0)
            
            SearchView()
                .tabItem {
                    Image(systemName: "magnifyingglass")
                    Text("Search")
                }
                .tag(1)
            
            LibraryView()
                .tabItem {
                    Image(systemName: "books.vertical.fill")
                    Text("My Library")
                }
                .tag(2)
        }
        .accentColor(.bookBrown)
    }
}

struct SearchView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Search Books")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.bookBrown)
            }
            .navigationTitle("Search")
            .background(Color.white)
        }
    }
}

struct LibraryView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("My Library")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.bookBrown)
            }
            .navigationTitle("Library")
            .background(Color.white)
        }
    }
}