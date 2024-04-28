import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Country } from "../utils/types";
import { baseUrl } from "../utils/constants";

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/all`)
      .then((res) => res.json())
      .then((result) => setCountries([...result]));
  }, []);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-12 px-16 py-8">
      {countries.map((country) => (
        <Link
          to={`/name/${country.name.common.toLowerCase()}`}
          key={country.population}
          className="block mb-2 col-span-2 rounded-md shadow-lg hover:shadow-xl overflow-hidden transition-shadow"
        >
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            title={country.flags.alt}
            className="object-contain md:object-cover object-center w-full h-52 aspect-square"
          />
          <div className="py-6 px-4">
            <h2 className="font-bold text-black text-lg mb-4">
              {country.name.common}
            </h2>
            <p className="text-slate-500">
              <span className="font-medium text-black">Population:</span>{" "}
              {country.population}
            </p>
            <p className="text-slate-500">
              <span className="font-medium text-black">Region:</span>{" "}
              {country.region}
            </p>
            <p className="text-slate-500">
              <span className="font-medium text-black">Capital:</span>{" "}
              {country.capital}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
