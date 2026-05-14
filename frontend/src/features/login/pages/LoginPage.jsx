import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <>
            <div className='min-h-screen min min-w-full flex items-center justify-center'>
                <div className="card card-side bg-base-100 shadow-2xl w-2xl">
                    <figure>
                        <img
                            src="https://greatplacetoworkcarca.com/wp-content/uploads/2021/06/LOGO-GPTW.png"
                            alt="Movie"
                            className='h-83 w-83' />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Inicie sesión</h2>
                        <p>Introduzca sus datos</p>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Correo electrónico:</legend>
                            <input
                                type="text"
                                className="input min-w-full"
                                placeholder="Correo electrónico"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Contraseña:</legend>
                            <input
                                type="text"
                                className="input min-w-full"
                                placeholder="Contraseña"
                            />
                        </fieldset>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary"><Link to={"/brands"}>Iniciar sesión</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

