import useStore, { State } from '../../../zustand/store';

const useHandleDaysClick = () => {
    const [startingDate, endingDate] = useStore((state: State) => [state.startingDate, state.endingDate]);

    const handleDaysClick = (day: Date) => {
        const starting = startingDate;
        const ending = endingDate;

        if (!starting || ending || day < starting) {
            useStore.setState({ startingDate: day, endingDate: undefined });
            return;
        }

        useStore.setState({ endingDate: day });
    };

    return handleDaysClick;
};

export default useHandleDaysClick;