// src/components/layout/Footer.jsx
/*
PURPOSE:
Footer shown on every page.
*/

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-400 py-6 text-center mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} ManhwaSensei | Built with MERN ❤️
      </p>
    </footer>
  );
}
