import Yup from "yup";

export let movieValidate = Yup.object({
    name: Yup.string().required('Name is required').trim(),
    language: Yup.string().required('Language is required'),
    genres: Yup.array().of(Yup.string().required('At least one genre is required')),
    duration: Yup.number().required('Duration is required').min(0),
    rating: Yup.number().required('Rating is required'),
});
