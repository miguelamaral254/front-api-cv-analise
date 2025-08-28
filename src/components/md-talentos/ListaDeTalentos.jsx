import * as React from 'react';

const ListaDeTalentos = ({ talentos, onTalentoClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <ul className="divide-y divide-gray-200">
        {talentos.length > 0 ? (
          talentos.map(talento => (
            <li key={talento.id} className="py-2 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{talento.nome}</h2>
                <p className="text-sm text-gray-600">{talento.email}</p>
                <p className="text-xs text-gray-500 mt-1">📍 {talento.cidade || 'Não informado'}</p>
              </div>
              <button 
                onClick={() => onTalentoClick(talento)} 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Ver Detalhes
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-2">Nenhum talento encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default ListaDeTalentos;