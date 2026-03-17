import { Outlet, Link, useLocation } from "react-router";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Interests", path: "/interests" },
    { name: "Skills", path: "/skills" },
    { name: "Statistics", path: "/statistics" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      {/* Global Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-[#1E90FF] border-b-2 border-[#1E90FF]"
                      : "text-[#2D3436] hover:text-[#1E90FF]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            © 2026 Chung Yeonu. Built with Vibe Coding.
          </p>
        </div>
      </footer>
    </div>
  );
}