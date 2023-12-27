import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import styled from 'styled-components';
import { myContext } from '../../pages';

const StyledHeroSection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const profile = React.useContext(myContext)?.profile;
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const hi = <h1>Hi, my name is</h1>;
  const name = <h2 className="big-heading">{profile?.name}</h2>;
  const bio1 = <h3 className="big-heading">{profile?.bio || ''}</h3>;
  const bio2 = <h3 className="medium-heading">{profile?.bio || ''}</h3>;
  const bio3 = (
    <>
      <p>{profile?.bio || ''}.</p>
    </>
  );
  const five = (
    <a className="email-link" href={'mailto:' + profile?.email} target="_blank" rel="noreferrer">
      Shoot a mail!
    </a>
  );
  const bioLength = profile?.bio?.length;
  const items = [hi, name, bioLength < 25 ? bio1 : bioLength < 35 ? bio2 : bio3, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <div className="inner">
          <StyledText>
            <TransitionGroup>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </StyledText>
          <StyledPic>
            <TransitionGroup>
              {isMounted && (
                <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                  <div className="wrapper" style={{ transitionDelay: '100ms' }}>
                    <img
                      className="img"
                      src={'https://avatars.githubusercontent.com/u/55575881?v=4'}
                      width={500}
                    />
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </StyledPic>
        </div>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
