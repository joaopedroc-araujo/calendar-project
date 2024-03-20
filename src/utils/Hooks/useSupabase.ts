import { useState, useEffect } from 'react';
import { supabase } from '../../infra/Supabase';
import { Event } from '../../components/EventCalendar/types';

export const useSupabase = (tablename: string) => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from(tablename).select('*');
            if (error) {
                throw new Error(error.message);
            }
            setData(data || []);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createData = async (newData: Event[]) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from(tablename).insert(newData);
            if (error) {
                throw new Error(error.message);
            }
            setData((prevData) => [...prevData, data]);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (id: number, updatedData: any) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from(tablename).update(updatedData).eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
            setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, ...data } : item)));
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (id: number) => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from(tablename).delete().eq('id', id);
            if (error) {
                throw new Error(error.message);
            }
            setData((prevData) => prevData.filter((item) => item.id !== id));
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, createData, updateData, deleteData };
};
