import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ClassesPartners from './index';
import { GlobalContext } from "../../context/GlobalContextProvider";
import { fireEvent } from "@testing-library/react";
const axios = require('axios');

jest.mock("axios");

let container = null;

describe('render ProggramsPartnerPage', () => {
  const programData = {
    2: {
      programId: 2,
      name: 'Coding Games with Scratch',
      logo: { type: "Buffer", data: Buffer.from([1,2,3])  },
      color: '#F2C94C',
      classes: [
        {
          classId: 210,
          instructorsNeeded: 2,
          partner: {partnerId: 7, name: "Irvine High School", district: "IUSD", type: "Public Schools"},
          district: "IUSD",
          name: "Irvine High School",
          partnerId: 7,
          type: "Public Schools",
          timings: [],
        },
        {
          classId: 211,
          instructorsNeeded: 2,
          partner: {partnerId: 22, name: "Testing6", district: "United State", type: "Private Schools"},
          district: "United State",
          name: "Testing6",
          partnerId: 22,
          type: "Private Schools",
          timings: []
        }
      ],
    },
    3: {
      programId: 3,
      name: 'Engineering Inventors',
      logo: { type: "Buffer", data: Buffer.from([1,2,3])  },
      color: '#4B4B92',
      classes: [],
    },
    4: {
      programId: 4,
      name: 'Mobile App Development (AppJam+)',
      logo: { type: "Buffer", data: Buffer.from([1,2,3])  },
      color: '#BB6BD9',
      classes: [],
    }
  }

  const partnerData = {
    2: {
      city: "Irvine",
      classes: [],
      district: "IUSD",
      langRequest: "English",
      name: "Portola Springs Elementary",
      partnerId: 2,
      partnerType: "Public Schools",
      state: "California",
      street: "12100 Portola Springs",
      zip: "92618"
    },
    3: {
      city: "Anaheim",
      classes: [],
      district: "AUSD",
      langRequest: "English",
      name: "Savanna High School",
      partnerId: 3,
      partnerType: "Public Schools",
      state: "Arkansas",
      street: "301 N Gilbert St",
      zip: "92801"
    }
  }

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = () => {
      // return whatever getContext has to return
    };
  });

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe('program', () => {
    test('render program list', () => {
      act(() => {
        render(<GlobalContext.Provider value={{programData}}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });
      const programNames = container.querySelectorAll('h2');
      expect(programNames.length).toBe(3);

      const programs = Object.values(programData);
      for (let i = 0; i < programNames.length; i++) {
        expect(programNames[i].innerHTML).toBe(programs[i].name);
      }
    });

    test('render program list filter', async () => {
      act(() => {
        render(<GlobalContext.Provider value={{programData}}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      let filterInput = document.querySelector('input[placeholder="Program name"]');
      expect(filterInput).toBeNull();

      const filterButton = container.querySelector('button[data-testid="filter"]');
      await act(async() => {
        filterButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      filterInput = document.querySelector('input[placeholder="Program name"]');

      expect(filterInput).not.toBeNull();

      act(() => {
        fireEvent.change(filterInput, {target: {value: "Coding Games"}})
      });

      const programNames = container.querySelectorAll('h2');
      expect(programNames.length).toBe(1);
      expect(programNames[0].innerHTML).toBe(programData[2].name);
    });

    test('add program', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });
      axios.post.mockResolvedValueOnce(null);

      const getProgramsAfterAdd = jest.fn();
      const getPartnersAfterAdd = jest.fn();

      act(() => {
        render(<GlobalContext.Provider
          value={{
            programData,
            fetchProgramsAggregatedForCurrentSeason: getProgramsAfterAdd,
            fetchPartnersAggregatedForCurrentSeason: getPartnersAfterAdd
          }}
        >
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const addBtn = container.querySelector('button[data-testid="addBtn"]');

      await act(async() => {
        addBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let modal = document.querySelector('[role="dialog"]');

      expect(modal).not.toBeNull();

      const addProgramSubmit = document.querySelector('button[data-testid="addProgramSubmit"]');

      await act(async() => {
        addProgramSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(modal).not.toBeNull();

      const programName = document.querySelector('input[required]');

      act(() => {
        fireEvent.change(programName, {target: {value: "test 5"}});
      });

      await act(async() => {
        addProgramSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      modal = document.querySelector('[role="dialog"]');
      expect(modal).toBeNull();

      expect(getProgramsAfterAdd).toBeCalledTimes(1);
      expect(getPartnersAfterAdd).toBeCalledTimes(1);
    });

    test('delete program', async () => {
      const getProgramsAfterAdd = jest.fn();
      const getPartnersAfterAdd = jest.fn();

      act(() => {
        render(<GlobalContext.Provider
          value={{
            programData,
            fetchProgramsAggregatedForCurrentSeason: getProgramsAfterAdd,
            fetchPartnersAggregatedForCurrentSeason: getPartnersAfterAdd
          }}
        >
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const programNames = container.querySelectorAll('h2');

      let deleteProgram = container.querySelector('button[data-testid="deleteProgram"]');
      expect(deleteProgram).toBeNull();

      await act(async() => {
        programNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      deleteProgram = container.querySelector('button[data-testid="deleteProgram"]');

      expect(deleteProgram).not.toBeNull();

      await act(async() => {
        deleteProgram.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const deleteConfirm = document.querySelector('button[data-testid="deleteConfirm"]');

      await act(async() => {
        deleteConfirm.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterAdd).toBeCalledTimes(1);
      expect(getPartnersAfterAdd).toBeCalledTimes(0);
    });
  });

  describe('class', () => {
    const seasonSelected = {
      endDate: "2021-06-04T16:00:00.000Z",
      name: "Winter 2021",
      seasonId: 1,
      startDate: "2021-05-30T16:00:00.000Z",
    };

    const partnerData = [
      {
        city: "Irvine",
        classes: [],
        district: "IUSD",
        langRequest: "English",
        name: "Portola Springs Elementary",
        partnerId: 2,
        partnerType: "Public Schools",
        state: "California",
        street: "12100 Portola Springs",
        zip: "92618"
      },
      {
        city: "Anaheim",
        classes: [],
        district: "AUSD",
        langRequest: "English",
        name: "Savanna High School",
        partnerId: 3,
        partnerType: "Public Schools",
        state: "Arkansas",
        street: "301 N Gilbert St",
        zip: "92801",
      },
      {
        city: "Irvine",
        classes: [],
        district: "United State",
        langRequest: "C++",
        name: "Testing6",
        partnerId: 22,
        partnerType: "Private Schools",
        state: "California",
        street: "487 Stanford Court",
        zip: "92612",
      }
    ];

    test('render class list', async () => {
      act(() => {
        render(<GlobalContext.Provider value={{programData}}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const programNames = container.querySelectorAll('h2');

      await act(async() => {
        programNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const classNames = container.querySelectorAll('h5');
      expect(classNames.length).toBe(3);

      const classes = Object.values(programData)[0].classes;
      const instructorNumber = classes.reduce((total, cls) => total += cls.instructorsNeeded, 0);
      expect(classNames[0].textContent).toBe(instructorNumber + ' instructors');
      expect(classNames[1].textContent).toMatch(classes[0].name);
      expect(classNames[2].textContent).toMatch(classes[1].name);
    });

    test('add class', async () => {
      axios.post.mockResolvedValueOnce(null);

      const getProgramsAfterAdd = jest.fn();
      const getPartnersAfterAdd = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          seasonSelected,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterAdd,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterAdd
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const programNames = container.querySelectorAll('h2');

      await act(async() => {
        programNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const addClass = container.querySelector('button[data-testid="addClass"]');

      await act(async() => {
        addClass.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let createClassTitle = document.querySelector('.modal-title.h4');
      expect(createClassTitle.textContent).toMatch('Create a new class for');

      const addClassSubmit = document.querySelector('button[data-testid="addClassSubmit"]');
      await act(async() => {
        addClassSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      createClassTitle = document.querySelector('.modal-title.h4');
      expect(createClassTitle).not.toBeNull();

      const classPartnersSelect = document.querySelector('div[data-testid="classPartners"] select:nth-child(1)');

      const { partnerId, district, name } =  partnerData[0];
      const value = `${partnerId} - ${district} ${name}`;

      act(() => {
        fireEvent.change(classPartnersSelect, {target: {value}});
      });

      await act(async() => {
        addClassSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      createClassTitle = document.querySelector('.modal-title.h4');
      expect(createClassTitle).toBeNull();

      expect(getProgramsAfterAdd).toBeCalledTimes(1);
      expect(getPartnersAfterAdd).toBeCalledTimes(1);
    });

    test('edit class', async () => {
      axios.put.mockResolvedValueOnce(null);

      const getProgramsAfterAdd = jest.fn();
      const getPartnersAfterAdd = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          seasonSelected,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterAdd,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterAdd
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const programNames = container.querySelectorAll('h2');

      await act(async() => {
        programNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const editClasses = container.querySelectorAll('button[data-testid="editClass"]');

      await act(async() => {
        editClasses[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let createClassTitle = document.querySelector('.modal-title.h4');
      expect(createClassTitle.textContent).toMatch('Edit the class for');

      const classPartnersSelect = document.querySelector('div[data-testid="classPartners"] select:nth-child(1)');

      expect(classPartnersSelect.value).not.toBeNull();

      const editClassSubmit = document.querySelector('button[data-testid="addClassSubmit"]');

      await act(async() => {
        editClassSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      createClassTitle = document.querySelector('.modal-title.h4');
      expect(createClassTitle).toBeNull();

      expect(getProgramsAfterAdd).toBeCalledTimes(1);
      expect(getPartnersAfterAdd).toBeCalledTimes(1);
    });

    test('delete class', async () => {
      axios.delete.mockResolvedValueOnce(null);

      const getProgramsAfterAdd = jest.fn();
      const getPartnersAfterAdd = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          seasonSelected,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterAdd,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterAdd
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const programNames = container.querySelectorAll('h2');

      await act(async() => {
        programNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const deleteClasses = container.querySelectorAll('button[data-testid="deleteClass"]');

      await act(async() => {
        deleteClasses[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let deleteConfirm = document.querySelector('button[data-testid="deleteConfirm"]');

      await act(async() => {
        deleteConfirm.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterAdd).toBeCalledTimes(1);
      expect(getPartnersAfterAdd).toBeCalledTimes(0);
    });
  });

  describe('partner', () => {
    test('render partner list', async () => {
      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          partnerData
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const select = container.querySelector('select');
      act(() => {
        fireEvent.change(select, {target: {value: "Partners"}});
      });

      const partnerNames = container.querySelectorAll('h2');
      expect(partnerNames.length).toBe(2);

      const partners = Object.values(partnerData);
      for (let i = 0; i < partnerNames.length; i++) {
        expect(partnerNames[i].innerHTML).toBe(partners[i].name);
      }
    });

    test('edit partner', async () => {
      axios.put.mockResolvedValueOnce(null);

      const getProgramsAfterEdit = jest.fn();
      const getPartnersAfterEdit = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterEdit,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterEdit
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const select = container.querySelector('select');
      act(() => {
        fireEvent.change(select, {target: {value: "Partners"}});
      });

      const partnerNames = container.querySelectorAll('h2');

      await act(async() => {
        partnerNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const editPartner = container.querySelector(`button[data-testid="editPartner"]`);
      await act(async() => {
        editPartner.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const inputs = document.querySelectorAll('input[required]');

      expect(inputs[0].value).toBe(partnerData[2].name);

      act(() => {
        fireEvent.change(inputs[0], {target: {value: inputs[0].value + "111"}});
      });

      const addPartnerSubmit = document.querySelector('button[data-testid="addPartnerSubmit"]');
      await act(async() => {
        addPartnerSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterEdit).toBeCalledTimes(1);
      expect(getPartnersAfterEdit).toBeCalledTimes(1);
    });

    test('duplicate partner', async () => {
      axios.put.mockResolvedValueOnce(null);

      const getProgramsAfterEdit = jest.fn();
      const getPartnersAfterEdit = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterEdit,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterEdit
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const select = container.querySelector('select');
      act(() => {
        fireEvent.change(select, {target: {value: "Partners"}});
      });

      const partnerNames = container.querySelectorAll('h2');

      await act(async() => {
        partnerNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const duplicatePartner = container.querySelector(`button[data-testid="duplicatePartner"]`);
      await act(async() => {
        duplicatePartner.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const inputs = document.querySelectorAll('input[required]');

      expect(inputs[0].value).toBe("");

      act(() => {
        fireEvent.change(inputs[0], {target: {value: inputs[0].value}});
      });

      const addPartnerSubmit = document.querySelector('button[data-testid="addPartnerSubmit"]');
      await act(async() => {
        addPartnerSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterEdit).toBeCalledTimes(0);
      expect(getPartnersAfterEdit).toBeCalledTimes(0);

      act(() => {
        fireEvent.change(inputs[0], {target: {value: inputs[0].value + "111"}});
      });

      await act(async() => {
        addPartnerSubmit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterEdit).toBeCalledTimes(1);
      expect(getPartnersAfterEdit).toBeCalledTimes(1);
    });

    test('delete partner', async () => {
      axios.delete.mockResolvedValueOnce(null);

      const getProgramsAfterEdit = jest.fn();
      const getPartnersAfterEdit = jest.fn();

      act(() => {
        render(<GlobalContext.Provider value={{
          programData,
          partnerData,
          fetchProgramsAggregatedForCurrentSeason: getProgramsAfterEdit,
          fetchPartnersAggregatedForCurrentSeason: getPartnersAfterEdit
        }}>
          <ClassesPartners/>
        </GlobalContext.Provider>, container);
      });

      const select = container.querySelector('select');
      act(() => {
        fireEvent.change(select, {target: {value: "Partners"}});
      });

      const partnerNames = container.querySelectorAll('h2');

      await act(async() => {
        partnerNames[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const deletePartner = container.querySelector(`button[data-testid="deletePartner"]`);
      await act(async() => {
        deletePartner.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const deletePartnerConfirm = document.querySelector('button[data-testid="deletePartnerConfirm"]');

      await act(async() => {
        deletePartnerConfirm.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getProgramsAfterEdit).toBeCalledTimes(0);
      expect(getPartnersAfterEdit).toBeCalledTimes(1);
    });
  });
});

