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
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Rechercher un restaurant</h2>
      <Select
        inputId="restaurant"
        options={options}
        value={selectedOption}
        onChange={(option) =>
          onSelectRestaurant(option ? option.value : '')
        }
        isClearable
        isSearchable
        placeholder="Tapez pour rechercher..."
        className="w-full"
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

export default RestaurantSelector;
