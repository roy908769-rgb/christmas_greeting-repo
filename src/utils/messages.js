export const christmasMessages = [
    "May your Christmas be filled with light, love, and blessings.",
    "Wishing you joy, warmth, and magical moments this festive season.",
    "May the spirit of Christmas bring you peace and happiness throughout the coming year.",
    "Sending you love, light, and laughter for a truly magical Holiday season.",
    "May your home be filled with the joy of the Christmas season.",
    "Wishing you a season of gladness, a season of cheer, and to top it all off, a wonderful year.",
    "May the beauty of Christmas fill your heart with wonder and delight.",
    "Wishing you all the happiness your holiday can hold!"
];

export const getRandomMessage = () => {
    return christmasMessages[Math.floor(Math.random() * christmasMessages.length)];
};
