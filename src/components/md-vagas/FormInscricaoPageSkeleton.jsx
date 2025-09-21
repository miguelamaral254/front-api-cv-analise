import React from 'react';

const InfoVagaSkeleton = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-6">
            <div className="h-8 bg-gray-300 rounded w-4/5 mb-4"></div>
            <div className="flex items-center flex-wrap gap-2 mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="border-t pt-4 mt-4">
                <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
            <div className="border-t pt-4 mt-4">
                <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
                <ul className="space-y-3">
                    <li className="h-10 bg-gray-200 rounded-lg w-full"></li>
                    <li className="h-10 bg-gray-200 rounded-lg w-full"></li>
                    <li className="h-10 bg-gray-200 rounded-lg w-full"></li>
                </ul>
            </div>
        </div>
    );
};

const FormInscricaoPageSkeleton = () => {
    const FormFieldSkeleton = () => (
        <div>
            <div className="h-5 w-1/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>
    );

    const GerenciadorBlockSkeleton = ({ titleWidth = '1/3' }) => (
        <div className="border-t pt-8">
            <div className={`h-8 w-${titleWidth} bg-gray-400 rounded mb-6`}></div>
            <div className="h-10 w-36 bg-gray-300 rounded-lg"></div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                <div className="mb-8 lg:mb-0 lg:col-span-1">
                    <InfoVagaSkeleton />
                </div>
                <div className="lg:col-span-2">
                    <div className="h-10 w-3/4 bg-gray-400 rounded mb-6"></div>
                    <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                        <div>
                            <div className="h-8 w-1/3 bg-gray-400 rounded mb-6"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormFieldSkeleton />
                                <FormFieldSkeleton />
                                <FormFieldSkeleton />
                                <FormFieldSkeleton />
                                <div className="md:col-span-2">
                                    <div className="h-5 w-1/4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-24 w-full bg-gray-200 rounded-md"></div>
                                </div>
                            </div>
                        </div>
                        <GerenciadorBlockSkeleton />
                        <GerenciadorBlockSkeleton />
                        <div className="border-t pt-8">
                            <div className="h-8 w-1/2 bg-gray-400 rounded mb-6"></div>
                            <div className="space-y-4">
                                <div className="h-20 bg-gray-200 rounded-lg"></div>
                                <div className="h-20 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="border-t pt-6 space-y-4">
                            <div className="h-6 w-full bg-gray-200 rounded"></div>
                            <div className="h-6 w-full bg-gray-200 rounded"></div>
                            <div className="flex justify-end">
                                <div className="h-12 w-48 bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormInscricaoPageSkeleton;