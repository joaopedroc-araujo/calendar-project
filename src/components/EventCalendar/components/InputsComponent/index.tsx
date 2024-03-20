import React, { useState } from 'react';
import useStore, { State } from '../../../../zustand/store';

const InputModal = () => {
    const [title, setTitle] = useState('');
    const [localization, setLocalization] = useState('');
    const [participants, setParticipants] = useState('');
    const [description, setDescription] = useState('');
    const startingDate = useStore((state: State) => state.startingDate);
    const endingDate = useStore((state: State) => state.endingDate);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'localization':
                setLocalization(value);
                break;
            case 'participants':
                setParticipants(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTitle('');
        setLocalization('');
        setParticipants('');
        setDescription('');
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded shadow-lg border border-gray-400 backdrop-filter w-[30%] backdrop-blur">
            <h3 className="text-center font-bold text-sm my-4">
                From {startingDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                {''} to {endingDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <label className="block text-center mb-2">
                    <input
                        type="text"
                        name="title"
                        placeholder='Title'
                        value={title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </label>
                <label className="block text-center">
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="mt-1 p-2 border border-gray-300 w-52 rounded bg-gray-100"
                    />
                </label>
                <label className="block text-center">
                    <input
                        type="text"
                        name="localization"
                        value={localization}
                        onChange={handleInputChange}
                        placeholder="Localization"
                        className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </label>
                <label className="block text-center">
                    <input
                        type="text"
                        name="participants"
                        value={participants}
                        onChange={handleInputChange}
                        placeholder="Participants"
                        className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </label>
                <div className="flex justify-center">
                    <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded justify-center">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InputModal;
