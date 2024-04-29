import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import { CountryType } from "../utils/types";

export default function CountryCard() {
  const [country, setCountry] = useState<CountryType[]>([]);
  const { countryName } = useParams();

  useEffect(() => {
    fetch(`${baseUrl}/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((result) => setCountry(result));
  }, [countryName]);

  return (
    <section className="px-16 py-8">
      <Link
        to="/"
        className="px-8 py-1.5 border border-slate-900/5 shadow-xl rounded-md"
      >
        Back
      </Link>
      {country.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 justify-center items-center my-20"
        >
          <div className="overflow-hidden w-[590px] h-[350px] ring-1 ring-slate-900/5 shadow-md">
            <img
              src={item.flags.svg}
              alt={item.flags.alt}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-black font-extrabold text-2xl mb-8">
              {item.name.common}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold text-black text-lg">
                    Native Name:
                  </span>{" "}
                  {item.name.common}
                </p>
                <p>
                  <span className="font-semibold text-black text-lg">
                    Population:
                  </span>{" "}
                  {item.population}
                </p>
                <p>
                  <span className="font-semibold text-black text-lg">
                    Region:
                  </span>{" "}
                  {item.region}
                </p>
                <p>
                  <span className="font-semibold text-black text-lg">
                    Sub Region:
                  </span>{" "}
                  {item.subregion}
                </p>
                <p>
                  <span className="font-semibold text-black text-lg">
                    Capital:
                  </span>{" "}
                  {item.capital}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold text-lg text-black">
                    Top Level Domain:
                  </span>{" "}
                  {item.tld}
                </p>
                <p>
                  <span className="font-semibold text-lg text-black">
                    Currencies:
                  </span>{" "}
                  {Object.keys(item.currencies).join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-lg text-black">
                    Languages:
                  </span>{" "}
                  {Object.values(item.languages).join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-12">
              <span className="font-semibold text-xl text-black">
                Border Countries:
              </span>{" "}
              {item.borders ? item.borders.join(", ") : "none"}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
