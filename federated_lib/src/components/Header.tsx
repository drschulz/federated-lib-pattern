import React from 'react';

export interface HeaderProps {
  title: string;
  backgroundColor: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header style={{ position: 'fixed', width: '100%', height: '80px', padding: '20px', backgroundColor: props.backgroundColor, color: 'white', top: '0', left: '0' }}>
      <h1>{props.title}</h1>
    </header>
  )
}

export default Header;