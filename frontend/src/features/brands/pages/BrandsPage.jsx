import React from "react";
import { useState } from "react";
import { useBrands } from "../hooks/useBrands.js";
import { useForm } from "react-hook-form";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner"


const BrandsPage = () => {

    const {
        register,
        control,
        watch,
        getValues,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            slogan: "",
            address: "",
            isActive: false
        }
    })


    //Traemos las cosas que nos proporciona el hook
    const { brands, loading, error, addBrand, editBrand, removeBrand } = useBrands();

    //Estado para saber si estamos editando o creando
    const [editingBrand, setEditingBrand] = useState(null);

    async function onSubmit(data) {
        console.log(watch())
        try {

            if (editingBrand) {
                //Si tiene algo esta variable, estamos actualizando
                await editBrand(editingBrand._id, data);

                Swal.fire({
                    icon: "success",
                    title: "Marca actualizada"
                });
            }
            else {
                //Si la variable no tiene nada, estamos creando
                await addBrand(data);
                Swal.fire({
                    icon: "success",
                    title: "Marca agregada"
                });
            }

            //Después de la acción limpiamos el formulario
            reset();

            //Quitamos la brand que si se estaba editando
            setEditingBrand(null);

            //Cerramos modal
            document.getElementById("my_modal_1").close();

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.message
            });
        }

    }

    const onError = (errors) => {
        toast.error("Formulario incompleto.", {
            description: Object.values(errors)[0]?.message,
            position: "top-center",
            descriptionClassName: "!text-black"
        })
    }


    function deleteBrand(brandId) {
        Swal.fire({
            title: "¿Esta seguro?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                let deleted = removeBrand(brandId);
                if (!deleted) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!"
                    });
                }

                Swal.fire({
                    title: "Eliminada!",
                    text: "Su marca ha sido eliminada",
                    icon: "success"
                });
            }


        });
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col p-3">
                    <p className="text-2xl">Marcas</p>
                    <p>Gestione todas las marcas de los productos de la empresa.</p>
                </div>
                <div className="px-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            //Ponemos en blanco todo el formulario antes de crear
                            setEditingBrand(null);
                            reset();

                            document.getElementById('my_modal_1').showModal()
                        }}
                    >
                        Agregar marca
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                {editingBrand ? "Actualizar marca" : "Agregar marca"}
                            </h3>
                            <div className="flex flex-col gap-2">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Nombre de la marca:</legend>
                                    <input
                                        type="text"
                                        className="input border"
                                        placeholder="Nombre"
                                        {...register("name", {
                                            required: "El nombre es obligatorio."
                                        })}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Eslogan de la marca:</legend>
                                    <input
                                        type="text"
                                        className="input border"
                                        placeholder="Eslogan"
                                        {...register("slogan", {
                                            required: "El slogan es obligatorio"
                                        })}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Dirección:</legend>
                                    <input
                                        type="text"
                                        className="input border"
                                        placeholder="Dirección"
                                        {...register("address", {
                                            required: "La dirección es obligatoria"
                                        })}
                                    />
                                </fieldset>
                                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 border-3">
                                    <label className="label">
                                        <input
                                            type="checkbox"
                                            className="checkbox border"
                                            {...register("isActive")}
                                        />
                                        Activo
                                    </label>
                                </fieldset>
                            </div>

                            <div className="modal-action">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        handleSubmit(onSubmit, onError)();
                                    }}
                                >
                                    {editingBrand ? "Actualizar" : "Agregar"}
                                </button>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cerrar</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Eslogan</th>
                                <th>Dirección</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">

                            {brands.map((brand) => (
                                <tr key={brand._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://images.ctfassets.net/1p6jth4lndy5/6vEmsLYHfPcdPkLJi9D7gI/68cae385e20969ac39734424919b6040/brand_awareness.jpeg?fm=webp&w=1200&h=630&fit=thumb"
                                                        alt="brand"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{brand.name}</div>
                                                {/*<div className="text-sm opacity-50">United States</div>*/}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        "{brand.slogan}"
                                    </td>
                                    <td>
                                        {brand.address}
                                    </td>
                                    <th>
                                        <input type="checkbox" className="checkbox" checked={brand.isActive} readOnly />
                                    </th>
                                    <th>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                //Cuando se presione actualizar ponemos la brand en la variable editingBrand
                                                setEditingBrand(brand)

                                                //Ahora llenamos el estado del formulario del modal.
                                                setValue("name", brand.name)
                                                setValue("slogan", brand.slogan)
                                                setValue("address", brand.address)
                                                setValue("isActive", brand.isActive)

                                                //Mostramos el formulario
                                                document.getElementById('my_modal_1').showModal();
                                            }}
                                        >
                                            Actualizar
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => deleteBrand(brand._id)}>
                                            Eliminar
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default BrandsPage;
