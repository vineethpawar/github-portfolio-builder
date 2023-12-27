import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const myContext = React.createContext();

const Provider = props => {
  const [profile, setProfile] = useState({});
  // get profile
  useEffect(() => {
    homeSectionService?.getProfile('vineethpawar')?.then(res => {
      setProfile(res);
    });
  }, []);

  return (
    <myContext.Provider
      value={{
        profile,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

const IndexPage = ({ location }) => (
  <Provider>
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Projects />
        <Contact />
      </StyledMainContainer>
    </Layout>
  </Provider>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
