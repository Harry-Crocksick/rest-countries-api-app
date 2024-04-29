import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import { CountryType } from "../utils/types";

export default function TypeCard() {
  const [country, setCountry] = useState<CountryType[]>([]);
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
