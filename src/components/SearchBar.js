import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search by Name</span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search by Name"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);


export default SearchBar;