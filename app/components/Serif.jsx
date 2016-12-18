import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';

import CurrentlyBrowsing from './CurrentlyBrowsing.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import CalendarContainer from '../containers/CalendarContainer.jsx';
import BrowseContainer from '../containers/BrowseContainer.jsx';

const style = {
  column: {
    paddingRight: 0,
    paddingLeft: 0
  },
  browse: {
    maxHeight: '675px',
    overflow: 'scroll'
  }
};

const Serif = () => (
  <Grid fluid>
    <Row>
        {/* The order of the columns is switched:
          the first one is on the right and the second one is on the left.
          (push and pull boot strap column functionality) */}
      <Col style={style.column} md={3} mdPush={9}>
        <Card>
          <CardText>
            <CurrentlyBrowsing />
          </CardText>
        </Card>

        <Tabs>
          <Tab label="Search">
            <Card>
              <CardText>
                <SearchContainer />
              </CardText>
            </Card>
          </Tab>

          <Tab label="Browse">
            <Card style={style.browse}>
              <CardText>
                <BrowseContainer />
              </CardText>
            </Card>
          </Tab>

          <Tab label="Cart">
            <Card>
              <CardText>
              </CardText>
            </Card>
          </Tab>
        </Tabs>
      </Col>

      <Col style={style.column} md={9} mdPull={3}>
        <CalendarContainer />
      </Col>
    </Row>
  </Grid>
);

export default Serif;
