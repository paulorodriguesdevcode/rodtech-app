"use client";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">RodTech</h1>
      </header>

      <main className="flex-grow p-8 space-y-12">
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 p-8 rounded-lg shadow-lg text-white">
  <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
  <p className="text-lg leading-relaxed mb-4">
    Na <strong>RodTech</strong>, somos especialistas em criar soluções tecnológicas sob medida. Com uma abordagem centrada no cliente, transformamos ideias em realidades digitais, impulsionando a eficiência e a inovação em cada projeto.
  </p>
  <p className="text-lg leading-relaxed">
    Nossa equipe é composta por profissionais apaixonados pela tecnologia, prontos para enfrentar os desafios de diversos setores e entregar resultados de alta qualidade.
  </p>
  <div className="mt-6 flex justify-center">
    <a href="https://wa.me/553192727158" className="bg-white text-indigo-800 font-semibold py-2 px-4 rounded shadow hover:bg-indigo-200 transition duration-300">
      Conheça Nossos Serviços
    </a>
  </div>
</section>

<section className="bg-gradient-to-r from-indigo-900 to-indigo-800 p-8 rounded-lg shadow-lg text-white">
  <h2 className="text-4xl font-bold mb-6">Serviços</h2>
  <ul className="list-disc list-inside text-lg space-y-2">
    <li className="hover:text-indigo-300 transition duration-300">🔧 <strong>Consultoria Técnica</strong>: Auxílio estratégico para otimizar processos.</li>
    <li className="hover:text-indigo-300 transition duration-300">🖥️ <strong>Desenvolvimento Sob Demanda</strong>: Soluções personalizadas para suas necessidades.</li>
    <li className="hover:text-indigo-300 transition duration-300">🔗 <strong>Integração de Sistemas</strong>: Conectando suas ferramentas de forma eficiente.</li>
    <li className="hover:text-indigo-300 transition duration-300">🛠️ <strong>Suporte Contínuo</strong>: Garantia de qualidade e suporte a longo prazo.</li>
  </ul>
</section>
<section className="bg-gradient-to-r from-indigo-900 to-indigo-800 p-8 rounded-lg shadow-lg text-white mt-8">
  <h2 className="text-4xl font-bold mb-4">Contato</h2>
  <p className="text-lg mb-4">Fale conosco pelo WhatsApp:</p>
  <a
    href="https://wa.me/553192727158"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-400 text-2xl font-bold hover:text-green-300 transition duration-300"
  >
    +55 31 9272-7158
  </a>
</section>

        
        
      </main>

      <footer className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 text-white p-4 text-center">
        <p>Desenvolvido com ♥ por ⚡Paulo Rodrigues⚡</p>
      </footer>
    </div>
  ); 
}
