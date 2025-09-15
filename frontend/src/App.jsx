import React from "react";
import Header from './components/headers/Header';
import Footer from './components/footers/Footer';
import AppRoutes from './AppRoutes';


export default function App() {

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <Header />
      <main className="flex-grow mx-auto max-w-6xl px-4 py-20">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}