import React from 'react';

const TowTruckLogo = ({ className }) => (
  <svg viewBox="0 0 130 60" fill="currentColor" className={className}>
    <path d="M 65 50 H 125 A 3 3 0 0 0 128 47 V 33 C 128 31 125 31 125 31 H 115 V 18 A 3 3 0 0 0 112 15 H 95 A 3 3 0 0 0 92 18 V 33 H 65 Z" />
    <path d="M 96 19 H 110 V 30 H 96 Z" fill="white" />
    <path d="M 85 33 L 55 5 H 50 V 10 L 78 33 Z" />
    <rect x="48" y="5" width="4" height="35" />
    <circle cx="102" cy="50" r="8" fill="white" />
    <circle cx="102" cy="50" r="4" fill="currentColor" />
    
    <g transform="translate(0, 20) rotate(-18 25 30)">
      <path d="M 5 30 C 5 20 15 15 25 15 H 40 C 45 15 50 20 50 25 V 35 H 5 Z" />
      <path d="M 22 18 H 35 C 38 18 42 22 42 25 H 18 Z" fill="white" />
      <path d="M 42 12 V 16 M 48 13 V 17 M 40 12 H 50" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="15" cy="35" r="6" fill="white" />
      <circle cx="15" cy="35" r="3" fill="currentColor" />
      <circle cx="40" cy="35" r="6" fill="white" />
      <circle cx="40" cy="35" r="3" fill="currentColor" />
    </g>
  </svg>
);

export default TowTruckLogo;
