import VagaCardSkeleton from './VagaCardSkeleton';

const ListaDeVagasSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <VagaCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default ListaDeVagasSkeleton;