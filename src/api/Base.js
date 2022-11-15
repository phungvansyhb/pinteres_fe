import axios from "axios";

export const Base =  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: "Client-ID O3rLFqpPo-J7uc6VSgVZGyBMb4SSNg-EYMcIWeVeQ1Q",
    },
});
