import React from 'react';
import styled from 'styled-components';

const Monogram = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  letter-spacing: -0.05em;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    background: #fff;
    color: #000;
    padding: 2px 6px;
    border-radius: 2px;
  }
`;

const StudioLogo = () => {
  return (
    <Monogram>
      <span>MD</span> Metaphors Design
    </Monogram>
  );
};

export default StudioLogo;
