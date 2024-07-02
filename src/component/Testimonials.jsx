import React ,{useEffect}from 'react';

import ScrollReveal from 'scrollreveal';


function Testimonials() {
  useEffect(() => {
    ScrollReveal().reveal('.test', {
      origin: 'left',
      distance: '800px',
      duration: 700,
      delay: 100,
      reset: true,
    });
  }, []);
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Wide Range of Products</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 my-6 test">
          <p className="text-lg italic mb-4">
            "Littlenest offers an extensive selection of baby products, from clothing and toys to nursery furniture and feeding supplies."
          </p>
          <div className="flex justify-center items-center mb-2">
            <span className="text-yellow-500">★★★★☆</span>
          </div>
          <p className="font-semibold">Sahad - Pandallur</p>
        </div>
        <div className="flex justify-between items-center text-gray-500 mt-6">
          <button className="p-2 hover:text-black">&lt;</button>
          <button className="p-2 hover:text-black">&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
