import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-100 fixed w-full opacity-70 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            
              <img loading="lazy" className="h-16 w-16" src="/img/logo.png" alt="Logo" />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link href="/" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md font-bold font-italic text-2xl">
                    Movies
                
                </Link>
                <Link href="/MejorValoradas" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-bold">
                    Mejor valoradas
                  
                </Link>
                <Link href="/EnCartelera" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-bold">
                    En cartelera
                </Link>
                <Link href="/Proximamente" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-bold">
                    Proximamente
                </Link>
                <Link href="/Populares" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-bold">
                    Populares
                </Link>
                <Link href="/Personas" className="text-dark hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-bold">
                    Actores
                </Link>
                {/* Agrega más enlaces aquí */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
