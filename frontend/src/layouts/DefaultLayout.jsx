import React from "react"
import {Outlet} from "react-router-dom"
import { Navbar } from "../shared/components/Navbar"


export function DefaultLayout(){

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar/>
            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    )
}