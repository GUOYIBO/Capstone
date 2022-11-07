import errorImage from '../image/error.png'
import errorImage1 from '../image/error1.png'



export const allImages = importAll(require.context('../image', false, /\.(png|jpg|svg)$/));
export const urlDisplay = (url) =>{

    if (!allImages[url] || !allImages[url].default){
        return url
    }
    else{
        return allImages[url].default 
    }

}

export function importAll(r){
    let images = {};
    
    r.keys().map((item, index) => { 
        images[item.replace('./', '')] = r(item); });
    return images;
}



export const onLoadImage = (e) => {
    e.target.className = e.target.className + ' error-img';
    e.target.src = errorImage;
    return;
}

export const onErrorLoadHandler = (e) => {
    e.target.className = e.target.className + ' default-error-img'
    e.target.src = errorImage1;
    return;
}