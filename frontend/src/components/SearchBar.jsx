import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, fetchItems } from '../store/items/itemsActions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector(state => state.items.query);
  const debounceTimer = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer - API call after 1 second of no typing
    debounceTimer.current = setTimeout(() => {
      dispatch(fetchItems(value));
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear debounce timer and fetch immediately on submit
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    dispatch(fetchItems(query));
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search categories..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
