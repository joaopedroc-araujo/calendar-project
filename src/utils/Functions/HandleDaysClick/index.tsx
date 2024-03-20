import useStore, { State } from '../../../zustand/store';

const useHandleDaysClick = () => {
    const [startingDate, endingDate] = useStore((state: State) => [state.startingDate, state.endingDate]);
    const setShowModal = useStore((state: State) => state.setShowModal);

    const handleDaysClick = (day: Date) => {
        const starting = startingDate;
        const ending = endingDate;

        if (!starting || ending || day < starting) {
            useStore.setState({ startingDate: day, endingDate: undefined });
            setShowModal(false)
            return;
        }

        useStore.setState({ endingDate: day });
        setShowModal(true);
    };

    return handleDaysClick;
};

export default useHandleDaysClick;