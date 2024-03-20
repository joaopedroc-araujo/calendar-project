import * as yup from 'yup';

export const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required'),
});
