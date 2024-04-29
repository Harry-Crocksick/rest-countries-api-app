import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CountryType } from "../utils/types";
import { baseUrl } from "../utils/constants";

export default function Countries() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const url =
      selected === "all"
        ? `${baseUrl}/all`
        : `${baseUrl}/region/${selected.toLowerCase()}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setCountries([...result]);
        setIsLoading(false);
      });
  }, [selected]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase().trim())
  );

  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          <option value="all">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-12 px-16 py-8">
        {filteredCountries.map((country, index) => (
          <Link
            to={`/name/${country.name.common.toLowerCase()}`}
            key={index}
            className={`block mb-2 col-span-2 rounded-md shadow-lg hover:shadow-xl overflow-hidden transition-shadow ${
              isLoading && "opacity-50"
            }`}
          >
            <img
              src={country.flags.svg}
              alt={country.flags.alt}
              title={country.flags.alt}
              className="object-contain md:object-cover object-center w-full h-52 aspect-square"
            />
            <div className="py-6 px-4">
              <h2 className="font-bold text-black text-lg mb-4">
                {country.name.common.split("").map((char, index) =>
                  input.toLowerCase().includes(char.toLowerCase()) ? (
                    <span key={index} className="bg-yellow-100">
                      {char}
                    </span>
                  ) : (
                    <span key={index}>{char}</span>
                  )
                )}
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
    </>
  );
}
