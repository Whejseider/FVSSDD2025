import * as Yup from "yup";

export const favoritePokemonSchema = Yup.object().shape({
    name: Yup.string()
        .nullable()
        .transform((value) => value === "" ? undefined : value)
        .test(
            "min-length",
            "El nombre debe tener al menos 2 caracteres",
            (value) => !value || value.length >= 2
        )
        .test(
            "max-length",
            "El nombre no puede tener más de 30 caracteres",
            (value) => !value || value.length <= 30
        ),
    description: Yup.string()
        .nullable()
        .transform((value) => value === "" ? undefined : value)
        .test(
            "min-length",
            "La descripción debe tener al menos 5 caracteres",
            (value) => !value || value.length >= 5
        )
        .test(
            "max-length",
            "La descripción no puede tener más de 80 caracteres",
            (value) => !value || value.length <= 80
        ),
});

export interface FormValues {
    name?: string;
    description?: string;
}