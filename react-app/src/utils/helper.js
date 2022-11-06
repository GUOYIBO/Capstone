export  const allImages = importAll(require.context('../image', false, /\.(png|jpg|svg)$/));
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
