import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import { Country } from "../utils/types";

export default function CountryCard() {
  const [country, setCountry] = useState<Country[]>([]);
  const { countryName } = useParams();

  useEffect(() => {
    fetch(`${baseUrl}/name/${countryName}`)
      .then((res) => res.json())
      .then((result) => setCountry(result));
  }, [countryName]);

  return (
    <h1>
      {country.map((item) => (
        <li key={item.name.official}>{item.name.official}</li>
      ))}
    </h1>
  );
}
