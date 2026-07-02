import NavigationLink from "./NavigationLink";

export default function Navbar() {
  return (
    <nav className="flex items-center px-8 py-4 border-b border-gray-200">
      <div className="w-1/4">
        <span className="text-lg font-bold text-gray-800">
          Employee Management
        </span>
      </div>

      <div className="flex flex-1 justify-center gap-8">
        <NavigationLink to="/employees" label="Employees" />
        <NavigationLink to="/departments" label="Departments" />
        {/* <NavigationLink to="/designations" label="Designations" /> */}
      </div>

      <div className="w-1/4" />
    </nav>
  );
}
