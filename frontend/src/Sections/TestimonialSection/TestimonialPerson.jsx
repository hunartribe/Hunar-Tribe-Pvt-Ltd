import React from "react";

const TestimonialPerson = ({ name, place, photo }) => {
  return (
    <article className="persondetails flex justify-center items-center px-4 py-2 gap-4">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : null}
      <div className="content flex flex-col justify-center items-center gap-0">
        <p className="name text-[18px] text-accent2 font-bold">{name}</p>
        <p className="place text-textsecondary -mt-1">{place}</p>
      </div>
    </article>
  );
};

export default TestimonialPerson;
