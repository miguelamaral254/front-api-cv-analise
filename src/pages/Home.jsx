import { Link } from 'react-router-dom';

// Ícones simples para ilustração. Você pode trocar por uma biblioteca como react-icons.
const IconInovacao = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const IconColaboracao = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconCrescimento = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;


const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Seção Hero */}
      <section className="bg-gradient-to-b from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Construa o Futuro da Comunicação na Cognvox
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
            Junte-se a uma equipe que está revolucionando a forma como o mundo se conecta através da inteligência artificial. Sua carreira dos sonhos começa aqui.
          </p>
          <div className="mt-8">
            <Link
              to="/vagas"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              Ver Vagas Abertas
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre a Cognvox: Inovação em Cada Conexão
          </h2>
          <p className="text-lg text-gray-600">
            A Cognvox é uma líder em soluções de comunicação baseadas em IA, dedicada a criar interações mais inteligentes, eficientes e humanas. Nossas tecnologias capacitam empresas a entender e atender seus clientes como nunca antes. Estamos em uma missão para quebrar barreiras e construir um futuro mais conectado.
          </p>
        </div>
      </section>

      {/* Seção Nossa Cultura */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Nossa Cultura</h2>
            <p className="text-lg text-gray-600 mt-2">O que nos torna um ótimo lugar para trabalhar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <IconInovacao />
              <h3 className="text-2xl font-bold mt-4 mb-2">Inovação Constante</h3>
              <p className="text-gray-600">
                Aqui, suas ideias são valorizadas. Incentivamos a curiosidade e a experimentação para resolver problemas complexos e criar o futuro.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <IconColaboracao />
              <h3 className="text-2xl font-bold mt-4 mb-2">Colaboração e Respeito</h3>
              <p className="text-gray-600">
                Acreditamos que os melhores resultados vêm do trabalho em equipe. Cultivamos um ambiente diverso, inclusivo e de apoio mútuo.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <IconCrescimento />
              <h3 className="text-2xl font-bold mt-4 mb-2">Crescimento Profissional</h3>
              <p className="text-gray-600">
                Investimos no seu desenvolvimento. Oferecemos oportunidades de aprendizado, mentoria e desafios que impulsionarão sua carreira.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Valores */}
      <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Nossos Valores</h2>
             <p className="text-lg text-gray-600 mt-2">Os pilares que guiam cada decisão que tomamos.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Paixão por Inovação</h3>
                  <p className="mt-1 text-gray-700">Buscamos incansavelmente novas e melhores formas de fazer as coisas.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Pessoas em Primeiro Lugar</h3>
                  <p className="mt-1 text-gray-700">Cuidamos de nossa equipe, clientes e comunidade com empatia e respeito.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Integridade Absoluta</h3>
                  <p className="mt-1 text-gray-700">Agimos com honestidade e transparência em tudo o que fazemos.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-bold text-blue-900">Obsessão pelo Cliente</h3>
                  <p className="mt-1 text-gray-700">O sucesso dos nossos clientes é o nosso sucesso.</p>
              </div>
          </div>
      </section>

      {/* Seção Final de CTA */}
      <section className="bg-blue-800 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para Dar o Próximo Passo?
          </h2>
          <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
            Explore nossas oportunidades e encontre o lugar perfeito para seu talento.
          </p>
          <div className="mt-8">
            <Link
              to="/vagas"
              className="bg-white hover:bg-gray-200 text-blue-800 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Junte-se ao Time
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;