import React from 'react'

function Dashboard() {



  function calculateSize(img, maxWidth, maxHeight) {
      let width = img.width;
      let height = img.height;

      if(width > height){
        if(width > maxWidth){
          height = Math.round((height*maxWidth) /width);
          width =   maxWidth
        }
      }
      else{
        if(height > maxHeight){
          width = Math.round((width*maxHeight) /height);
          height =   maxHeight;
        }
      }

      return [width, height];
  }


  const input = document.getElementsById("img-input");
  input.onChange = function (ev) {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = function() {
      URL.revokeObjectURL(this.src);
    };
    img.onload = function() {
      URL.revokeObjectURL(this.src);
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      MIME_TYPE,
      QUALITY
    };


  }

  


  const upload = () => {
    const fileuploadinput = document.querySelector('.file-uploader');
    const image = fileuploadinput.files[0];

    if(!image.type.includes('image')){
      return alert('only images are allwoed');

    }

    if(image.size > 10_000_000){
      return alert('Max upload size is 10 Mb!');
      
    }
  }



  return (
    <div>
      <h1>Welcome To Dashboard</h1>
      <h2> upload image</h2>
      <input 
        id="img-input"
        type='file'
        onChange={upload()}
        accept='/image'
      />
    </div>
  )
}

export default Dashboard
