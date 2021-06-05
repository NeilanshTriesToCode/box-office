// React Component for Title of the app
import React from 'react';
import { TitleWrapper } from './Title.styled';

const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </TitleWrapper>
  );
};

export default Title;
