export  const allImages = importAll(require.context('../image', false, /\.(png|jpg|svg)$/));
export const urlDisplay = (url) =>{
    if ( url.startsWith('http')){
        return url
    }
    return allImages[url].default

}

export function importAll(r){
    let images = {};
    
    r.keys().map((item, index) => { 
        images[item.replace('./', '')] = r(item); });
    return images;
}
