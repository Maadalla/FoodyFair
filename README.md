# FoodyFair
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Maadalla/FoodyFair)

FoodyFair helps you stop overpaying on food delivery services like Glovo. Our platform provides a simple, fast, and transparent way to compare the prices of menu items on delivery apps versus their actual prices in the restaurant.

<img src="https://i.imgur.com/D2eH94v.png" alt="FoodyFair hero section and menu comparison interface" width="800"/>

## Features

*   **Instant Price Comparison:** Instantly see the price difference for each menu item between Glovo and the restaurant.
*   **City & Restaurant Selection:** Choose your city and select from a list of available restaurants.
*   **Categorized Menus:** Menus are intelligently categorized (e.g., 🍕 Pizzas, 🍔 Burgers, 🥗 Salads) for easy browsing.
*   **Powerful Search:** Quickly find any dish using the search bar, powered by Fuse.js for fuzzy searching.
*   **Pagination:** Easily navigate through extensive menus with simple pagination controls.
*   **Responsive Design:** A clean and modern interface that works seamlessly on desktop and mobile.

## How It Works

1.  **Choose your City:** Select a city from the dropdown list.
2.  **Select a Restaurant:** Pick a restaurant from the list that populates for your chosen city.
3.  **Compare Prices:** The application will fetch and display a side-by-side comparison of the restaurant's menu, showing the in-house price versus the Glovo price. The difference is clearly highlighted for each item.
4.  **Search & Filter:** Use the search bar to find specific items or click on category buttons to filter the menu.

## Tech Stack

*   **Frontend:** React (with Vite)
*   **Backend & Database:** Supabase
*   **Styling:** Tailwind CSS
*   **UI Components:** `react-select` for searchable dropdowns
*   **Client-side Search:** Fuse.js
*   **Analytics:** Vercel Analytics & Speed Insights

## Running the Project Locally

To set up and run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/maadalla/foodyfair.git
    cd foodyfair
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You will need to add your own Supabase project URL and anonymous key.
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be running at `http://localhost:5173`.

## Contributing

Contributions are welcome and greatly appreciated! If you notice any missing restaurants, incorrect data, or have suggestions for new features, please feel free to open an issue or submit a pull request.