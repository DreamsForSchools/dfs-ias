import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const InstructorFiltersModal = ({ show, onHide, onExited, filters, handleApplyFilters }) => {
  const initialCheckedItems = { name: '', car: [], availability: [], preference: [], year: [], asl: [] };
  const [checkedItems, setCheckedItems] = useState(Object.assign({}, initialCheckedItems));

  const availabilityOptions = [
    {value: 1, name: "Monday"},
    {value: 2, name: "Tuesday"},
    {value: 3, name: "Wednesday"},
    {value: 4, name: "Thursday"},
    {value: 5, name: "Friday"},
  ]

  const preferenceOptions = [
    {value: "Mobile App Development (AppJam+)", name: "AppJam"},
    {value: "Website Development", name: "WebJam"},
    {value: "Let's Explore STEM", name: "LESTEM"},
    {value: "Coding Games with Scratch", name: "Scratch"},
    {value: "Engineering Inventors", name: "Engineering Inventors"}
  ]

  const yearOptions = [
    {value: "1st", name: "1st"},
    {value: "2nd", name: "2nd"},
    {value: "3rd", name: "3rd"},
    {value: "4th+", name: "4th+"},
    {value: "Graduate", name: "Graduate"},
  ]

  useEffect(() => {
    const { car, availability, preference, year, asl } = filters;
    setCheckedItems({
      name: filters.name,
      car: [...car],
      availability: [...availability],
      preference: [...preference],
      year: [...year],
      asl: [...asl],
    });
  }, [show]);

  const handleCheckboxChange = (e, value) => {
    const name = e.target.name;
    let checkedValue;
    const valIndex = checkedItems[name].indexOf(value);
    if (valIndex >= 0) {
      checkedItems[name].splice(valIndex, 1);
      checkedValue = checkedItems[name];
    } else {
      checkedValue = [...checkedItems[name], value];
    }
    setCheckedItems({ ...checkedItems, [name]: checkedValue });
  }

  const resetFilters = () => {
    setCheckedItems(Object.assign({}, initialCheckedItems));
    handleApplyFilters(Object.assign({}, initialCheckedItems))
  }

  return (
    <Modal dialogClassName="filter" show={show} onHide={onHide} onExited={onExited}>
      <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
        <Modal.Title style={{fontSize: '36px', fontWeight: 'bold'}}>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding: '1rem 3rem'}}>
        <h5>Owns a car</h5>
        <Form.Group className="filter-group">
          <Form.Check
            type="checkbox"
            label="Yes"
            name="car"
            onChange={(e) => handleCheckboxChange(e, 1)}
            checked={checkedItems.car.includes(1)}
          />
          <Form.Check
            type="checkbox"
            label="No"
            name="car"
            onChange={(e) => handleCheckboxChange(e, 0)}
            checked={checkedItems.car.includes(0)}
          />
        </Form.Group>
        <h5>Availability</h5>
        <Form.Group className="filter-group">
          {availabilityOptions.map(day =>
            <Form.Check
              key={day.value}
              type="checkbox"
              label={day.name}
              name="availability"
              onChange={(e) => handleCheckboxChange(e, day.value)}
              checked={checkedItems.availability.includes(day.value)}
            />
          )}
        </Form.Group>
        <h5>Preference</h5>
        <Form.Group className="filter-group">
          {preferenceOptions.map(pref =>
            <Form.Check
              key={pref.value}
              type="checkbox"
              label={pref.name}
              name="preference"
              onChange={(e) => handleCheckboxChange(e, pref.value)}
              checked={checkedItems.preference.includes(pref.value)}
            />
          )}
        </Form.Group>
        <h5>Year</h5>
        <Form.Group className="filter-group">
          {yearOptions.map(year =>
            <Form.Check
              key={year.value}
              type="checkbox"
              label={year.name}
              name="year"
              onChange={(e) => handleCheckboxChange(e, year.value)}
              checked={checkedItems.year.includes(year.value)}
            />
          )}
        </Form.Group>
        <h5>ASL</h5>
        <Form.Group className="filter-group">
          <Form.Check
            type="checkbox"
            label="Yes"
            name="asl"
            onChange={(e) => handleCheckboxChange(e, 1)}
            checked={checkedItems.asl.includes(1)}
          />
          <Form.Check
            type="checkbox"
            label="No"
            name="asl"
            onChange={(e) => handleCheckboxChange(e, 0)}
            checked={checkedItems.asl.includes(0)}
          />
        </Form.Group>
        <div style={{height: "30px"}}>

        </div>
        <div className="filter-btns">
          <Button className="apply-btn" onClick={() => handleApplyFilters(checkedItems)}>Apply Filters</Button>
          <Button className="reset-btn" onClick={resetFilters}>Reset Filters</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default InstructorFiltersModal;
