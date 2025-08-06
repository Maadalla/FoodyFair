import Select from 'react-select';

const RestaurantSelector = ({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
}) => {
  const options = restaurants.map((name) => ({
    label: name,
    value: name,
  }));

  const selectedOption =
    options.find((opt) => opt.value === selectedRestaurant) || null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Search restaurant</h2>
      <Select
        inputId="restaurant"
        options={options}
        value={selectedOption}
        onChange={(option) =>
          onSelectRestaurant(option ? option.value : '')
        }
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

export default RestaurantSelector;
