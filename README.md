# Search Autocomplete App

This is a simple search autocomplete application built with **React (TypeScript)** that fetches data from an API with caching and debouncing for optimized performance.

## Features

- **Search Input:** Users can enter queries to search for products.
- **API Integration:** Fetches product data from [DummyJSON API](https://dummyjson.com/).
- **Debounced API Calls:** Reduces unnecessary API calls by adding a delay before making requests.
- **Caching:** Stores previously searched results in memory to prevent redundant API calls.
- **Loading Indicator:** Displays a loading spinner while fetching data.
- **Responsive UI:** Styled using **Tailwind CSS** for a modern look and responsiveness.

## Technologies Used

- **React.js (TypeScript)** - Frontend framework
- **Tailwind CSS** - Styling
- **DummyJSON API** - Mock API for fetching product data

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/search-autocomplete.git
   cd search-autocomplete
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and navigate to:
   ```sh
   http://localhost:3000
   ```

## Usage

- Type a search query into the input box.
- The results will be fetched and displayed dynamically.
- Cached results will be returned instantly to improve performance.
- If no results are found, a message will be shown.

## Folder Structure

```
📂 search-autocomplete/
├── 📂 src/
│   ├── 📜 App.tsx  # Main component
│   ├── 📜 index.tsx  # Entry point
│   ├── 📜 App.css  # Styling
├── 📜 package.json  # Dependencies
├── 📜 README.md  # Project documentation
```

## Demo

[Live Demo](https://autocompletesearchapp.vercel.app) _(Replace with actual link if deployed)_

## License

This project is open-source and available under the [MIT License](LICENSE).

---

### Author

**Your Name**  
[GitHub](https://github.com/huzefajuned/search-autocomplete) | [LinkedIn](https://www.linkedin.com/in/huzefabinjuned)

Feel free to contribute or open issues for improvements!
