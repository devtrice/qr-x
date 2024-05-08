"use client";
import Link from "next/link";

function FeaturedCourses() {


  return (
    <div className="py-12">
      <div>
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-teal-600 uppercase">
            FEATURED COURSES
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-white sm:text-4xl">
            Learn With the Best
          </p>
        </div>
      </div>
      <div className="mx-8 mt-10">
        <div className="grid justify-center grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link
          href={"/courses"}
          className="px-4 py-2 transition duration-200 bg-white border rounded-3xl border-neutral-600 text-neutral-700 hover:bg-gray-100"
        >
          View All courses
        </Link>
      </div>
    </div>
  );
}

export default FeaturedCourses;
