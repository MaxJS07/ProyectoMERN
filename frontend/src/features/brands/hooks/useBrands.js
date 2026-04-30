import { useEffect, useState } from "react"
import { getBrands, createBrand, updateBrand, deleteBrand} from "../services/brandService.js"

export const useBrands = () =>{

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const loadBrands = async () =>{
        try {
            setLoading(true);
            const data = await getBrands();
            setBrands(data)
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    const createBrand = async (data) =>{
        try {
            await createBrand(data);
            loadBrands();
        } catch (error) {
            setError(error.message)
        }
        
    }

    const editBrand = async (id,data) =>{
        try{
            await updateBrand(id, data);
            loadBrands();
        }
        catch(error){
            setError(error.message)
        }
    };

    const removeBrand = async (id) => {
        await deleteBrand(id);
        loadBrands();
    }

    //Este useEffect ejecuta el loadbrands automáticamente al cargar la página, el "[]" quiere decir "solo una vez al cargar la página"
    useEffect(() =>{
        loadBrands();
    }, []);

    return{
        brands,
        loading, 
        error,
        createBrand,
        editBrand,
        removeBrand
    }






}