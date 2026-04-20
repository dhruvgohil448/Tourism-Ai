import React from "react";
import { Field, ErrorMessage } from "formik";
import { formInput } from "../components/styles";

const InputField = ({ title, type, name, classes }) => {
    return (
        <div className="relative mb-6">
            <label htmlFor={title} className={formInput.floatingLabel}>
                {title}
            </label>
            <Field
                type={type}
                name={(!name) ? title.replace(" ", "_").toLowerCase() : name}
                className={`${formInput.floatingInput} ${classes}`}
                placeholder={title}
            />
            <ErrorMessage
                name={(!name) ? title.replace(" ", "_").toLowerCase() : name}
                component="div"
                className="text-red-700 text-sm font-body"
            />
        </div>
    );
};

export const TextAreaField = ({ title }) => {
    return (
        <div className="relative mb-6">
            <label htmlFor={title} className="font-body block mb-2 text-sm font-medium text-dark">
                {title}
            </label>
            <Field
                as="textarea"
                name={title.replace(" ", "_").toLowerCase()}
                className="font-body block p-2.5 w-full text-sm text-dark bg-transparent rounded-lg border-2 border-dark focus:ring-primary focus:border-primary"
                placeholder={title}
            />
            <ErrorMessage
                name={title.replace(" ", "_").toLowerCase()}
                component="div"
                className="text-red-700 text-sm font-body"
            />
        </div>
    );
};

export default InputField;
