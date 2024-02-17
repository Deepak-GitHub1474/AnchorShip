// Install this package to use auto typing: npm install typed.js

import { useEffect } from 'react';
import Typed from 'typed.js';

const AutoType = () => {

  useEffect(() => {
    const autoType = new Typed(".auto-type", {
      strings : ["Get Dream Job", "Full Stack Developer", "Data Scientist",],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      cursorChar: '<span style="color: #e86969; font-size:1.5rem; margin-left:5px">|</span>'
    });

    return () => {
      autoType.destroy();
    };
  }, []);

  return (
    <div className="sm:text-4xl text-2xl font-semibold">
        <span className="text-[#e86969]">&lt;</span>
        <span className="auto-type text-[#e86969]"></span>
        <span className="text-[#e86969]">&gt;</span>
    </div>
  );
};

export default AutoType;
