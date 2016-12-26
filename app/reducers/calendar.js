import $ from 'jquery';

import { initialCalendar } from './helpers'; // Reducer related helper file
import { findCalObj, findData } from '../helpers'; // General helper functions

const populateNew = (classes, currentTerm, currentCalendar, classData) => {
  // Populate new sections array
  const newClasses = [];
  classes.forEach((term) => {
    if (term.id === currentTerm) {
      // Populate new data array
      const newTerm = {
        id: term.id,
        items: []
      };
      term.items.forEach((cal) => {
        if (cal.id === currentCalendar) {
          const newCal = {
            id: cal.id,
            name: cal.name,
            data: classData
          };
          newTerm.items.push(newCal);
        } else {
          newTerm.items.push(cal);
        }
      });
      newClasses.push(newTerm);
    } else newClasses.push(term);
  });
  return newClasses;
};

const filterClasses = (classes, classId, currentTerm, currentCalendar) => {
  const newClassData = [];
  const calObj = findCalObj(classes, currentTerm, currentCalendar);
  calObj.data.forEach((coursecomp) => {
    if (coursecomp.id !== classId) newClassData.push(coursecomp);
  });
  const newClasses = populateNew(classes, currentTerm, currentCalendar, newClassData);
  return newClasses;
};

function calendar(state = initialCalendar, action, currentTerm) {
  let newState = {};
  switch (action.type) {
    case 'ADD_COURSE':
    case 'ADD_COURSE_SEARCH': {
      // Find corresponding calendar object data
      const sectionData = findData(state.sections, currentTerm, state.currentCalendar);
      sectionData.push(action.section);
      const newSections = populateNew(state.sections, currentTerm, state.currentCalendar, sectionData);
      return {
        currentCalendar: state.currentCalendar,
        sections: newSections,
        components: state.components,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'ADD_COMPONENT':
    case 'ADD_COMPONENT_SEARCH':
    case 'ADD_COMPONENT_CART': {
      // Find corresponding term object
      const componentData = findData(state.components, currentTerm, state.currentCalendar);
      if (componentData) {
        componentData.push(action.detail);
        const newComponents = populateNew(state.components, currentTerm, state.currentCalendar, componentData);
        return {
          currentCalendar: state.currentCalendar,
          sections: state.sections,
          components: newComponents,
          hover: state.hover,
          eventOpen: state.eventOpen,
          selectedEvents: state.selectedEvents
        };
      } // If no term object is found
      return {
        currentCalendar: state.currentCalendar,
        sections: state.sections,
        components: state.components.concat({
          id: currentTerm,
          items: [{
            id: 1,
            name: 'Calendar 1',
            data: [action.detail]
          }]
        }),
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'REMOVE': {
      // Take out any matching ids to sectionId in sections
      const newSections = filterClasses(state.sections, action.sectionId, currentTerm, state.currentCalendar);
      // Take out any matching ids to sectionId in components
      const newComponents = filterClasses(state.components, action.sectionId, currentTerm, state.currentCalendar);
      return {
        currentCalendar: state.currentCalendar,
        sections: newSections,
        components: newComponents,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'SWAP_COMPONENT': {
      // Remove currently selection component
      const newComponents = filterComponents(state.components, action.sectionId, currentTerm, state.currentCalendar);
      return {
        currentCalendar: state.currentCalendar,
        sections: state.sections,
        components: newComponents,
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    case 'SELECT_EVENT':
      return {
        currentCalendar: state.currentCalendar,
        sections: state.sections,
        components: state.components,
        hover: state.hover,
        eventOpen: true,
        selectedEvents: action.coursecomps
      };
    case 'CLOSE_EVENT_DIALOG':
      return {
        currentCalendar: state.currentCalendar,
        sections: state.sections,
        components: state.components,
        hover: state.hover,
        eventOpen: false,
        selectedEvents: state.selectedEvents
      };
    case 'ADD_COURSE_HOVER':
      newState = {
        hover: {
          section: action.section,
          component: null
        }
      };
      break;
    case 'ADD_COMPONENT_HOVER':
      newState = {
        hover: {
          section: null,
          component: action.detail
        }
      };
      break;
    case 'REMOVE_HOVER':
      return {
        currentCalendar: state.currentCalendar,
        sections: state.sections,
        components: state.components,
        hover: {
          section: null,
          component: null
        },
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    case 'FIRST_CALENDAR': {
      // Do nothing if already populated
      let populated = false;
      state.sections.forEach((term) => {
        if (term.id === currentTerm) populated = true;
      });
      if (populated) return state;
      // Otherwise initialize a new calendar for the new term
      return {
        currentCalendar: 1,
        sections: state.sections.concat({
          id: currentTerm,
          items: [{
            id: 1,
            name: 'Calendar 1',
            data: []
          }]
        }),
        components: state.sections.concat({
          id: currentTerm,
          items: [{
            id: 1,
            name: 'Calendar 1',
            data: []
          }]
        }),
        hover: state.hover,
        eventOpen: state.eventOpen,
        selectedEvents: state.selectedEvents
      };
    }
    default:
      return state;
  }
  return $.extend(true, {}, state, newState);
}

export default calendar;
