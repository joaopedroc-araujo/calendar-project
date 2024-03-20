import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { useEffect } from 'react';
import useStore, { State } from '../../../../zustand/store';
import { formatDate } from 'date-fns';
import { useSupabase } from '../../../../utils/Hooks/useSupabase';
import { Event } from '../../types';


const InputModal = () => {
    const startingDate = useStore((state: State) => state.startingDate);
    const endingDate = useStore((state: State) => state.endingDate);
    const { data, error, createData } = useSupabase('holiday-plans')

    const formattedStartingDate = formatDate(startingDate, 'MMM dd yyyy');
    const formattedEndingDate = formatDate(endingDate, 'MMM dd yyyy');

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        register('title');
        register('description');
        register('location');
    }, [register, errors]);


    const onSubmit = async (formData: Event) => {
        const { title, description, location, participants } = formData;
        const data: Event[] = [{
            title,
            description,
            'starting-date': formattedStartingDate,
            'ending-date': formattedEndingDate,
            location,
            participants
        }];

        try {
            await createData(data);
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded shadow-lg border border-gray-400 backdrop-filter w-[30%] backdrop-blur">
            <h2 className="text-center text-xl font-bold">From {formattedStartingDate} to {formattedEndingDate}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <label className="block text-center mb-2">
                    <input
                        type="text"
                        placeholder='Title'
                        className={`mt-1 p-2 border ${errors?.title ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-100`}
                        {...register('title', { onChange: () => trigger('title') })}
                    />
                    {errors?.title && (
                        <p className="text-red-500 ">{errors?.title.message}</p>
                    )}
                </label>
                <label className="block text-center">
                    <textarea

                        {...register('description')}
                        placeholder="Description"
                        className="mt-1 p-2 border border-gray-300 w-52 rounded bg-gray-100"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </label>
                <label className="block text-center">
                    <input
                        type="text"
                        {...register('location')}
                        placeholder="Location"
                        className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                </label>
                <label className="block text-center">
                    <input
                        type="text"
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
