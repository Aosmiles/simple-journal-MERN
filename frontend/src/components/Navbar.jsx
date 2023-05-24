import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link className="underline" to="/">
          Home
        </Link>
        <Link className="underline" to="/">
          About
        </Link>
        <Link className="underline" to="/">
          Bye
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
