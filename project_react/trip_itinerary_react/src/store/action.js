export const showFlash = (text, id) => ({
    type: "SHOW_FLASH",
    text,
    id,
})

export const removeFlash = (id) => ({
    type: 'REMOVE_FLASH',
    id,
})

// let messageID = 0;
