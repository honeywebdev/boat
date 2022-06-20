import { atom } from 'recoil';


export const cart = atom({
    key: "crt",
    default: []
});

export const counter = atom({
    key: "ctr",
    default: 0
})

export const subTotal = atom({
    key: "sbt",
    default: 0
})