import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

import { categoryIcon } from "../../../cms/icons";

const ProductDropdown = ({ categories, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

  return (
    <div className="relative inline-block z-10">
      <button
        className="h-[48px] border-2 border-accent2 text-accent2 w-fit gap-2 group flex baseline justify-center items-center rounded-full px-6 py-2 hover:bg-accent2 hover:text-background transition-all ease-in cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Categories
        <FaChevronLeft
          size={16}
          className={`text-accent2 transition-transform group-hover:text-background duration-300 ease-in-out ${
            isOpen ? "rotate-90" : "rotate-270"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-60 bg-white shadow-lg rounded-[12px] border-2 border-[#6F746F4D] py-4">
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => {
                setSelected(category.name);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition-all flex items-center gap-2 ${
                selected === category.name
                  ? "text-accent1 font-bold"
                  : "hover:text-textprimary hover:font-semibold"
              }`}
            >
              {selected === category.name ? (
                <div className="w-2 h-2 rounded-full bg-accent1"></div>
              ) : (
                categoryIcon(category.iconKey)
              )}
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductDropdown;
