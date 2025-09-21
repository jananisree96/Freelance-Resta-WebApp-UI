
import React from 'react';

// For "Branches" stat card
const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375M9 12h6.375m-6.375 5.25h6.375M5.25 6h.008v.008H5.25V6Zm.75 5.25h.008v.008H6v-.008Zm-.75 5.25h.008v.008H5.25v-.008Zm13.5-5.25h.008v.008h-.008v-.008Zm-.75 5.25h.008v.008h-.008v-.008Zm.75-10.5h.008v.008h-.008V6Z" />
  </svg>
);

export default BuildingIcon;
