'use client';

import {favoritePokemonSchema, FormValues} from "@/validations/favoritePokemonValidation";
import {Field, Form, Formik} from "formik";
import {Button} from "@heroui/button";
import {Input, Textarea} from "@heroui/input";
import {Chip} from "@heroui/chip";
import {Heart} from "lucide-react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDraggable} from "@heroui/modal";
import React, {RefObject} from "react";
import {PokemonPropiedades} from "@/lib/types/types";
import Image from "next/image";

type PokemonFavoriteModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    pokemon: PokemonPropiedades;
    onSuccess: (values: FormValues) => Promise<void>;
};

export default function PokemonFavoriteModal({
                                                 isOpen,
                                                 onOpenChange,
                                                 pokemon,
                                                 onSuccess
                                             }: PokemonFavoriteModalProps) {
    const targetRef: RefObject<any> = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});

    const initialValues: FormValues = {
        name: "",
        description: "",
    };

    const handleSubmit = async (
        values: FormValues,
        {setSubmitting, resetForm}: any
    ) => {
        try {
            await onSuccess(values);
            resetForm();
            onOpenChange();
        } catch (error) {
            console.error("Error al guardar en favoritos el pokemon", error);
            alert("Error al guardar en favoritos el pokemon");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            ref={targetRef}
            isOpen={isOpen}
            placement="top-center"
            onOpenChange={onOpenChange}
            classNames={{
                base: "bg-white dark:bg-gray-800"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={favoritePokemonSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting, errors, touched, submitForm}) => (
                            <Form>
                                <ModalHeader {...moveProps} className="flex-col gap-1">
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="p-2.5 rounded-xl">
                                            <Image
                                                src={pokemon.sprites.other["official-artwork"].front_default}
                                                alt={pokemon.name}
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                Agregar a favoritos
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                                                {pokemon.name.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </ModalHeader>

                                <ModalBody className="gap-5">
                                    <div>
                                        <Field name="name">
                                            {({field}: any) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    label="Alias"
                                                    placeholder="Ej: Mi Pikachu favorito"
                                                    variant="bordered"
                                                    labelPlacement="outside"
                                                    classNames={{
                                                        label: "text-gray-700 dark:text-gray-300 font-bold",
                                                        input: "text-gray-900 dark:text-white",
                                                        inputWrapper: errors.name && touched.name
                                                            ? "border-danger"
                                                            : "border-gray-300 dark:border-gray-600"
                                                    }}
                                                    isInvalid={!!(errors.name && touched.name)}
                                                    errorMessage={errors.name && touched.name ? errors.name : ""}
                                                    endContent={
                                                        <Chip size="sm" variant="flat" className="text-xs">
                                                            Opcional
                                                        </Chip>
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>

                                    <div>
                                        <Field name="description">
                                            {({field}: any) => (
                                                <Textarea
                                                    {...field}
                                                    label="Descripción"
                                                    placeholder="¿Por qué es tu pokemon favorito?"
                                                    variant="bordered"
                                                    labelPlacement="outside"
                                                    minRows={4}
                                                    classNames={{
                                                        label: "text-gray-700 dark:text-gray-300 font-bold",
                                                        input: "text-gray-900 dark:text-white",
                                                        inputWrapper: errors.description && touched.description
                                                            ? "border-danger"
                                                            : "border-gray-300 dark:border-gray-600"
                                                    }}
                                                    isInvalid={!!(errors.description && touched.description)}
                                                    errorMessage={errors.description && touched.description ? errors.description : ""}
                                                    endContent={
                                                        <Chip size="sm" variant="flat" className="text-xs">
                                                            Opcional
                                                        </Chip>
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        type="button"
                                        onPress={onClose}
                                        variant="flat"
                                        size="lg"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="button"
                                        onPress={submitForm}
                                        isDisabled={isSubmitting}
                                        isLoading={isSubmitting}
                                        color="primary"
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 font-semibold"
                                        size="lg"
                                        startContent={!isSubmitting && <Heart className="size-4"/>}
                                    >
                                        {isSubmitting ? "Agregando..." : "Agregar"}
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                )}
            </ModalContent>
        </Modal>
    );
}