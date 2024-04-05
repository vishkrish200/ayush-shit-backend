import axios from "axios";
import express from "express"; 
import cors from "cors";

const app = express();
const port = 3000;



async function getDHL() {
    const orderId = "3178169691";
    const apiUrl = "https://api-eu.dhl.com/track/shipments";
    const requestUrl = `${apiUrl}?trackingNumber=${orderId}`;
    const apiKey = "f0HkBGU9aBpk9erlCOH55T8XAoW8xsS8";

    try {
        const response = await axios.get(requestUrl, {
            headers: {
                'DHL-API-Key': apiKey
            }
        });

        if (response.status === 200) {
            console.log("Response from API:");
            console.log(response.data.shipments[0]);
            return response.data;
        } else {
            console.log(`Error: Unable to retrieve data. Status code: ${response.status}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }

    return response.data;
}
app.use(cors());

app.get('/getDHL', async (req, res) => {
    const data = await getDHL();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});