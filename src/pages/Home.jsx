import React from "react";
import NavBar from "../components/Navbar";
//import TabelaAtores from "../components/Table.jsx";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#ECEFFA]">
      {/* Sem sidebar: apenas padding padrão */}
      <main className="p-6 pb-12">
        {/* Container centralizado para todo o conteúdo da página */}
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs / toolbar */}
          <div className="flex items-center justify-start mb-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center h-8 px-3 bg-white text-[#122866] border border-[rgba(23,32,74,0.09)] rounded-lg font-bold text-sm leading-tight">
                GESTÃO
              </span>
              <span className="inline-flex items-center h-8 px-3 bg-[#203a8a] text-white rounded-lg font-bold text-sm leading-tight">
                ATOR
              </span>
            </div>
          </div>

          {/* Filtro para pesquisa de ator */}
          <section className="w-full bg-white border border-[rgba(23,32,74,0.09)] rounded-xl shadow-[0_18px_50px_rgba(20,30,70,0.12)] p-5 mb-5">
            <h3 className="mb-3 text-[#122866] font-extrabold text-base">
              FILTRO PARA PESQUISA DE ATOR
            </h3>

            <div className="grid gap-4 mb-3 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#122866] text-sm">Município</label>
                <select className="h-10 px-3 rounded-md border border-[#d7def3] bg-white">
                  <option>Selecione</option>
                  <option>Teste</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#122866] text-sm">Instituição</label>
                <select className="h-10 px-3 rounded-md border border-[#d7def3] bg-white">
                  <option>Selecione</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#122866] text-sm">Modalidade</label>
                <select className="h-10 px-3 rounded-md border border-[#d7def3] bg-white">
                  <option>Selecione TODAS Modalidades</option>
                </select>
              </div>
            </div>

            <button className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-[#203a8a] text-white font-extrabold tracking-wide shadow-[0_10px_24px_rgba(32,58,138,0.22)] hover:brightness-95">
              PESQUISAR
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
