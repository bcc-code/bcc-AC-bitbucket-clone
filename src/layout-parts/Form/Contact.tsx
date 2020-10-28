import React from 'react'
import axios from 'axios'
import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

import { InputText, InputCheckbox, InputTextArea } from '@/components/Input'
import { LayoutH1 } from '@/components/Headers'

import Snackbar from '@/components/Snackbar'
import { FormSubmitButton } from "@/components/Button"

const siteUrl = process.env.SITE_URL
const contactFormTo = process.env.CONTACT_FROM_TO

interface IContactFrom {
    name: string
    email: string
    location: string
    subject: string
    message: string
    from?: string
    to?: string
    honey?: string
    consent?: boolean
}

const initialFields = {
    name: '',
    honey: '',
    email: '',
    location: '',
    subject: '',
    message: ''
}

const ContactForm = () => {
    const [fields, setFields] = React.useState<IContactFrom>(initialFields)
    const [errors, setErrors] = React.useState(initialFields)
    const [success, setSuccess] = React.useState(false)

    const [errorMessage, setErrorMessage] = React.useState<undefined | string>(undefined)
    const validate = () => {
        const fieldNames = ['email', 'name', 'message'];
        const result = { ...errors }
        let pass = true;

        for (let field of fieldNames) {
            if (fields[field].trim() === '') {
                result[field] = true
                pass = false
            } else {
                result[field] = false
            }

        }
        setErrors(result)
        return pass;
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (fields.honey !== '') return;

        if (validate()) {

            const data: IContactFrom = { from: TS.site_title, ...fields }
            if (siteUrl) {
                data.from = siteUrl.replace("https://", '')
            }

            if (contactFormTo) {
                data.to = contactFormTo
            }

            /*     const dataLayer = (window as any).dataLayer = (window as any).dataLayer || []; */

            axios({
                url: "https://q4jq50xsab.execute-api.us-east-1.amazonaws.com/prod",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data,
            }).then((result: any) => {
                if (result.data.errorMessage) {
                    throw new Error(result.errorMessage)
                } else {
                    setSuccess(true)
                }

                setFields(initialFields)
            }).catch(error => {
                /*            dataLayer.push({
                               event: 'ac.gtm_track_form_error',
                               label: 'Contact',
                               message: error.message
                           }) */
                setErrorMessage(`Something went wrong. ${error.message}`)

            });

        }


    }

    const handleChange = (e: any, field: string) => {
        if (field === "consent") {
            setFields({
                ...fields,
                [field]: !fields.consent
            })

        } else {
            setFields({
                ...fields,
                [field]: e.target.value
            });
        }

    }

    return (
        <div className="pb-8 sm:py-4" >
            {errorMessage !== undefined && <Snackbar text={errorMessage} error />}
            {success !== undefined && <Snackbar text={TS.contact_sent} />}
            <form className="w-full flex" onSubmit={handleSubmit}>

                <div className="w-1/2 pr-2">
                    <InputText
                        label={TS.full_name}
                        type='text'
                        name="name"
                        required
                        value={fields.name}
                        onChange={(e) => handleChange(e, 'name')}
                    />
                </div>
                <div className="w-1/2">
                    <InputText
                        label={TS.location}
                        type='text'
                        name="location"
                        value={fields.location}
                        onChange={(e) => handleChange(e, 'location')}
                    />
                </div>
            </form>
            <input type="hidden" name="form-name" value="contact" />
            <InputText
                label={TS.email}
                type='email'
                name="email"
                required
                value={fields.email}
                onChange={(e) => handleChange(e, 'email')}
            />
            <InputText
                label={TS.subject}
                type='text'
                name="subject"
                value={fields.subject}
                onChange={(e) => handleChange(e, 'subject')}
            />
            <InputTextArea
                label={TS.message}
                required
                name="message"
                value={fields.message}
                onChange={(e) => handleChange(e, 'message')}
            />

            <InputCheckbox
                className="text-gray-600"
                value={fields.consent === true}
                label={TS.consent_contact}
                onChange={(e) => {
                    handleChange(e, 'consent')
                }}
            />
            <div className="flex flex-col justify-center w-full text-sm sm:text-base">
                <div className="flex justify-center py-4">
                    <a className='underline text-d4secondary' href={`${ac_strings.slug_privacy_policy}` || "/"} target="_blank">{TS.consent_read_policy}</a>
                </div>
                <div className="flex justify-center">
                    <FormSubmitButton
                        disabled={!fields.consent}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}


export default ContactForm;


