import React from "react";
import { useState } from "react";
import { useBrands } from "../hooks/useBrands.js";

const BrandsPage = () => {

    //Traemos las cosas que nos proporciona el hook
    const {brands, loading, error, addBrand, editBrand, removeBrand} = useBrands();

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col p-3">
                    <p className="text-2xl">Marcas</p>
                    <p>Gestione todas las marcas de los productos de la empresa.</p>
                </div>
                <div className="px-3">
                    <button class="btn btn-primary">Agregar marca</button>
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
                                        <div className="">

                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* row 1 */}
                            <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Desktop Support Technician
                                    </span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Actualizar</button>
                                    <button className="btn btn-ghost btn-xs">Eliminar</button>
                                </th>

                            </tr>
                            {/* row 2 */}
                            <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Brice Swyre</div>
                                            <div className="text-sm opacity-50">China</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Carroll Group
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Tax Accountant
                                    </span>
                                </td>
                                <td>Red</td>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Actualizar</button>
                                    <button className="btn btn-ghost btn-xs">Eliminar</button>
                                </th>
                            </tr>
                            {/* row 3 */}
                            <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Marjy Ferencz</div>
                                            <div className="text-sm opacity-50">Russia</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Rowe-Schoen
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Office Assistant I
                                    </span>
                                </td>
                                <td>Crimson</td>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Actualizar</button>
                                    <button className="btn btn-ghost btn-xs">Eliminar</button>
                                </th>
                            </tr>
                            {/* row 4 */}
                            <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Yancy Tear</div>
                                            <div className="text-sm opacity-50">Brazil</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Wyman-Ledner
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Community Outreach Specialist
                                    </span>
                                </td>
                                <td>Indigo</td>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Actualizar</button>
                                    <button className="btn btn-ghost btn-xs">Eliminar</button>
                                </th>
                            </tr>
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
