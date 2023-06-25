import {object, string} from 'yup';

const validations = object({
    email: string().email("Email girmeniz gerekmektedir.").required("Burası zorunlu bir alandır."),
    password:string().min(5,"Parola en az 5 karakter olmalıdır.").required("Burası zorunlu bir alandır."),
});
export default validations;