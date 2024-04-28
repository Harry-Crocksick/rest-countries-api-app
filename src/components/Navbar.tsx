import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-16 py-4 shadow-md">
      <h1 className="font-extrabold text-xl">
        <Link to="/">Where in the world?</Link>
      </h1>
      <div className="font-semibold">Dark Mode</div>
    </nav>
  );
}
