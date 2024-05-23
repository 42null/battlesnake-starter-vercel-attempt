// dataCache.js
let cachedData = {
    message: "Initial data",
    timestamp: new Date(),
};

export const getCachedData = () => cachedData;

export const setCachedData = (newData) => {
    cachedData = newData;
};
