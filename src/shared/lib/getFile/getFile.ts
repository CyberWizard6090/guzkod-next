export async function GetFile(Url: any, Name: any) {
  try {
    fetch(Url, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
    
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', Name);

    
        document.body.appendChild(link);

      
        link.click();

       
        link!.parentNode!.removeChild(link);
      });
  } catch (error) {
    console.error(error);
  }
}
