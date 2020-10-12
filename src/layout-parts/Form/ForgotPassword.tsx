import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from '@/state/action'

import { initiateLogIn } from '@/state/action/authAction'
import { InputText, InputCheckbox } from '@/components/Input'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'
import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"
import { IRootState } from '@/state/types'
import acApi from '@/util/api'
const initialFieldsState = {
    email: '',
}
const initialErrorState = {
    email: false,
}

type IFormFieldType = 'email' | 'password'
const ForgotPasswordForm: React.FC = () => {
    const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth }));
    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [loading, setLoading] = React.useState(false)
    const [resError, setResError] = React.useState<string | undefined>(undefined)
    const [info, setInfo] = React.useState<string | undefined>(undefined)
    const dispatch = useDispatch()

    const validate = () => {

        const result = { ...errors }
        let pass = true;
        if (fields.email.trim() === '') {
            result.email = true
            pass = false
        } else {
            result.email = false
        }

        setErrors(result)
        return pass;
    }

    const handleChange = (e: any, fieldName: string) => {
        validate()

        setFields({
            ...fields,
            [fieldName]: e.target.value
        });
    }

    const handleSubmit = () => {
        setLoading(true)
        setResError(undefined)
        setInfo(undefined)
        if (validate()) {
            const { email } = fields
            acApi.forgotPassword(email).then(res => {
                setLoading(false)
                if (res.forgotPassword) {
                    setInfo(res.forgotPassword.message)
                } else {
                    setResError('Not about to send email')
                }
            }).catch(error => {
                setResError(error.message)
            })

        }
    }

    return (
        <div
            className="flex-1 flex flex-col items-center justify-center max-w-mobile w-full h-full px-4 py-6"
        >
            {resError && (
                <Snackbar
                    text={resError}
                    error
                />
            )}
            {info && (
                <Snackbar
                    text={info}
                />
            )}
            <InputText
                label={TS.email}
                type='text'
                value={fields.email}
                onChange={(e) => {
                    handleChange(e, 'email')
                }}
                error={errors.email ? 'Required' : undefined}
            />

            <FormSubmitButton
                loading={loading}
                onClick={handleSubmit}
            />
        </div>

    )
}

export default ForgotPasswordForm