import {createContext} from "react";


type TWishlist= {
    _id:string;
    product:string;
    user:string;
}

type Twishlistcontext= {
    wishlists:TWishlist | null;
    addToWishlist:(productId:string)=>void;
    removeFromWishlist:(productId:string)=>void;
    isProductInWishlist:(productId:string)=>boolean;
}

const initialvalues:Twishlistcontext={
    wishlists:null,
    addToWishlist:()=>{},
    removeFromWishlist:()=>{},
    isProductInWishlist:()=>false
}

const wishlistContext =createContext(initialvalues);
export default wishlistContext;