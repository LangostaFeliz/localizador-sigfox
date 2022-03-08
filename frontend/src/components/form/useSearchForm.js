
import {useFormik} from 'formik'
import * as yup from 'yup'
function useSearchForm() {
    const validationSchema = yup.object({
        deviceID: yup
            .string()
            .required('deviceID es requerido'),
        startData: yup
            .number()
            .required('dato inicial es requerida'),
        endData: yup
            .number()
            .required('dato final es requerida')
    })


    const searchForm=useFormik({
        initialValues:{
            deviceID:'',
            startData:0,
            endData:0,
        },
        validationSchema:validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return {searchForm}
}

export default useSearchForm
