// src/components/NavigationLink.jsx
import { NavLink } from "react-router-dom";

export default function NavigationLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium pb-1 transition-colors duration-200 ${
          isActive
            ? "text-black border-b-2 border-black"
            : "text-gray-500 hover:text-black"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
