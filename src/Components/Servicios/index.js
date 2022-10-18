import axios from "axios"

const baseUrl = process.env.REACT_APP_URL_BASE;

export async function getEmpleados() {
    try {
        const response = await axios({
            url: `{$baseUrl}/api/Empleados/GetAll}`,
            method: 'GET'
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}
