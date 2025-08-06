import Select from 'react-select';

const CitySelector = ({ cities, selectedCity, onSelectCity }) => {
  const options = cities.map((name) => ({
    label: name,
    value: name,
  }));

  const selectedOption =
    options.find((opt) => opt.value === selectedCity) || null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Choose your city</h2>
      <Select
        inputId="city"
        options={options}
        value={selectedOption}
        onChange={(option) => onSelectCity(option ? option.value : '')}
        isClearable
        isSearchable
        placeholder="Type to search..."
        styles={{
          control: (base) => ({
            ...base,
            padding: '6px 4px',
            borderColor: '#d1d5db',
            borderRadius: '0.5rem',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#facc15',
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#fef3c7',
            primary: '#facc15',
          },
        })}
      />
    </div>
  );
};

export default CitySelector;
