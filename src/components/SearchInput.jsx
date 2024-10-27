const SearchInput = ({ searchTerm, handleSearch, placeholder, name }) => {
  return (
    <input
      type="text"
      className="form-control my-2 my-md-4"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
      name={name}
    />
  );
};

export default SearchInput;
