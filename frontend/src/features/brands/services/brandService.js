const API_URL = "http://localhost:4000/api/brands"

//SERVICIOS DE LA API
export const getBrands = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error obteniendo las marcas");
    return res.json();
}

export const createBrand = async (data) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("Error creando la marca");
    return res.json();
}

export const updateBrand = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("Error actualizando la marca");
    return res.json();
}

export const deleteBrand = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error eliminando la marca");
    }

    return true;
}