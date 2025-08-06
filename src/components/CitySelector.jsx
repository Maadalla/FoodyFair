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
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Choisissez votre ville</h2>
      <Select
        inputId="city"
        options={options}
        value={selectedOption}
        onChange={(option) => onSelectCity(option ? option.value : '')}
        isClearable
        isSearchable
        placeholder="Tapez pour rechercher..."
        styles={{
          control: (base) => ({
            ...base,
            padding: '6px 4px',
            borderColor: '#d1d5db',
            borderRadius: '0.5rem',
            boxShadow: 'none',
            backgroundColor: '#fff',
            '&:hover': {
              borderColor: '#38BDF8',
            },
          }),
          option: (base, state) => ({
            ...base,
            color: '#0F172A',
            backgroundColor: state.isSelected
              ? '#38BDF8'
              : state.isFocused
              ? '#e0f2fe'
              : '#fff',
          }),
          singleValue: (base) => ({
            ...base,
            color: '#0F172A',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#fff',
          }),
          placeholder: (base) => ({
            ...base,
            color: '#64748b',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#e0f2fe',
            primary: '#38BDF8',
          },
        })}
      />
    </div>
  );
};

export default CitySelector;
