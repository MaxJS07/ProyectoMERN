import { useEffect, useState } from "react"
import { getBrands, createBrand, updateBrand, deleteBrand} from "../services/brandService.js"

export const useBrands = () =>{

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const loadBrands = async () =>{
        try {
            setError(null)
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

    const addBrand = async (data) =>{
        try {
            setError(null)
            await createBrand(data);
            loadBrands();
        } catch (error) {
            setError(error.message)
        }
        
    }

    const editBrand = async (id,data) =>{
        try{
            setError(null)
            await updateBrand(id, data);
            loadBrands();
        }
        catch(error){
            setError(error.message)
        }
    };

    const removeBrand = async (id) => {
        try {
            setError(null)
            await deleteBrand(id);
            loadBrands();
        } catch (error) {
            setError(error.message)
        }
    }

    //Este useEffect ejecuta el loadbrands automáticamente al cargar la página, el "[]" quiere decir "solo una vez al cargar la página"
    useEffect(() =>{
        loadBrands();
    }, []);

    return{
        brands,
        loading, 
        error,
        addBrand,
        editBrand,
        removeBrand
    }

}