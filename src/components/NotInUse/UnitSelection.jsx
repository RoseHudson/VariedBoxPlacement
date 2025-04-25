/* NOT IN USE */

export default function UnitSelection({area, options, selected, changeSelected}) {
  function handleUnitChange(event) {
      changeSelected(event.target.value);
  }

  return(
      <li>
          <label>{area}: </label>
          <select
              className="input_box"
              id="dropdown"
              value={selected}
              onChange={handleUnitChange}
          >
              <option value="" disabled>
                  -- Select a Unit --
              </option>
              {options.map((unit) => (
                  <option key={unit} value={unit}>
                      {unit}
                  </option>
              ))}
          </select>
      </li>
  )
}