import React from "react";
import { useState } from "react";
import { useBrands } from "../hooks/useBrands.js";

const BrandsPage = () => {

    //Traemos las cosas que nos proporciona el hook
    const { brands, loading, error, addBrand, editBrand, removeBrand } = useBrands();

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

            let deleted = removeBrand(brandId);

            if (!deleted) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            }
            else {
                if (result.isConfirmed) Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
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
                    <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Agregar marca</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Nombre de la marca:</legend>
                                <input type="text" className="input" placeholder="Nombre" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Eslogan de la marca:</legend>
                                <input type="text" className="input" placeholder="Eslogan" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Dirección:</legend>
                                <input type="text" className="input" placeholder="Dirección" />
                            </fieldset>
                            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                                <label className="label">
                                    <input type="checkbox" defaultChecked className="checkbox" />
                                    Activo
                                </label>
                            </fieldset>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
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
                        <tbody>

                            {brands.map((brand) => (
                                <tr key={brand._id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
                                        <button className="btn btn-ghost btn-xs">Actualizar</button>
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

        </div>
    );
};

export default BrandsPage;
