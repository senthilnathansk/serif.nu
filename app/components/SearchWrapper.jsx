import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';

import Search from './Search.jsx';
import Sections from './Sections.jsx';
import Components from './Components.jsx';

const style = {
  icon: {
    verticalAlign: 'middle'
  },
  loading: {
    display: 'block',
    margin: 'auto'
  },
  divider: {
    marginBottom: '10px'
  }
};

const SearchWrapper = ({
  searchData,
  isFetching,
  currentView,
  selected,
  sections,
  details,
  calendar,
  checkComponents,
  addCourse,
  addComponent,
  onSelect
}) => {
  let view = null;
  const header = (
    <div>
      <h3>{`${selected.subject} ${selected.course}`}</h3>
      <Divider style={style.divider} />
    </div>
  );
  if (currentView === 'search') {
    view = <Search searchData={searchData} onSelect={onSelect} />;
  } else if (currentView === 'sections') {
    view = (
      <div>
        {header}
        <Sections
          selected={selected}
          sections={sections}
          calendar={calendar}
          checkComponents={checkComponents}
          addCourse={addCourse}
        />
      </div>
    );
  } else if (currentView === 'components') {
    view = (
      <div>
        {header}
        <Components
          selected={selected}
          sections={sections}
          details={details}
          addComponent={addComponent}
        />
      </div>
    );
  }
  if (!isFetching) {
    return view;
  }
  // If data has not yet loaded
  return <CircularProgress style={style.loading} />;
};

SearchWrapper.propTypes = {
  searchData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isFetching: React.PropTypes.bool,
  currentView: React.PropTypes.string,
  selected: React.PropTypes.shape({
    school: React.PropTypes.string,
    subject: React.PropTypes.string,
    course: React.PropTypes.string,
    section: React.PropTypes.string
  }),
  sections: React.PropTypes.arrayOf(React.PropTypes.object),
  calendar: React.PropTypes.shape({
    sections: React.PropTypes.array,
    components: React.PropTypes.array
  }),
  checkComponents: React.PropTypes.func,
  addCourse: React.PropTypes.func,
  onSelect: React.PropTypes.func
};

export default SearchWrapper;
