import React, { useState, useEffect } from "react";
// import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validateSchema = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .matches(
                /(?=.*[0-9])/,
                "Пароль должен содержать хотя бы одно число"
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать один из специальних символов !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен состоять минимум из 8 символов"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некоректно")
    });
    //  const validatorConfig = {
    //      email: {
    //          isRequired: {
    //              message: "Электронная почта обязательна для заполнения"
    //          },
    //          isEmail: {
    //              message: "Email введен некоректно"
    //          }
    //      },
    //      password: {
    //          isRequired: { message: "Пароль обязателен для заполнения" },
    //          isCapital: {
    //              message: "Пароль должен содержать хотя бы одну заглавную букву"
    //          },
    //          isContainDigit: {
    //              message: "Пароль должен содержать хотя бы одно число"
    //          },
    //          min: {
    //              message: "Пароль должен состоять минимум из 8 символов",
    //              value: 8
    //          }
    //      }
    //  };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        //   const errors = validator(data, validatorConfig);
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Електронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <CheckBoxField
                            name="stayOn"
                            onChange={handleChange}
                            value={data.stayOn}
                        >
                            Оставаться в системе
                        </CheckBoxField>
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
