import axios from 'axios'
import { create } from 'zustand'
//import debounce from '../helpers/debounce'

const showStore = create((set) => ({
    graphData:[],
    data: null,

fetchData : async (id)=>{


    const [graphRes, dataRes] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=5`),

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
        ),
        
      //  set({ data: dataRes.data })
    ]);
   // const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=5'`);
//    set({ data: dataRes.data })
    
    const graphData = graphRes.data.prices.map(price =>{
        const [ timestamp, p] = price;
        const date = new Date(timestamp).toLocaleDateString("en-uk");
        return {
            Date: date,
            Price: p, 
        };
    });
    //console.log(dataRes)
    set({ data: dataRes.data });
    set({graphData});

}

}));

export default showStore