import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="flex-shrink-0">
    <Link to="/" className="text-2xl font-bold font-sans tracking-tight">
      TasteHub
    </Link>
  </div>
);

export default React.memo(Logo);